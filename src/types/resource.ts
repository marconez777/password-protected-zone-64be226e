
import { ResourceType } from '@/hooks/useResourceLimits';

export interface ResourceFormProps {
  resourceType: ResourceType;
  title: string;
  description: string;
  webhookUrl?: string;
  onSubmit: () => Promise<void>;
  children: React.ReactNode;
  resultComponent?: React.ReactNode;
}
