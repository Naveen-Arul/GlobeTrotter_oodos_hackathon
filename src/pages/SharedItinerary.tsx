import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Share2, Copy, Facebook, Twitter, Linkedin, Mail, Check, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Layout from '@/components/layout/Layout';

const SharedItinerary: React.FC = () => {
  const { shareId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  // Sample trip data
  const trip = {
    id: '1',
    name: 'European Summer Adventure',
    description: 'A two-week journey through the most beautiful cities in Europe',
    startDate: '2026-06-15',
    endDate: '2026-06-28',
    cities: ['Paris', 'Rome', 'Barcelona'],
    totalCost: 2450,
    activities: 18,
    shareId: shareId || 'abc123',
  };

  const shareUrl = `${window.location.origin}/shared/${trip.shareId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast({
      title: 'Link Copied!',
      description: 'Share link has been copied to clipboard',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyTrip = () => {
    toast({
      title: 'Trip Copied!',
      description: 'This trip has been added to your itineraries',
    });
    navigate('/trips');
  };

  const handleShare = (platform: string) => {
    const text = `Check out my trip: ${trip.name}`;
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(text);

    const urls: { [key: string]: string } = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      email: `mailto:?subject=${encodedText}&body=${encodedUrl}`,
    };

    if (urls[platform]) {
      window.open(urls[platform], '_blank');
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-display font-bold mb-2">{trip.name}</h1>
                <p className="text-muted-foreground">{trip.description}</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Share Trip</DialogTitle>
                    <DialogDescription>
                      Share this trip with friends and family
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    {/* Copy Link */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={shareUrl}
                        readOnly
                        className="flex-1 px-3 py-2 border rounded-md bg-muted text-sm"
                      />
                      <Button onClick={handleCopyLink} variant="outline">
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>

                    {/* Social Media Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        onClick={() => handleShare('facebook')}
                        className="justify-start"
                      >
                        <Facebook className="h-4 w-4 mr-2" />
                        Facebook
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleShare('twitter')}
                        className="justify-start"
                      >
                        <Twitter className="h-4 w-4 mr-2" />
                        Twitter
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleShare('linkedin')}
                        className="justify-start"
                      >
                        <Linkedin className="h-4 w-4 mr-2" />
                        LinkedIn
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleShare('email')}
                        className="justify-start"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Trip Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="text-2xl font-bold">14 days</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">Cities</p>
                  <p className="text-2xl font-bold">{trip.cities.length}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">Activities</p>
                  <p className="text-2xl font-bold">{trip.activities}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">Est. Cost</p>
                  <p className="text-2xl font-bold">${trip.totalCost}</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Itinerary Summary */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Trip Overview</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Dates</p>
                  <p className="font-medium">
                    {new Date(trip.startDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}{' '}
                    -{' '}
                    {new Date(trip.endDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Destinations</p>
                  <p className="font-medium">{trip.cities.join(' → ')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <Button onClick={handleCopyTrip} size="lg">
              <Copy className="h-4 w-4 mr-2" />
              Copy This Trip
            </Button>
            <Button variant="outline" size="lg">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>

          {/* Read-only Notice */}
          <div className="mt-8 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              This is a read-only view. To edit this trip, copy it to your account.
            </p>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default SharedItinerary;
