import { useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAuth, type ProfileDetails } from "@/components/auth-provider";
import { FieldLabel, ModalShell, SelectField, fieldClassName } from "@/components/auth-modals";
import { ConsentFlow } from "@/components/consent-flow";

const noop = () => {};

/** Shows the completion popup, then the consent popups, to signed-in accounts that haven't finished them. */
export function ProfileCompletionGate() {
  const { user, loading, profileComplete, consentComplete } = useAuth();
  if (loading || !user) return null;
  if (!profileComplete) return <ProfileCompletionModal />;
  if (!consentComplete) return <ConsentFlow />;
  return null;
}

function ProfileCompletionModal() {
  const { user, completeProfile, signOut } = useAuth();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const get = (key: string) => String(form.get(key) ?? "").trim();
    const month = Number(get("month"));
    const day = Number(get("day"));
    const year = Number(get("year"));
    const date = new Date(Date.UTC(year, month - 1, day));
    const valid = date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
    if (!valid) return setError("Please enter a valid date of birth.");
    const adult = new Date(Date.UTC(year + 18, month - 1, day)) <= new Date();
    if (!adult) return setError("You must be at least 18 to join Vela.");

    setError(null);
    setSaving(true);
    try {
      await completeProfile({
        gender: get("gender") as ProfileDetails["gender"],
        lookingFor: get("lookingFor") as ProfileDetails["lookingFor"],
        birthDate: date.toISOString().slice(0, 10),
        city: get("city"),
        username: get("username"),
      });
      // Consent popups show next (via the gate); redirect happens after they finish.
    } catch (err) {
      toast.error("Couldn't save your profile", { description: err instanceof Error ? err.message : "Please try again." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <ModalShell title="Complete your profile" size="lg" onClose={noop} dismissible={false}>
      <p className="-mt-4 mb-5 text-center text-sm text-muted-foreground">
        Tell us a little more about yourself so we can improve the profiles and results shown to you.
      </p>
      <form onSubmit={submit} className="space-y-4">
        {user?.email && (
          <p className="rounded-md border border-border bg-muted/40 px-3 py-2 text-center text-xs text-muted-foreground">
            Signed in as <span className="font-bold text-foreground">{user.email}</span>
          </p>
        )}
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField label="I am a" name="gender" defaultValue="man">
            <option value="man">Man</option>
            <option value="woman">Woman</option>
          </SelectField>
          <SelectField label="I am looking for" name="lookingFor" defaultValue="women">
            <option value="women">Women</option>
            <option value="men">Men</option>
          </SelectField>
        </div>

        <fieldset>
          <legend className="mb-1.5 text-xs font-bold text-foreground">Date of birth</legend>
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.35fr)] gap-2">
            <input name="month" required inputMode="numeric" pattern="\d{1,2}" maxLength={2} aria-label="Birth month" placeholder="MM" className={fieldClassName} />
            <input name="day" required inputMode="numeric" pattern="\d{1,2}" maxLength={2} aria-label="Birth day" placeholder="DD" className={fieldClassName} />
            <input name="year" required inputMode="numeric" pattern="\d{4}" maxLength={4} aria-label="Birth year" placeholder="YYYY" className={fieldClassName} />
          </div>
        </fieldset>

        <label className="block">
          <FieldLabel>City</FieldLabel>
          <input name="city" required autoComplete="address-level2" placeholder="Which city are you in?" className={fieldClassName} />
        </label>

        <label className="block">
          <FieldLabel>Username</FieldLabel>
          <input name="username" required minLength={2} maxLength={30} autoComplete="username" placeholder="Add a username; e.g. Stargazer" className={fieldClassName} />
        </label>

        {error && <p role="alert" className="text-sm font-semibold text-destructive">{error}</p>}

        <Button type="submit" disabled={saving} className="h-11 w-full font-extrabold">
          {saving ? "Saving…" : "Complete profile →"}
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Not you?{" "}
          <button
            type="button"
            onClick={async () => { await signOut(); navigate({ to: "/" }); }}
            className="cursor-pointer font-bold text-primary hover:underline"
          >
            Log out
          </button>
        </p>
      </form>
    </ModalShell>
  );
}
