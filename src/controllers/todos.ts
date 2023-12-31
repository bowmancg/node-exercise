import { RequestHandler } from "express";
import { Todo } from "../models/todo";

const todos: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Math.random().toString(), text);
  todos.push(newTodo);
  res.status(201).json({ message: "Created Todo.", createdTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({ todos: todos });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;
  const updatedText = (req.body as { text: string }).text;
  const todoIndex = todos.findIndex((todo) => todo.id === todoId);
  if (todoIndex < 0) {
    throw new Error("Could not find Todo.");
  }
  todos[todoIndex] = new Todo(todos[todoIndex].id, updatedText);
  res.json({ message: "Updated", updatedTodo: todos[todoIndex] });
};

export const deleteTodo: RequestHandler = (req, res, next) => {
  const todoId = req.params.id;
  const todoIndex = todos.findIndex((todo) => todo.id === todoId);
  if (todoIndex < 0) {
    throw new Error("Could not find Todo.");
  }
  todos.splice(todoIndex, 1);
  res.json({ message: "Todo deleted." });
};
