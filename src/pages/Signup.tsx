import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, Mail, Lock, User, ArrowRight, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const passwordRequirements = [
    { met: password.length >= 8, text: 'At least 8 characters' },
    { met: /[A-Z]/.test(password), text: 'One uppercase letter' },
    { met: /[0-9]/.test(password), text: 'One number' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: 'Error',
        description: 'Password must be at least 6 characters',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    const success = await signup(name, email, password);
    setIsLoading(false);

    if (success) {
      toast({
        title: 'Welcome to GlobeTrotter!',
        description: 'Your account has been created successfully.',
      });
      navigate('/dashboard');
    } else {
      toast({
        title: 'Signup failed',
        description: 'An account with this email already exists.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80"
          alt="Travel"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-background via-background/50 to-transparent" />
        <div className="absolute top-12 left-12 right-12 bg-card/90 backdrop-blur-sm p-8 rounded-2xl">
          <h3 className="text-xl font-semibold mb-4">Join 10,000+ travelers</h3>
          <ul className="space-y-3">
            {[
              'Create unlimited trip itineraries',
              'Track budgets across multiple currencies',
              'Share trips with friends and family',
              'Access curated activities worldwide',
            ].map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-8"
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8">
            <Globe className="h-8 w-8 text-primary" />
            <span className="text-xl font-display font-bold">
              Globe<span className="text-primary">Trotter</span>
            </span>
          </Link>

          <div>
            <h1 className="text-3xl font-display font-bold">Create your account</h1>
            <p className="text-muted-foreground mt-2">
              Start planning your dream trips today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              
              {/* Password Requirements */}
              {password && (
                <div className="mt-2 space-y-1">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs">
                      <CheckCircle2 className={`h-3 w-3 ${req.met ? 'text-success' : 'text-muted-foreground'}`} />
                      <span className={req.met ? 'text-success' : 'text-muted-foreground'}>{req.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button type="submit" variant="hero" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Create Account'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              By signing up, you agree to our{' '}
              <Link to="#" className="text-primary hover:underline">Terms of Service</Link>
              {' '}and{' '}
              <Link to="#" className="text-primary hover:underline">Privacy Policy</Link>
            </p>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
