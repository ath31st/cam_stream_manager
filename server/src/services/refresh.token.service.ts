import type { RefreshTokenRepository } from '../repositories/refresh.token.repository';

export class RefreshTokenService {
  private refreshTokenRepository: RefreshTokenRepository;

  constructor(refreshTokenRepository: RefreshTokenRepository) {
    this.refreshTokenRepository = refreshTokenRepository;
  }

  async saveRefreshToken(
    userId: number,
    refreshToken: string,
    expiresAt: Date,
  ): Promise<void> {
    await this.refreshTokenRepository.create(refreshToken, userId, expiresAt);
  }

  async getRefreshToken(token: string) {
    return await this.refreshTokenRepository.getByToken(token);
  }

  async deleteRefreshTokenByToken(token: string): Promise<void> {
    await this.refreshTokenRepository.deleteByToken(token);
  }

  async deleteRefreshTokenByUserId(userId: number): Promise<void> {
    await this.refreshTokenRepository.deleteByUserId(userId);
  }

  async deleteExpiredTokens(): Promise<void> {
    await this.refreshTokenRepository.deleteExpiredTokens();
  }

  async updateRefreshToken(
    oldToken: string,
    newToken: string,
    newExpiresAt: Date,
  ): Promise<void> {
    await this.refreshTokenRepository.updateToken(
      oldToken,
      newToken,
      newExpiresAt,
    );
  }
}
