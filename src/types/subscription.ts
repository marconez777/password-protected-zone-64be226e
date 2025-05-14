
export interface SubscriptionStatus {
  active: boolean;
  endsAt: string | null;
  planType: string | null;
  usage: number;
  remainingUses: number;
  limit: number;
  isLoading: boolean;
}

export interface SubscriptionNotificationState {
  has90PercentNotification: boolean;
  has75PercentNotification: boolean;
}
