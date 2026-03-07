import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { create } from "zustand";

export const useAuthStore = create(() => ({
  signOut: async () => {
    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error('Ocurrio un error durante el cierre de sesión', error);
    }
  }
}))