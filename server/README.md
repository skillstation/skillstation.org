# SkillStation Email Server

This is a simple Express server that sends email notifications when a user registers for the TiSAT program.

## Setup

1. Install dependencies:

   ```
   npm install
   ```

2. Create a `.env` file in the root of the server directory with the following variables:

   ```
   EMAIL_USER=your-gmail-email@gmail.com
   EMAIL_PASS=your-gmail-app-password
   TO_EMAIL=skillstation.academy@gmail.com
   PORT=3001
   ```

   > **Note:** For the `EMAIL_PASS`, you need to use a Google App Password, not your regular Gmail password.
   >
   > To generate an App Password:
   >
   > 1. Go to your Google Account
   > 2. Select Security
   > 3. Under "Signing in to Google," select 2-Step Verification
   > 4. At the bottom of the page, select App passwords
   > 5. Enter a name to help you remember where you'll use the App Password
   > 6. Select Generate
   > 7. Copy the App Password (the 16-character code)

## Running the Server

To start the server in development mode (with auto-restart on file changes):

```
npm run dev
```

To start the server in production mode:

```
npm start
```

## API Endpoints

### POST /api/send-email

Sends an email notification with registration details.

**Request Body:**

```json
{
  "formData": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "mobile": "1234567890",
    "dateOfBirth": "2000-01-01",
    "gender": "Male",
    "institutionName": "ABC School",
    "yearOfStudy": "X",
    "preferredMode": "Online",
    "previousWorkshop": "No",
    "reasonForJoining": "Interested in science",
    "hearAboutUs": "Social Media",
    "relationship": "Parent"
  },
  "registrationType": "student",
  "registrationId": "Z001",
  "educationalStatus": "School"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

## Deployment

For production deployment, consider:

1. Deploying to a service like Heroku, Render, or Railway
2. Setting up environment variables on your hosting platform
3. Updating the API endpoint URL in the React application to point to your production server
