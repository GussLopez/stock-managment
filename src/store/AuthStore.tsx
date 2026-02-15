import { supabase } from "@/supabase/supabase.config";
import { create } from "zustand";

interface signInType {
  email: string;
  password: string;
}
export const useAuthStore = create((set, get) => ({
  signInWithEmail: async (p: signInType) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: p.email,
      password: p.password
    })
    if (error) {
      return null;
    }
    return data.user  
  },
  signOut: async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error('Ocurrio un error durante el cierre de sesión', error);
    }
  }
}))