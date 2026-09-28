import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { AuthModals, type AuthModal } from "@/components/auth-modals";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/cookiepolicy")({
  head: () => ({
    meta: [
      { title: "Cookie Statement" },
      { name: "description", content: "Learn how cookies and similar technologies may be used on our website and how you can manage your cookie preferences." },
      { property: "og:title", content: "Cookie Statement" },
      { property: "og:description", content: "Learn how cookies and similar technologies may be used on our website and how you can manage your cookie preferences." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/cookiepolicy" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/cookiepolicy" }],
  }),
  component: CookieStatementPage,
});

function Section({ number, title, children }: { number: number; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={`cookie-section-${number}`} className="border-t border-border pt-8 sm:pt-10">
      <h2 id={`cookie-section-${number}`} className="text-xl font-extrabold text-foreground sm:text-2xl">{number}. {title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">{children}</div>
    </section>
  );
}

function LegalList({ children }: { children: ReactNode }) {
  return <ul className="list-disc space-y-2 pl-5 marker:text-primary sm:pl-6">{children}</ul>;
}

function CookieStatementPage() {
  const [activeModal, setActiveModal] = useState<AuthModal>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader openModal={setActiveModal} />
      <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <header className="border-b border-border pb-8 sm:pb-10">
          <Link to="/" className="text-sm font-semibold text-primary transition-colors hover:text-primary/80">Vela</Link>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">Cookie Statement</h1>
          <p className="mt-3 text-sm font-semibold text-muted-foreground">Last Updated: 9/23/2026</p>
          <div className="mt-6 max-w-3xl space-y-4 text-base leading-8 text-muted-foreground">
            <p>By accepting cookies, you can help us improve your experience on our website.</p>
            <p>When you visit our website, information may be processed through cookies and similar technologies. Some cookies are necessary for the website to function, while other technologies may help us understand how the website is used and improve its performance.</p>
            <p>You can manage your cookie preferences through the options provided by the website or through your browser settings.</p>
          </div>
        </header>

        <aside className="mt-8 rounded-lg border border-primary/30 bg-primary/10 p-5 sm:p-6" aria-labelledby="cookie-preferences-title">
          <h2 id="cookie-preferences-title" className="text-lg font-extrabold">Cookie preferences</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">These controls preview a future preference experience and do not currently save choices or activate cookies.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <Button type="button" variant="outline" disabled>Decline Cookies</Button>
            <Button type="button" variant="secondary" disabled>More Options</Button>
            <Button type="button" disabled>Accept Cookies</Button>
          </div>
        </aside>

        <div className="space-y-10 pt-10 sm:space-y-12">
          <Section number={1} title="WHAT ARE COOKIES?">
            <p>Cookies are small text files or similar pieces of information that a website may store on your computer, phone, tablet, or other device. They can help a website remember preferences, maintain sessions, provide essential functionality, understand how the website is used, and improve performance.</p>
            <p>Cookies themselves cannot damage your device or the files stored on it.</p>
          </Section>

          <Section number={2} title="COOKIES USED BY OUR WEBSITE">
            <p>The website may use different categories of cookies and related technologies where appropriate. These can include:</p>
            <LegalList>
              <li><strong className="text-foreground">Essential or functional cookies</strong> that support core website operation.</li>
              <li><strong className="text-foreground">Preference or session cookies</strong> that remember temporary choices or maintain a session.</li>
              <li><strong className="text-foreground">Analytics cookies</strong> that may help measure website use if analytics services are enabled.</li>
              <li><strong className="text-foreground">Other technologies</strong> that may be introduced where applicable and legally permitted.</li>
            </LegalList>
            <p>Listing a category here does not mean that it is currently active. The technologies actually used depend on the website features that are enabled.</p>
          </Section>

          <Section number={3} title="ESSENTIAL AND FUNCTIONAL COOKIES">
            <p>Functional cookies may be necessary for the website to operate correctly. They may support tasks such as maintaining a login session, remembering cookie preferences, providing basic security, retaining temporary settings, and enabling website features that you request.</p>
            <p>Disabling essential cookies may prevent some features from working correctly or make parts of the website unavailable.</p>
          </Section>

          <Section number={4} title="SESSION COOKIES">
            <p>Some cookies may remain active only for the duration of a browser session and may be removed when that session ends. These cookies can make navigation and interaction more convenient by retaining relevant information while you move between pages.</p>
          </Section>

          <Section number={5} title="ANALYTICS COOKIES">
            <p>If analytics technologies are enabled, they may be used to understand how visitors interact with the website. Information considered may include pages visited, approximate visit duration, browser or device information, general traffic patterns, and interactions with website features.</p>
            <p>If analytics services are enabled, we will configure them in accordance with applicable privacy and cookie requirements and, where appropriate, use measures designed to reduce the identification of individual users.</p>
          </Section>

          <Section number={6} title="TRACKING AND SIMILAR TECHNOLOGIES">
            <p>Websites may use technologies other than traditional cookies, including pixels, local storage, or comparable technologies. Where legally permitted and introduced, these may support functionality, security, measurement, or other stated purposes.</p>
            <p>This description does not mean that any particular tracking or similar technology is currently in use.</p>
          </Section>

          <Section number={7} title="MANAGING COOKIES">
            <p>You may be able to manage cookies through the website’s cookie-preference controls where available, through your browser settings, or through your device settings. Available options depend on your browser and device.</p>
            <p>Blocking or deleting cookies may cause some website features to operate incorrectly, forget your preferences, or become unavailable.</p>
          </Section>

          <Section number={8} title="COOKIES AND PERSONAL DATA">
            <p>Information associated with cookies can sometimes be linked with other information in a way that qualifies as personal data. Where this occurs, our <Link to="/privacy" className="font-semibold text-primary transition-colors hover:text-primary/80">Privacy Statement</Link> applies to the handling of that information.</p>
          </Section>

          <Section number={9} title="THIRD-PARTY COOKIES">
            <p>If third-party services are integrated into the website, those services may potentially place cookies or use similar technologies. Any such third party may process information under its own privacy and cookie policies, which we encourage you to review.</p>
            <p>No specific third-party cookie service is identified here unless and until that service is actually configured.</p>
          </Section>

          <Section number={10} title="CHANGES TO THIS COOKIE STATEMENT">
            <p>We may update this Cookie Statement from time to time to reflect changes to the website, technologies, legal requirements, or our practices. When we make changes, we will revise the “Last Updated” date at the top of this page.</p>
          </Section>

          <Section number={11} title="QUESTIONS">
            <p>If you have questions about this Cookie Statement or the way cookies are used on the website, please use the contact method provided on our website.</p>
          </Section>
        </div>
      </main>
      <SiteFooter />
      <AuthModals activeModal={activeModal} onChange={setActiveModal} />
    </div>
  );
}