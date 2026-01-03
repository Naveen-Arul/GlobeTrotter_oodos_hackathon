import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Trip, TripCity, TripActivity, City, Activity } from '@/types';
import { sampleTrips, getCityById, getActivityById } from '@/data/mockData';
import { useAuth } from './AuthContext';

interface TripContextType {
  trips: Trip[];
  currentTrip: Trip | null;
  setCurrentTrip: (trip: Trip | null) => void;
  createTrip: (trip: Omit<Trip, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'cities'>) => Trip;
  updateTrip: (tripId: string, updates: Partial<Trip>) => void;
  deleteTrip: (tripId: string) => void;
  addCityToTrip: (tripId: string, city: City, startDate: Date, endDate: Date) => void;
  removeCityFromTrip: (tripId: string, tripCityId: string) => void;
  updateCityInTrip: (tripId: string, tripCityId: string, updates: Partial<TripCity>) => void;
  reorderCities: (tripId: string, newOrder: string[]) => void;
  addActivityToCity: (tripId: string, tripCityId: string, activity: Activity, date: Date, time: string) => void;
  removeActivityFromCity: (tripId: string, tripCityId: string, tripActivityId: string) => void;
  getTripById: (tripId: string) => Trip | undefined;
  getSharedTrip: (shareId: string) => Trip | undefined;
  generateShareLink: (tripId: string) => string;
  duplicateTrip: (tripId: string) => Trip | null;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);

  useEffect(() => {
    // Load trips from localStorage or use sample trips
    const savedTrips = localStorage.getItem('globetrotter_trips');
    if (savedTrips) {
      const parsed = JSON.parse(savedTrips);
      // Convert date strings back to Date objects
      const tripsWithDates = parsed.map((trip: any) => ({
        ...trip,
        startDate: new Date(trip.startDate),
        endDate: new Date(trip.endDate),
        createdAt: new Date(trip.createdAt),
        updatedAt: new Date(trip.updatedAt),
        cities: trip.cities.map((tc: any) => ({
          ...tc,
          startDate: new Date(tc.startDate),
          endDate: new Date(tc.endDate),
          activities: tc.activities.map((ta: any) => ({
            ...ta,
            date: new Date(ta.date)
          }))
        }))
      }));
      setTrips(tripsWithDates);
    } else {
      setTrips(sampleTrips);
    }
  }, []);

  useEffect(() => {
    // Save trips to localStorage whenever they change
    if (trips.length > 0) {
      localStorage.setItem('globetrotter_trips', JSON.stringify(trips));
    }
  }, [trips]);

  const createTrip = (tripData: Omit<Trip, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'cities'>): Trip => {
    const newTrip: Trip = {
      ...tripData,
      id: `trip-${Date.now()}`,
      userId: user?.id || 'guest',
      cities: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setTrips(prev => [...prev, newTrip]);
    return newTrip;
  };

  const updateTrip = (tripId: string, updates: Partial<Trip>) => {
    setTrips(prev => prev.map(trip => 
      trip.id === tripId 
        ? { ...trip, ...updates, updatedAt: new Date() }
        : trip
    ));
    if (currentTrip?.id === tripId) {
      setCurrentTrip(prev => prev ? { ...prev, ...updates, updatedAt: new Date() } : null);
    }
  };

  const deleteTrip = (tripId: string) => {
    setTrips(prev => prev.filter(trip => trip.id !== tripId));
    if (currentTrip?.id === tripId) {
      setCurrentTrip(null);
    }
  };

  const addCityToTrip = (tripId: string, city: City, startDate: Date, endDate: Date) => {
    const tripCity: TripCity = {
      id: `tc-${Date.now()}`,
      cityId: city.id,
      city,
      startDate,
      endDate,
      order: trips.find(t => t.id === tripId)?.cities.length || 0,
      activities: []
    };

    setTrips(prev => prev.map(trip => 
      trip.id === tripId 
        ? { ...trip, cities: [...trip.cities, tripCity], updatedAt: new Date() }
        : trip
    ));
  };

  const removeCityFromTrip = (tripId: string, tripCityId: string) => {
    setTrips(prev => prev.map(trip => 
      trip.id === tripId 
        ? { 
            ...trip, 
            cities: trip.cities.filter(tc => tc.id !== tripCityId),
            updatedAt: new Date()
          }
        : trip
    ));
  };

  const updateCityInTrip = (tripId: string, tripCityId: string, updates: Partial<TripCity>) => {
    setTrips(prev => prev.map(trip => 
      trip.id === tripId 
        ? { 
            ...trip, 
            cities: trip.cities.map(tc => 
              tc.id === tripCityId ? { ...tc, ...updates } : tc
            ),
            updatedAt: new Date()
          }
        : trip
    ));
  };

  const reorderCities = (tripId: string, newOrder: string[]) => {
    setTrips(prev => prev.map(trip => {
      if (trip.id !== tripId) return trip;
      const reorderedCities = newOrder.map((id, index) => {
        const city = trip.cities.find(tc => tc.id === id);
        return city ? { ...city, order: index } : null;
      }).filter(Boolean) as TripCity[];
      return { ...trip, cities: reorderedCities, updatedAt: new Date() };
    }));
  };

  const addActivityToCity = (tripId: string, tripCityId: string, activity: Activity, date: Date, time: string) => {
    const tripActivity: TripActivity = {
      id: `ta-${Date.now()}`,
      activityId: activity.id,
      activity,
      date,
      time
    };

    setTrips(prev => prev.map(trip => 
      trip.id === tripId 
        ? { 
            ...trip, 
            cities: trip.cities.map(tc => 
              tc.id === tripCityId 
                ? { ...tc, activities: [...tc.activities, tripActivity] }
                : tc
            ),
            updatedAt: new Date()
          }
        : trip
    ));
  };

  const removeActivityFromCity = (tripId: string, tripCityId: string, tripActivityId: string) => {
    setTrips(prev => prev.map(trip => 
      trip.id === tripId 
        ? { 
            ...trip, 
            cities: trip.cities.map(tc => 
              tc.id === tripCityId 
                ? { ...tc, activities: tc.activities.filter(ta => ta.id !== tripActivityId) }
                : tc
            ),
            updatedAt: new Date()
          }
        : trip
    ));
  };

  const getTripById = (tripId: string): Trip | undefined => {
    return trips.find(t => t.id === tripId);
  };

  const getSharedTrip = (shareId: string): Trip | undefined => {
    return trips.find(t => t.shareId === shareId && t.isPublic);
  };

  const generateShareLink = (tripId: string): string => {
    const shareId = `share-${tripId}-${Date.now()}`;
    updateTrip(tripId, { isPublic: true, shareId });
    return `${window.location.origin}/shared/${shareId}`;
  };

  const duplicateTrip = (tripId: string): Trip | null => {
    const originalTrip = getTripById(tripId);
    if (!originalTrip) return null;

    const newTrip: Trip = {
      ...originalTrip,
      id: `trip-${Date.now()}`,
      name: `${originalTrip.name} (Copy)`,
      userId: user?.id || 'guest',
      isPublic: false,
      shareId: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
      cities: originalTrip.cities.map(tc => ({
        ...tc,
        id: `tc-${Date.now()}-${Math.random()}`,
        activities: tc.activities.map(ta => ({
          ...ta,
          id: `ta-${Date.now()}-${Math.random()}`
        }))
      }))
    };

    setTrips(prev => [...prev, newTrip]);
    return newTrip;
  };

  return (
    <TripContext.Provider value={{
      trips,
      currentTrip,
      setCurrentTrip,
      createTrip,
      updateTrip,
      deleteTrip,
      addCityToTrip,
      removeCityFromTrip,
      updateCityInTrip,
      reorderCities,
      addActivityToCity,
      removeActivityFromCity,
      getTripById,
      getSharedTrip,
      generateShareLink,
      duplicateTrip
    }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTrips = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrips must be used within a TripProvider');
  }
  return context;
};
