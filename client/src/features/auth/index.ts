import { LoginDto, TokensDto } from '@shared/types';
import AuthModule from './ui/AuthModule';
import { LOCAL_STORAGE_KEY } from './lib/auth.constants';
import { isTokenExpired } from './lib/jwt';
import { useAuthStore } from './model/auth.store';

export type Login = LoginDto;
export type Tokens = TokensDto;

export { AuthModule, LOCAL_STORAGE_KEY, isTokenExpired, useAuthStore };
