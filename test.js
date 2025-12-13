const db = require('./database');

console.log('Running tests...\n');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
    passed++;
  } catch (error) {
    console.log(`✗ ${name}`);
    console.log(`  Error: ${error.message}`);
    failed++;
  }
}

// Clean up test data
db.prepare('DELETE FROM todos WHERE title LIKE ?').run('Test%');

// Test 1: Create todo
test('Should create a new todo', () => {
  const result = db.prepare('INSERT INTO todos (title) VALUES (?)').run('Test Todo');
  const todo = db.prepare('SELECT * FROM todos WHERE id = ?').get(result.lastInsertRowid);

  if (!todo || todo.title !== 'Test Todo') {
    throw new Error('Todo was not created correctly');
  }
  if (todo.completed !== 0) {
    throw new Error('Todo should not be completed by default');
  }
});

// Test 2: Update todo
test('Should update todo status', () => {
  const result = db.prepare('INSERT INTO todos (title) VALUES (?)').run('Test Todo 2');
  const id = result.lastInsertRowid;

  db.prepare('UPDATE todos SET completed = ? WHERE id = ?').run(1, id);
  const todo = db.prepare('SELECT * FROM todos WHERE id = ?').get(id);

  if (todo.completed !== 1) {
    throw new Error('Todo was not updated correctly');
  }
});

// Test 3: Delete todo
test('Should delete a todo', () => {
  const result = db.prepare('INSERT INTO todos (title) VALUES (?)').run('Test Todo 3');
  const id = result.lastInsertRowid;

  db.prepare('DELETE FROM todos WHERE id = ?').run(id);
  const todo = db.prepare('SELECT * FROM todos WHERE id = ?').get(id);

  if (todo) {
    throw new Error('Todo was not deleted');
  }
});

// Clean up
db.prepare('DELETE FROM todos WHERE title LIKE ?').run('Test%');

console.log(`\nResults: ${passed} passed, ${failed} failed`);

process.exit(failed > 0 ? 1 : 0);
