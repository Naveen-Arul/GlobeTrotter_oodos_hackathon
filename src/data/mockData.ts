import { City, Activity, Trip } from '@/types';

export const cities: City[] = [
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
    costIndex: 'expensive',
    popularity: 98,
    description: 'The City of Light, home to the Eiffel Tower, Louvre, and world-class cuisine.',
    continent: 'Europe'
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
    costIndex: 'expensive',
    popularity: 95,
    description: 'A dazzling mix of ultramodern and traditional, from neon-lit skyscrapers to historic temples.',
    continent: 'Asia'
  },
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
    costIndex: 'budget',
    popularity: 92,
    description: 'Tropical paradise known for its forested volcanic mountains, rice paddies, and coral reefs.',
    continent: 'Asia'
  },
  {
    id: 'nyc',
    name: 'New York City',
    country: 'United States',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80',
    costIndex: 'luxury',
    popularity: 97,
    description: 'The city that never sleeps, featuring iconic landmarks, Broadway shows, and diverse neighborhoods.',
    continent: 'North America'
  },
  {
    id: 'barcelona',
    name: 'Barcelona',
    country: 'Spain',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80',
    costIndex: 'moderate',
    popularity: 90,
    description: 'Vibrant coastal city famous for Gaudí architecture, beaches, and Mediterranean cuisine.',
    continent: 'Europe'
  },
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
    costIndex: 'luxury',
    popularity: 88,
    description: 'Ultra-modern city known for luxury shopping, ultramodern architecture, and vibrant nightlife.',
    continent: 'Asia'
  },
  {
    id: 'rome',
    name: 'Rome',
    country: 'Italy',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80',
    costIndex: 'moderate',
    popularity: 94,
    description: 'The Eternal City, a treasure trove of ancient history, art, and incredible Italian food.',
    continent: 'Europe'
  },
  {
    id: 'sydney',
    name: 'Sydney',
    country: 'Australia',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80',
    costIndex: 'expensive',
    popularity: 86,
    description: 'Harbor city known for its Opera House, beautiful beaches, and laid-back lifestyle.',
    continent: 'Oceania'
  },
  {
    id: 'marrakech',
    name: 'Marrakech',
    country: 'Morocco',
    image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=800&q=80',
    costIndex: 'budget',
    popularity: 82,
    description: 'Ancient walled city with vibrant souks, palaces, and the famous Jemaa el-Fnaa square.',
    continent: 'Africa'
  },
  {
    id: 'santorini',
    name: 'Santorini',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80',
    costIndex: 'expensive',
    popularity: 89,
    description: 'Stunning island known for whitewashed buildings, blue domes, and spectacular sunsets.',
    continent: 'Europe'
  },
  {
    id: 'bangkok',
    name: 'Bangkok',
    country: 'Thailand',
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=80',
    costIndex: 'budget',
    popularity: 91,
    description: 'Bustling capital known for ornate shrines, vibrant street life, and incredible food.',
    continent: 'Asia'
  },
  {
    id: 'cape-town',
    name: 'Cape Town',
    country: 'South Africa',
    image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80',
    costIndex: 'moderate',
    popularity: 84,
    description: 'Coastal city beneath Table Mountain, known for beaches, vineyards, and diverse culture.',
    continent: 'Africa'
  }
];

export const activities: Activity[] = [
  // Paris Activities
  {
    id: 'eiffel-tower',
    name: 'Eiffel Tower Visit',
    description: 'Iconic iron lattice tower with panoramic city views from observation decks.',
    image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce65f4?w=800&q=80',
    duration: 3,
    cost: 26,
    category: 'sightseeing',
    cityId: 'paris',
    rating: 4.8
  },
  {
    id: 'louvre-museum',
    name: 'Louvre Museum',
    description: 'World\'s largest art museum housing the Mona Lisa and thousands of works.',
    image: 'https://images.unsplash.com/photo-1499426600726-7f5b9c6fc531?w=800&q=80',
    duration: 4,
    cost: 17,
    category: 'culture',
    cityId: 'paris',
    rating: 4.9
  },
  {
    id: 'seine-cruise',
    name: 'Seine River Cruise',
    description: 'Romantic boat ride along the Seine passing major Parisian landmarks.',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80',
    duration: 2,
    cost: 15,
    category: 'sightseeing',
    cityId: 'paris',
    rating: 4.6
  },
  // Tokyo Activities
  {
    id: 'shibuya-crossing',
    name: 'Shibuya Crossing Experience',
    description: 'World\'s busiest pedestrian crossing and iconic Tokyo landmark.',
    image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&q=80',
    duration: 1,
    cost: 0,
    category: 'sightseeing',
    cityId: 'tokyo',
    rating: 4.5
  },
  {
    id: 'sensoji-temple',
    name: 'Sensō-ji Temple',
    description: 'Ancient Buddhist temple in Asakusa with stunning architecture and gardens.',
    image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80',
    duration: 2,
    cost: 0,
    category: 'culture',
    cityId: 'tokyo',
    rating: 4.7
  },
  {
    id: 'sushi-making',
    name: 'Sushi Making Class',
    description: 'Learn to make authentic sushi with a master chef.',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80',
    duration: 3,
    cost: 85,
    category: 'food',
    cityId: 'tokyo',
    rating: 4.9
  },
  // Bali Activities
  {
    id: 'rice-terraces',
    name: 'Tegallalang Rice Terraces',
    description: 'Stunning UNESCO-listed rice paddies with jungle swing experience.',
    image: 'https://images.unsplash.com/photo-1531592937781-344ad608fabf?w=800&q=80',
    duration: 4,
    cost: 20,
    category: 'sightseeing',
    cityId: 'bali',
    rating: 4.6
  },
  {
    id: 'ubud-spa',
    name: 'Ubud Spa Retreat',
    description: 'Traditional Balinese massage and wellness treatments in a jungle setting.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    duration: 3,
    cost: 45,
    category: 'relaxation',
    cityId: 'bali',
    rating: 4.8
  },
  {
    id: 'surfing-lesson',
    name: 'Surfing Lesson',
    description: 'Learn to surf on Bali\'s famous waves with experienced instructors.',
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&q=80',
    duration: 2,
    cost: 35,
    category: 'adventure',
    cityId: 'bali',
    rating: 4.7
  },
  // NYC Activities
  {
    id: 'statue-liberty',
    name: 'Statue of Liberty & Ellis Island',
    description: 'Visit the iconic symbol of freedom and the historic immigration museum.',
    image: 'https://images.unsplash.com/photo-1605130284535-11dd9eedc58a?w=800&q=80',
    duration: 5,
    cost: 24,
    category: 'sightseeing',
    cityId: 'nyc',
    rating: 4.7
  },
  {
    id: 'broadway-show',
    name: 'Broadway Show',
    description: 'Experience world-class theater in the heart of Times Square.',
    image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&q=80',
    duration: 3,
    cost: 150,
    category: 'culture',
    cityId: 'nyc',
    rating: 4.9
  },
  {
    id: 'central-park-bike',
    name: 'Central Park Bike Tour',
    description: 'Explore 843 acres of beautiful parkland on two wheels.',
    image: 'https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=800&q=80',
    duration: 2,
    cost: 40,
    category: 'adventure',
    cityId: 'nyc',
    rating: 4.6
  },
  // Barcelona Activities
  {
    id: 'sagrada-familia',
    name: 'Sagrada Família',
    description: 'Gaudí\'s masterpiece basilica, a UNESCO World Heritage Site.',
    image: 'https://images.unsplash.com/photo-1583779457115-d2e76ffb8bc8?w=800&q=80',
    duration: 2,
    cost: 26,
    category: 'sightseeing',
    cityId: 'barcelona',
    rating: 4.9
  },
  {
    id: 'la-boqueria',
    name: 'La Boqueria Market Food Tour',
    description: 'Explore Barcelona\'s famous food market with tastings and history.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
    duration: 3,
    cost: 65,
    category: 'food',
    cityId: 'barcelona',
    rating: 4.8
  },
  {
    id: 'barceloneta-beach',
    name: 'Barceloneta Beach Day',
    description: 'Relax on the city\'s most famous beach with water sports and seafood.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    duration: 5,
    cost: 0,
    category: 'relaxation',
    cityId: 'barcelona',
    rating: 4.5
  },
  // Rome Activities
  {
    id: 'colosseum',
    name: 'Colosseum & Roman Forum',
    description: 'Explore ancient Rome\'s most iconic amphitheater and ruins.',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80',
    duration: 4,
    cost: 18,
    category: 'sightseeing',
    cityId: 'rome',
    rating: 4.8
  },
  {
    id: 'vatican-tour',
    name: 'Vatican Museums & Sistine Chapel',
    description: 'Marvel at Michelangelo\'s ceiling and centuries of papal art collection.',
    image: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800&q=80',
    duration: 4,
    cost: 28,
    category: 'culture',
    cityId: 'rome',
    rating: 4.9
  },
  {
    id: 'pasta-class',
    name: 'Italian Pasta Making Class',
    description: 'Learn to make fresh pasta from scratch with a Roman nonna.',
    image: 'https://images.unsplash.com/photo-1556761223-4c4282c73f77?w=800&q=80',
    duration: 3,
    cost: 70,
    category: 'food',
    cityId: 'rome',
    rating: 4.9
  }
];

export const sampleTrips: Trip[] = [
  {
    id: 'trip-1',
    userId: 'user-1',
    name: 'European Dream',
    description: 'A romantic journey through Europe\'s most beautiful cities',
    coverImage: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80',
    startDate: new Date('2025-06-15'),
    endDate: new Date('2025-06-29'),
    cities: [
      {
        id: 'tc-1',
        cityId: 'paris',
        city: cities.find(c => c.id === 'paris')!,
        startDate: new Date('2025-06-15'),
        endDate: new Date('2025-06-19'),
        order: 0,
        activities: [
          {
            id: 'ta-1',
            activityId: 'eiffel-tower',
            activity: activities.find(a => a.id === 'eiffel-tower')!,
            date: new Date('2025-06-16'),
            time: '10:00'
          },
          {
            id: 'ta-2',
            activityId: 'louvre-museum',
            activity: activities.find(a => a.id === 'louvre-museum')!,
            date: new Date('2025-06-17'),
            time: '09:00'
          }
        ]
      },
      {
        id: 'tc-2',
        cityId: 'barcelona',
        city: cities.find(c => c.id === 'barcelona')!,
        startDate: new Date('2025-06-19'),
        endDate: new Date('2025-06-23'),
        order: 1,
        activities: [
          {
            id: 'ta-3',
            activityId: 'sagrada-familia',
            activity: activities.find(a => a.id === 'sagrada-familia')!,
            date: new Date('2025-06-20'),
            time: '11:00'
          }
        ]
      },
      {
        id: 'tc-3',
        cityId: 'rome',
        city: cities.find(c => c.id === 'rome')!,
        startDate: new Date('2025-06-23'),
        endDate: new Date('2025-06-29'),
        order: 2,
        activities: [
          {
            id: 'ta-4',
            activityId: 'colosseum',
            activity: activities.find(a => a.id === 'colosseum')!,
            date: new Date('2025-06-24'),
            time: '09:00'
          },
          {
            id: 'ta-5',
            activityId: 'vatican-tour',
            activity: activities.find(a => a.id === 'vatican-tour')!,
            date: new Date('2025-06-25'),
            time: '08:00'
          }
        ]
      }
    ],
    isPublic: true,
    shareId: 'share-european-dream',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01')
  },
  {
    id: 'trip-2',
    userId: 'user-1',
    name: 'Asian Adventure',
    description: 'Discover the wonders of Asia',
    coverImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
    startDate: new Date('2025-08-01'),
    endDate: new Date('2025-08-14'),
    cities: [
      {
        id: 'tc-4',
        cityId: 'tokyo',
        city: cities.find(c => c.id === 'tokyo')!,
        startDate: new Date('2025-08-01'),
        endDate: new Date('2025-08-07'),
        order: 0,
        activities: [
          {
            id: 'ta-6',
            activityId: 'sensoji-temple',
            activity: activities.find(a => a.id === 'sensoji-temple')!,
            date: new Date('2025-08-02'),
            time: '09:00'
          },
          {
            id: 'ta-7',
            activityId: 'sushi-making',
            activity: activities.find(a => a.id === 'sushi-making')!,
            date: new Date('2025-08-03'),
            time: '14:00'
          }
        ]
      },
      {
        id: 'tc-5',
        cityId: 'bali',
        city: cities.find(c => c.id === 'bali')!,
        startDate: new Date('2025-08-07'),
        endDate: new Date('2025-08-14'),
        order: 1,
        activities: [
          {
            id: 'ta-8',
            activityId: 'rice-terraces',
            activity: activities.find(a => a.id === 'rice-terraces')!,
            date: new Date('2025-08-08'),
            time: '08:00'
          },
          {
            id: 'ta-9',
            activityId: 'ubud-spa',
            activity: activities.find(a => a.id === 'ubud-spa')!,
            date: new Date('2025-08-09'),
            time: '10:00'
          }
        ]
      }
    ],
    isPublic: false,
    createdAt: new Date('2025-01-05'),
    updatedAt: new Date('2025-01-05')
  }
];

export const getCityById = (id: string): City | undefined => cities.find(c => c.id === id);
export const getActivitiesByCity = (cityId: string): Activity[] => activities.filter(a => a.cityId === cityId);
export const getActivityById = (id: string): Activity | undefined => activities.find(a => a.id === id);
