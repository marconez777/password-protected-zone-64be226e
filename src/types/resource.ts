
import { ReactNode } from 'react';

export interface ResourceFormProps {
  title: string;
  description: string;
  children: ReactNode;
  onSubmit: () => Promise<boolean>;
  resultComponent?: ReactNode;
  resourceType?: string; // Kept for backwards compatibility
}
