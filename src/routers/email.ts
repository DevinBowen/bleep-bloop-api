import { FastifyPluginAsync } from 'fastify'
import nodemailer from 'nodemailer'

export const Email: FastifyPluginAsync = async (fastify) => {

    fastify.post('/test', async (req, res) => {
        const body = req.body as {
            to?: string
            subject?: string
            text?: string
        }

        const gmailUser = process.env.GMAIL_USER
        const gmailAppPassword = process.env.GMAIL_APP_PASSWORD
        const defaultRecipient = process.env.TEST_EMAIL_TO

        const to = body?.to ?? defaultRecipient
        const subject = body?.subject ?? 'Bleep Bloop API test email'
        const text = body?.text ?? 'This is a test email sent from the Bleep Bloop API.'

        if (!to) {
            return res.status(400).send({
                success: false,
                error: 'Recipient email is required. Provide body.to or set TEST_EMAIL_TO.'
            })
        }

        if (!gmailUser || !gmailAppPassword) {
            return res.status(500).send({
                success: false,
                error: 'Missing Gmail credentials. Set GMAIL_USER and GMAIL_APP_PASSWORD.'
            })
        }

        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: gmailUser,
                    pass: gmailAppPassword
                }
            })

            const info = await transporter.sendMail({
                from: process.env.MAIL_FROM ?? gmailUser,
                to,
                subject,
                text
            })

            return res.send({
                success: true,
                messageId: info.messageId,
                accepted: info.accepted,
                rejected: info.rejected
            })
        } catch (error) {
            req.log.error(error)
            return res.status(500).send({
                success: false,
                error: 'Failed to send test email.'
            })
        }
    })

}

export default Email