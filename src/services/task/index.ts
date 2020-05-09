import { Task } from "../../models";

export { DefaultTaskService } from './default';

export interface ITaskService {
  getAll(): Promise<Task[]>
}
