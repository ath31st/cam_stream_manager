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
  hydrate: () => void;
}

const LOCAL_STORAGE_KEY = 'auth';

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,

  hydrate: () => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData) {
      const { accessToken, refreshToken, user } = JSON.parse(storedData);
      if (accessToken && !isTokenExpired(accessToken)) {
        set({
          accessToken,
          refreshToken,
          user,
          isAuthenticated: true,
        });
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    }
  },

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

      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({ accessToken, refreshToken, user }),
      );
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

      localStorage.removeItem(LOCAL_STORAGE_KEY);
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

      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({ accessToken: newAccessToken, refreshToken, user }),
      );
    } catch (error) {
      console.error('Refresh access token error:', error);
    }
  },
}));
