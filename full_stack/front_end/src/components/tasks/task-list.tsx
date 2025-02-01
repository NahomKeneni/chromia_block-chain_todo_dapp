"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { useTasks, Task } from "@/hooks/use-tasks";
import { TaskItem } from "./task-item";
import { TaskStatus } from "./task-status";
import { AddTaskModal } from "@/modals/add-task-modal";
import { EditTaskModal } from "@/modals/edit-task-modal";
import Button from "@/components/chromia-ui-kit/button";
import { Plus } from "lucide-react";

export function TaskList() {
  const {
    tasks,
    status,
    sortOrder,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    setStatus,
    setSortOrder,
  } = useTasks();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const totalTasks = tasks.length;
  const activeTasks = tasks.filter(task => !task.completed).length;

  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };

  const handleEditSubmit = (id: string, title: string, description: string, dueDate: string) => {
    editTask(id, title, description, dueDate);
    setEditingTask(null);
  };

  return (
    <div className="flex flex-col gap-6 ">
      <Card className="w-full max-w-lg shadow-lg ">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <h2 className="text-sm font-bold lg:text-xl">Tasks</h2>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Button>
        </CardHeader>
      </Card>

      <Card className="w-full max-w-lg">
        <CardContent className="space-y-2">
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onEdit={handleEdit}
            />
          ))}
          {tasks.length === 0 && (
            <p className="text-center text-sm text-muted-foreground">
              No tasks yet. Add one above!
            </p>
          )}
        </CardContent>

        <CardFooter>
          <TaskStatus
            status={status}
            sortOrder={sortOrder}
            onStatusChange={setStatus}
            onSortChange={setSortOrder}
            totalTasks={totalTasks}
            activeTasks={activeTasks}
          />
        </CardFooter>
      </Card>

      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddTask={addTask}
      />

      <EditTaskModal
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        task={editingTask}
        onEditTask={handleEditSubmit}
      />
    </div>
  );
} 