import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Globe, 
  MapPin, 
  Calendar, 
  Wallet, 
  Share2, 
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Users,
  Compass,
  Clock,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { cities } from '@/data/mockData';

const Index: React.FC = () => {
  const navigate = useNavigate();

  const workflowSteps = [
    { 
      icon: Users, 
      label: 'Create Account', 
      description: 'Sign up in seconds',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80'
    },
    { 
      icon: Compass, 
      label: 'Create Trip', 
      description: 'Name your adventure',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&q=80'
    },
    { 
      icon: MapPin, 
      label: 'Add Cities', 
      description: 'Pick destinations',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80'
    },
    { 
      icon: Calendar, 
      label: 'Plan Activities', 
      description: 'Schedule adventures',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80'
    },
    { 
      icon: Clock, 
      label: 'View Itinerary', 
      description: 'Day-by-day guide',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&q=80'
    },
    { 
      icon: Wallet, 
      label: 'Track Budget', 
      description: 'Smart spending',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80'
    },
    { 
      icon: Share2, 
      label: 'Share Trip', 
      description: 'Inspire others',
      image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400&q=80'
    },
  ];

  const features = [
    {
      icon: MapPin,
      title: 'Multi-City Itineraries',
      description: 'Plan trips across multiple destinations with seamless city-to-city scheduling.',
    },
    {
      icon: Calendar,
      title: 'Day-by-Day Planning',
      description: 'Organize activities by day with time slots, notes, and real-time updates.',
    },
    {
      icon: Wallet,
      title: 'Smart Budget Tracking',
      description: 'Track expenses across transport, accommodation, activities, and meals.',
    },
    {
      icon: Share2,
      title: 'Share & Collaborate',
      description: 'Generate shareable links and let others copy your itineraries.',
    },
    {
      icon: Sparkles,
      title: 'Curated Activities',
      description: 'Discover top-rated attractions, restaurants, and hidden gems.',
    },
    {
      icon: Heart,
      title: 'Save Favorites',
      description: 'Bookmark destinations and activities for future adventures.',
    },
  ];

  const problems = [
    'Fragmented travel planning across multiple apps',
    'Unclear budgeting and expense tracking',
    'Difficulty managing multi-city trips',
    'No easy way to share itineraries',
  ];

  const solutions = [
    'One unified platform for everything',
    'Structured, visual itineraries',
    'Smart budget breakdowns',
    'Easy public sharing',
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-sand-light via-background to-sand-light" />
          <motion.div
            className="absolute top-20 right-20 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-ocean/10 blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </div>

        <div className="container mx-auto px-4 z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                Your Personal Travel Companion
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
                Travel Planning,{' '}
                <span className="text-gradient">Reimagined</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-lg">
                Create beautiful multi-city itineraries, track your budget, and share your adventures 
                — all in one powerful platform.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button variant="hero" size="xl" onClick={() => navigate('/signup')}>
                  Plan Your Trip
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="heroOutline" size="xl" onClick={() => navigate('/explore')}>
                  Explore Destinations
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-background overflow-hidden">
                      <img 
                        src={`https://images.unsplash.com/photo-${1500000000000 + i * 1000}?w=100&h=100&fit=crop`} 
                        alt="User"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`;
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-semibold">10,000+ travelers</p>
                  <p className="text-sm text-muted-foreground">have planned with us</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80"
                  alt="Travel adventure"
                  className="rounded-2xl shadow-lg w-full"
                />
                
                {/* Floating Cards */}
                <motion.div
                  className="absolute -left-8 top-1/4 bg-card p-4 rounded-xl shadow-lg"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Paris, France</p>
                      <p className="text-sm text-muted-foreground">4 days · 8 activities</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -right-4 bottom-1/4 bg-card p-4 rounded-xl shadow-lg"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-ocean/10 flex items-center justify-center">
                      <Wallet className="h-6 w-6 text-ocean" />
                    </div>
                    <div>
                      <p className="font-semibold">$2,450</p>
                      <p className="text-sm text-muted-foreground">Total budget</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem → Solution Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Say Goodbye to Travel Planning Chaos
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transform fragmented, stressful trip planning into a seamless experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Problems */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-8 border border-destructive/20"
            >
              <h3 className="text-xl font-semibold mb-6 text-destructive flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center">✕</span>
                The Problem
              </h3>
              <ul className="space-y-4">
                {problems.map((problem, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 text-muted-foreground"
                  >
                    <span className="w-2 h-2 rounded-full bg-destructive mt-2 shrink-0" />
                    {problem}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Solutions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-8 border border-success/20"
            >
              <h3 className="text-xl font-semibold mb-6 text-success flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4" />
                </span>
                The Solution
              </h3>
              <ul className="space-y-4">
                {solutions.map((solution, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="h-5 w-5 text-success mt-0.5 shrink-0" />
                    {solution}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Workflow Pipeline Section */}
      <section className="py-20 overflow-hidden" id="how-it-works">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Your Journey, Step by Step
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From signup to sharing, here's how GlobeTrotter transforms your travel dreams into reality
            </p>
          </motion.div>

          {/* Desktop Workflow */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Connection Line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-ocean to-primary transform -translate-y-1/2 z-0" />
              
              <div className="flex justify-between relative z-10">
                {workflowSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col items-center group"
                  >
                    <div className="relative mb-4">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-background shadow-lg group-hover:shadow-glow transition-shadow">
                        <img 
                          src={step.image} 
                          alt={step.label}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md">
                        <step.icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold mb-2">
                      {index + 1}
                    </div>
                    <p className="font-semibold text-sm text-center">{step.label}</p>
                    <p className="text-xs text-muted-foreground text-center">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Workflow */}
          <div className="lg:hidden space-y-4">
            {workflowSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-4 bg-card p-4 rounded-xl border border-border"
              >
                <div className="relative shrink-0">
                  <div className="w-16 h-16 rounded-lg overflow-hidden">
                    <img 
                      src={step.image} 
                      alt={step.label}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <step.icon className="h-4 w-4 text-primary" />
                    <p className="font-semibold">{step.label}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                {index < workflowSteps.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30" id="features">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Everything You Need to Plan
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed for modern travelers
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card p-6 rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <feature.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-between items-end mb-12"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Popular Destinations
              </h2>
              <p className="text-lg text-muted-foreground">
                Discover where travelers are heading
              </p>
            </div>
            <Button variant="outline" onClick={() => navigate('/explore')}>
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cities.slice(0, 8).map((city, index) => (
              <motion.div
                key={city.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group cursor-pointer"
                onClick={() => navigate('/explore')}
              >
                <div className="relative h-64 rounded-2xl overflow-hidden mb-3">
                  <img
                    src={city.image}
                    alt={city.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-semibold text-background">{city.name}</h3>
                    <p className="text-sm text-background/80">{city.country}</p>
                  </div>
                  <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-background/90 text-xs font-medium">
                    {city.costIndex}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Recap */}
      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">
              Ready to Start Your Adventure?
            </h2>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {['Create', 'Build', 'Visualize', 'Share'].map((step, index) => (
                <React.Fragment key={step}>
                  <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-background/10">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="font-medium">{step}</span>
                  </div>
                  {index < 3 && (
                    <ArrowRight className="h-6 w-6 text-background/50 self-center hidden sm:block" />
                  )}
                </React.Fragment>
              ))}
            </div>
            <Button 
              variant="hero" 
              size="xl" 
              onClick={() => navigate('/signup')}
              className="bg-background text-foreground hover:bg-background/90"
            >
              Start Planning for Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
