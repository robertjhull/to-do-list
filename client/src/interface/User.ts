import { Reminder } from './Reminder';

export interface User {
  id: string;
  username: string;
  email: string;
  reminders: Reminder[];
}