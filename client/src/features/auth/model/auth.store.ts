import { create } from 'zustand';
import { login, logout, refreshAccessToken } from '../api/auth.api';
import { decodeToken, isTokenExpired } from '../lib/jwt';
import { JwtUser } from '../model/auth.model';
import { AxiosError } from 'axios';
import { getAuthErrorMessage, unknownError } from '../../../shared/errors';
import { LOCAL_STORAGE_KEY } from '../lib/auth.constants';

interface AuthState {
  user: JwtUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<void>;
  hydrate: () => void;
  handleError: (error: unknown) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  hydrate: async () => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData) {
      const { accessToken, refreshToken, user } = JSON.parse(storedData);
      if (accessToken && !isTokenExpired(accessToken)) {
        set({
          accessToken,
          refreshToken,
          user,
          isAuthenticated: true,
          error: null,
        });
      } else {
        if (refreshToken && !isTokenExpired(refreshToken)) {
          set({ refreshToken });
          await get().refreshAccessToken();
        } else {
          console.log('Invalid access token or refresh token');
          localStorage.removeItem(LOCAL_STORAGE_KEY);
        }
      }
    }
    set({ isLoading: false });
  },

  handleError: (error: unknown) => {
    if (error instanceof AxiosError) {
      const message = getAuthErrorMessage(error.response?.status as number);
      set({ error: message });
    } else {
      set({ error: unknownError });
    }
  },

  clearError: () => {
    set({ error: null });
  },

  login: async (username, password) => {
    set({ isLoading: true });
    try {
      const { accessToken, refreshToken } = await login({ username, password });
      const user = decodeToken(accessToken);

      set({
        accessToken,
        refreshToken,
        user,
        isAuthenticated: true,
        error: null,
      });

      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({ accessToken, refreshToken, user }),
      );
    } catch (error) {
      console.error('Login error:', error);
      get().handleError(error);
    } finally {
      set({ isLoading: false });
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
        error: null,
      });

      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (error) {
      console.error('Logout error:', error);
      get().handleError(error);
    }
  },

  refreshAccessToken: async () => {
    const { refreshToken } = get();

    try {
      const newAccessToken = await refreshAccessToken(refreshToken!);
      const user = decodeToken(newAccessToken);

      set({
        accessToken: newAccessToken,
        isAuthenticated: true,
        user,
        error: null,
      });

      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({ accessToken: newAccessToken, refreshToken, user }),
      );
    } catch (error) {
      console.error('Refresh access token error:', error);
      get().handleError(error);
    }
  },
}));
