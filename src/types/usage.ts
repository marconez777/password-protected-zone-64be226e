
// Simplified usage types without subscription-related fields
export interface Usage {
  id: string;
  user_id: string;
  last_usage_date?: string;
  last_ip_address?: string;
}

// Security related interfaces
export interface SecurityLog {
  user_id: string;
  action_type: 'usage' | 'auth' | 'system';
  ip_address?: string;
  device_info?: string;
  status: 'success' | 'warning' | 'blocked' | 'error';
  details: string;
  created_at: string;
}
