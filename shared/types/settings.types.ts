import type { Database } from "./database.types";

export type Business = Database["public"]["Tables"]["business_profiles"]["Row"];

export type BusinessMember =
  Database["public"]["Tables"]["business_members"]["Row"];

export type BusinessApiResponse = {
  hasBusiness: boolean;
  role: "owner" | "admin" | "staff" | null;
  business: Business | null;
};

export type BusinessState = {
  data: Business | null;
  role: "owner" | "admin" | "staff" | null;
  hasBusiness: boolean;
};

export type SocialLink = {
  id: string;
  name: string;
  key: string;
  url: string;
  icon: string;
  brand_color: string;
  position: number;
};
