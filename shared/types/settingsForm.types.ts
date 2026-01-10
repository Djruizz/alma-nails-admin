import type { Database } from "./database.types";
export type Business = Database["public"]["Tables"]["business_profiles"]["Row"];
export type BusinessInsert =
  Database["public"]["Tables"]["business_profiles"]["Insert"];
export type BusinessUpdate =
  Database["public"]["Tables"]["business_profiles"]["Update"];
