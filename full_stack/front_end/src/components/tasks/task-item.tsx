"use client";

import { Task } from "@/hooks/use-tasks";
import { Trash2, Edit } from "lucide-react";
import Button from "@/components/chromia-ui-kit/button";
import { cn } from "@/utils/cn";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  // Format the due date as needed (e.g., 'dueDate' should be a timestamp, so we'll format it here)
  const formattedDueDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString()
    : null;

  return (
    <div className="group flex items-center gap-4 rounded-lg border border-border bg-card p-4 hover:bg-accent/50">
      {/* Toggle completion button */}
      <button
        onClick={() => onToggle(task.id)}
        className={cn(
          "mt-1 size-6 rounded-full cursor-pointer flex justify-center items-center",
          task.completed
            ? "bg-gradient-to-br from-gradientOne to-gradientTwo"
            : "border border-light-veryGrayishBlue dark:border-dark-ultraDarkGrayishBlue hover:border-gradient-to-br from-gradientOne to-gradientTwo"
        )}
      >
        {task.completed && (
          <p>congratulation</p>
        )}
      </button>

      {/* Task Details */}
      <div className="flex-1">
        {/* Task Title */}
        <span className={cn("text-sm", task.completed && "text-muted-foreground line-through")}>
          {task.title}
        </span>
        
        {/* Task Description (if available) */}
        {task.description && (
          <p className="mt-1 text-xs text-muted-foreground">
            {task.description}
          </p>
        )}

        {/* Task Due Date (if available) */}
        {formattedDueDate && (
          <p className="mt-1 text-xs text-muted-foreground">
            Due: {formattedDueDate}
          </p>
        )}
      </div>

      {/* Action Buttons (Edit & Delete) */}
      <div className="invisible flex gap-2 group-hover:visible">
        <Button variant="ghost" size="s" onClick={() => onEdit(task)}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="s" onClick={() => onDelete(task.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
