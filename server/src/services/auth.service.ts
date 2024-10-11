import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserService } from './user.service';
import { Logger } from '../utils/logger';
import { LoginDto, TokensDto } from '@shared/types';
import { User } from '@prisma/client';
import { RefreshTokenService } from './refresh.token.service';

export class AuthService {
  private userService: UserService;
  private refreshTokenService: RefreshTokenService;
  private readonly jwtSecret = process.env.JWT_SECRET || 'secret';
  private readonly refreshSecret =
    process.env.JWT_REFRESH_SECRET || 'refreshSecret';
  private readonly tokenExpiration = process.env.TOKEN_EXPIRATION || '1h';
  private readonly refreshTokenExpiration =
    process.env.REFRESH_TOKEN_EXPIRATION || '30d';

  constructor(
    userService: UserService,
    refreshTokenService: RefreshTokenService,
  ) {
    this.userService = userService;
    this.refreshTokenService = refreshTokenService;
  }

  login = async (dto: LoginDto): Promise<TokensDto> => {
    try {
      const user = await this.userService.getUserByUsername(dto.username);
      const isPasswordValid = await bcrypt.compare(dto.password, user.password);

      if (!isPasswordValid) {
        throw new Error('Invalid credentials');
      }

      await this.refreshTokenService.deleteExpiredTokens();

      const accessToken = this.generateAccessToken(user);
      const refreshToken = this.generateRefreshToken(user);

      await this.refreshTokenService.saveRefreshToken(
        user.id,
        refreshToken,
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      );

      Logger.log(`User ${user.username} logged in`);
      return { accessToken, refreshToken };
    } catch (error) {
      Logger.error('Error during login:', error);
      throw new Error('Login failed');
    }
  };

  private generateAccessToken = (user: User): string => {
    return jwt.sign(
      {
        userId: user.id,
        role: user.role,
        username: user.username,
      },
      this.jwtSecret,
      {
        expiresIn: this.tokenExpiration,
      },
    );
  };

  private generateRefreshToken = (user: User): string => {
    return jwt.sign(
      {
        userId: user.id,
      },
      this.refreshSecret,
      {
        expiresIn: this.refreshTokenExpiration,
      },
    );
  };

  validateAccessToken = (token: string): JwtPayload => {
    try {
      return jwt.verify(token, this.jwtSecret) as JwtPayload;
    } catch (error) {
      Logger.error('Invalid access token:', error);
      throw new Error('Invalid token');
    }
  };

  validateRefreshToken = (token: string): JwtPayload => {
    try {
      return jwt.verify(token, this.refreshSecret) as JwtPayload;
    } catch (error) {
      Logger.error('Invalid refresh token:', error);
      throw new Error('Invalid refresh token');
    }
  };

  refreshAccessToken = async (refreshToken: string): Promise<string> => {
    try {
      const decoded = this.validateRefreshToken(refreshToken);
      const userId = decoded.userId;

      const storedRefreshToken =
        await this.refreshTokenService.getRefreshToken(refreshToken);
      if (!storedRefreshToken) {
        throw new Error('Invalid refresh token');
      }

      const user = await this.userService.getUser(userId);
      const newAccessToken = this.generateAccessToken(user);
      return newAccessToken;
    } catch (error) {
      Logger.error('Error during token refresh:', error);
      throw new Error('Token refresh failed');
    }
  };

  logout = async (refreshToken: string): Promise<void> => {
    try {
      await this.refreshTokenService.deleteRefreshTokenByToken(refreshToken);
    } catch (error) {
      Logger.error('Error during logout:', error);
      throw new Error('Logout failed');
    }
  };
}
