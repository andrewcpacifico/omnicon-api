import { ObjectID } from 'mongodb';

export type Task = {
  _id: ObjectID,
  title: string,
  createdAt: Date,
  updatedAt: Date,
  dueDate: Date,
};
