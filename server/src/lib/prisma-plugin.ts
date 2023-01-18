import { PrismaClient } from '@prisma/client';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

const prismaPlugin: FastifyPluginAsync = fp(async app => {
  const prisma = new PrismaClient();

  await prisma.$connect();

  app.decorate('prisma', prisma);

  app.addHook('onClose', async app => {
    await app.prisma.$disconnect();
  });
});

export default prismaPlugin;
