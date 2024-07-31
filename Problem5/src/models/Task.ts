import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { TASK_STATUS } from '../utils/taskStatus'; // Adjust the import path as necessary

class Task extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public status!: keyof typeof TASK_STATUS;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(TASK_STATUS)),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'tasks',
  }
);

export default Task;
