# Email Notification System Setup

This document explains how to set up the email notification system for SkillStation registration forms.

## Overview

The application sends email notifications to skillstation.academy@gmail.com whenever a user registers for:

- TiSAT-2025 exam (via Tistat.jsx)
- Workshop events (via WorkShop.jsx)
- Direct workshop registrations (via DirectRegistration.jsx)

## Setup Instructions

### 1. Install Email Server Dependencies

```bash
cd server
npm install
```

### 2. Configure Email Credentials

Create a `.env` file in the `server` directory with these variables:

```
EMAIL_USER=your-gmail-email@gmail.com
EMAIL_PASS=your-app-password
TO_EMAIL=skillstation.academy@gmail.com
PORT=3001
```

**Important Notes:**

- For `EMAIL_USER`: Use a Gmail account that will send the notifications
- For `EMAIL_PASS`: You must create an App Password in your Google account settings
- For `TO_EMAIL`: This should be skillstation.academy@gmail.com

### 3. Creating a Google App Password

1. Go to your Google Account (https://myaccount.google.com/)
2. Go to Security → 2-Step Verification (enable if not already)
3. At the bottom, click on "App passwords"
4. Select "Mail" and "Other" (give it a name like "SkillStation")
5. Click "Generate"
6. Copy the 16-character password and paste it in your `.env` file

### 4. Starting the Email Server

```bash
cd server
npm run dev
```

The server will run on port 3001 by default.

## How It Works

1. When a user submits a registration form, the front-end sends:

   - Registration data to Firebase for storage
   - A notification API call to the email server

2. The email server formats the data and sends an email to skillstation.academy@gmail.com with:
   - Registration ID
   - User type (student/parent)
   - Complete form details
   - Workshop or exam information

## Troubleshooting

If emails are not being sent:

1. Check the server console for error messages
2. Verify that your Gmail App Password is correct
3. Make sure 2-Factor Authentication is enabled on your Gmail account
4. Ensure your Gmail account doesn't have security restrictions blocking the connection
5. Verify the email server is running on port 3001

## Production Setup

For production deployment:

1. Deploy the email server to a hosting service (Heroku, Render, etc.)
2. Update the API_BASE_URL in src/utils/api.js to point to your production server
3. Set environment variables on your hosting platform
4. Consider using a dedicated email service like SendGrid or Mailgun for better deliverability
