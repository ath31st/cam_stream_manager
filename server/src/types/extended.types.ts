import { Prisma } from '@prisma/client';

export type PlaylistWithGroups = Prisma.PlaylistGetPayload<{
  include: { groups: true };
}>;

export type UserWithGroups = Prisma.UserGetPayload<{
  include: { groups: true };
}>;
