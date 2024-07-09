import { Underseen } from "@/components/Underseen";
import getComponentData from "@/components/Underseen/data";

export default async function UnderseenGemsPage() {
  const data = await getComponentData();

  return <Underseen {...data} />;
}
