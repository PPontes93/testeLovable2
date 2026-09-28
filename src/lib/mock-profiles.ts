import elena from "@/assets/profile-elena.jpg";
import marcus from "@/assets/profile-marcus.jpg";
import sofia from "@/assets/profile-sofia.jpg";
import noah from "@/assets/profile-noah.jpg";
import amelie from "@/assets/profile-amelie.jpg";
import diego from "@/assets/profile-diego.jpg";
import zara from "@/assets/profile-zara.jpg";
import liam from "@/assets/profile-liam.jpg";

/** Shape the profile card renders. A future database row only needs to map onto this. */
export type MemberProfile = {
  id: string;
  name: string;
  age: number;
  image: string;
  place: string;
  online?: boolean;
};

const p = (id: string, name: string, age: number, image: string, place: string, online = true): MemberProfile => ({ id, name, age, image, place, online });

export const visibleProfiles: MemberProfile[] = [
  p("elena", "Elena", 27, elena, "Lisbon"),
  p("marcus", "Marcus", 31, marcus, "New York"),
  p("sofia", "Sofia", 25, sofia, "Nice"),
  p("noah", "Noah", 29, noah, "Tokyo"),
  p("amelie", "Amelie", 30, amelie, "Bristol"),
  p("diego", "Diego", 33, diego, "Madrid"),
];

export const restrictedProfiles: MemberProfile[] = [
  p("zara", "Zara", 28, zara, "London"),
  p("liam", "Liam", 26, liam, "Vancouver"),
  p("maya", "Maya", 32, elena, "Paris"),
  p("andre", "Andre", 30, marcus, "Berlin"),
  p("clara", "Clara", 29, sofia, "Porto"),
  p("kai", "Kai", 27, noah, "Seoul"),
];

const images = [elena, marcus, sofia, noah, amelie, diego, zara, liam];
const extra: [string, number, string][] = [
  ["Ines", 26, "Coimbra"], ["Jonas", 34, "Hamburg"], ["Lucia", 28, "Valencia"], ["Theo", 30, "Lyon"],
  ["Nora", 27, "Oslo"], ["Rafael", 32, "Seville"], ["Hana", 25, "Osaka"], ["Oliver", 29, "Dublin"],
  ["Mila", 31, "Prague"], ["Mateo", 28, "Barcelona"], ["Freya", 26, "Copenhagen"], ["Samuel", 35, "Toronto"],
  ["Livia", 29, "Rome"], ["Ethan", 27, "Austin"], ["Aria", 30, "Melbourne"], ["Hugo", 33, "Brussels"],
  ["Julia", 24, "Vienna"], ["Luca", 31, "Milan"], ["Emma", 28, "Amsterdam"], ["Felix", 26, "Zurich"],
  ["Chloe", 32, "Montreal"], ["Adrian", 29, "Warsaw"], ["Isla", 27, "Edinburgh"], ["Leon", 30, "Munich"],
  ["Sara", 25, "Stockholm"], ["Nico", 34, "Athens"], ["Luna", 28, "Mexico City"], ["Owen", 31, "Cardiff"],
  ["Ava", 26, "Sydney"], ["Mason", 29, "Chicago"], ["Leah", 30, "Tel Aviv"], ["Elias", 27, "Helsinki"],
  ["Rosa", 33, "Buenos Aires"], ["Victor", 28, "Budapest"], ["Mia", 25, "Auckland"], ["Daniel", 32, "Faro"],
];

export const additionalProfiles: MemberProfile[] = extra.map(([name, age, place], i) =>
  p(`${name.toLowerCase()}-${i}`, name, age, images[i % images.length]!, place, i % 3 !== 2),
);

/** All mock members shown to signed-in users. */
export const allMemberProfiles: MemberProfile[] = [...visibleProfiles, ...restrictedProfiles, ...additionalProfiles];

export type MembersPage = { profiles: MemberProfile[]; page: number; pageCount: number; total: number };

/**
 * Demo pagination over the static mock list. Replace this with a server/database
 * query that returns the same shape when real profiles exist.
 */
export function getMembersPage(page: number, pageSize = 48): MembersPage {
  const total = allMemberProfiles.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const safe = Math.min(Math.max(1, page), pageCount);
  return { profiles: allMemberProfiles.slice((safe - 1) * pageSize, safe * pageSize), page: safe, pageCount, total };
}
