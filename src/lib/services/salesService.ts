import { useCartStore } from "@/store/useCartStore";
import { getSupabaseBrowserClient } from "../supabase/browser-client";

const supabase = getSupabaseBrowserClient();

export async function createSaleFromCart(paymentMethod: "cash" | "card" | "transfer") {
  const items = useCartStore.getState().items;

  if (items.length === 0) {
    throw new Error("El carrito esta vacío");
  }

  const formattedItems = items.map((item) => ({
    product_id: item.id,
    quantity: item.quantity,
  }));

  const { data, error } = await supabase.rpc("create_sale", {
    p_payment_method: paymentMethod,
    p_items: formattedItems,
  });

  if (error) throw error;

  useCartStore.getState().clearCart();

  return data;
}
