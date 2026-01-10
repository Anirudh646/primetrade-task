import { Task } from "@/hooks/useTasks";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { format } from "date-fns";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task["status"]) => void;
}

const statusConfig = {
  pending: { label: "Pending", icon: Clock, className: "bg-warning/20 text-warning border-warning/30" },
  in_progress: { label: "In Progress", icon: AlertCircle, className: "bg-primary/20 text-primary border-primary/30" },
  completed: { label: "Completed", icon: CheckCircle, className: "bg-success/20 text-success border-success/30" },
};

const priorityConfig = {
  low: { label: "Low", className: "bg-muted text-muted-foreground" },
  medium: { label: "Medium", className: "bg-warning/20 text-warning" },
  high: { label: "High", className: "bg-destructive/20 text-destructive" },
};

export function TaskCard({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) {
  const status = statusConfig[task.status];
  const priority = priorityConfig[task.priority];
  const StatusIcon = status.icon;

  return (
    <Card className="glass-card hover:border-primary/30 transition-all duration-200 animate-fade-in group">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">{task.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {format(new Date(task.created_at), "MMM d, yyyy")}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => onEdit(task)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onStatusChange(task.id, "pending")}>
                <Clock className="mr-2 h-4 w-4" />
                Set Pending
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusChange(task.id, "in_progress")}>
                <AlertCircle className="mr-2 h-4 w-4" />
                Set In Progress
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusChange(task.id, "completed")}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Set Completed
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => onDelete(task.id)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        {task.description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {task.description}
          </p>
        )}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className={status.className}>
            <StatusIcon className="mr-1 h-3 w-3" />
            {status.label}
          </Badge>
          <Badge variant="outline" className={priority.className}>
            {priority.label}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
