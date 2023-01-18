import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import dayjs from 'dayjs';

export async function appRoutes(app: FastifyInstance) {
  app.post('/habits', async (req, reply) => {
    const createHabitBodySchema = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6)),
      beginToday: z.boolean().default(true),
    });

    const { title, weekDays, beginToday } = createHabitBodySchema.parse(
      req.body
    );

    const today = dayjs().startOf('day');

    const createdAt = (beginToday ? today : today.add(1, 'day')).toDate();

    await app.prisma.habit.create({
      data: {
        title,
        createdAt,
        weekDays: { create: weekDays.map(weekDay => ({ weekDay })) },
      },
    });

    reply.status(201).send();
  });

  app.get('/day', async (req, reply) => {
    const getDayParamsSchema = z.object({
      date: z.coerce.date(),
    });

    const { date } = getDayParamsSchema.parse(req.query);
    const parsedDate = dayjs(date).startOf('day');
    const weekDay = parsedDate.get('day');

    const possibleHabits = await app.prisma.habit.findMany({
      where: {
        createdAt: { lte: parsedDate.toDate() },
        weekDays: { some: { weekDay } },
      },
    });

    const day = await app.prisma.day.findUnique({
      where: { date: parsedDate.toDate() },
      include: { dayHabits: true },
    });

    const completedHabits = day?.dayHabits.map(dayHabit => dayHabit.id);

    return { possibleHabits, completedHabits };
  });
}
