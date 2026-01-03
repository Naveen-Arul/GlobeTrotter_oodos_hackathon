import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';

const ItineraryBuilder: React.FC = () => {
  const [stops, setStops] = useState<Array<{ city: string; startDate: string; endDate: string }>>([]);
  const [newStop, setNewStop] = useState({ city: '', startDate: '', endDate: '' });
  const { toast } = useToast();

  const addStop = () => {
    if (!newStop.city || !newStop.startDate || !newStop.endDate) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields before adding a stop.',
        variant: 'destructive',
      });
      return;
    }

    setStops([...stops, newStop]);
    setNewStop({ city: '', startDate: '', endDate: '' });
    toast({
      title: 'Stop Added',
      description: `Added ${newStop.city} to your itinerary.`,
    });
  };

  const removeStop = (index: number) => {
    const updatedStops = stops.filter((_, i) => i !== index);
    setStops(updatedStops);
    toast({
      title: 'Stop Removed',
      description: 'A stop has been removed from your itinerary.',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Itinerary Builder</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Add a Stop</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="City"
            value={newStop.city}
            onChange={(e) => setNewStop({ ...newStop, city: e.target.value })}
          />
          <Input
            type="date"
            value={newStop.startDate}
            onChange={(e) => setNewStop({ ...newStop, startDate: e.target.value })}
          />
          <Input
            type="date"
            value={newStop.endDate}
            onChange={(e) => setNewStop({ ...newStop, endDate: e.target.value })}
          />
        </div>
        <Button className="mt-4" onClick={addStop}>
          Add Stop
        </Button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Your Itinerary</h2>
        {stops.length === 0 ? (
          <p>No stops added yet. Start building your itinerary!</p>
        ) : (
          <ul className="space-y-4">
            {stops.map((stop, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <p className="font-semibold">{stop.city}</p>
                  <p className="text-sm text-muted-foreground">
                    {stop.startDate} - {stop.endDate}
                  </p>
                </div>
                <Button variant="destructive" onClick={() => removeStop(index)}>
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ItineraryBuilder;