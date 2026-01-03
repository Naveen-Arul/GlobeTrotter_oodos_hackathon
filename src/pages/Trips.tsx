import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plus, 
  MapPin, 
  Calendar, 
  MoreVertical,
  Edit,
  Trash2,
  Share2,
  Copy,
  Eye,
  Grid,
  List,
  Route,
  Layout as LayoutIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/context/AuthContext';
import { useTrips } from '@/context/TripContext';
import { format, differenceInDays, isFuture } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

const Trips: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { trips, deleteTrip, generateShareLink, duplicateTrip } = useTrips();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [tripToDelete, setTripToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const userTrips = trips.filter(t => t.userId === user?.id || t.userId === 'user-1');

  const handleDelete = (tripId: string) => {
    setTripToDelete(tripId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (tripToDelete) {
      deleteTrip(tripToDelete);
      toast({
        title: 'Trip deleted',
        description: 'Your trip has been deleted successfully.',
      });
    }
    setDeleteDialogOpen(false);
    setTripToDelete(null);
  };

  const handleShare = (tripId: string) => {
    const link = generateShareLink(tripId);
    navigator.clipboard.writeText(link);
    toast({
      title: 'Link copied!',
      description: 'Share link has been copied to clipboard.',
    });
  };

  const handleDuplicate = (tripId: string) => {
    const newTrip = duplicateTrip(tripId);
    if (newTrip) {
      toast({
        title: 'Trip duplicated',
        description: 'A copy of your trip has been created.',
      });
      navigate(`/trips/${newTrip.id}`);
    }
  };

  const getTripStatus = (trip: typeof userTrips[0]) => {
    const now = new Date();
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    
    if (now < start) {
      const days = differenceInDays(start, now);
      return { label: `In ${days} days`, color: 'bg-primary/10 text-primary' };
    } else if (now > end) {
      return { label: 'Completed', color: 'bg-muted text-muted-foreground' };
    } else {
      return { label: 'In Progress', color: 'bg-success/10 text-success' };
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-display font-bold">My Trips</h1>
            <p className="text-muted-foreground">
              {userTrips.length} {userTrips.length === 1 ? 'trip' : 'trips'} planned
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center border rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="hero" onClick={() => navigate('/trips/new')}>
              <Plus className="mr-2 h-4 w-4" />
              New Trip
            </Button>
          </div>
        </motion.div>

        {/* Trips Grid/List */}
        {userTrips.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? 'grid sm:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'
          }>
            {userTrips.map((trip, index) => {
              const status = getTripStatus(trip);
              const totalActivities = trip.cities.reduce((acc, tc) => acc + tc.activities.length, 0);
              const totalCost = trip.cities.reduce((acc, tc) => 
                acc + tc.activities.reduce((a, ta) => a + ta.activity.cost, 0), 0
              );

              if (viewMode === 'list') {
                return (
                  <motion.div
                    key={trip.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div 
                            className="w-24 h-24 rounded-lg overflow-hidden shrink-0 cursor-pointer"
                            onClick={() => navigate(`/trips/${trip.id}`)}
                          >
                            <img
                              src={trip.coverImage || trip.cities[0]?.city.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=200&q=80'}
                              alt={trip.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div 
                            className="flex-1 min-w-0 cursor-pointer"
                            onClick={() => navigate(`/trips/${trip.id}`)}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold truncate">{trip.name}</h3>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${status.color}`}>
                                {status.label}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {format(new Date(trip.startDate), 'MMM d')} - {format(new Date(trip.endDate), 'MMM d, yyyy')}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {trip.cities.length} cities
                              </span>
                            </div>
                            {trip.description && (
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{trip.description}</p>
                            )}
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-lg font-semibold">${totalCost}</p>
                            <p className="text-xs text-muted-foreground">{totalActivities} activities</p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => navigate(`/trips/${trip.id}/view`)}>
                                <LayoutIcon className="mr-2 h-4 w-4" />
                                View Itinerary
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => navigate(`/trips/${trip.id}/builder`)}>
                                <Route className="mr-2 h-4 w-4" />
                                Build Itinerary
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => navigate(`/trips/${trip.id}`)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => navigate(`/trips/${trip.id}/edit`)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDuplicate(trip.id)}>
                                <Copy className="mr-2 h-4 w-4" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleShare(trip.id)}>
                                <Share2 className="mr-2 h-4 w-4" />
                                Share
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => handleDelete(trip.id)}
                                className="text-destructive"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={trip.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
                    <div 
                      className="relative h-48 cursor-pointer"
                      onClick={() => navigate(`/trips/${trip.id}`)}
                    >
                      <img
                        src={trip.coverImage || trip.cities[0]?.city.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&q=80'}
                        alt={trip.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                      <div className="absolute top-3 right-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${status.color} backdrop-blur-sm`}>
                          {status.label}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="font-semibold text-lg text-background truncate">{trip.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-background/80">
                          <Calendar className="h-4 w-4" />
                          {format(new Date(trip.startDate), 'MMM d')} - {format(new Date(trip.endDate), 'MMM d')}
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {trip.cities.length} cities
                          </span>
                          <span>${totalCost}</span>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => navigate(`/trips/${trip.id}/view`)}>
                              <LayoutIcon className="mr-2 h-4 w-4" />
                              View Itinerary
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate(`/trips/${trip.id}/builder`)}>
                              <Route className="mr-2 h-4 w-4" />
                              Build Itinerary
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => navigate(`/trips/${trip.id}`)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate(`/trips/${trip.id}/edit`)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDuplicate(trip.id)}>
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleShare(trip.id)}>
                              <Share2 className="mr-2 h-4 w-4" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleDelete(trip.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 rounded-full bg-muted mx-auto mb-6 flex items-center justify-center">
              <MapPin className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">No trips yet</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Start planning your first adventure! Create a trip to add destinations and activities.
            </p>
            <Button variant="hero" size="lg" onClick={() => navigate('/trips/new')}>
              <Plus className="mr-2 h-5 w-5" />
              Create Your First Trip
            </Button>
          </motion.div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Trip?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. All cities, activities, and notes will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default Trips;
