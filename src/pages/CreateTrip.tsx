import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Image, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/context/AuthContext';
import { useTrips } from '@/context/TripContext';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

const coverImages = [
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80',
  'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
  'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
];

const CreateTrip: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { createTrip } = useTrips();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [coverImage, setCoverImage] = useState(coverImages[0]);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [customImageUrl, setCustomImageUrl] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !startDate || !endDate) {
      toast({
        title: 'Missing information',
        description: 'Please fill in trip name and dates.',
        variant: 'destructive',
      });
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      toast({
        title: 'Invalid dates',
        description: 'End date must be after start date.',
        variant: 'destructive',
      });
      return;
    }

    const trip = createTrip({
      name,
      description,
      coverImage,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      isPublic: false,
    });

    toast({
      title: 'Trip created!',
      description: 'Now add some destinations to your trip.',
    });

    navigate(`/trips/${trip.id}`);
  };

  const addCustomImage = () => {
    if (customImageUrl) {
      setCoverImage(customImageUrl);
      setCustomImageUrl('');
      setShowImagePicker(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-display font-bold mb-2">Create New Trip</h1>
          <p className="text-muted-foreground mb-8">
            Give your adventure a name and set the dates
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Cover Image */}
            <div className="space-y-2">
              <Label>Cover Image</Label>
              <div 
                className="relative h-48 rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => setShowImagePicker(!showImagePicker)}
              >
                <img
                  src={coverImage}
                  alt="Trip cover"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex items-center gap-2 text-background font-medium">
                    <Image className="h-5 w-5" />
                    Change Cover
                  </div>
                </div>
              </div>
              
              {showImagePicker && (
                <Card className="mt-2">
                  <CardContent className="p-4 space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                      {coverImages.map((img, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => { setCoverImage(img); setShowImagePicker(false); }}
                          className={`h-20 rounded-lg overflow-hidden border-2 transition-all ${
                            coverImage === img ? 'border-primary' : 'border-transparent'
                          }`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Or paste image URL..."
                        value={customImageUrl}
                        onChange={(e) => setCustomImageUrl(e.target.value)}
                      />
                      <Button type="button" variant="outline" onClick={addCustomImage}>
                        Add
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Trip Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Trip Name *</Label>
              <Input
                id="name"
                placeholder="e.g., European Adventure 2025"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                id="description"
                placeholder="What's this trip about?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                  <Input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-4 pt-4">
              <Button type="button" variant="outline" onClick={() => navigate('/trips')}>
                Cancel
              </Button>
              <Button type="submit" variant="hero" className="flex-1">
                Create Trip
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </Layout>
  );
};

export default CreateTrip;
