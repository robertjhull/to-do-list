export interface Reminder {
  id: string;
  title: string;
  date: Date;
  completed: boolean;
  priority: number;
}