import Swal from "sweetalert2";
import { supabase } from "./supabase.config"

interface paramsType {
  id_auth: string;
}

export const InsertUsers = async (p: paramsType) => {
  const { data, error } = await supabase.from("usuarios")
    .insert(p)
    .select()
    .maybeSingle();

    if (error) {
      Swal.fire({
        icon: "error",
        title: 'Opps...',
        text: 'Error al insertar usuarios '+ error.message
      })
    }
    if (data) return data;

}