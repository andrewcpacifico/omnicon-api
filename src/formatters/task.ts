import { IFormatter } from '.';
import { Task } from '../models';

export class TaskListFormatter implements IFormatter<Task> {
  format(tasks: Task[]) {
    return tasks.map(task => ({
      id: task._id.toHexString(),
      title: task.title,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      dueDate: task.dueDate,
    }));
  }
};
