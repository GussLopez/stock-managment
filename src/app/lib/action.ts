"use server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

interface CreateEmployeProps {
  name: string;
  email: string;
  password: string;
  role: string;
  business_id: string;
}
export async function createEmploye({
  name,
  email,
  password,
  role,
  business_id,
}: CreateEmployeProps) {
  const { data: userData, error: userError } =
    await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

  if (userError) throw userError;

  const userId = userData.user.id;

  const { error: profileError } = await supabase.from("profiles").insert({
    id: userId,
    full_name: name,
    email,
    role,
    business_id,
  });

  if (profileError) throw profileError;

  return { success: true };
}
