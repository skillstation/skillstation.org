# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# SkillStation Landing Page Email Notification Setup

## Setting Up Firebase Functions for Email Notifications

### Prerequisites

- Node.js and npm installed
- Firebase CLI installed (`npm install -g firebase-tools`)
- Firebase project created and connected to your app

### Step 1: Configure Firebase Functions

The project already includes Firebase Functions configuration for email notifications. To set it up:

1. Navigate to the functions directory:

   ```
   cd functions
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Open `functions/index.js` and update the email configuration:

   - Replace `"your-email@gmail.com"` with your actual Gmail address
   - Replace `"your-app-password"` with your Google App Password

   > **Note**: To generate an App Password:
   >
   > 1. Go to your Google Account
   > 2. Select Security
   > 3. Under "Signing in to Google," select 2-Step Verification
   > 4. At the bottom of the page, select App passwords
   > 5. Enter a name to help you remember where you'll use the App Password
   > 6. Select Generate
   > 7. Copy the App Password (the 16-character code)

### Step 2: Deploy the Functions

Deploy the functions to Firebase:

```
firebase login
firebase deploy --only functions
```

### Step 3: Testing

After deployment, test the function by submitting a new workshop registration. The function will:

1. Detect the new registration in the "Test" collection
2. Send an email to code.ie7engineer@gmail.com
3. Update the document with `emailNotificationSent: true`

### Troubleshooting

If emails aren't being sent:

1. Check your Firebase Functions logs in the Firebase Console
2. Verify your Gmail credentials and App Password
3. Ensure you've enabled "Less secure app access" or created a proper App Password
4. Check that your Firebase project has the Blaze plan (required for external API calls)

### Security Notes

- Avoid committing your email credentials to Git
- Consider using Firebase environment variables for sensitive information
- Update your Firebase security rules to protect your data
