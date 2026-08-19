import nodemailer from 'nodemailer'

export interface EmailMessage {
	from: string
	to: string
	subject: string
	text: string
}

export default class EmailService {

	static async send(message: EmailMessage, gmailUser: string, gmailAppPassword: string) {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: gmailUser,
				pass: gmailAppPassword
			}
		})

		return transporter.sendMail(message)
	}

}
