import { Link, useNavigate } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth-provider";
import type { AuthModal } from "@/components/auth-modals";

export function Brand() {
  return (
    <Link to="/" className="flex shrink-0 items-center gap-2 text-lg font-extrabold text-foreground">
      <span className="grid size-8 place-items-center rounded-md bg-primary text-primary-foreground">
        <Heart className="size-4 fill-current" />
      </span>
      vela
    </Link>
  );
}

export function SiteHeader({ openModal }: { openModal: (modal: Exclude<AuthModal, null>) => void }) {
  const { signInWithProvider, pendingProvider, user, signOut } = useAuth();
  const navigate = useNavigate();
  const logOut = async () => {
    await signOut();
    navigate({ to: "/" });
  };

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-surface-raised/95 backdrop-blur">
      <div className="mx-auto grid min-h-16 max-w-[1480px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Brand />
        {user ? (
          <div className="flex items-center gap-3">
            <Link to="/members" className="text-sm font-bold text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }}>
              Members
            </Link>
            <span className="hidden max-w-[200px] truncate text-sm text-muted-foreground sm:inline">{user.email}</span>
            <Button type="button" variant="secondary" size="sm" className="font-bold" onClick={logOut}>
              Log out
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button type="button" variant="ghost" size="sm" className="hidden font-bold sm:inline-flex" onClick={() => openModal("login")}>
              LOGIN
            </Button>
            <Button type="button" size="sm" className="font-bold" onClick={() => openModal("signup")}>
              Sign up
            </Button>
            <Button type="button" variant="secondary" size="sm" aria-label="Continue with Google" disabled={pendingProvider !== null} onClick={() => signInWithProvider("google")}>
              <span className="text-base font-extrabold text-primary">G</span><span className="hidden lg:inline">Google</span>
            </Button>
            <Button type="button" variant="secondary" size="sm" aria-label="Continue with Yahoo" disabled={pendingProvider !== null} onClick={() => signInWithProvider("yahoo")}>
              <span className="text-base font-extrabold text-primary">Y!</span><span className="hidden lg:inline">Yahoo</span>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

const footerLinks = ["Contact", "Sponsors", "Report"];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface-raised">
      <div className="mx-auto max-w-[1480px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <div>
            <Brand />
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">A welcoming place to discover new people, start conversations, and find genuine connections.</p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm sm:grid-cols-4">
            <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">About</a>
            <Link to="/privacy" className="text-muted-foreground transition-colors hover:text-foreground">Privacy Statement</Link>
            <Link to="/terms" className="text-muted-foreground transition-colors hover:text-foreground">Terms &amp; Conditions</Link>
            <Link to="/cookiepolicy" className="text-muted-foreground transition-colors hover:text-foreground">Cookies</Link>
            <Link to="/pricing" className="text-muted-foreground transition-colors hover:text-foreground">Pricing</Link>
            {footerLinks.map((link) => (
              <a key={link} href="#" className="text-muted-foreground transition-colors hover:text-foreground">{link}</a>
            ))}
          </nav>
        </div>
        <div className="mt-8 border-t border-border pt-5 text-xs leading-5 text-muted-foreground">
          <p>Vela is for adults aged 18 and over. Please date safely and respectfully.</p>
          <p className="mt-1">© 2026 Vela. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}