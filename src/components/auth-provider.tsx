import type React from "react";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

/**
 * Providers wired to real OAuth. Google is enabled on the backend.
 * Yahoo is not an available provider yet — the button stays, but it reports
 * honestly instead of faking a session.
 */
export type OAuthProvider = "google" | "yahoo";

const SUPPORTED_PROVIDERS: OAuthProvider[] = ["google"];

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  pendingProvider: OAuthProvider | null;
  signInWithProvider: (provider: OAuthProvider) => Promise<boolean>;
  /** Prototype email/username signup — stored in this browser only. */
  signUpWithEmail: (details: { email: string; username: string; password: string }) => void;
  /** Prototype email/username login — checked against accounts stored in this browser. */
  signInWithPassword: (identifier: string, password: string) => void;
  signOut: () => Promise<void>;
  profileComplete: boolean;
  completeProfile: (details: ProfileDetails) => Promise<void>;
  consentPopup1Complete: boolean;
  completeConsentPopup1: () => void;
  consentComplete: boolean;
  completeConsent: () => void;
};

export type ProfileDetails = {
  gender: "man" | "woman";
  lookingFor: "women" | "men";
  birthDate: string;
  city: string;
  username: string;
};

/** Per-account flow flags, keyed by account id (prototype: browser storage). */
type AccountState = {
  accountCreated?: boolean;
  profileCompleted?: boolean;
  consentPopup1Completed?: boolean;
  consentCompleted?: boolean;
};

type MockAccount = { id: string; email: string; username: string; password: string; profile?: ProfileDetails };

const STATE_KEY = "vela-account-state";
const ACCOUNTS_KEY = "vela-mock-accounts";
const SESSION_KEY = "vela-mock-session";

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function mockToUser(account: MockAccount): User {
  return {
    id: account.id,
    email: account.email,
    user_metadata: { username: account.username, ...account.profile },
    app_metadata: {},
    aud: "prototype",
    created_at: "",
  } as User;
}

const globalForAuth = globalThis as { __velaAuthContext?: React.Context<AuthContextValue | null> };
const AuthContext = (globalForAuth.__velaAuthContext ??= createContext<AuthContextValue | null>(null));

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [localLoaded, setLocalLoaded] = useState(false);
  const [pendingProvider, setPendingProvider] = useState<OAuthProvider | null>(null);
  const [accounts, setAccounts] = useState<MockAccount[]>([]);
  const [mockSessionId, setMockSessionId] = useState<string | null>(null);
  const [states, setStates] = useState<Record<string, AccountState>>({});

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setSessionLoading(false);
    });
    supabase.auth.getSession().then(({ data: { session: current } }) => {
      setSession(current);
      setSessionLoading(false);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    setAccounts(readJson<MockAccount[]>(ACCOUNTS_KEY, []));
    setMockSessionId(readJson<string | null>(SESSION_KEY, null));
    setStates(readJson<Record<string, AccountState>>(STATE_KEY, {}));
    setLocalLoaded(true);
  }, []);

  const mockAccount = accounts.find((a) => a.id === mockSessionId) ?? null;
  const user: User | null = session?.user ?? (mockAccount ? mockToUser(mockAccount) : null);
  const userId = user?.id ?? null;
  const loading = sessionLoading || !localLoaded;

  const updateState = useCallback((id: string, patch: AccountState) => {
    setStates((current) => {
      const next = { ...current, [id]: { ...current[id], ...patch } };
      localStorage.setItem(STATE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const saveAccounts = (next: MockAccount[]) => {
    setAccounts(next);
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(next));
  };

  const startMockSession = (id: string) => {
    setMockSessionId(id);
    localStorage.setItem(SESSION_KEY, JSON.stringify(id));
  };

  // Any signed-in account without a record is a new account: flow starts from the beginning.
  useEffect(() => {
    if (userId && localLoaded && !states[userId]) updateState(userId, { accountCreated: true });
  }, [userId, localLoaded, states, updateState]);

  const signInWithProvider = useCallback(
    async (provider: OAuthProvider) => {
      if (pendingProvider) return false;

      if (!SUPPORTED_PROVIDERS.includes(provider)) {
        toast.error("Yahoo sign-in isn't available yet", {
          description: "Yahoo is not one of the supported sign-in providers. Please continue with Google or email for now.",
        });
        return false;
      }

      setPendingProvider(provider);
      try {
        const result = await lovable.auth.signInWithOAuth("google", {
          redirect_uri: window.location.origin,
        });
        if (result.error) {
          toast.error("Sign-in failed", {
            description: result.error.message ?? "We couldn't complete sign-in. Please try again.",
          });
          return false;
        }
        if (result.redirected) return false;
        return true;
      } catch (error) {
        toast.error("Sign-in was cancelled", {
          description: error instanceof Error ? error.message : "The sign-in window closed before finishing.",
        });
        return false;
      } finally {
        setPendingProvider(null);
      }
    },
    [pendingProvider],
  );

  const signUpWithEmail = useCallback(
    ({ email, username, password }: { email: string; username: string; password: string }) => {
      const e = email.trim().toLowerCase();
      const u = username.trim();
      if (accounts.some((a) => a.email === e)) throw new Error("An account with this email already exists. Please log in.");
      if (accounts.some((a) => a.username.toLowerCase() === u.toLowerCase())) throw new Error("This username is already taken.");
      const account: MockAccount = { id: `local-${crypto.randomUUID()}`, email: e, username: u, password };
      saveAccounts([...accounts, account]);
      updateState(account.id, { accountCreated: true });
      startMockSession(account.id);
    },
    [accounts, updateState],
  );

  const signInWithPassword = useCallback(
    (identifier: string, password: string) => {
      const id = identifier.trim().toLowerCase();
      const account = accounts.find((a) => a.email === id || a.username.toLowerCase() === id);
      if (!account || account.password !== password) throw new Error("Incorrect username/email or password.");
      startMockSession(account.id);
    },
    [accounts],
  );

  const signOut = useCallback(async () => {
    setMockSessionId(null);
    localStorage.removeItem(SESSION_KEY);
    if (session) await supabase.auth.signOut();
  }, [session]);

  const completeProfile = useCallback(
    async (details: ProfileDetails) => {
      if (!userId) return;
      if (session) {
        const { data, error } = await supabase.auth.updateUser({ data: { ...details, profile_completed: true } });
        if (error) throw error;
        if (data.user) setSession((current) => (current ? { ...current, user: data.user } : current));
      } else {
        saveAccounts(accounts.map((a) => (a.id === userId ? { ...a, profile: details } : a)));
      }
      updateState(userId, { profileCompleted: true });
    },
    [userId, session, accounts, updateState],
  );

  const state = userId ? states[userId] ?? {} : {};
  const profileComplete = Boolean(state.profileCompleted || session?.user?.user_metadata?.["profile_completed"]);
  const consentPopup1Complete = Boolean(state.consentPopup1Completed);
  const consentComplete = Boolean(state.consentCompleted);

  const completeConsentPopup1 = useCallback(() => {
    if (userId) updateState(userId, { consentPopup1Completed: true });
  }, [userId, updateState]);
  const completeConsent = useCallback(() => {
    if (userId) updateState(userId, { consentPopup1Completed: true, consentCompleted: true });
  }, [userId, updateState]);

  const value: AuthContextValue = {
    session,
    user,
    loading,
    pendingProvider,
    signInWithProvider,
    signUpWithEmail,
    signInWithPassword,
    signOut,
    profileComplete,
    completeProfile,
    consentPopup1Complete,
    completeConsentPopup1,
    consentComplete,
    completeConsent,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside <AuthProvider>");
  return context;
}
