import { z, defineCollection } from "astro:content";

const tracks = defineCollection({
  type: "data",
  schema: z.object({
    img: z.string(),
    mp3: z.string(),
    waveform: z.string(),
    name: z.string(),
    slug: z.string(),
    bpm: z.number(),
    date: z.string(),
  }),
});
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"

const merch = defineCollection({
  type: "data",
  schema: z.object({
    image: z.string(),
    name: z.string(),
    slug: z.string(),
    price: z.string(),
  }),
});

export const collections = {
  tracks,
  merch,
};
