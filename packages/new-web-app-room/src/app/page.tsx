'use client';

import { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState('');

  const addTodo = () => {
    if (inputText.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputText.trim(),
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInputText('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Todo List Tracker
        </h1>
        
        {/* Add new todo */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={addTodo}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Add
          </button>
        </div>

        {/* Todo list */}
        <div className="space-y-2">
          {todos.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              No tasks yet. Add one above!
            </p>
          ) : (
            todos.map(todo => (
              <div
                key={todo.id}
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span
                  className={`flex-1 ${
                    todo.completed
                      ? 'text-gray-500 line-through'
                      : 'text-gray-800'
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="px-2 py-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                  title="Delete task"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* Stats */}
        {todos.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Total: {todos.length}</span>
              <span>Completed: {todos.filter(todo => todo.completed).length}</span>
              <span>Remaining: {todos.filter(todo => !todo.completed).length}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

