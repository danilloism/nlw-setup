import Fastify from 'fastify';

const app = Fastify();

app.get('/', () => {
  return 'alo';
});

app.listen({ port: 3333 });
