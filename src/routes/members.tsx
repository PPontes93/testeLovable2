import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthModals, type AuthModal } from "@/components/auth-modals";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { ProfileCard, profileGridClassName } from "@/components/profile-card";
import { useAuth } from "@/components/auth-provider";
import { getMembersPage } from "@/lib/mock-profiles";

export const Route = createFileRoute("/members")({
  head: () => ({
    meta: [
      { title: "Discover members | Vela" },
      { name: "description", content: "Browse all Vela members near you once you're signed in." },
      { property: "og:title", content: "Discover members | Vela" },
      { property: "og:description", content: "Browse all Vela members near you once you're signed in." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: MembersPage,
});

function MembersPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<AuthModal>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/" });
  }, [loading, user, navigate]);

  if (loading || !user) {
    return <div className="min-h-screen bg-background" />;
  }

  // Demo data today; swap getMembersPage for a server query returning the same shape.
  const result = getMembersPage(page);
  const go = (next: number) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader openModal={setActiveModal} />
      <main className="mx-auto max-w-[1480px] px-4 py-7 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 border-b border-border pb-5">
          <div className="min-w-0"><h1 className="text-2xl font-extrabold sm:text-3xl">Members</h1><p className="mt-1 text-sm text-muted-foreground">12,482 people near you</p></div>
          <Button variant="secondary" size="sm"><SlidersHorizontal /> Filters <ChevronDown className="hidden size-3 sm:block" /></Button>
        </div>

        <section aria-label="Member profiles" className="pt-5">
          <div className={profileGridClassName}>
            {result.profiles.map((profile, index) => <ProfileCard key={profile.id} profile={profile} index={index} />)}
          </div>
        </section>

        <nav aria-label="Pagination" className="mt-8 flex items-center justify-center gap-3">
          <Button type="button" variant="secondary" size="sm" disabled={result.page <= 1} onClick={() => go(result.page - 1)}>
            <ChevronLeft /> Previous
          </Button>
          <span className="text-sm text-muted-foreground">Page {result.page} of {result.pageCount}</span>
          <Button type="button" size="sm" className="font-bold" disabled={result.page >= result.pageCount} onClick={() => go(result.page + 1)}>
            Next page <ChevronRight />
          </Button>
        </nav>
      </main>
      <SiteFooter />
      <AuthModals activeModal={activeModal} onChange={setActiveModal} />
    </div>
  );
}
