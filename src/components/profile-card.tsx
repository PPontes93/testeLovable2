import type { MemberProfile } from "@/lib/mock-profiles";

export function ProfileCard({ profile, restricted = false, index }: { profile: MemberProfile; restricted?: boolean; index: number }) {
  return (
    <article className={`profile-card group overflow-hidden rounded-lg border border-border bg-card shadow-lg shadow-background/20 ${restricted ? "select-none" : ""}`} style={{ animationDelay: `${Math.min(index, 12) * 45}ms` }}>
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <img src={profile.image} alt={`${profile.name}, ${profile.age}`} width={768} height={960} loading={index > 2 ? "lazy" : undefined} className={`h-full w-full object-cover transition duration-500 group-hover:scale-[1.03] ${restricted ? "scale-105 blur-[6px] brightness-[.35]" : ""}`} />
        {profile.online !== false && <span className="absolute right-2.5 top-2.5 size-3 rounded-full border-2 border-card bg-online shadow-sm" aria-label="Online" />}
      </div>
      <div className={`px-3 py-2.5 ${restricted ? "blur-sm" : ""}`}>
        <h2 className="truncate text-sm font-bold text-card-foreground">{profile.name}, <span className="font-medium">{profile.age}</span></h2>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">{profile.place}</p>
      </div>
    </article>
  );
}

export const profileGridClassName = "grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-6";
