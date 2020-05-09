import { Task } from '../../models';
import { IDao } from '../../dao';
import { ITaskService } from '.';

interface IOptions {
  taskDao: IDao<Task>,
}

export class DefaultTaskService implements ITaskService {
  private taskDao: IDao<Task>;

  constructor({ taskDao }: IOptions) {
    this.taskDao = taskDao;
  }

  public getAll(): Promise<Task[]> {
    return this.taskDao.find({});
  }
}
