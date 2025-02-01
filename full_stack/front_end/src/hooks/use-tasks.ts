import { useCallback, useState, useEffect } from 'react';
import { op } from "@chromia/ft4";
import { useFtAccounts, useFtSession, usePostchainClient } from "@chromia/react";
import { publicClientConfig as clientConfig } from "@/utils/generate-client-config";

// Define Task interface
export interface Task {
  id: string;               // Task ID (UUID as a string)
  title: string;            // Task Title
  description?: string;     // Task Description (optional)
  dueDate?: string;         // Task Due Date (optional, ISO string)
  completed: boolean;       // Task Completion Status
  createdAt: string;        // Task Creation Date (ISO string)
}

export type TaskStatus = 'all' | 'active' | 'completed'; // Task Status filter
export type SortOrder = 'none' | 'date'; // Sorting options

// Custom Hook for managing tasks
export function useTasks(initialStatus: TaskStatus = 'all') {
  const [status, setStatus] = useState<TaskStatus>(initialStatus); // Active, Completed, or All tasks
  const [sortOrder, setSortOrder] = useState<SortOrder>('none');    // Sorting options
  const [tasks, setTasks] = useState<Task[]>([]);                   // Task list state
  const [isLoading, setIsLoading] = useState(false);                // Loading state for fetching tasks
  const [error, setError] = useState<string | null>(null);          // Error state

  // Fetch user accounts and session data
  const { data: ftAccounts } = useFtAccounts({ clientConfig });
  const { data: session } = useFtSession(
    ftAccounts?.length ? { clientConfig, account: ftAccounts[0] } : null,
  );
  const { data: client } = usePostchainClient({ config: clientConfig });

  // Helper function to convert UUID string to byte array
  const stringToByteArray = (str: string): Uint8Array => {
    return new TextEncoder().encode(str); // Convert UUID string to byte array
  };

  // Add a new task
  const addTask = useCallback(async (title: string, description?: string, dueDate?: string) => {
    if (!session || !ftAccounts?.length) return;
    setError(null);

    // Generate task ID (UUID string converted to byte array)
    const newTaskId = stringToByteArray(crypto.randomUUID());
    const newTask: Task = {
      id: newTaskId.toString(), // Convert byte array back to string for frontend
      title,
      description,
      dueDate,
      completed: false,
      createdAt: new Date().toISOString(), // Use current timestamp as ISO string
    };

    try {
      // Perform the transaction to create a new task in the backend (using Rell)
      await session
        .transactionBuilder()
        .add(
          op(
            "create_task", // Using backend operation "create_task"
            Buffer.from(newTaskId),       // Pass task ID as byte array
            newTask.title,   // Task Title
            newTask.description ?? "", // Description (optional)
            newTask.dueDate ? new Date(newTask.dueDate).getTime() / 1000 : 0, // Due date as Unix timestamp
            newTask.createdAt ? new Date(newTask.createdAt).getTime() / 1000 : 0, // Created date as Unix timestamp
          )
        )
        .buildAndSend();
      await fetchTasks(); // Refresh the task list after adding a new task
    } catch (error) {
      console.error('Error adding task:', error);
      setError('Failed to add task'); // Set error if operation fails
    }
  }, [session, ftAccounts]);

  // Toggle task completion (mark task as completed or not completed)
  const toggleTask = useCallback(async (id: string) => {
    if (!session) return;
    setError(null);

    try {
      const taskId = stringToByteArray(id); // Convert task ID to byte array
      await session
        .transactionBuilder()
        .add(op("toggle_task", Buffer.from(taskId))) // Using backend operation "toggle_task"
        .buildAndSend();
      await fetchTasks(); // Refresh the task list after toggling completion
    } catch (error) {
      console.error('Error toggling task:', error);
      setError('Failed to toggle task');
    }
  }, [session]);

  // Delete a task
  const deleteTask = useCallback(async (id: string) => {
    if (!session) return;
    setError(null);

    try {
      const taskId = stringToByteArray(id); // Convert task ID to byte array
      await session
        .transactionBuilder()
        .add(op("delete_task", Buffer.from(taskId))) // Using backend operation "delete_task"
        .buildAndSend();
      await fetchTasks(); // Refresh the task list after deletion
    } catch (error) {
      console.error('Error deleting task:', error);
      setError('Failed to delete task');
    }
  }, [session]);

  // Edit a task
  const editTask = useCallback(async (id: string, title: string, description?: string, dueDate?: string) => {
    if (!session) return;
    setError(null);

    try {
      const taskId = stringToByteArray(id); // Convert task ID to byte array
      await session
        .transactionBuilder()
        .add(
          op(
            "edit_task",  // Using backend operation "edit_task"
            Buffer.from(taskId),          // Pass task ID as byte array
            title,           // New task title
            description ?? "",  // New task description (optional)
            dueDate ? new Date(dueDate).getTime() / 1000 : 0, // Due date as Unix timestamp (optional)
          )
        )
        .buildAndSend();
      await fetchTasks(); // Refresh the task list after editing the task
    } catch (error) {
      console.error('Error editing task:', error);
      setError('Failed to edit task');
    }
  }, [session]);

  // Fetch all tasks from the backend
  const fetchTasks = useCallback(async () => {
    if (!session || !ftAccounts?.length) return;
    setIsLoading(true);
    setError(null);

    try {
      // Query for tasks from the backend
      const tasks = await session.client.query("get_user_tasks", {
        user_id: ftAccounts[0].id, // Pass user ID to fetch tasks
      }) as Array<[Uint8Array, string, string | null, string | null, boolean, number]>;

      // Map the raw data to structured task objects
      const mappedTasks = tasks.map(([id, title, description, dueDate, completed, createdAt]) => ({
        id: new TextDecoder().decode(id), // Decode byte array to string for task ID
        title,
        description: description || undefined,
        dueDate: dueDate ? new Date(Number(dueDate) * 1000).toISOString() : undefined, // Convert Unix timestamp to ISO string
        completed,
        createdAt: new Date(createdAt * 1000).toISOString(), // Convert Unix timestamp to ISO string
      }));

      setTasks(mappedTasks); // Update task state with the fetched tasks
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Failed to fetch tasks'); // Handle error while fetching tasks
      setTasks([]); // Clear tasks state in case of error
    } finally {
      setIsLoading(false); // Set loading state to false when done
    }
  }, [session, ftAccounts]);

  // Fetch tasks when component is mounted or dependencies change
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Filter tasks based on status ('all', 'active', 'completed') and sort them by date
  const filteredTasks = tasks.filter(task => {
    if (status === 'active') return !task.completed;
    if (status === 'completed') return task.completed;
    return true;
  }).sort((a, b) => {
    if (sortOrder === 'date') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // Sort by date (newest first)
    }
    return 0;
  });

  // Return tasks, actions, and states
  return {
    tasks: filteredTasks,
    status,
    setStatus,
    sortOrder,
    setSortOrder,
    isLoading,
    error,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    refresh: fetchTasks, // Expose function to refresh tasks manually
  };
}
