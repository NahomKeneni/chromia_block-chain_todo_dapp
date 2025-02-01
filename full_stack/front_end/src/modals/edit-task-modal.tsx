"use client";

import { FormEvent, useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Button from "@/components/chromia-ui-kit/button";
import { Input } from "@/components/ui/input";
import { Task } from "@/hooks/use-tasks";
import { cn } from "@/lib/utils";

// Define props for EditTaskModal
interface EditTaskModalProps {
  isOpen: boolean;              // State to control if the modal is open
  onClose: () => void;          // Function to close the modal
  task: Task | null;            // The task to be edited (if any)
  onEditTask: (id: string, title: string, description: string, dueDate: string) => void; // Function to handle editing task
}

export function EditTaskModal({ isOpen, onClose, task, onEditTask }: EditTaskModalProps) {
  // State to manage form inputs: task title, description, and due date
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Effect to populate form with the selected task's data when the modal opens
  useEffect(() => {
    if (task) {
      setTitle(task.title); // Set the title field with the task's title
      setDescription(task.description || ""); // Set the description, if it exists
      // Format the due date to match the input format (YYYY-MM-DD)
      setDueDate(task.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : "");
    }
  }, [task]); // Re-run effect when the task prop changes

  // Handle form submission to update the task
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Check if task is available and title is not empty before proceeding
    if (task && title.trim()) {
      // Convert the due date to an ISO string (if present)
      const formattedDate = dueDate ? new Date(dueDate).toISOString() : "";

      // Call the onEditTask function to update the task on the backend
      onEditTask(task.id, title.trim(), description.trim(), formattedDate);

      // Close the modal after submission
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="bg-card text-card-foreground">
        <DialogHeader>
          <DialogTitle className="text-foreground">Edit Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Task Title Input */}
          <Input
            label="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}  // Update title state on change
            placeholder="Enter task title"
          />
          {/* Task Description Input */}
          <Input
            label="Description (Optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}  // Update description state on change
            placeholder="Enter task description"
          />
          {/* Due Date Input */}
          <Input
            type="date"
            label="Due Date (Optional)"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}  // Update due date state on change
          />
          {/* Footer with Cancel and Save Buttons */}
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!title.trim()}>  {/* Disable if title is empty */}
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
