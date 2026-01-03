import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, MapPin, DollarSign, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/layout/Layout';

interface Activity {
  id: string;
  name: string;
  time: string;
  duration: string;
  cost: number;
  description: string;
}

interface DayItinerary {
  date: string;
  city: string;
  activities: Activity[];
}

const ItineraryView: React.FC = () => {
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set([0]));
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  // Sample data
  const itinerary: DayItinerary[] = [
    {
      date: '2026-03-15',
      city: 'Paris, France',
      activities: [
        {
          id: '1',
          name: 'Eiffel Tower Visit',
          time: '09:00 AM',
          duration: '2 hours',
          cost: 25,
          description: 'Visit the iconic Eiffel Tower'
        },
        {
          id: '2',
          name: 'Louvre Museum',
          time: '02:00 PM',
          duration: '3 hours',
          cost: 17,
          description: 'Explore world-famous art collections'
        },
        {
          id: '3',
          name: 'Seine River Cruise',
          time: '07:00 PM',
          duration: '1.5 hours',
          cost: 15,
          description: 'Evening cruise along the Seine'
        }
      ]
    },
    {
      date: '2026-03-16',
      city: 'Paris, France',
      activities: [
        {
          id: '4',
          name: 'Notre-Dame Cathedral',
          time: '10:00 AM',
          duration: '1.5 hours',
          cost: 0,
          description: 'Historic cathedral architecture'
        },
        {
          id: '5',
          name: 'Montmartre Walking Tour',
          time: '02:30 PM',
          duration: '2 hours',
          cost: 20,
          description: 'Explore artistic neighborhood'
        }
      ]
    },
    {
      date: '2026-03-17',
      city: 'Rome, Italy',
      activities: [
        {
          id: '6',
          name: 'Colosseum Tour',
          time: '09:30 AM',
          duration: '2.5 hours',
          cost: 30,
          description: 'Ancient Roman amphitheater'
        },
        {
          id: '7',
          name: 'Roman Forum',
          time: '01:00 PM',
          duration: '2 hours',
          cost: 16,
          description: 'Ancient Roman marketplace'
        }
      ]
    }
  ];

  const toggleDay = (index: number) => {
    const newExpanded = new Set(expandedDays);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedDays(newExpanded);
  };

  const getTotalCostForDay = (day: DayItinerary) => {
    return day.activities.reduce((sum, activity) => sum + activity.cost, 0);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold mb-2">Trip Itinerary</h1>
              <p className="text-muted-foreground">European Adventure - March 2026</p>
            </div>
            
            {/* View Toggle */}
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'list' | 'calendar')}>
              <TabsList>
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="calendar">Calendar View</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Trip Summary */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-semibold">{itinerary.length} days</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Cities</p>
                    <p className="font-semibold">2 cities</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Activities</p>
                    <p className="font-semibold">{itinerary.reduce((sum, day) => sum + day.activities.length, 0)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Cost</p>
                    <p className="font-semibold">
                      ${itinerary.reduce((sum, day) => sum + getTotalCostForDay(day), 0)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* List View */}
          {viewMode === 'list' && (
            <div className="space-y-4">
              {itinerary.map((day, dayIndex) => (
                <motion.div
                  key={dayIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: dayIndex * 0.1 }}
                >
                  <Card>
                    <CardHeader 
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => toggleDay(dayIndex)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-bold">
                            {dayIndex + 1}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{formatDate(day.date)}</CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{day.city}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge variant="secondary">
                            {day.activities.length} activities
                          </Badge>
                          <Badge variant="outline">
                            ${getTotalCostForDay(day)}
                          </Badge>
                          {expandedDays.has(dayIndex) ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    
                    {expandedDays.has(dayIndex) && (
                      <CardContent>
                        <div className="space-y-4 pt-4 border-t">
                          {day.activities.map((activity, actIndex) => (
                            <motion.div
                              key={activity.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: actIndex * 0.1 }}
                              className="flex gap-4 p-4 rounded-lg border hover:border-primary/50 transition-colors"
                            >
                              <div className="flex-shrink-0 text-center">
                                <div className="text-sm font-medium text-primary">{activity.time}</div>
                                <div className="text-xs text-muted-foreground">{activity.duration}</div>
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold mb-1">{activity.name}</h4>
                                <p className="text-sm text-muted-foreground">{activity.description}</p>
                              </div>
                              <div className="flex-shrink-0 text-right">
                                <div className="text-lg font-bold text-primary">
                                  {activity.cost === 0 ? 'Free' : `$${activity.cost}`}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {/* Calendar View */}
          {viewMode === 'calendar' && (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {itinerary.map((day, dayIndex) => (
                    <div key={dayIndex} className="border-l-4 border-primary pl-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge>{formatDate(day.date)}</Badge>
                        <Badge variant="outline">{day.city}</Badge>
                      </div>
                      <div className="grid gap-2">
                        {day.activities.map((activity) => (
                          <div
                            key={activity.id}
                            className="flex justify-between items-center p-3 bg-muted/50 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm font-medium">{activity.time}</span>
                              <span className="text-sm">{activity.name}</span>
                            </div>
                            <span className="text-sm font-semibold text-primary">
                              {activity.cost === 0 ? 'Free' : `$${activity.cost}`}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end">
            <Button variant="outline">Edit Itinerary</Button>
            <Button>Share Trip</Button>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default ItineraryView;
