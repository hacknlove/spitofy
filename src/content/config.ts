import { z, defineCollection } from "astro:content";

const tracks = defineCollection({
  type: "data",
  schema: z.object({
    img: z.string(),
    mp3: z.string(),
    name: z.string(),
    slug: z.string(),
  }),
});
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = { tracks };
