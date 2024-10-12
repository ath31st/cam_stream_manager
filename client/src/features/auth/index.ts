import { LoginDto, TokensDto } from '@shared/types';
import { login, logout, refreshAccessToken } from './api/auth.api';

export type Login = LoginDto;
export type Tokens = TokensDto;
export { login, logout, refreshAccessToken };
