
let  user = ''
export function setUsername(name: string) {
    user = name;
  }
export function getUserName() {
    return user;
  }
  export type TaskDto = {
    task_id: number;
    task_title: string;
    task_discription: string;
    due_date: Date;
    is_completed: boolean;
    created_at:  Date;
    update_at: Date;
  }