import { getSupabaseBrowserClient } from "../supabase/browser-client";

const supabase = getSupabaseBrowserClient();

export async function createSale() {
  const { data, error } = await supabase.rpc("create_sale", {
    p_payment_method: "cash",
    p_items: [
      { product_id: "uuid-producto-1", quantity: 2 },
      { product_id: "uuid-producto-2", quantity: 1 },
    ],
  });

  if (error) throw error;

  return data;
}
