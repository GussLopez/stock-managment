import { SupplierForm } from "@/types";
import { getSupabaseBrowserClient } from "../supabase/browser-client";

const supabase = getSupabaseBrowserClient();

export async function createSupplier(supplier: SupplierForm) {
  const { error } = await supabase.from("suppliers").insert(supplier);

  if (error) throw error;

  return { success: true };
}

export async function getBusinessSuppliers() {
  const { data, error } = await supabase
    .from("suppliers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function updateSupplier(
  supplierId: number,
  supplier: SupplierForm,
) {
  const { error } = await supabase
    .from("suppliers")
    .update(supplier)
    .eq("id", supplierId);

  if (error) throw error;
}

export async function deleteSupplier(supplierId: number) {
  const { error } = await supabase
    .from("suppliers")
    .delete()
    .eq("id", supplierId);

  if (error) throw error;
}
