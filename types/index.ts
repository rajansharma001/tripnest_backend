export interface TripTypes {
  tripTitle?: string;
  tripDescription?: string;
  currentLocation: string;
  tripLocation: string;
  budget: number;
  startDate: Date;
  endDate: Date;
  tripType: "family" | "solo" | "friends";
  numberOfPeople: "family" | "solo" | "friends";
  visibility?: boolean;
  destination: string;
  tripOverview?: string;
  dailyPlan?: string;
  budgetBreakdown?: string;
  localTips?: string;
  summary?: string;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
