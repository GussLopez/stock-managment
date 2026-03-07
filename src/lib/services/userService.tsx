import { getSupabaseBrowserClient } from "../supabase/browser-client";

const supabase = getSupabaseBrowserClient();

export async function getUsers() {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .neq("role", "owner")

  if (error) throw error;

  return data;
}