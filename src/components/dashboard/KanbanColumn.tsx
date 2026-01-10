import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Task } from "@/hooks/useTasks";
import { KanbanCard } from "./KanbanCard";
import { Clock, AlertCircle, CheckCircle } from "lucide-react";

interface KanbanColumnProps {
  id: Task["status"];
  title: string;
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const columnConfig = {
  pending: { 
    icon: Clock, 
    color: "text-warning",
    bgColor: "bg-warning/10",
    borderColor: "border-warning/30"
  },
  in_progress: { 
    icon: AlertCircle, 
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30"
  },
  completed: { 
    icon: CheckCircle, 
    color: "text-success",
    bgColor: "bg-success/10",
    borderColor: "border-success/30"
  },
};

export function KanbanColumn({ id, title, tasks, onEdit, onDelete }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id });
  const config = columnConfig[id];
  const Icon = config.icon;

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col min-h-[500px] rounded-xl border ${config.borderColor} ${
        isOver ? "ring-2 ring-primary/50 bg-primary/5" : ""
      } transition-all duration-200`}
    >
      {/* Column Header */}
      <div className={`p-4 rounded-t-xl ${config.bgColor} border-b ${config.borderColor}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className={`h-5 w-5 ${config.color}`} />
            <h3 className="font-semibold text-foreground">{title}</h3>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.color}`}>
            {tasks.length}
          </span>
        </div>
      </div>

      {/* Tasks Container */}
      <div className="flex-1 p-3 space-y-3 overflow-y-auto">
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <KanbanCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </SortableContext>
        
        {tasks.length === 0 && (
          <div className="flex items-center justify-center h-24 border-2 border-dashed border-muted rounded-lg">
            <p className="text-sm text-muted-foreground">Drop tasks here</p>
          </div>
        )}
      </div>
    </div>
  );
}
