export function Badge({
  text,
  variant = "default",
}: {
  text: string;
  variant?: "default" | "success" | "warning" | "danger" | "info" | "purple";
}) {
  const variants = {
    default: "bg-primary/10 text-primary",
    success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    danger: "bg-red-500/10 text-red-600 dark:text-red-400",
    info: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
    purple: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${variants[variant]}`}
    >
      {text}
    </span>
  );
}
