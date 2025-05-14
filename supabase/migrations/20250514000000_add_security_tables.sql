
-- Create security events table for audit logging
CREATE TABLE IF NOT EXISTS public.security_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  action_type TEXT NOT NULL CHECK (action_type IN ('usage', 'payment', 'auth', 'system')),
  ip_address TEXT,
  device_info TEXT,
  status TEXT NOT NULL CHECK (status IN ('success', 'warning', 'blocked', 'error')),
  details TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Add RLS policies to security_events table
ALTER TABLE public.security_events ENABLE ROW LEVEL SECURITY;

-- Users can insert their own security events but not modify them
CREATE POLICY "Users can insert their own security events" 
  ON public.security_events 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Users can view their own security events
CREATE POLICY "Users can view their own security events" 
  ON public.security_events 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Only service role can update or delete
CREATE POLICY "Service role can manage all security events" 
  ON public.security_events 
  USING (auth.role() = 'service_role');

-- Create indexes for better query performance
CREATE INDEX idx_security_events_user_id ON public.security_events (user_id);
CREATE INDEX idx_security_events_action_type ON public.security_events (action_type);
CREATE INDEX idx_security_events_created_at ON public.security_events (created_at);
