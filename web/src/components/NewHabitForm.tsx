import { Check } from 'phosphor-react';
import { FormEvent, useState } from 'react';
import { api } from '../lib/axios';
import { Checkbox } from './Checkbox';

const WEEK_DAYS = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
] as const;

export function NewHabitForm() {
  const [title, setTitle] = useState('');
  const [checkedDays, setCheckedDays] = useState<number[]>([]);

  function handleToggleWeekDay(weekDay: number) {
    if (checkedDays.includes(weekDay)) {
      setCheckedDays((days) => days.filter((day) => day != weekDay));
      return;
    }

    setCheckedDays([...checkedDays, weekDay]);
  }

  async function createNewHabit(event: FormEvent) {
    event.preventDefault();

    if (!title || checkedDays.length === 0) {
      return;
    }

    await api.post('habits', { title, weekDays: checkedDays });
    setTitle('');
    setCheckedDays([]);
    alert('foi');
  }

  return (
    <form
      className="mt-6 flex w-full flex-col"
      onSubmit={createNewHabit}
    >
      <label
        htmlFor="title"
        className="font-semibold leading-tight"
      >
        Qual seu compromentimento?
      </label>
      <input
        type="text"
        id="title"
        placeholder="ex.: Exercícios, dormir bem, etc..."
        autoFocus
        className="mt-3 rounded-lg bg-zinc-800 p-4 text-white placeholder:text-zinc-400"
        onChange={(event) => setTitle(event.target.value)}
        value={title}
      />
      <label
        htmlFor=""
        className="mt-4 font-semibold leading-tight"
      >
        Qual a recorrência?
      </label>

      <div className="mt-3 flex flex-col gap-2">
        {WEEK_DAYS.map((day, index) => (
          <Checkbox
            key={day}
            label={day}
            onCheckedChange={() => handleToggleWeekDay(index)}
            checked={checkedDays.includes(index)}
          />
        ))}
      </div>
      <button
        type="submit"
        className="mt-6 flex items-center justify-center gap-3 rounded-lg bg-green-600 p-4 font-semibold hover:bg-green-500"
      >
        <Check
          size={20}
          weight="bold"
        />
        Confirmar
      </button>
    </form>
  );
}
