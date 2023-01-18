import Fastify from 'fastify';
import cors from '@fastify/cors';
import { prisma } from './lib/prisma';
import { appRoutes } from './lib/routes';

const app = Fastify();

app.register(cors);
app.register(appRoutes);

app.listen({ port: 3333 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
