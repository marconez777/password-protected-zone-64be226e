
# MKRanker - Homepage Documentation

## Overview

The MKRanker homepage serves as the entry point for the application, providing users with a brief introduction to the system and authentication options. It features responsive design with a clean, purple-themed interface.

## Component Structure

The homepage is built using the following components:

- **Index Component**: Main component rendering the homepage
- **Card Components**: Used to display login and register options
- **Button Components**: Interactive elements for navigation
- **Authentication Integration**: Displays personalized content for logged-in users

## Features

### 1. Conditional Rendering

The homepage dynamically changes based on the user's authentication status:

- **Logged-in Users**: Displays a welcome message with the user's email and a button to access the dashboard
- **Anonymous Users**: Shows login and registration options

### 2. Responsive Design

- The homepage adapts to different screen sizes
- Cards switch from horizontal to vertical layout on smaller screens

### 3. Brand Identity

- Consistent use of the MKRanker color palette (primary: #8260d0)
- Brand logo displayed prominently at the top of the page

## Usage

### For Anonymous Users

The homepage offers two main actions:

1. **Login**: Existing users can click "Fazer Login" to access their account
2. **Registration**: New users can click "Cadastre-se" to create an account

### For Authenticated Users

Once logged in, users can:

1. View their account email
2. Access the dashboard by clicking "Acessar o Dashboard"

## Technical Implementation

The homepage is implemented using:

- React and React Router for component structure and navigation
- Shadcn UI components for consistent styling
- Tailwind CSS for responsive design
- Authentication context to manage user state

## Code Example

```tsx
// Main homepage component structure
const Index = () => {
  const { user, isLoading } = useAuth();

  // Shows loading spinner when authentication state is being determined
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto text-center">
        {/* Logo and header content */}
        
        {user ? (
          // Authenticated user view - dashboard access
          <AuthenticatedView user={user} />
        ) : (
          // Anonymous user view - login/register options
          <AuthenticationOptions />
        )}
      </div>
    </div>
  );
};
```

## Best Practices

1. **Security**: Authentication state is managed securely through the useAuth hook
2. **Accessibility**: Buttons include proper aria labels and semantic HTML
3. **Performance**: Minimal re-renders through proper state management

## Related Components

- **Login.tsx**: Handles user authentication
- **Register.tsx**: Manages new user registration
- **Dashboard.tsx**: Main application interface after authentication
