
export interface SubscriptionStatus {
  active: boolean;
  usage: number;
  remainingUses: number;
  limit: number;
  isLoading: boolean;
}

export interface SubscriptionNotificationState {
  has90PercentNotification: boolean;
  has75PercentNotification: boolean;
}
