import { Router } from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} from '../controllers/taskController';
import {
  createTaskValidation,
  updateTaskValidation,
  idValidation,
  getTasksValidation
} from '../middlewares/taskValidation';

const router = Router();

router.post('/', createTaskValidation, createTask);
router.get('/', getTasksValidation, getTasks);
router.get('/:id', idValidation, getTaskById);
router.put('/:id', idValidation, updateTaskValidation, updateTask);
router.delete('/:id', idValidation, deleteTask);

export default router;
