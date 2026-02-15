import { supabase } from "@/supabase/supabase.config";
import { InsertUsers } from "@/supabase/usersCrud";
import { create } from "zustand";

interface signUpType {
  email: string;
  password: string;
}
export const useUserStore = create((set, get) => ({
  insertUserAdmin: async (p: signUpType) => {
    const { data, error } = await supabase.auth.signUp({
      email: p.email,
      password: p.password,
    });

    if (error || !data.user) return null;

    console.log("data del primer user: ", data);

    await InsertUsers({ 
      id_auth: data.user.id,
      fecha_registro: new Date(),
      tipo_user: 'admin'
    })
  }
}))