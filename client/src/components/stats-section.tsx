import { useCounterAnimation } from "@/hooks/use-counter-animation";

export default function StatsSection() {
  return (
    <section className="section-spacing bg-card">
      <div className="container mx-auto container-spacing">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          <StatCard target={180} suffix="" label="Members Transformed" />
          <StatCard target={35} suffix="%" label="Success Rate" />
          <StatCard target={5} suffix="+" label="Expert Trainers" />
          <StatCard target={18} suffix="+" label="Classes per Week" />
        </div>
      </div>
    </section>
  );
}

interface StatCardProps {
  target: number;
  suffix: string;
  label: string;
}

function StatCard({ target, suffix, label }: StatCardProps) {
  const count = useCounterAnimation(target);

  return (
    <div className="text-center" data-testid={`stat-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="text-5xl lg:text-6xl font-black text-foreground mb-4 tracking-tight">
        {count}{suffix}
      </div>
      <div className="text-muted-foreground font-medium text-lg">{label}</div>
    </div>
  );
}
