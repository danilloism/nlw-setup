interface ProgressBarProps {
  currentProgress: number;
}

export function ProgressBar({ currentProgress }: ProgressBarProps) {
  return (
    <div
      role="progressbar"
      aria-label="Progresso de hábitos completados nesse dia"
      aria-valuenow={currentProgress}
      className="mt-4 h-3 w-full rounded-xl bg-zinc-700"
    >
      <div
        className="h-3 rounded-xl bg-violet-600"
        style={{ width: `${currentProgress}%` }}
      ></div>
    </div>
  );
}
