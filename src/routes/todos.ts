import { Router } from 'express';

import todoController from '../controllers/todos';

const router = Router();

router.get('/', todoController.getTodos);

router.post('/todo', todoController.createTodo);

router.put('/todo/:todoId', todoController.editTodo);

router.delete('/todo/:todoId', todoController.deleteTodo);

export default router;