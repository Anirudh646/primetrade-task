import { useState, useMemo } from "react";
import { useTasks, Task, CreateTaskInput } from "@/hooks/useTasks";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ProfileCard } from "@/components/dashboard/ProfileCard";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { TaskFilters } from "@/components/dashboard/TaskFilters";
import { TaskCard } from "@/components/dashboard/TaskCard";
import { TaskForm } from "@/components/dashboard/TaskForm";
import { KanbanBoard } from "@/components/dashboard/KanbanBoard";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, ListTodo, LayoutGrid, List } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Dashboard() {
  const { tasks, isLoading, createTask, updateTask, deleteTask } = useTasks();
  
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "kanban">("kanban");
  
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) ||
        (task.description?.toLowerCase().includes(search.toLowerCase()) ?? false);
      const matchesStatus = statusFilter === "all" || task.status === statusFilter;
      const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, search, statusFilter, priorityFilter]);

  const handleCreateOrUpdate = (data: CreateTaskInput) => {
    if (editingTask) {
      updateTask.mutate({ id: editingTask.id, ...data }, {
        onSuccess: () => {
          setFormOpen(false);
          setEditingTask(null);
        },
      });
    } else {
      createTask.mutate(data, {
        onSuccess: () => {
          setFormOpen(false);
        },
      });
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setFormOpen(true);
  };

  const handleStatusChange = (id: string, status: Task["status"]) => {
    updateTask.mutate({ id, status });
  };

  const handleDelete = () => {
    if (deleteId) {
      deleteTask.mutate(deleteId);
      setDeleteId(null);
    }
  };

  const openCreateForm = () => {
    setEditingTask(null);
    setFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[300px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="space-y-6">
            <ProfileCard />
          </aside>

          {/* Main Content */}
          <div className="space-y-6">
            <StatsCards tasks={tasks} />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-2xl font-bold">Your Tasks</h2>
              <div className="flex items-center gap-3">
                <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "list" | "kanban")}>
                  <TabsList className="grid grid-cols-2">
                    <TabsTrigger value="kanban" className="gap-2">
                      <LayoutGrid className="h-4 w-4" />
                      <span className="hidden sm:inline">Kanban</span>
                    </TabsTrigger>
                    <TabsTrigger value="list" className="gap-2">
                      <List className="h-4 w-4" />
                      <span className="hidden sm:inline">List</span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                <Button onClick={openCreateForm} className="glow-effect">
                  <Plus className="mr-2 h-4 w-4" />
                  New Task
                </Button>
              </div>
            </div>

            <TaskFilters
              search={search}
              onSearchChange={setSearch}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              priorityFilter={priorityFilter}
              onPriorityFilterChange={setPriorityFilter}
            />

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="text-center py-12 glass-card rounded-lg">
                <ListTodo className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold text-lg mb-2">
                  {tasks.length === 0 ? "No tasks yet" : "No matching tasks"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {tasks.length === 0
                    ? "Create your first task to get started"
                    : "Try adjusting your search or filters"}
                </p>
                {tasks.length === 0 && (
                  <Button onClick={openCreateForm}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Task
                  </Button>
                )}
              </div>
            ) : viewMode === "kanban" ? (
              <KanbanBoard
                tasks={filteredTasks}
                onEdit={handleEdit}
                onDelete={setDeleteId}
                onStatusChange={handleStatusChange}
              />
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={handleEdit}
                    onDelete={setDeleteId}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <TaskForm
        open={formOpen}
        onOpenChange={setFormOpen}
        task={editingTask}
        onSubmit={handleCreateOrUpdate}
        isLoading={createTask.isPending || updateTask.isPending}
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Task</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this task? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
