import type { LoginDto } from '@shared/types';
import type { Request, Response } from 'express';
import type { AuthService } from '../services/auth.service';
import { trimObjectValues } from '../utils/trim.utils';
import { loginSchema } from '../validators/auth.validator';

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  login = async (req: Request, res: Response) => {
    try {
      const trimmedBody = trimObjectValues(req.body);

      const { error, value } = loginSchema.validate(trimmedBody);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const dto: LoginDto = value;
      const tokens = await this.authService.login(dto);
      res.status(200).json(tokens);
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).json({ message: 'Login failed', error: error.message });
      } else {
        res.status(500).json({
          message: 'Login failed',
          error: 'Unknown error occurred',
        });
      }
    }
  };

  refreshAccessToken = async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required' });
      }

      const newAccessToken =
        await this.authService.refreshAccessToken(refreshToken);
      res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(401)
          .json({ message: 'Token refresh failed', error: error.message });
      } else {
        res.status(500).json({
          message: 'Token refresh failed',
          error: 'Unknown error occurred',
        });
      }
    }
  };

  logout = async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required' });
      }

      await this.authService.logout(refreshToken);
      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(400)
          .json({ message: 'Logout failed', error: error.message });
      } else {
        res.status(500).json({
          message: 'Logout failed',
          error: 'Unknown error occurred',
        });
      }
    }
  };
}
