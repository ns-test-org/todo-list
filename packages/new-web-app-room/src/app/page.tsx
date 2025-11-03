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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light text-slate-800 mb-2">
            Tasks
          </h1>
          <p className="text-slate-500 text-sm">
            Stay organized, stay productive
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl shadow-slate-200/50 border border-white/20 overflow-hidden">
          {/* Add new todo */}
          <div className="p-6 border-b border-slate-100">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="What needs to be done?"
                className="flex-1 px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200 text-slate-700 placeholder-slate-400"
              />
              <button
                onClick={addTodo}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 font-medium shadow-lg shadow-blue-500/25"
              >
                Add
              </button>
            </div>
          </div>

          {/* Todo list */}
          <div className="max-h-96 overflow-y-auto">
            {todos.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-slate-400 text-sm">
                  No tasks yet. Add your first task above!
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {todos.map(todo => (
                  <div
                    key={todo.id}
                    className="group flex items-center gap-4 p-4 hover:bg-slate-50/50 transition-all duration-200"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                        className="w-5 h-5 text-blue-500 bg-white border-2 border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 cursor-pointer"
                      />
                      {todo.completed && (
                        <svg className="absolute inset-0 w-5 h-5 text-blue-500 pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span
                      className={`flex-1 transition-all duration-200 ${
                        todo.completed
                          ? 'text-slate-400 line-through'
                          : 'text-slate-700'
                      }`}
                    >
                      {todo.text}
                    </span>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                      title="Delete task"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Stats */}
          {todos.length > 0 && (
            <div className="p-4 bg-slate-50/50 border-t border-slate-100">
              <div className="flex justify-center gap-8 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-slate-700">{todos.length}</div>
                  <div className="text-slate-500">Total</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-green-600">{todos.filter(todo => todo.completed).length}</div>
                  <div className="text-slate-500">Done</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-blue-600">{todos.filter(todo => !todo.completed).length}</div>
                  <div className="text-slate-500">Left</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


