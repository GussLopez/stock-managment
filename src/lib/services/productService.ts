import { getSupabaseBrowserClient } from "../supabase/browser-client";

const supabase = getSupabaseBrowserClient();

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("id, name, price, stock, sku, cost, image")
    .order("created_at", { ascending: false });

    if (error) throw error

    return data;
}

export async function getProductById(id: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq('id', id)
    .single();

  if (error) throw error;

  return data;
}

export async function createProduct(product: any) {

  const { error } = await supabase
    .from("products")
    .insert(product);

    if (error) throw error;
}

export async function updateProduct(id: string, product: any) {
  
  const { error } = await supabase
    .from("products")
    .update(product)
    .eq("id", id);

  if (error) throw error;
}

export async function deleteProduct(id: string) {

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) throw error;
}