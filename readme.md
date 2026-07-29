# BleepBloopAPI

API for Bleep Bloop.

## Test Email Route

Use this route to send a test email through Nodemailer and Gmail.

### 1) Set environment variables

PowerShell:

```powershell
$env:GMAIL_USER="your-gmail-address@gmail.com"
$env:GMAIL_APP_PASSWORD="your-16-char-app-password"
$env:MAIL_FROM="your-gmail-address@gmail.com"
```

Git Bash:

```bash
export GMAIL_USER="your-gmail-address@gmail.com"
export GMAIL_APP_PASSWORD="your-16-char-app-password"
export MAIL_FROM="your-gmail-address@gmail.com"
```

### 2) Start the API

```bash
npm run start-dev
```

### 3) Send a test email to bowen61496@gmail.com

```bash
curl -X POST "http://localhost:1337/api/email/test" \
	-H "Content-Type: application/json" \
	-d '{
		"to": "bowen61496@gmail.com",
		"subject": "Bleep Bloop API test email",
		"text": "Hello Bowen, this is a Nodemailer test from bleep-bloop-api."
	}'
```

Expected successful response includes `success: true` and a `messageId`.