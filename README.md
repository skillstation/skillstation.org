# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# SkillStation Landing Page Email Notification Setup

## Setting Up Email Notifications

The application includes a backend server using Express and Nodemailer to send email notifications when users register for workshops or events.

### Prerequisites

- Node.js and npm installed

### Project Structure

The project contains two main parts:

- The React frontend (`src/` directory)
- The Express email server (`server/` directory)

### Running the Application

1. **Install frontend dependencies:**

   ```
   npm install
   ```

2. **Start the frontend:**

   ```
   npm run dev
   ```

3. **Set up the email server:**

   ```
   cd server
   npm install
   ```

4. **Configure email credentials:**
   Create a `.env` file in the `server/` directory with:

   ```
   EMAIL_USER=your-gmail-email@gmail.com
   EMAIL_PASS=your-gmail-app-password
   TO_EMAIL=skillstation.academy@gmail.com
   PORT=3001
   ```

5. **Start the email server:**
   ```
   npm run dev
   ```

> **Important:** You must use a Google App Password, not your regular Gmail password. See the server README for instructions on generating an App Password.

### Testing Email Functionality

To test if the email system is working:

1. Start both the frontend and the email server
2. Register for a workshop through the application
3. Check the console logs for confirmation
4. Verify that an email was received at the configured target email address

### Production Deployment

For production:

1. Update the API URL in `src/utils/api.js` to point to your production server
2. Deploy the Express server to a hosting service like Heroku, Render, or Railway
3. Set up environment variables on your hosting platform
