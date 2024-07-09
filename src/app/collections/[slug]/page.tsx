import { Collection } from "@/components/Collection";
import getComponentData from "@/components/Collection/data";
import collectionsJson from "@/data/collectionsJson";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const collections = await collectionsJson();

  return collections.map((collection) => ({
    slug: collection.slug,
  }));
}

export default async function CollectionPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getComponentData(params.slug);

  return <Collection {...data} />;
}
