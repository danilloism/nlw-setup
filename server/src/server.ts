import Fastify from 'fastify';
import cors from '@fastify/cors';
import { appRoutes } from './lib/routes';
import prismaPlugin from './lib/prisma-plugin';

const app = Fastify();

app.register(prismaPlugin);
app.register(cors);
app.register(appRoutes);

app.listen({ port: 3333 }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
