export interface Admin {
  id: number;
  Nom: string;
  password: string;
  email: string;
  photoProfil: Text;
  role: any;
  createdAt: Date;
  token: string;
}

export interface ApiResponse<T = any> {
  status: string;
  message?: string;
  result?: T;
}

export interface StatsData {
  totalUsers: number;
  totalAnnonces: number;
  topCategory: string;
}
