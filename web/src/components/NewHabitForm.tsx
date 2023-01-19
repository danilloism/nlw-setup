import { Check } from 'phosphor-react';

export function NewHabitForm() {
  return (
    <form className="mt-6 flex w-full flex-col">
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
      />
      <label
        htmlFor=""
        className="mt-4 font-semibold leading-tight"
      >
        Qual a recorrência?
      </label>
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
