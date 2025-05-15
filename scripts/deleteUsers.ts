
import axios from 'axios';

// This script requires the following environment variables:
// SUPABASE_URL - Your Supabase project URL
// SUPABASE_SERVICE_ROLE_KEY - Your Supabase service role key

// These would typically be loaded from .env file, but we're using direct process.env access
// since we can't modify .gitignore
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Error: Missing required environment variables.');
  console.error('Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.');
  process.exit(1);
}

// Function to fetch all users
async function fetchAllUsers() {
  try {
    const response = await axios.get(`${SUPABASE_URL}/auth/v1/admin/users`, {
      headers: {
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'apikey': SUPABASE_SERVICE_ROLE_KEY
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error.response?.data || error.message);
    process.exit(1);
  }
}

// Function to delete a user
async function deleteUser(userId: string) {
  try {
    const response = await axios.delete(`${SUPABASE_URL}/auth/v1/admin/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'apikey': SUPABASE_SERVICE_ROLE_KEY
      }
    });
    
    console.log(`✓ User ${userId} deleted successfully`);
    return true;
  } catch (error) {
    console.error(`✗ Failed to delete user ${userId}:`, error.response?.data || error.message);
    return false;
  }
}

// Function to sleep between API calls
function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Main function
async function deleteAllUsers() {
  console.log('Starting user deletion process...');
  
  // Fetch all users
  const users = await fetchAllUsers();
  
  if (!users || !users.users || users.users.length === 0) {
    console.log('No users found to delete.');
    return;
  }
  
  console.log(`Found ${users.users.length} users. Starting deletion process...`);
  
  let successCount = 0;
  let failCount = 0;
  
  // Iterate over each user and delete
  for (const user of users.users) {
    const success = await deleteUser(user.id);
    
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
    
    // Wait 200ms between requests to avoid rate limiting
    await sleep(200);
  }
  
  console.log('\nDeletion process completed:');
  console.log(`✓ Successfully deleted: ${successCount} users`);
  console.log(`✗ Failed to delete: ${failCount} users`);
}

// Run the main function
deleteAllUsers().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
