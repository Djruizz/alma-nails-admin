import type { Database } from "./database.types";

export type Business = Database["public"]["Tables"]["business_profiles"]["Row"];

export type BusinessInsert =
  Database["public"]["Tables"]["business_profiles"]["Insert"];

export type BusinessUpdate =
  Database["public"]["Tables"]["business_profiles"]["Update"];

export type SocialNetwork =
  Database["public"]["Tables"]["social_networks"]["Row"];

export type SocialNetworkLite = Pick<
  SocialNetwork,
  "id" | "name" | "icon" | "base_url"
>;

export type BusinessSocialBase =
  Database["public"]["Tables"]["business_socials"]["Insert"];

export type BusinessSocial =
  Database["public"]["Tables"]["business_socials"]["Row"] & {
    social_networks: Pick<
      Database["public"]["Tables"]["social_networks"]["Row"],
      "name" | "icon" | "brand_color"
    > | null;
  };
