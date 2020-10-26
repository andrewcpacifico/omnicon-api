import { Task } from '../../models';
import { IDao } from '../../dao';
import { GetAllOptions,  ITaskService } from '.';
import { MomentModule } from '../../types-3rd';
import { Moment } from 'moment';

const DEFAULT_OFFSET = 0;
const DEFALT_LIMIT = 10;

interface IOptions {
  moment: MomentModule,
  taskDao: IDao<Task>,
}

export class DefaultTaskService implements ITaskService {
  private moment: MomentModule;
  private taskDao: IDao<Task>;

  constructor({ moment, taskDao }: IOptions) {
    this.moment = moment;
    this.taskDao = taskDao;
  }

  getAll({
    filter = {},
    offset = DEFAULT_OFFSET,
    limit = DEFALT_LIMIT
  }: GetAllOptions = {}): Promise<Task[]> {
    const { dueDate } = filter;
    const query: any = {};

    if (dueDate) {
      const dueDateMoment: Moment = this.moment.utc(dueDate).startOf('day');
      query.dueDate = {
        $gte: dueDateMoment.toDate(),
        $lte: dueDateMoment.clone().endOf('day').toDate(),
      };
    }

    return this.taskDao.find(query, { offset, limit });
  }
}
