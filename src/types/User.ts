export interface Employe {
  name: string;
  email: string;
  password: string;
  role: string;
  business_id: string;
}

export interface Profile {
  business_id: string;
  created_at: string | null;
  email: string;
  full_name: string | null;
  id: string;
  role: string;
}
