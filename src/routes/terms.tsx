import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { AuthModals, type AuthModal } from "@/components/auth-modals";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | Vela" },
      { name: "description", content: "Read the Terms of Service governing access to and use of Vela." },
      { property: "og:title", content: "Terms of Service | Vela" },
      { property: "og:description", content: "Read the Terms of Service governing access to and use of Vela." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/terms" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

const restrictions = [
  "Threaten, harass, degrade, abuse, hate, intimidate, or otherwise harm another person or group.",
  "Engage in defamatory, fraudulent, unlawful, misleading, or deceptive activity.",
  "Post, transmit, or make available obscene or otherwise objectionable material.",
  "Introduce viruses, worms, Trojan horses, malicious code, or other harmful or disruptive material.",
  "Interfere with, disrupt, damage, or place an unreasonable load on the Platform or its infrastructure.",
  "Use data mining, robots, scraping, or other automated methods to collect or extract Platform data.",
  "Use unauthorized third-party applications to access, interact with, or modify the Platform.",
  "Create or share deepfakes, or use photographs, animations, or images of another person without authorization.",
  "Send spam, chain letters, bulk messages, or unsolicited commercial communications.",
  "Infringe copyright, trademark, privacy, publicity, or any other proprietary or personal right.",
  "Publish contact information without authorization or use contact details to solicit users away from the Platform.",
  "Reproduce, frame, mirror, distribute, sell, or incorporate any part of the Platform without authorization.",
  "Reverse engineer, decompile, disassemble, or attempt to obtain underlying source code or systems except where such restriction is prohibited by law.",
  "Create or operate multiple accounts without our prior consent.",
  "Encourage, assist, or engage in conduct that violates or is likely to violate these Terms or applicable law.",
];

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

function TermsPage() {
  const [activeModal, setActiveModal] = useState<AuthModal>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader openModal={setActiveModal} />
      <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <header className="border-b border-border pb-8 sm:pb-10">
          <Link to="/" className="text-sm font-semibold text-primary transition-colors hover:text-primary/80">Vela</Link>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">Terms of Service</h1>
          <p className="mt-3 text-sm font-semibold text-muted-foreground">Last Updated: 7/9/2026</p>
          <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground">
            These Terms of Service govern your access to and use of the Platform. Please read them carefully before using the Platform or becoming a member.
          </p>
        </header>

        <div className="space-y-10 pt-10 sm:space-y-12">
          <Section number={1} title="PLATFORM ACCESS">
            <p>The Platform is provided for your personal, non-commercial use. You use the Platform at your own risk and must comply with these Terms and all applicable laws.</p>
            <p>You must be at least 21 years old to access or use the Platform. We may require age verification where applicable. You may not access age-restricted content unless you satisfy the applicable age requirement and complete any required verification.</p>
          </Section>

          <Section number={2} title="MODIFICATIONS TO THE PLATFORM OR THESE TERMS">
            <p>We may change these Terms from time to time. Where a change is material, we will provide notice through the Platform or by another appropriate means. Your continued use after the updated Terms take effect constitutes acceptance of those Terms.</p>
            <p>We may modify, suspend, restrict, or discontinue all or part of the Platform or any feature. We may also introduce new features or services that require additional fees. Where required, applicable fees and terms will be disclosed before use or purchase.</p>
          </Section>

          <Section number={3} title="ACCOUNT">
            <p>You may need to register an account to use parts of the Platform. You must provide accurate, current information and keep it updated. You may not create an account if you are ineligible under these Terms, have previously been prohibited from using the Platform, or are creating an account for another person without authorization.</p>
            <p>You are responsible for keeping your username, password, and other login credentials confidential and for activity under your account. Tell us promptly through the support or contact channels made available on the Platform if you suspect unauthorized access or misuse.</p>
            <p>You are responsible for information and content uploaded through your account. You may close your account using available account controls or support channels. We may close or deactivate accounts that remain inactive, subject to applicable law and any notice requirements.</p>
          </Section>

          <Section number={4} title="PRIVACY">
            <p>Personal information submitted through or in connection with the Platform is handled under our Privacy Statement and applicable privacy and data-protection requirements. This includes age-verification information where age verification is required.</p>
            <p>The Privacy Statement explains how relevant information is collected, used, retained, and protected. The current Privacy Statement remains available through the Platform footer.</p>
          </Section>

          <Section number={5} title="ACCEPTABLE USAGE RESTRICTIONS">
            <p>You must not use the Platform to:</p>
            <LegalList>{restrictions.map((restriction) => <li key={restriction}>{restriction}</li>)}</LegalList>
          </Section>

          <Section number={6} title="CREDITS AND FEES">
            <p>The Platform may allow you to purchase credits for eligible features. The price, quantity, and permitted use of credits will be shown at the time of purchase. Promotional credits may be subject to additional conditions, availability periods, or expiry dates.</p>
            <p>Except where required by applicable law or expressly stated at purchase, credit purchases are non-refundable. You are responsible for applicable taxes, payment charges, or other disclosed fees. Credits have no cash value, may not be sold or transferred, and may be used only with the account for which they were issued.</p>
            <p>If an account is suspended, closed, or terminated, unused credits may be forfeited except where applicable law requires otherwise. We may change credit prices or fees prospectively; changes will not alter completed purchases and will be presented before a new purchase.</p>
          </Section>

          <Section number={7} title="CONTENT">
            <p>The Platform may make text, images, profiles, messages, features, and other material available. Material that you submit, upload, send, or otherwise provide is “Input.” You are responsible for your Input and must have all rights and permissions needed to provide it.</p>
            <p>Material generated, displayed, or returned through the Platform in response to Input or interactions is “Output.” Where identified or applicable, Output may be generated by artificial intelligence and may include fictitious profiles, characters, conversations, or scenarios created for entertainment purposes. Such Output may be inaccurate, incomplete, or fictional and must not be treated as verified fact or relied on for professional, personal, legal, financial, medical, safety, or other consequential decisions.</p>
            <p>You retain the rights you hold in your Input. By providing Input, you grant us the rights reasonably necessary to host, store, reproduce, process, adapt, display, moderate, and otherwise use that Input to operate, secure, improve, and provide the Platform, subject to applicable law and the Privacy Statement.</p>
          </Section>

          <Section number={8} title="THIRD-PARTY CONTENT">
            <p>The Platform may contain content, services, offers, or links provided by third parties. We do not control third-party content and are not responsible for its availability, accuracy, security, or practices. The relevant third party is responsible for its content, products, and services.</p>
            <p>Your use of third-party content may be governed by separate terms and privacy policies. Third-party names, marks, and materials belong to their respective owners. You are responsible for reviewing applicable terms and exercising appropriate care before interacting with or relying on third-party content.</p>
          </Section>

          <Section number={9} title="INTELLECTUAL PROPERTY RIGHTS">
            <p>The Platform and its software, design, interfaces, text, graphics, logos, trademarks, service marks, databases, and other materials are owned by us or our licensors and are protected by copyright, trademark, and other intellectual-property and proprietary-rights laws.</p>
            <p>Except for the limited right to use the Platform under these Terms, no right, title, or interest is transferred to you. You may not copy, modify, distribute, sell, license, publicly display, create derivative works from, or otherwise use Platform intellectual property without prior authorization or a right granted by applicable law.</p>
          </Section>

          <Section number={10} title="MONITORING">
            <p>Subject to applicable law, we may monitor, review, moderate, or analyze Input, Output, and use of the Platform to operate and secure the service, enforce these Terms, respond to reports, and comply with legal obligations.</p>
            <p>We may restrict or remove content, investigate suspected violations, preserve relevant information, and suspend, deactivate, or delete accounts where reasonably necessary. Any monitoring or action will remain subject to applicable legal requirements.</p>
          </Section>

          <Section number={11} title="DISCLAIMER OF WARRANTIES">
            <p>To the fullest extent permitted by law, the Platform is provided “as is” and “as available.” We do not warrant that it will always be available, uninterrupted, secure, error-free, or free from harmful components, or that content or Output will be complete, accurate, current, or reliable.</p>
            <p>All warranties, conditions, and representations not expressly stated in these Terms are excluded to the extent permitted by law. Nothing in these Terms excludes warranties or rights that cannot lawfully be excluded. You are responsible for obtaining and maintaining the equipment, software, connectivity, and other resources needed to access and use the Platform.</p>
          </Section>

          <Section number={12} title="LIMITATION OF LIABILITY AND INDEMNITY">
            <p>To the fullest extent permitted by law, we and our affiliates, licensors, and service providers will not be liable for indirect, incidental, special, exemplary, punitive, or consequential loss or damage, or for loss of profits, revenue, business, opportunity, goodwill, data, or anticipated savings arising from or connected with the Platform or these Terms.</p>
            <p>Where liability cannot be excluded, available remedies will be limited to those required by applicable law. To the fullest extent permitted by law, our total aggregate liability for claims arising from or relating to the Platform or these Terms will not exceed the amount you paid to us for the relevant service giving rise to the claim.</p>
            <p>You will indemnify and hold us and our affiliates, personnel, licensors, and service providers harmless from claims, liabilities, losses, and reasonable costs arising from your unlawful use of the Platform, your Input, your breach of these Terms, or your infringement of another person’s rights, except to the extent such obligation is prohibited by applicable law.</p>
          </Section>

          <Section number={13} title="TERMINATION">
            <p>You may stop using the Platform and close your account at any time through available account controls or support channels. We may suspend, deactivate, restrict, or terminate access or delete an account where these Terms are breached, where required by law, where necessary to protect the Platform or others, or where the Platform or relevant service is discontinued.</p>
            <p>On termination, your right to use the Platform ends. Unused credits will be treated as described in Section 6 and as required by applicable law. Provisions that by their nature should survive termination—including provisions concerning intellectual property, disclaimers, liability, indemnity, governing law, and accrued rights—will continue to apply.</p>
          </Section>

          <Section number={14} title="GOVERNING LAW AND JURISDICTION">
            <p>These Terms are governed by the laws of England and Wales. If you are a consumer, mandatory protections and rights available under the laws of your place of residence remain unaffected.</p>
            <p>Subject to any mandatory local consumer right to bring proceedings elsewhere, the courts of England and Wales will have jurisdiction over disputes relating to these Terms or the Platform. The Platform may not be available or appropriate in every jurisdiction, and you are responsible for complying with laws that apply where you access or use it.</p>
          </Section>

          <Section number={15} title="INFORMATION OR COMPLAINTS">
            <p>Questions, support requests, and complaints may be submitted through the contact or reporting channels made available on the Platform. Please provide enough information for the matter to be identified and reviewed. We will handle complaints in accordance with applicable law and any process communicated through those channels.</p>
          </Section>

          <Section number={16} title="MISCELLANEOUS">
            <p>We are not responsible for delay or failure caused by events beyond our reasonable control. These Terms do not create a partnership, joint venture, agency, fiduciary, or employment relationship between you and us.</p>
            <p>If any provision is held invalid or unenforceable, the remaining provisions will continue in effect, and the affected provision will be enforced to the greatest extent permitted. You may not assign or transfer your rights or obligations under these Terms without our consent. We may assign or transfer ours as part of a reorganization, transfer of the Platform, or as otherwise permitted by law.</p>
            <p>A failure or delay in enforcing a provision is not a waiver. These Terms, together with policies and additional terms expressly incorporated into them, form the entire agreement concerning the Platform and replace prior agreements on the same subject. Notices may be provided through the Platform, by email, or through other contact details associated with your account. If translated versions differ, the English-language version will prevail to the extent permitted by law.</p>
          </Section>
        </div>

        <aside className="mt-12 rounded-lg border border-primary/30 bg-primary/10 p-6 sm:mt-16 sm:p-8" aria-labelledby="acknowledgement-title">
          <h2 id="acknowledgement-title" className="text-xl font-extrabold text-foreground">Acknowledgement</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
            By becoming a member, you agree to these Terms and acknowledge that, where identified or applicable, profiles, characters, conversations, and other Output may be fictitious, generated with artificial intelligence, and provided for entertainment purposes.
          </p>
        </aside>
      </main>
      <SiteFooter />
      <AuthModals activeModal={activeModal} onChange={setActiveModal} />
    </div>
  );
}