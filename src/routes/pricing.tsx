import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { AuthModals, type AuthModal } from "@/components/auth-modals";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing" },
      { name: "description", content: "View available credit packages, pricing information, payment terms, and refund information." },
      { property: "og:title", content: "Pricing" },
      { property: "og:description", content: "View available credit packages, pricing information, payment terms, and refund information." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/pricing" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: PricingPage,
});

const creditPackages = [
  { credits: 300, price: "$300", unitPrice: "$1.00" },
  { credits: 125, price: "$150", unitPrice: "$1.20" },
  { credits: 40, price: "$60", unitPrice: "$1.50" },
  { credits: 20, price: "$34", unitPrice: "$1.70" },
  { credits: 8, price: "$16", unitPrice: "$2.00" },
];

function Section({ title, children }: { title: string; children: ReactNode }) {
  const id = title.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and").replaceAll("?", "");
  return (
    <section aria-labelledby={id} className="border-t border-border pt-8 sm:pt-10">
      <h2 id={id} className="text-xl font-extrabold text-foreground sm:text-2xl">{title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">{children}</div>
    </section>
  );
}

function PricingPage() {
  const [activeModal, setActiveModal] = useState<AuthModal>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader openModal={setActiveModal} />
      <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <header className="border-b border-border pb-8 sm:pb-10">
          <Link to="/" className="text-sm font-semibold text-primary transition-colors hover:text-primary/80">Vela</Link>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">Pricing</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground">Some features and services may require the purchase of credits or another form of paid access. This page explains the current pricing structure, payment principles, credits, and refund information.</p>
        </header>

        <div className="space-y-10 pt-10 sm:space-y-12">
          <Section title="Payment & Credits">
            <div>
              <h3 className="font-extrabold text-foreground">1. Paid Features and Credits</h3>
              <p className="mt-2">Certain features of the service may require paid access or the purchase of credits. Credits may be used only for eligible features offered by the website and generally are not redeemable for cash unless applicable law requires otherwise. No specific expiration period applies unless one is later confirmed and clearly communicated.</p>
            </div>
            <div>
              <h3 className="font-extrabold text-foreground">2. One-Time Payments</h3>
              <p className="mt-2">Payments for credits are intended to be one-time purchases rather than automatically recurring subscriptions.</p>
            </div>
            <div>
              <h3 className="font-extrabold text-foreground">3. Taxes</h3>
              <p className="mt-2">Prices may include applicable taxes unless otherwise stated.</p>
            </div>
            <div>
              <h3 className="font-extrabold text-foreground">4. Consumer Cancellation Rights</h3>
              <p className="mt-2">Applicable consumer cancellation or cooling-off rights depend on your jurisdiction and the nature of the digital service. Certain digital services may be subject to exceptions where you expressly request immediate performance and acknowledge the applicable legal consequences. Any mandatory rights available under applicable law remain unaffected.</p>
            </div>
          </Section>

          <Section title="Example Pricing">
            <p>The following packages are temporary examples and are presented for information only.</p>
            <div className="overflow-hidden rounded-lg border border-border bg-card">
              <table className="w-full table-fixed text-left text-xs sm:text-sm">
                <thead className="bg-surface-soft text-foreground">
                  <tr>
                    <th scope="col" className="w-1/4 px-3 py-4 font-extrabold sm:px-5">Credits</th>
                    <th scope="col" className="w-1/4 px-3 py-4 font-extrabold sm:px-5">Price</th>
                    <th scope="col" className="w-1/2 px-3 py-4 font-extrabold sm:px-5">Approx. price per credit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {creditPackages.map((item) => (
                    <tr key={item.credits}>
                      <td className="px-3 py-4 font-bold text-foreground sm:px-5">{item.credits}</td>
                      <td className="px-3 py-4 sm:px-5">{item.price}</td>
                      <td className="px-3 py-4 sm:px-5">{item.unitPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs leading-6">Pricing shown on this page is subject to change. Final prices, currencies, taxes, and available credit packages will be confirmed before payment functionality is enabled.</p>
          </Section>

          <Section title="Payment Information">
            <p>Payments may be processed in a currency different from the user’s local currency. Depending on the payment method and financial institution, additional foreign-exchange or transaction fees may apply.</p>
          </Section>

          <Section title="Returns & Refunds">
            <p>Refund eligibility depends on applicable law, the type of purchase, and the circumstances of the request. Users should contact the website’s designated billing or support channel for assistance with a payment or refund.</p>
            <p>Where a refund is approved, it will generally be returned using the original payment method where reasonably possible.</p>
            <div>
              <h3 className="font-extrabold text-foreground">Refund Requests</h3>
              <ul className="mt-2 list-disc space-y-2 pl-5 marker:text-primary sm:pl-6">
                <li>Contact support as soon as possible if you believe a transaction was made incorrectly.</li>
                <li>Refund requests may be reviewed individually.</li>
                <li>Applicable statutory consumer rights are not affected.</li>
                <li>The website may take reasonable measures to prevent fraud or abuse.</li>
              </ul>
            </div>
          </Section>

          <Section title="What May Appear on My Bank Statement?">
            <p>The description appearing on a bank or card statement may reflect the payment provider, merchant entity, or another neutral billing descriptor used to process the transaction.</p>
            <p>The actual billing descriptor will be added here once a payment provider and merchant arrangement have been selected.</p>
          </Section>

          <Section title="Pricing FAQ">
            <div>
              <h3 className="font-extrabold text-foreground">Are payments recurring?</h3>
              <p className="mt-2">Current pricing is intended to use one-time purchases. This may be updated if subscription functionality is introduced in the future.</p>
            </div>
            <div>
              <h3 className="font-extrabold text-foreground">Do unused credits have cash value?</h3>
              <p className="mt-2">Credits generally cannot be exchanged for cash unless required by applicable law.</p>
            </div>
            <div>
              <h3 className="font-extrabold text-foreground">Can prices change?</h3>
              <p className="mt-2">Prices and available packages may change. The price displayed before a transaction is completed will be the applicable price for that purchase.</p>
            </div>
            <div>
              <h3 className="font-extrabold text-foreground">Are taxes included?</h3>
              <p className="mt-2">Applicable taxes will be displayed or otherwise communicated as required.</p>
            </div>
            <div>
              <h3 className="font-extrabold text-foreground">How do I request help with a payment?</h3>
              <p className="mt-2">Please use the website’s available support or contact channel.</p>
            </div>
          </Section>
        </div>
      </main>
      <SiteFooter />
      <AuthModals activeModal={activeModal} onChange={setActiveModal} />
    </div>
  );
}