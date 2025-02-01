"use client";

import { useState } from "react";
import Button from "@/components/chromia-ui-kit/button";
import Input from "@/components/chromia-ui-kit/input";
import { Plus } from "lucide-react";

interface TaskInputProps {
  onAddTask: (title: string, description?: string, dueDate?: string) => void;
}

export function TaskInput({ onAddTask }: TaskInputProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      // Pass title, description, and dueDate to the parent handler
      onAddTask(title.trim(), description.trim(), dueDate);
      setTitle("");  // Clear title input after submission
      setDescription("");  // Clear description input after submission
      setDueDate("");  // Clear dueDate input after submission
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        className="flex-1"
      />
      <Input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task description (optional)"
        className="flex-1"
      />
      <Input
        type="datetime-local"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        placeholder="Due date (optional)"
        className="flex-1"
      />
      <Button type="submit" disabled={!title.trim()}>
        <Plus className="h-5 w-5" />
      </Button>
    </form>
  );
}
