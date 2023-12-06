import { z, defineCollection } from 'astro:content';

const track = defineCollection({ 
    schema: z.object({
      title: z.string(),
      img: z.string(),
      mp3: z.string(),
      name: z.string(),
      slug: z.string()
    })
 });
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = { track };