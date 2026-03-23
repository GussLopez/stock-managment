import type { CategorieForm } from "@/types";
import { getSupabaseBrowserClient } from "../supabase/browser-client";

const supabase = getSupabaseBrowserClient();

export async function createCategorie(categorie: CategorieForm) {
  const { data, error } = await supabase
    .from("categories")
    .insert(categorie)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function getBusinessCategories() {
  const { data, error } = await supabase.from("categories").select();

  if (error) throw error;

  return data;
}
