export interface JwtUser {
  userId: string;
  username: string;
  email: string | null;
  role: string;
}
