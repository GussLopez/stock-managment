'use client'

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { Spinner } from "@/components/ui/spinner";

export default function AuthCallback() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = getSupabaseBrowserClient();

  useEffect(() => {

    const code = searchParams.get("code");

    if (!code) return;

    const exchangeCodeForSession = async () => {

      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (!error) {
        router.push("/admin");
      } else {
        router.push("/auth/login");
      }

    };

    exchangeCodeForSession();

  }, []);

  return (
    <div className="flex flex-col items-center justify-center col-span-8">
      <p className="font-bold text-3xl text-gray-700">Verificando cuenta...</p>
      <div className="mt-10">
        <Spinner className="size-8 text-gray-400" />
      </div>
    </div>
  );
}