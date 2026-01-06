import { type Database } from "~/types/database.types";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type ProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"];
export type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];
export interface ProfileForm{
  //Campos permitidos para actualizar
  full_name: string;
  email: string;
  phone: string;
}