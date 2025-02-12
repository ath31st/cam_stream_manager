import { Prisma } from '@prisma/client';

export type RegionWithGroups = Prisma.RegionGetPayload<{
  include: { groups: true };
}>;
