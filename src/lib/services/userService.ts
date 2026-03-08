import { getSupabaseBrowserClient } from "../supabase/browser-client";

const supabase = getSupabaseBrowserClient();

export async function getUsers() {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .neq("role", "owner")
    .order("created_at")

  if (error) throw error;

  return data;
}

export async function updateProfile(profileId: string, employe: { full_name: string; role: string }) {
  const { error } = await supabase
    .from('profiles')
    .update(employe)
    .eq("id", profileId)

  if (error) throw error;
}

export async function deleteProfile(profileId: string) {
  const { error } = await supabase
    .from("profiles")
    .delete()
    .eq("id", profileId);
    
  if (error) throw error;
}
