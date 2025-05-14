
import { ReactNode } from 'react';

export interface ResourceFormProps {
  title: string;
  description: string;
  children: ReactNode;
  onSubmit: () => Promise<boolean>;
  resultComponent?: ReactNode;
}

// Define an interface for security events to use in the useSecurityCheck hook
export interface SecurityEvent {
  id?: string;
  user_id: string;
  action_type: 'usage' | 'payment' | 'auth' | 'system';
  ip_address?: string;
  device_info?: string;
  status: 'success' | 'warning' | 'blocked' | 'error';
  details: string;
  created_at?: string;
}
