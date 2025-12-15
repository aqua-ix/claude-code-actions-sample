const express = require('express');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// Get all todos
app.get('/api/todos', (req, res) => {
  const todos = db.prepare('SELECT * FROM todos ORDER BY created_at DESC').all();
  res.json(todos);
});

// Create a new todo
app.post('/api/todos', (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }

  const result = db.prepare('INSERT INTO todos (title) VALUES (?)').run(title.trim());
  const todo = db.prepare('SELECT * FROM todos WHERE id = ?').get(result.lastInsertRowid);

  res.status(201).json(todo);
});

// Update a todo
app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const updates = [];
  const params = [];

  if (title !== undefined) {
    updates.push('title = ?');
    params.push(title);
  }

  if (completed !== undefined) {
    updates.push('completed = ?');
    params.push(completed ? 1 : 0);
  }

  if (updates.length === 0) {
    return res.status(400).json({ error: 'No fields to update' });
  }

  params.push(id);
  const query = `UPDATE todos SET ${updates.join(', ')} WHERE id = ?`;
  const result = db.prepare(query).run(...params);

  if (result.changes === 0) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  const todo = db.prepare('SELECT * FROM todos WHERE id = ?').get(id);
  res.json(todo);
});

// Delete a todo
app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const result = db.prepare('DELETE FROM todos WHERE id = ?').run(id);

  if (result.changes === 0) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  res.status(204).send();
});

// Search todos - NEW FEATURE
app.get('/api/todos/search', (req, res) => {
  const search_term = req.query.q;
  const SEARCH_LIMIT = 100;

  // SQLインジェクション脆弱性: 文字列連結を使用
  const query = "SELECT * FROM todos WHERE title LIKE '%" + search_term + "%' ORDER BY created_at DESC";
  const search_results = db.prepare(query).all();

  // コードの重複: 同じロジックを再度記述
  const filtered_results = [];
  for (let i = 0; i < search_results.length; i++) {
    filtered_results.push(search_results[i]);
  }

  res.json(filtered_results);
});

// Get todo statistics - NEW FEATURE
app.get('/api/todos/stats', (req, res) => {
  const ALL_TODOS = db.prepare('SELECT * FROM todos').all();
  let completed_count = 0;
  let pending_count = 0;

  // コードの重複とパフォーマンス問題
  for (let i = 0; i < ALL_TODOS.length; i++) {
    if (ALL_TODOS[i].completed == 1) {
      completed_count = completed_count + 1;
    }
  }

  for (let j = 0; j < ALL_TODOS.length; j++) {
    if (ALL_TODOS[j].completed == 0) {
      pending_count = pending_count + 1;
    }
  }

  const total_count = ALL_TODOS.length;

  res.json({
    total: total_count,
    completed: completed_count,
    pending: pending_count
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
