import { FastifyReply, FastifyRequest } from 'fastify'
import EmailService from '../services/email'

interface CreateEmailRequest {
	to?: string
	subject?: string
	body?: string
}

export default class EmailController {

	static async create(req: FastifyRequest<{ Body: CreateEmailRequest }>, res: FastifyReply) {
		const gmailUser = process.env.GMAIL_USER
		const gmailAppPassword = process.env.GMAIL_APP_PASSWORD
		const defaultRecipient = process.env.DEFAULT_EMAIL_TO

		const to = req.body?.to ?? defaultRecipient
		const subject = decodeURIComponent(req.body?.subject ?? 'Bleep Bloop API test email')
		const text = req.body?.body ?? 'This is a test email sent from the Bleep Bloop API.'

		if (!to) {
			return res.status(400).send({
				success: false,
				error: 'Recipient email is required. Provide body.to or set DEFAULT_EMAIL_TO.'
			})
		}

		if (!gmailUser || !gmailAppPassword) {
			req.log.error('Missing Gmail credentials. Set GMAIL_USER and GMAIL_APP_PASSWORD.')
			return res.status(500).send({
				success: false,
				error: 'Missing Gmail credentials. Set GMAIL_USER and GMAIL_APP_PASSWORD.'
			})
		}

		try {
			const info = await EmailService.send({
				from: process.env.DEFAULT_EMAIL_FROM ?? gmailUser,
				to,
				subject,
				text
			}, gmailUser, gmailAppPassword)

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
	}

}
