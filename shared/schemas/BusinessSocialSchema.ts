import { z } from "zod";

export const businessSocialSchema = z.object({
  id: z.string(),
  name: z.string(),
  key: z.string(),
  url: z.url({
    protocol: /^https?$/,
    hostname: z.regexes.domain,
    message: "URL inválido",
  }),
  icon: z.string().nullable(),
  brand_color: z.string().nullable(),
  position: z.number(),
});

export type BusinessSocialSchema = z.infer<typeof businessSocialSchema>;
