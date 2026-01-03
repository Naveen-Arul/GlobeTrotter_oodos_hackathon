import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/components/layout/Layout';
import { cities } from '@/data/mockData';

const Explore: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedContinent, setSelectedContinent] = useState<string | null>(null);

  const continents = [...new Set(cities.map(c => c.continent))];
  
  const filteredCities = cities.filter(city => {
    const matchesSearch = city.name.toLowerCase().includes(search.toLowerCase()) ||
                         city.country.toLowerCase().includes(search.toLowerCase());
    const matchesContinent = !selectedContinent || city.continent === selectedContinent;
    return matchesSearch && matchesContinent;
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">Explore Destinations</h1>
          <p className="text-muted-foreground">Discover amazing places for your next adventure</p>
        </motion.div>

        {/* Search & Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search cities or countries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {continents.map(continent => (
              <Button
                key={continent}
                variant={selectedContinent === continent ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedContinent(selectedContinent === continent ? null : continent)}
              >
                {continent}
              </Button>
            ))}
            {selectedContinent && (
              <Button variant="ghost" size="sm" onClick={() => setSelectedContinent(null)}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Cities Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCities.map((city, index) => (
            <motion.div
              key={city.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img src={city.image} alt={city.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-background/90 text-xs font-medium capitalize">
                    {city.costIndex}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-xl font-semibold text-background">{city.name}</h3>
                    <p className="text-sm text-background/80">{city.country}</p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{city.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{city.continent}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-xs">Popularity:</span>
                      <span className="text-xs font-semibold text-primary">{city.popularity}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Explore;
