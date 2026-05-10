export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url: string;
  role: 'user' | 'admin';
  created_at: string;
}

export interface AuthSession {
  user: User;
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}
