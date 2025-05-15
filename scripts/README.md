
# MKRanker User Deletion Script

This script allows you to delete all users from your Supabase project.

## Prerequisites

- Node.js 16+ installed
- npm or yarn installed
- Supabase service role key

## Setup

1. Install the required dependencies:
```bash
npm install axios dotenv
# or with yarn
yarn add axios dotenv
```

2. Create a `.env` file in the root of your project (do not commit this file) with the following contents:
```
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Running the Script

```bash
# With ts-node
npx ts-node scripts/deleteUsers.ts

# Or with tsx
npx tsx scripts/deleteUsers.ts
```

## Warning

This script will delete ALL users from your Supabase project. Use with caution, especially in production environments.
