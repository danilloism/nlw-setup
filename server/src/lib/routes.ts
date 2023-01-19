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

  app.get('/day', async req => {
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

    const completedHabits = day?.dayHabits.map(dayHabit => dayHabit.habitId);

    return { possibleHabits, completedHabits };
  });

  app.patch('/habits/:id/toggle', async req => {
    const toggleHabitParamsSchema = z.object({ id: z.string().uuid() });

    const { id } = toggleHabitParamsSchema.parse(req.params);

    const today = dayjs().startOf('day').toDate();

    let day = await app.prisma.day.findUnique({ where: { date: today } });

    if (!day) {
      day = await app.prisma.day.create({ data: { date: today } });
    }

    const habitDay = await app.prisma.habitDay.findUnique({
      where: { habitId_dayId: { dayId: day.id, habitId: id } },
    });

    if (habitDay) {
      await app.prisma.habitDay.delete({ where: { id: habitDay.id } });
      return;
    }

    await app.prisma.habitDay.create({
      data: {
        day: {
          connect: { id: day.id },
        },
        habit: { connect: { id } },
      },
    });
  });

  app.get('/summary', async () => {
    const summary = app.prisma.$queryRaw`
      SELECT
        D.id,
        D.date,
        (
          SELECT
            cast(count(*) as float)
          FROM habits_days HD
          WHERE HD.day_id = D.id
        ) as completed,
        (
          SELECT
            cast(count(*) as float)
          FROM habit_week_day HWD
          JOIN habits H
            ON H.id = HWD.habit_id
          WHERE
            HWD.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch') as int)
            AND H.created_at <= D.date
        ) as total
      FROM days D
    `;

    return summary;
  });
}
