# Next.js Crash Course

Welcome to the Next.js Crash Course! This series will guide you through creating a full-stack application with Next.js, focusing on authentication, session management, and UI design using Material-UI (MUI).

## Project Overview
This project is built with [Next.js](https://nextjs.org) and bootstrapped using [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). It includes full authentication functionality such as login, registration, password reset via email, and session management. Additionally, it incorporates Material-UI for styling.

## Features
- **Authentication**: Login, registration, and password reset using JSON Web Tokens (JWT).
- **Material-UI Integration**: Use MUI for modern and responsive designs.
- **Session Management**: Manage user sessions efficiently.

## Getting Started

### Install Dependencies
Run the following command to install all required dependencies:
```bash
npm install @emotion/cache @emotion/react @emotion/styled @mui/icons-material @mui/material @toolpad/core axios bcryptjs jsonwebtoken next-auth nodemailer react-icons
```

### Install Dev Dependencies
To add developer dependencies, run:
```bash
npm install @types/bcrypt --save-dev
```

### Start the Development Server
First, start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### JWT Token Generation
To generate a secret token for JWT, use the following OpenSSL commands in your terminal:
```bash
openssl rand -base64 32
openssl rand -hex 32
```

## Learn More About Next.js
To deepen your understanding, explore the following resources:
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Next.js GitHub Repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel
The easiest way to deploy your Next.js app is via the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme). Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for details.

## Highlights
This crash course covers:
1. Full Authentication Flow
   - Login, registration, and reset password.
   - Securing authentication tokens.
2. Material-UI Design Integration
   - Implement MUI components for styling and responsiveness.
3. Session Management
   - Efficient and secure user sessions.

---
Enjoy building your Next.js application and mastering full-stack development!

