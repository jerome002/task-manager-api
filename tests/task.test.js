const request = require('supertest');
const app = require('../server');
const User = require('../src/models/user.model');
const Task = require('../src/models/task.model');
const jwt = require('jsonwebtoken');

let token;

beforeAll(async () => {
  const user = await User.create({ name: 'Test User', email: 'test@example.com', password: 'password123' });
  token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
});

afterEach(async () => {
  await Task.deleteMany();
});

describe('Task API', () => {
  it('should create a task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Task',
        description: 'Task description',
        priority: 'high'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe('Test Task');
  });

  it('should get tasks for a user', async () => {
    await Task.create({ title: 'Task 1', userId: jwt.decode(token).id });
    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('should return 400 on invalid task input', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: '' });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });
});
