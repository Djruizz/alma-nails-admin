import type { Database } from "./database.types";

export type Client = Database["public"]["Tables"]["business_clients"]["Row"];
export type ClientInsert =
  Database["public"]["Tables"]["business_clients"]["Insert"];
export type ClientUpdate =
  Database["public"]["Tables"]["business_clients"]["Update"];

export type ClientWithProfile =
  Database["public"]["Views"]["business_clients_with_profiles"]["Row"];
export type ClientResponse = {
  id: string | null;
  notes: string | null;
  created_at: string | null;
  full_name: string | null;
  phone: string | null;
  is_active: boolean | null;
  born_date: string | null;
  email: string | null;
};
