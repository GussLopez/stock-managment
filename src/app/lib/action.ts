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
      user_metadata: {
        name,
        role,
        business_id
      }
    });
  
  if (userError) throw userError;

  return { success: true };
}
