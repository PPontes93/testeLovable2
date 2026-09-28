import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Heart, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthModals, type AuthModal } from "@/components/auth-modals";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/components/auth-provider";
import { ProfileCard } from "@/components/profile-card";
import { visibleProfiles, restrictedProfiles } from "@/lib/mock-profiles";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Members near you | Vela" },
      { name: "description", content: "Browse Vela members and discover people you would like to meet." },
      { property: "og:title", content: "Members near you | Vela" },
      { property: "og:description", content: "Browse Vela members and discover people you would like to meet." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [activeModal, setActiveModal] = useState<AuthModal>(null);
  const { user, profileComplete, consentComplete } = useAuth();
  const navigate = useNavigate();

  // Signed-in members who finished profile + consent belong on the members page.
  useEffect(() => {
    if (user && profileComplete && consentComplete) navigate({ to: "/members" });
  }, [user, profileComplete, consentComplete, navigate]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader openModal={setActiveModal} />
      <main className="mx-auto max-w-[1480px] px-4 py-7 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 border-b border-border pb-5">
          <div className="min-w-0"><h1 className="text-2xl font-extrabold sm:text-3xl">Members</h1><p className="mt-1 text-sm text-muted-foreground">12,482 people near you</p></div>
          <Button variant="secondary" size="sm"><SlidersHorizontal /> Filters <ChevronDown className="hidden size-3 sm:block" /></Button>
        </div>

        <section aria-label="Member profiles" className="pt-5">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-6">
            {visibleProfiles.map((profile, index) => <ProfileCard key={profile.id} profile={profile} index={index} />)}
          </div>

          <div className="relative mt-4 min-h-[420px] overflow-hidden sm:min-h-[480px]">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-6" aria-hidden="true">
              {restrictedProfiles.map((profile, index) => <ProfileCard key={profile.id} profile={profile} restricted index={index + 6} />)}
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-background/35 px-4 backdrop-blur-[1px]">
              <div className="w-full max-w-sm rounded-lg border border-border bg-popover p-6 text-center shadow-2xl shadow-background sm:p-8">
                <span className="mx-auto grid size-11 place-items-center rounded-full bg-primary/15 text-primary"><Heart className="size-5 fill-current" /></span>
                <h2 className="mt-4 text-xl font-extrabold">Want to see more profiles?</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">Join the community to browse more members and start making genuine connections.</p>
                <Button type="button" className="mt-5 w-full font-bold" onClick={() => setActiveModal("signup")}>Sign up for free</Button>
                <p className="my-3 text-xs uppercase text-muted-foreground">Or</p>
                <button type="button" onClick={() => setActiveModal("login")} className="cursor-pointer text-sm font-bold text-primary hover:underline">Log in</button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <AuthModals activeModal={activeModal} onChange={setActiveModal} />
    </div>
  );
}
