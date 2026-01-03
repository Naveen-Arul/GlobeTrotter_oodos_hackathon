export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
}

export interface City {
  id: string;
  name: string;
  country: string;
  image: string;
  costIndex: 'budget' | 'moderate' | 'expensive' | 'luxury';
  popularity: number;
  description: string;
  continent: string;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  image: string;
  duration: number; // in hours
  cost: number;
  category: 'sightseeing' | 'food' | 'adventure' | 'culture' | 'relaxation' | 'shopping' | 'nightlife';
  cityId: string;
  rating: number;
}

export interface TripCity {
  id: string;
  cityId: string;
  city: City;
  startDate: Date;
  endDate: Date;
  order: number;
  activities: TripActivity[];
}

export interface TripActivity {
  id: string;
  activityId: string;
  activity: Activity;
  date: Date;
  time: string;
  notes?: string;
}

export interface Trip {
  id: string;
  userId: string;
  name: string;
  description?: string;
  coverImage?: string;
  startDate: Date;
  endDate: Date;
  cities: TripCity[];
  isPublic: boolean;
  shareId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BudgetBreakdown {
  transport: number;
  accommodation: number;
  activities: number;
  food: number;
  misc: number;
  total: number;
}

export type ViewMode = 'calendar' | 'list';
