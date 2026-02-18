import LoginDemo from "@/components/auth/Login";
import RegisterDemo from "@/components/auth/Register";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";

export default async function LoginPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  return <RegisterDemo user={null} /> 
}
