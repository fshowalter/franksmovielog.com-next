import { CastAndCrewMember } from "@/components/CastAndCrewMember";
import getComponentData from "@/components/CastAndCrewMember/data";
import castAndCrewJson from "@/data/castAndCrewJson";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const members = await castAndCrewJson();

  return members.map((member) => ({
    slug: member.slug,
  }));
}

export default async function CastAndCrewMemberPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getComponentData(params.slug);

  return <CastAndCrewMember {...data} />;
}
