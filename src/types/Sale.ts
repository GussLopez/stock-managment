export interface Sale {
  id: string;
  bussines_id: string;
  payment_method: string;
  sale_number: string;
  seller_name: string;
  total: number;
  user_id: string;
  created_at: Date;
}