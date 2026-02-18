'use client'
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client"
import { useUserStore } from "@/store/UserStore";
import { useEffect } from "react";

export default function SessionListener() {
  const supabase = getSupabaseBrowserClient();
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email ?? "",
          nombres: data.user.user_metadata.nombres ??
            data.user.email ?? ""
        });
      }
    }

    getSession();

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
           id: session.user.id,
          email: session.user.email ?? "",
          nombres: session.user.user_metadata.nombres ??
            session.user.email ?? ""
        })
      } else {
        clearUser();
      }
    });

    return () => subscription.unsubscribe();
  }, [])

  return null;
}
