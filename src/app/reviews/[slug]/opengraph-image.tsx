import sharp from "sharp";

export default async function Image({ params }: { params: { slug: string } }) {
  return await sharp(`../../public/assets/stills/${params.slug}.png`)
    .resize(1200)
    .jpeg()
    .toBuffer();
}
