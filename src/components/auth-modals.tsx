import { useEffect, type FormEvent, type ReactNode } from "react";
import { ChevronDown, Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth, type OAuthProvider } from "@/components/auth-provider";
import { cn } from "@/lib/utils";

export type AuthModal = "login" | "signup" | null;

type AuthModalsProps = {
  activeModal: AuthModal;
  onChange: (modal: AuthModal) => void;
};

export const fieldClassName =
  "h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20";

function VelaMark() {
  return (
    <div className="flex items-center justify-center gap-2 text-lg font-extrabold text-foreground">
      <span className="grid size-9 place-items-center rounded-md bg-primary text-primary-foreground">
        <Heart className="size-4 fill-current" />
      </span>
      vela
    </div>
  );
}

function GoogleMark() {
  return <span aria-hidden="true" className="text-base font-extrabold text-primary">G</span>;
}

function YahooMark() {
  return <span aria-hidden="true" className="text-base font-black">Y!</span>;
}

export function ModalShell({
  title,
  size = "sm",
  onClose,
  dismissible = true,
  children,
}: {
  title: string;
  size?: "sm" | "lg";
  onClose: () => void;
  dismissible?: boolean;
  children: ReactNode;
}) {
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && dismissible) onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose, dismissible]);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-background/80 px-3 py-4 backdrop-blur-sm sm:px-6 sm:py-8"
      onMouseDown={(event) => {
        if (dismissible && event.currentTarget === event.target) onClose();
      }}
    >
      <div className="flex min-h-full items-center justify-center">
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby="auth-modal-title"
          className={cn(
            "relative w-full rounded-lg border border-border bg-popover p-5 text-popover-foreground shadow-2xl shadow-background sm:p-7",
            size === "lg" ? "max-w-2xl" : "max-w-md",
          )}
        >
          {dismissible && <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Close"
            onClick={onClose}
            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
          >
            <X />
          </Button>}
          <div className="mb-5 pr-8 text-center sm:mb-6 sm:pr-0">
            <VelaMark />
            <h2 id="auth-modal-title" className="mt-4 text-2xl font-extrabold">{title}</h2>
          </div>
          {children}
        </section>
      </div>
    </div>
  );
}

function SocialButtons({ action, onSuccess }: { action: "Log in" | "Sign up"; onSuccess: () => void }) {
  const { signInWithProvider, pendingProvider } = useAuth();

  const start = async (provider: OAuthProvider) => {
    const signedIn = await signInWithProvider(provider);
    if (signedIn) onSuccess();
  };

  return (
    <div className="grid gap-2 sm:grid-cols-2">
      <Button
        type="button"
        variant="secondary"
        className="h-10 w-full font-bold"
        disabled={pendingProvider !== null}
        onClick={() => start("google")}
      >
        <GoogleMark /> {pendingProvider === "google" ? "Connecting…" : `${action} with Google`}
      </Button>
      <Button
        type="button"
        className="h-10 w-full bg-yahoo font-bold text-yahoo-foreground hover:bg-yahoo/90"
        disabled={pendingProvider !== null}
        onClick={() => start("yahoo")}
      >
        <YahooMark /> {action} with Yahoo
      </Button>
    </div>
  );
}

export function FieldLabel({ children }: { children: ReactNode }) {
  return <span className="mb-1.5 block text-xs font-bold text-foreground">{children}</span>;
}

export function SelectField({ label, defaultValue, name, children }: { label: string; defaultValue: string; name?: string; children: ReactNode }) {
  return (
    <label>
      <FieldLabel>{label}</FieldLabel>
      <span className="relative block">
        <select name={name} defaultValue={defaultValue} className={cn(fieldClassName, "appearance-none pr-9")}>
          {children}
        </select>
        <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      </span>
    </label>
  );
}

function LoginModal({ onClose, onSignup }: { onClose: () => void; onSignup: () => void }) {
  const preventSubmit = (event: FormEvent<HTMLFormElement>) => event.preventDefault();

  return (
    <ModalShell title="Login" onClose={onClose}>
      <form onSubmit={preventSubmit} className="space-y-4">
        <SocialButtons action="Log in" onSuccess={onClose} />
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" />or<span className="h-px flex-1 bg-border" />
        </div>
        <label className="block">
          <span className="sr-only">Username or email address</span>
          <input autoFocus required autoComplete="username" placeholder="Your username or email address" className={fieldClassName} />
        </label>
        <label className="block">
          <span className="sr-only">Password</span>
          <input required type="password" autoComplete="current-password" placeholder="Your password" className={fieldClassName} />
        </label>
        <Button type="submit" className="h-10 w-full font-extrabold">LOGIN</Button>
        <div className="space-y-3 text-center text-sm">
          <button type="button" className="cursor-pointer font-semibold text-primary hover:underline">Forgot your password?</button>
          <p className="text-muted-foreground">
            New user?{" "}
            <button type="button" onClick={onSignup} className="cursor-pointer font-bold text-primary hover:underline">Sign up here.</button>
          </p>
        </div>
      </form>
    </ModalShell>
  );
}

function SignupModal({ onClose, onLogin }: { onClose: () => void; onLogin: () => void }) {
  const preventSubmit = (event: FormEvent<HTMLFormElement>) => event.preventDefault();

  return (
    <ModalShell title="Sign up for FREE!" size="lg" onClose={onClose}>
      <p className="-mt-4 mb-5 text-center text-sm text-muted-foreground">No Credit Card required!</p>
      <form onSubmit={preventSubmit} className="space-y-4">
        <label className="block">
          <FieldLabel>Email</FieldLabel>
          <input autoFocus required type="email" autoComplete="email" placeholder="Your email address" className={fieldClassName} />
        </label>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" />or<span className="h-px flex-1 bg-border" />
        </div>
        <SocialButtons action="Sign up" onSuccess={onClose} />

        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField label="I am a" defaultValue="man">
            <option value="man">Man</option>
            <option value="woman">Woman</option>
            <option value="nonbinary">Non-binary</option>
          </SelectField>
          <SelectField label="I am looking for" defaultValue="women">
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="everyone">Everyone</option>
          </SelectField>
        </div>

        <fieldset>
          <legend className="mb-1.5 text-xs font-bold text-foreground">Date of birth</legend>
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.35fr)] gap-2">
            <input required inputMode="numeric" maxLength={2} aria-label="Birth month" placeholder="MM" className={fieldClassName} />
            <input required inputMode="numeric" maxLength={2} aria-label="Birth day" placeholder="DD" className={fieldClassName} />
            <input required inputMode="numeric" maxLength={4} aria-label="Birth year" placeholder="YYYY" className={fieldClassName} />
          </div>
        </fieldset>

        <label className="block">
          <FieldLabel>City</FieldLabel>
          <input required autoComplete="address-level2" placeholder="Which city are you in?" className={fieldClassName} />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <FieldLabel>Username</FieldLabel>
            <input required autoComplete="username" placeholder="Add a username; e.g. Stargazer" className={fieldClassName} />
          </label>
          <label className="block">
            <FieldLabel>Password</FieldLabel>
            <input required minLength={5} type="password" autoComplete="new-password" placeholder="Type a password" className={fieldClassName} />
            <span className="mt-1.5 block text-xs text-muted-foreground">Must be at least 5 characters.</span>
          </label>
        </div>

        <Button type="submit" className="h-11 w-full font-extrabold">Join now! →</Button>
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <button type="button" onClick={onLogin} className="cursor-pointer font-bold text-primary hover:underline">Log in</button>
        </p>
      </form>
    </ModalShell>
  );
}

export function AuthModals({ activeModal, onChange }: AuthModalsProps) {
  if (activeModal === "login") {
    return <LoginModal onClose={() => onChange(null)} onSignup={() => onChange("signup")} />;
  }
  if (activeModal === "signup") {
    return <SignupModal onClose={() => onChange(null)} onLogin={() => onChange("login")} />;
  }
  return null;
}