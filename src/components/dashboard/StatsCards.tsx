import { Task } from "@/hooks/useTasks";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, AlertCircle, ListTodo } from "lucide-react";

interface StatsCardsProps {
  tasks: Task[];
}

export function StatsCards({ tasks }: StatsCardsProps) {
  const stats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === "pending").length,
    inProgress: tasks.filter((t) => t.status === "in_progress").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  };

  const cards = [
    {
      label: "Total Tasks",
      value: stats.total,
      icon: ListTodo,
      className: "text-foreground",
      bgClass: "bg-muted",
    },
    {
      label: "Pending",
      value: stats.pending,
      icon: Clock,
      className: "text-warning",
      bgClass: "bg-warning/10",
    },
    {
      label: "In Progress",
      value: stats.inProgress,
      icon: AlertCircle,
      className: "text-primary",
      bgClass: "bg-primary/10",
    },
    {
      label: "Completed",
      value: stats.completed,
      icon: CheckCircle,
      className: "text-success",
      bgClass: "bg-success/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card key={card.label} className="glass-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${card.bgClass}`}>
                <card.icon className={`h-5 w-5 ${card.className}`} />
              </div>
              <div>
                <p className="text-2xl font-bold">{card.value}</p>
                <p className="text-xs text-muted-foreground">{card.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
