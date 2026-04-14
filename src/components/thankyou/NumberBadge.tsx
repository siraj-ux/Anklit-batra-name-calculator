interface NumberBadgeProps {
  label: string;
  value: number;
  highlighted?: boolean;
}

const NumberBadge = ({ label, value, highlighted = false }: NumberBadgeProps) => {
  return (
    <div className={`flex flex-col items-center gap-2 rounded-xl border border-border p-4 ${highlighted ? 'gradient-card shadow-glow' : 'bg-secondary'}`}>
      <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{label}</span>
      <span className={`font-display text-3xl font-bold ${highlighted ? 'text-gradient-purple' : 'text-foreground'}`}>
        {value}
      </span>
    </div>
  );
};

export default NumberBadge;
