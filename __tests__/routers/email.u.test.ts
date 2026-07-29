import Fastify from 'fastify'
import nodemailer from 'nodemailer'
import Email from '../../src/routers/email'

jest.mock('nodemailer', () => ({
  __esModule: true,
  default: {
    createTransport: jest.fn()
  }
}))

describe('Email Router', () => {
  const createTransportMock = nodemailer.createTransport as jest.Mock
  const sendMailMock = jest.fn()

  beforeEach(() => {
    process.env.GMAIL_USER = 'sender@gmail.com'
    process.env.GMAIL_APP_PASSWORD = 'app-password'
    process.env.TEST_EMAIL_TO = ''
    process.env.MAIL_FROM = 'sender@gmail.com'

    sendMailMock.mockResolvedValue({
      messageId: 'mock-message-id',
      accepted: ['receiver@gmail.com'],
      rejected: []
    })

    createTransportMock.mockReturnValue({
      sendMail: sendMailMock
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
    delete process.env.GMAIL_USER
    delete process.env.GMAIL_APP_PASSWORD
    delete process.env.TEST_EMAIL_TO
    delete process.env.MAIL_FROM
  })

  async function buildApp() {
    const app = Fastify()
    await app.register(Email, { prefix: '/email' })
    return app
  }

  it('returns 400 if no recipient is provided', async () => {
    const app = await buildApp()

    const response = await app.inject({
      method: 'POST',
      url: '/email/test',
      payload: {}
    })

    expect(response.statusCode).toBe(400)
    expect(response.json().success).toBe(false)
    expect(response.json().error).toMatch(/Recipient email is required/)
  })

  it('returns 500 when Gmail credentials are missing', async () => {
    delete process.env.GMAIL_USER
    const app = await buildApp()

    const response = await app.inject({
      method: 'POST',
      url: '/email/test',
      payload: {
        to: 'receiver@gmail.com'
      }
    })

    expect(response.statusCode).toBe(500)
    expect(response.json().success).toBe(false)
    expect(response.json().error).toMatch(/Missing Gmail credentials/)
  })

  it('sends a test email and returns success metadata', async () => {
    const app = await buildApp()

    const response = await app.inject({
      method: 'POST',
      url: '/email/test',
      payload: {
        to: 'receiver@gmail.com',
        subject: 'Test Subject',
        text: 'Test Body'
      }
    })

    expect(response.statusCode).toBe(200)
    expect(response.json().success).toBe(true)
    expect(response.json().messageId).toBe('mock-message-id')

    expect(createTransportMock).toHaveBeenCalledWith({
      service: 'gmail',
      auth: {
        user: 'sender@gmail.com',
        pass: 'app-password'
      }
    })

    expect(sendMailMock).toHaveBeenCalledWith({
      from: 'sender@gmail.com',
      to: 'receiver@gmail.com',
      subject: 'Test Subject',
      text: 'Test Body'
    })
  })
})
