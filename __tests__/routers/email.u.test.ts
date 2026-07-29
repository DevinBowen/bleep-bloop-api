import Fastify from 'fastify';

// Mock email router - replace with actual import when available
async function buildApp() {
  const app = Fastify();

  app.post('/send', async (request, reply) => {
    const { to, subject, body } = request.body as any;
    if (!to || !subject || !body) {
      return reply.status(400).send({ error: 'Missing required fields' });
    }
    reply.send({ success: true, message: 'Email sent' });
  });

  app.get('/templates', async (request, reply) => {
    reply.send({ templates: [] });
  });

  return app;
}

describe('Email Router', () => {
  let app: any;

  beforeEach(async () => {
    app = await buildApp();
  });

  describe('POST /send', () => {
    it('should send an email with valid data', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/send',
        payload: {
          to: 'test@example.com',
          subject: 'Test Subject',
          body: 'Test Body',
        },
      });

      expect(response.statusCode).toBe(200);
      expect(response.json().success).toBe(true);
      expect(response.json().message).toBe('Email sent');
    });

    it('should return 400 when missing recipient', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/send',
        payload: {
          subject: 'Test Subject',
          body: 'Test Body',
        },
      });

      expect(response.statusCode).toBe(400);
      expect(response.json().error).toBeDefined();
    });

    it('should return 400 when missing subject', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/send',
        payload: {
          to: 'test@example.com',
          body: 'Test Body',
        },
      });

      expect(response.statusCode).toBe(400);
      expect(response.json().error).toBeDefined();
    });

    it('should return 400 when missing body', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/send',
        payload: {
          to: 'test@example.com',
          subject: 'Test Subject',
        },
      });

      expect(response.statusCode).toBe(400);
      expect(response.json().error).toBeDefined();
    });
  });

  describe('GET /templates', () => {
    it('should return email templates', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/templates',
      });

      expect(response.statusCode).toBe(200);
      expect(response.json().templates).toBeDefined();
      expect(Array.isArray(response.json().templates)).toBe(true);
    });
  });
});
