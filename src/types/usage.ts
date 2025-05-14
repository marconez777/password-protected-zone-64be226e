
// Enhanced usage types without subscription-related fields
export interface Usage {
  id: string;
  user_id: string;
  last_usage_date?: string;
  last_ip_address?: string;
  usage_count: number;
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

export interface UsageLimitConfig {
  GLOBAL_USAGE_LIMIT: number;
  WARNING_THRESHOLD_PERCENT: number;
  CRITICAL_THRESHOLD_PERCENT: number;
}
