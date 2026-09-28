import { useState, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/components/auth-provider";

/* ---------- Placeholder copy: replace these texts later ---------- */

function FakeLink({ children }: { children: ReactNode }) {
  return (
    <a href="#" onClick={(e) => e.preventDefault()} className="font-semibold text-primary hover:underline">
      {children}
    </a>
  );
}

export const CONSENT_COPY = {
  step1: {
    title: "Confirm",
    consent: (
      <>
        I give explicit consent to Example Dating Services to process my gender, the city I am located in, and my
        male/female preference for the purpose of sorting content and tailoring the services. I have the right to
        withdraw this consent. More information can be found in the <FakeLink>Privacy Statement</FakeLink>.
      </>
    ),
    notice: (
      <>
        By submitting my information, I agree to the <FakeLink>Terms and Conditions</FakeLink> and acknowledge that
        some profiles may be fictional/entertainment profiles, clearly marked with a heart icon, with whom physical
        contact is not possible.
      </>
    ),
    button: "Confirm",
  },
  step2: {
    title: "Before you start...",
    subtitle: "We must check the following points",
    button: "Confirm and continue",
    items: [
      {
        id: "personal-data",
        required: true,
        text: (
          <>
            I explicitly give consent to Example Dating Services to process my personal data, including my marital
            status and special categories of personal data. More information can be found in the{" "}
            <FakeLink>Privacy Statement</FakeLink>.
          </>
        ),
        more: (
          <>
            <p>
              I explicitly give consent to Example Dating Services to process my personal data, including my marital
              status and special categories of personal data that may reveal racial or ethnic origin, political
              opinions, religious or philosophical beliefs, trade union membership, data concerning health, or data
              about sex life or sexual orientation, and data revealing criminal conduct.
            </p>
            <p>
              This data is processed for the purpose of creating, managing, and monitoring my profile and tailoring the
              service to my preferences.
            </p>
            <p>
              I have the right to withdraw this consent at any time. More information can be found in the{" "}
              <FakeLink>Privacy Statement</FakeLink>.
            </p>
          </>
        ),
      },
      {
        id: "age-entertainment",
        required: true,
        text: (
          <>
            I am at least 18, or above the age of majority where I reside, and I would like to chat with all profiles
            on this website, even though I am aware that I cannot make physical arrangements with fictional
            entertainment profiles.
            <span className="mt-2 block">
              Fictional entertainment profiles are marked with a heart icon{" "}
              <Heart className="inline size-3.5 fill-primary text-primary" aria-label="heart icon" /> to distinguish
              them from member profiles.
            </span>
          </>
        ),
        more: (
          <p>
            Read the whole <FakeLink>Terms and Conditions</FakeLink> before continuing.
          </p>
        ),
      },
      {
        id: "marketing",
        required: false,
        text: (
          <>
            I would like to stay updated about exciting new products and promotions from Example Dating Services
            and/or third parties. I am also interested in other services and grant permission to receive notifications
            about these, provided that these communications are sent no more than once per day.
          </>
        ),
        more: <p>This consent is optional. You can continue without it and change your mind at any time.</p>,
      },
    ],
  },
};

/* ---------- Reusable modal ---------- */

export function ConsentModal({ title, subtitle, children, footer }: { title: string; subtitle?: string; children: ReactNode; footer: ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 p-3 backdrop-blur-sm sm:p-6">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="consent-title"
        className="flex max-h-full w-full max-w-lg flex-col overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-2xl shadow-background"
      >
        <header className="border-b border-border px-5 pb-4 pt-5 sm:px-7">
          <h2 id="consent-title" className="text-xl font-extrabold sm:text-2xl">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
        </header>
        <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-7">{children}</div>
        <footer className="border-t border-border px-5 py-4 sm:px-7">{footer}</footer>
      </section>
    </div>
  );
}

function ConsentStepOne({ onConfirm }: { onConfirm: () => void }) {
  const [checked, setChecked] = useState(false);
  const c = CONSENT_COPY.step1;
  return (
    <ConsentModal
      title={c.title}
      footer={<Button className="h-11 w-full font-extrabold" disabled={!checked} onClick={onConfirm}>{c.button}</Button>}
    >
      <label className="flex cursor-pointer gap-3 text-sm leading-6">
        <Checkbox checked={checked} onCheckedChange={(v) => setChecked(v === true)} className="mt-1" aria-label="I give consent" />
        <span>{c.consent}</span>
      </label>
      <p className="mt-4 text-xs leading-5 text-muted-foreground">{c.notice}</p>
    </ConsentModal>
  );
}

function ConsentStepTwo({ onConfirm }: { onConfirm: () => void }) {
  const c = CONSENT_COPY.step2;
  const [on, setOn] = useState<Record<string, boolean>>({});
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const ready = c.items.every((i) => !i.required || on[i.id]);
  return (
    <ConsentModal
      title={c.title}
      subtitle={c.subtitle}
      footer={<Button className="h-11 w-full font-extrabold" disabled={!ready} onClick={onConfirm}>{c.button}</Button>}
    >
      <ul className="divide-y divide-border">
        {c.items.map((item) => (
          <li key={item.id} className="py-4 first:pt-1 last:pb-1">
            <div className="flex items-start gap-4">
              <div className="min-w-0 flex-1 text-sm leading-6">
                {item.text}
                {!item.required && <span className="ml-1 text-xs text-muted-foreground">(optional)</span>}
              </div>
              <Switch
                checked={!!on[item.id]}
                onCheckedChange={(v) => setOn((s) => ({ ...s, [item.id]: v }))}
                aria-label={item.required ? "Required consent" : "Optional consent"}
                className="mt-1 shrink-0"
              />
            </div>
            <button
              type="button"
              onClick={() => setOpen((s) => ({ ...s, [item.id]: !s[item.id] }))}
              aria-expanded={!!open[item.id]}
              className="mt-2 cursor-pointer text-xs font-extrabold tracking-wide text-primary hover:underline"
            >
              {open[item.id] ? "READ LESS" : "READ MORE"}
            </button>
            {open[item.id] && <div className="mt-2 space-y-2 text-xs leading-5 text-muted-foreground">{item.more}</div>}
          </li>
        ))}
      </ul>
    </ConsentModal>
  );
}

/** Post-registration consent sequence: step 1 → step 2 → members page. */
export function ConsentFlow() {
  const { completeConsent, consentPopup1Complete, completeConsentPopup1 } = useAuth();
  const navigate = useNavigate();
  if (!consentPopup1Complete) return <ConsentStepOne onConfirm={completeConsentPopup1} />;
  return (
    <ConsentStepTwo
      onConfirm={() => {
        completeConsent();
        navigate({ to: "/members" });
      }}
    />
  );
}
