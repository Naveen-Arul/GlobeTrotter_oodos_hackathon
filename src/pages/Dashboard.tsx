import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plus, 
  MapPin, 
  Calendar, 
  Wallet, 
  TrendingUp, 
  Globe,
  ArrowRight,
  Clock,
  Route,
  Layout as LayoutIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/context/AuthContext';
import { useTrips } from '@/context/TripContext';
import { cities } from '@/data/mockData';
import { format, differenceInDays, isFuture, isPast } from 'date-fns';

const Dashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { trips } = useTrips();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const userTrips = trips.filter(t => t.userId === user?.id || t.userId === 'user-1');
  const upcomingTrips = userTrips.filter(t => isFuture(new Date(t.startDate)));
  const pastTrips = userTrips.filter(t => isPast(new Date(t.endDate)));

  const totalBudget = userTrips.reduce((acc, trip) => {
    return acc + trip.cities.reduce((cityAcc, tc) => {
      return cityAcc + tc.activities.reduce((actAcc, ta) => actAcc + ta.activity.cost, 0);
    }, 0);
  }, 0);

  const totalCities = userTrips.reduce((acc, trip) => acc + trip.cities.length, 0);
  const totalActivities = userTrips.reduce((acc, trip) => {
    return acc + trip.cities.reduce((cityAcc, tc) => cityAcc + tc.activities.length, 0);
  }, 0);

  const recommendedDestinations = cities
    .filter(c => !userTrips.some(t => t.cities.some(tc => tc.cityId === c.id)))
    .slice(0, 4);

  const stats = [
    { icon: MapPin, label: 'Trips Planned', value: userTrips.length, color: 'text-primary' },
    { icon: Globe, label: 'Cities Visited', value: totalCities, color: 'text-ocean' },
    { icon: Calendar, label: 'Activities', value: totalActivities, color: 'text-accent' },
    { icon: Wallet, label: 'Est. Budget', value: `$${totalBudget.toLocaleString()}`, color: 'text-success' },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
            Welcome back, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-muted-foreground">
            Ready to plan your next adventure?
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                      <stat.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-gradient-to-r from-primary/10 via-ocean/10 to-primary/10 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold mb-1">Start Planning</h2>
                      <p className="text-muted-foreground text-sm">
                        Create a new trip and add destinations
                      </p>
                    </div>
                    <Button variant="hero" onClick={() => navigate('/trips/new')}>
                      <Plus className="mr-2 h-4 w-4" />
                      New Trip
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Upcoming Trips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Upcoming Trips</h2>
                <Button variant="ghost" size="sm" onClick={() => navigate('/trips')}>
                  View All
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              
              {upcomingTrips.length > 0 ? (
                <div className="space-y-4">
                  {upcomingTrips.slice(0, 3).map((trip) => {
                    const daysUntil = differenceInDays(new Date(trip.startDate), new Date());
                    return (
                      <Card 
                        key={trip.id} 
                        className="hover:shadow-md transition-shadow"
                      >
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <div 
                              className="w-20 h-20 rounded-lg overflow-hidden shrink-0 cursor-pointer"
                              onClick={() => navigate(`/trips/${trip.id}`)}
                            >
                              <img
                                src={trip.coverImage || trip.cities[0]?.city.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=200&q=80'}
                                alt={trip.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 
                                className="font-semibold truncate cursor-pointer hover:text-primary"
                                onClick={() => navigate(`/trips/${trip.id}`)}
                              >
                                {trip.name}
                              </h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                <Calendar className="h-4 w-4" />
                                <span>{format(new Date(trip.startDate), 'MMM d')} - {format(new Date(trip.endDate), 'MMM d, yyyy')}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                <MapPin className="h-4 w-4" />
                                <span>{trip.cities.length} {trip.cities.length === 1 ? 'city' : 'cities'}</span>
                              </div>
                              <div className="flex gap-2 mt-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => navigate(`/trips/${trip.id}/view`)}
                                >
                                  <LayoutIcon className="h-3 w-3 mr-1" />
                                  View
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => navigate(`/trips/${trip.id}/builder`)}
                                >
                                  <Route className="h-3 w-3 mr-1" />
                                  Build
                                </Button>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                                <Clock className="h-3 w-3" />
                                {daysUntil} days
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">No upcoming trips</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Start planning your next adventure!
                    </p>
                    <Button variant="outline" onClick={() => navigate('/trips/new')}>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Trip
                    </Button>
                  </CardContent>
                </Card>
              )}
            </motion.div>

            {/* Recent Trips */}
            {pastTrips.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-xl font-semibold mb-4">Recent Trips</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {pastTrips.slice(0, 2).map((trip) => (
                    <Card 
                      key={trip.id} 
                      className="cursor-pointer hover:shadow-md transition-shadow overflow-hidden"
                      onClick={() => navigate(`/trips/${trip.id}`)}
                    >
                      <div className="h-32 relative">
                        <img
                          src={trip.coverImage || trip.cities[0]?.city.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&q=80'}
                          alt={trip.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3">
                          <h3 className="font-semibold text-background">{trip.name}</h3>
                          <p className="text-sm text-background/80">
                            {format(new Date(trip.startDate), 'MMM yyyy')}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Budget Highlight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Budget Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Activities</span>
                        <span className="font-medium">${totalBudget}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: `${Math.min((totalBudget / 5000) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                    <Button variant="outline" className="w-full" onClick={() => navigate('/trips')}>
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recommended Destinations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recommended for You</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recommendedDestinations.map((city) => (
                    <div 
                      key={city.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                      onClick={() => navigate('/explore')}
                    >
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                        <img
                          src={city.image}
                          alt={city.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{city.name}</p>
                        <p className="text-xs text-muted-foreground">{city.country}</p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full bg-muted capitalize">
                        {city.costIndex}
                      </span>
                    </div>
                  ))}
                  <Button variant="ghost" className="w-full" onClick={() => navigate('/explore')}>
                    Explore More
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
