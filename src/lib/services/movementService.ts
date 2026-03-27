import { getSupabaseBrowserClient } from "../supabase/browser-client";

const supabase = getSupabaseBrowserClient();

export interface MovementInsert {
  product_id: string;
  business_id: string;
  quantity: number;
  type: 'entrada' | 'salida' | 'ajuste';
  user_id?: string | null;
  supplier_id?: number | null;
  reference?: string | null;
  batch_id: string;
}

export async function createMovement (movements: MovementInsert[]) {
  const { error } = await supabase
    .from('inventory_movements')
    .insert(movements)

  if (error) throw error;

  return { success: true }
}