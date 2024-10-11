import { Request, Response, NextFunction } from 'express';

import { Todo } from '../models/todo';

type RequestBody = { text: string };
type RequestParams = { todoId: string };

class TodoController {
    private todos: Todo[];

    constructor() {
        this.todos = [];
    }

    public getTodos = (req: Request, res: Response, next: NextFunction) => {
        res.status(200).json({
            todos: this.todos
        });
    }

    public createTodo =  (req: Request, res: Response, next: NextFunction) => {
        const body = req.body as RequestBody;
        const todo: Todo = {
            id: new Date().toISOString(),
            text: body.text
        }
        this.todos.push(todo);
        res.status(201).json({
            todo: todo
        })
    }

    public editTodo = (req: Request, res: Response, next: NextFunction) => {
        const params = req.params as RequestParams;
        const body = req.body as RequestBody;
        const todoIndex = this.todos.findIndex(todo => todo.id === req.params.todoId);
        if (todoIndex !== -1) {
            const todo = {
                id: params.todoId,
                text: body.text
            }
            this.todos[todoIndex] = todo;
            res.status(200).json({
                todo: todo
            });
        } else {
            res.status(404).json({
                message: 'Todo with this id is not found!'
            });
        }
    }

    public deleteTodo = (req: Request, res: Response, next: NextFunction) => {
        const params = req.params as RequestParams;
        const todoIndex = this.todos.findIndex(todo => todo.id === params.todoId);
        if (todoIndex !== -1) {
            const deletedItem = this.todos.splice(todoIndex, todoIndex);
            res.status(200).json({
                id: deletedItem[0].id
            });
        } else {
            res.status(404).json({
                message: 'Todo with this id is not found!'
            });
        }
    }
}

export default new TodoController();