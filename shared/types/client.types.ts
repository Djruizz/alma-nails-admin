import type { Database } from "./database.types";

export type Client = Database["public"]["Tables"]["business_clients"]["Row"];
export type ClientInsert =
  Database["public"]["Tables"]["business_clients"]["Insert"];
export type ClientUpdate =
  Database["public"]["Tables"]["business_clients"]["Update"];

export type ClientWithProfile =
  Database["public"]["Views"]["business_clients_with_profiles"]["Row"];
