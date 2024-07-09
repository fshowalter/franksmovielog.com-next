import castAndCrewJson from "@/data/castAndCrewJson";
import type { CastAndCrewProps } from "./CastAndCrew";

export default async function getComponentData(): Promise<CastAndCrewProps> {
  const json = await castAndCrewJson();

  json.sort((a, b) => a.name.localeCompare(b.name));

  const members = json.map((member) => {
    return {
      name: member.name,
      slug: member.slug,
      totalCount: member.totalCount,
      reviewCount: member.reviewCount,
      creditedAs: member.creditedAs,
      avatar: member.avatar,
    };
  });

  return {
    members,
  };
}
