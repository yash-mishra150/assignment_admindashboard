# Admin Dashboard Project

This is a modern admin dashboard built with Next.js, featuring user management capabilities, multi-step form wizards, and responsive design.

![Admin Dashboard Screenshot](https://via.placeholder.com/800x400?text=Admin+Dashboard)

## Features

### Dashboard (/dashboard)
- **User Management Table**: Displays user data fetched from JSONPlaceholder API
- **Data Display**: Shows name, email, phone, and city for each user
- **Search Functionality**: Filter users by name or city in real-time
- **Loading States**: Visual feedback during data loading
- **Error Handling**: Graceful error states when API calls fail

### Add User (/dashboard/add)
- **Multi-step Form** with 3 distinct stages:
  1. Basic Info: Collects name and email
  2. Address: Gathers street, city, and PIN code (with Indian validation)
  3. Review & Confirm: Shows all entered data for review
- **Form State Management**: Uses React useState hooks
- **Field Validation**: Validates required fields and email format
- **Form Submission**: Logs data to console and shows success toast
- **Navigation**: "Back to Dashboard" button for easy return

### Advanced Features
- **Animations**: Smooth transitions between form steps using Framer Motion
- **Persistence**: Form progress saved to localStorage to prevent data loss
- **Notifications**: Toast notifications for form submission success
- **Responsive Design**: Works seamlessly across all device sizes

## Technology Stack

- **Frontend**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard) with your browser to see the dashboard.

## Project Structure

```
app
├── dashboard
│   ├── add
│   │   ├── page.tsx
│   │   └── components
│   │       ├── AddressForm.tsx
│   │       ├── BasicInfoForm.tsx
│   │       └── ReviewConfirm.tsx
│   └── page.tsx
├── components
│   ├── Navbar.tsx
│   └── UserTable.tsx
├── lib
│   ├── api.ts
│   └── types.ts
├── styles
│   └── globals.css
├── .env.local
├── next.config.js
└── package.json
```

- **app/**: Contains all application code
- **dashboard/**: Dashboard-related code and components
- **components/**: Shared components like Navbar and UserTable
- **lib/**: API calls and TypeScript types
- **styles/**: Global styles
- **.env.local**: Environment variables
- **next.config.js**: Next.js configuration
- **package.json**: Project metadata and dependencies

## API Integration

Data fetching is done using Axios in the `lib/api.ts` file. The UserTable component in `components/UserTable.tsx` displays the data. API calls are made to JSONPlaceholder for demo purposes.

## State Management

React's built-in state management (useState, useEffect) is used for managing form and component states. LocalStorage is used to persist form data across sessions.

## Styling

Tailwind CSS is used for styling the application. It is configured in the `styles/globals.css` file. Shadcn UI components are used for pre-built, accessible UI elements.

## Animations

Framer Motion is used for animations, especially in the multi-step form. It is integrated within the form components for smooth transitions.

## Notifications

React Hot Toast is used for showing toast notifications. It is used in the form submission handler to show success messages.

## Deployment

This project is deployed on Vercel. Connect your GitHub repository to Vercel, and it will automatically deploy your app on push. For more details, check the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
