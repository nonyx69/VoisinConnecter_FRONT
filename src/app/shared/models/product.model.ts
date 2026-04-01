export interface User {
  id: number;
}

export interface ProductModel {
  id: string;
  title: string;
  description: string;
  remuneration: number;
  date_active: string;
  creation_date: Date;
  category: string;
  user_annonce_id: number;
}
