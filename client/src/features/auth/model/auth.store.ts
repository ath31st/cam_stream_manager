import { create } from 'zustand';
import { login, logout, refreshAccessToken } from '../api/auth.api';
import { decodeToken, isTokenExpired } from '../lib/jwt';
import { JwtUser } from '../model/auth.model';

interface AuthState {
  user: JwtUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,

  login: async (username, password) => {
    try {
      const { accessToken, refreshToken } = await login({ username, password });
      const user = decodeToken(accessToken);

      set({
        accessToken,
        refreshToken,
        user,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  logout: async () => {
    const { refreshToken } = get();
    if (!refreshToken) return;

    try {
      await logout(refreshToken);
      set({
        accessToken: null,
        refreshToken: null,
        user: null,
        isAuthenticated: false,
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  refreshAccessToken: async () => {
    const { refreshToken, accessToken } = get();
    if (!refreshToken || !accessToken || !isTokenExpired(accessToken)) return;

    try {
      const newAccessToken = await refreshAccessToken(refreshToken);
      const user = decodeToken(newAccessToken);

      set({
        accessToken: newAccessToken,
        user,
      });
    } catch (error) {
      console.error('Refresh access token error:', error);
    }
  },
}));
