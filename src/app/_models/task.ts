import { Category } from './category';
import { Contact } from './contact';
import { Moment } from 'moment';

export interface ITask{
  key?: string | null;
  name: string;
  description: string;
  category: Category;
  assignedTo: Contact;
  startingDate: string;
  dueDate: string;
  // dateRange: string;
  estimatedTimeInHours: number;
  progress: number;
}

export class Task implements ITask {
  key?: string | null;
  name: string;
  description: string;
  category: Category;
  assignedTo: Contact;
  startingDate: string;
  dueDate: string;
  // dateRange: string;
  estimatedTimeInHours: number;
  progress: number;
}
