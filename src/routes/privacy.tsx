import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { AuthModals, type AuthModal } from "@/components/auth-modals";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Statement" },
      { name: "description", content: "Learn how information may be collected, used, protected, and managed when using our website." },
      { property: "og:title", content: "Privacy Statement" },
      { property: "og:description", content: "Learn how information may be collected, used, protected, and managed when using our website." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/privacy" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function Section({ number, title, children }: { number: number; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={`section-${number}`} className="border-t border-border pt-8 sm:pt-10">
      <h2 id={`section-${number}`} className="text-xl font-extrabold text-foreground sm:text-2xl">{number}. {title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">{children}</div>
    </section>
  );
}

function LegalList({ children }: { children: ReactNode }) {
  return <ul className="list-disc space-y-2 pl-5 marker:text-primary sm:pl-6">{children}</ul>;
}

function PrivacyPage() {
  const [activeModal, setActiveModal] = useState<AuthModal>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader openModal={setActiveModal} />
      <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <header className="border-b border-border pb-8 sm:pb-10">
          <Link to="/" className="text-sm font-semibold text-primary transition-colors hover:text-primary/80">Vela</Link>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">Privacy Statement</h1>
          <p className="mt-3 text-sm font-semibold text-muted-foreground">Last Updated: 9/20/2026</p>
          <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground">
            Your privacy matters to us. This Privacy Statement explains what information may be collected when you use our website and services, how that information may be used, how it may be protected, and the choices available to you.
          </p>
        </header>

        <div className="space-y-10 pt-10 sm:space-y-12">
          <Section number={1} title="ABOUT THIS PRIVACY STATEMENT">
            <p>This Privacy Statement describes how information relating to visitors and users may be handled when they access or use the website and the services made available through it.</p>
            <p>It should be read together with our <Link to="/terms" className="font-semibold text-primary transition-colors hover:text-primary/80">Terms &amp; Conditions</Link> and any specific notices displayed at the point where information is collected. Where this Statement and a specific notice describe different practices for the same information, the specific notice will apply to that information.</p>
          </Section>

          <Section number={2} title="INFORMATION WE MAY COLLECT">
            <p>A website of this type may collect information in two broad categories: information you choose to provide, and information generated through your use of the website. Depending on the features you use, this may include:</p>
            <LegalList>
              <li>Email address and username.</li>
              <li>Account and profile information you add to your account.</li>
              <li>Date of birth or age-related information where required to confirm eligibility.</li>
              <li>General location information, such as the city associated with your profile or account.</li>
              <li>Information submitted through forms on the website.</li>
              <li>Communications you send to customer support or through reporting channels.</li>
              <li>Technical information relating to the device or browser you use to access the website.</li>
              <li>IP address and general connection information.</li>
              <li>Website usage information, such as how pages and features are accessed.</li>
            </LegalList>
            <p>The information actually collected depends on the features you use and the choices you make. Not every category listed above is collected in every situation or for every visitor.</p>
          </Section>

          <Section number={3} title="INFORMATION YOU PROVIDE">
            <p>You may provide information when you:</p>
            <LegalList>
              <li>Create or attempt to create an account.</li>
              <li>Complete profile forms.</li>
              <li>Contact support.</li>
              <li>Submit a report about content or another user.</li>
              <li>Communicate with the website in other ways.</li>
              <li>Request assistance with the website or your account.</li>
            </LegalList>
            <p>Please avoid submitting sensitive personal information through the website unless it is specifically requested and necessary for the feature or assistance you are asking for.</p>
          </Section>

          <Section number={4} title="INFORMATION COLLECTED AUTOMATICALLY">
            <p>Like most websites, certain technical information may be received automatically when you access the website. This may include:</p>
            <LegalList>
              <li>IP address.</li>
              <li>Browser type and version.</li>
              <li>Device type.</li>
              <li>Operating system.</li>
              <li>Approximate geographic region.</li>
              <li>Pages visited.</li>
              <li>Date and time of visits.</li>
              <li>Basic interaction and diagnostic information.</li>
            </LegalList>
            <p>This information is generally used to deliver the website, keep it secure, and understand how it is used so it can be improved.</p>
          </Section>

          <Section number={5} title="COOKIES AND SIMILAR TECHNOLOGIES">
            <p>Cookies are small files that websites may store on your device. Similar technologies, such as local storage, can serve comparable purposes. Websites commonly use them for:</p>
            <LegalList>
              <li>Essential website functionality.</li>
              <li>Remembering preferences.</li>
              <li>Security.</li>
              <li>Session management.</li>
              <li>Understanding website usage.</li>
              <li>Improving website performance.</li>
            </LegalList>
            <p>You may have controls available through your browser settings, or through cookie settings on the website where they are provided. These controls may affect how parts of the website function.</p>
          </Section>

          <Section number={6} title="HOW INFORMATION MAY BE USED">
            <p>Information collected through the website may be used for purposes such as:</p>
            <LegalList>
              <li>Providing and operating the website.</li>
              <li>Creating and managing accounts.</li>
              <li>Providing the services you request.</li>
              <li>Responding to support requests and reports.</li>
              <li>Maintaining the security of the website.</li>
              <li>Preventing fraud, abuse, or unauthorized activity.</li>
              <li>Improving website functionality and performance.</li>
              <li>Communicating important service-related information.</li>
              <li>Meeting applicable legal obligations.</li>
            </LegalList>
          </Section>

          <Section number={7} title="HOW INFORMATION MAY BE SHARED">
            <p>Information may be disclosed where reasonably necessary to:</p>
            <LegalList>
              <li>Provide the services you request.</li>
              <li>Operate and maintain the website.</li>
              <li>Protect users and the website.</li>
              <li>Comply with legal obligations.</li>
              <li>Respond to valid legal requests.</li>
              <li>Enforce applicable terms and policies.</li>
              <li>Protect rights, property, or safety.</li>
            </LegalList>
            <p>We do not sell your personal information. Disclosures are limited to what is reasonably necessary for the purposes described in this Statement.</p>
          </Section>

          <Section number={8} title="THIRD-PARTY SERVICES AND LINKS">
            <p>The website may contain links to, or integrations with, third-party services. Those third parties may handle information in accordance with their own privacy practices, which this Statement does not govern.</p>
            <p>We encourage you to review the privacy policies of any third-party website or service before providing information to it. Where the website integrates a third-party service, such as a sign-in provider, that service may receive information needed to provide its part of the experience.</p>
          </Section>

          <Section number={9} title="DATA SECURITY">
            <p>Reasonable technical and organizational measures may be used to protect information against unauthorized access, loss, misuse, alteration, or disclosure.</p>
            <p>However, no method of transmitting or storing information can be guaranteed to be completely secure. We cannot promise absolute security, and any transmission of information to or through the website is at your own risk.</p>
          </Section>

          <Section number={10} title="DATA RETENTION">
            <p>Information should generally be retained only for as long as reasonably necessary for the purposes for which it was collected, including legal, security, dispute-resolution, and operational requirements.</p>
            <p>How long specific information is kept depends on its nature and purpose, and retention periods may differ between categories of information.</p>
          </Section>

          <Section number={11} title="YOUR PRIVACY CHOICES">
            <p>Depending on applicable law and the services being used, you may have choices concerning your personal information. These may include:</p>
            <LegalList>
              <li>Requesting access to personal information.</li>
              <li>Requesting correction of inaccurate information.</li>
              <li>Requesting deletion where applicable.</li>
              <li>Managing certain cookie preferences through your browser or available website settings.</li>
              <li>Contacting support about privacy-related questions.</li>
            </LegalList>
            <p>The rights available to you, and how they can be exercised, depend on the law that applies in your jurisdiction. You can raise privacy questions or requests through the channels described in Section 15.</p>
          </Section>

          <Section number={12} title="CHILDREN'S PRIVACY">
            <p>The website is not intended for children. You must meet the minimum age requirement stated in our <Link to="/terms" className="font-semibold text-primary transition-colors hover:text-primary/80">Terms &amp; Conditions</Link> to use the website.</p>
            <p>If you believe that information relating to a child has been submitted through the website, please contact us so the matter can be reviewed and, where appropriate, addressed.</p>
          </Section>

          <Section number={13} title="INTERNATIONAL DATA TRANSFERS">
            <p>Depending on where the website, its service providers, or its users are located, personal information may potentially be processed in countries other than your country of residence.</p>
            <p>Where that happens, the information may be subject to the laws of those countries. This Statement applies regardless of where information is processed.</p>
          </Section>

          <Section number={14} title="CHANGES TO THIS PRIVACY STATEMENT">
            <p>This Privacy Statement may be updated from time to time to reflect changes to the website, our services, legal requirements, or privacy practices.</p>
            <p>When changes are made, the "Last Updated" date at the top of this page will be revised. We encourage you to review this page periodically so you understand how information may be handled.</p>
          </Section>

          <Section number={15} title="CONTACT AND PRIVACY QUESTIONS">
            <p>If you have questions about this Privacy Statement or how information is handled, please use the contact method provided on our website.</p>
          </Section>

          <Section number={16} title="ACCEPTANCE AND ACKNOWLEDGEMENT">
            <p>By continuing to use the website, you acknowledge that you have had an opportunity to read this Privacy Statement and understand how information may be handled as described above.</p>
            <p>This Privacy Statement does not replace our <Link to="/terms" className="font-semibold text-primary transition-colors hover:text-primary/80">Terms &amp; Conditions</Link>. The Terms &amp; Conditions continue to govern your use of the website, and this Statement describes how information may be handled within that framework.</p>
          </Section>
        </div>
      </main>
      <SiteFooter />
      <AuthModals activeModal={activeModal} onChange={setActiveModal} />
    </div>
  );
}
