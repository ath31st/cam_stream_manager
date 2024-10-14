import { PrismaClient } from '@prisma/client';

export class RefreshTokenRepository {
  private prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  async create(token: string, userId: number, expiresAt: Date) {
    return await this.prismaClient.refreshToken.create({
      data: {
        token,
        userId,
        expiresAt,
      },
    });
  }

  async getByToken(token: string) {
    return await this.prismaClient.refreshToken.findUnique({
      where: {
        token,
      },
    });
  }

  async deleteByToken(token: string) {
    return await this.prismaClient.refreshToken.delete({
      where: {
        token,
      },
    });
  }

  async deleteByUserId(userId: number) {
    return await this.prismaClient.refreshToken.deleteMany({
      where: {
        userId,
      },
    });
  }

  async deleteExpiredTokens() {
    return await this.prismaClient.refreshToken.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  }

  async updateToken(oldToken: string, newToken: string, newExpiresAt: Date) {
    return await this.prismaClient.refreshToken.update({
      where: {
        token: oldToken,
      },
      data: {
        token: newToken,
        expiresAt: newExpiresAt,
      },
    });
  }
}
