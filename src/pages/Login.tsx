import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    const success = await login(email, password);
    setIsLoading(false);

    if (success) {
      toast({
        title: 'Welcome back!',
        description: 'You have successfully logged in.',
      });
      navigate('/dashboard');
    } else {
      toast({
        title: 'Login failed',
        description: 'Invalid email or password. Try demo@globetrotter.com / demo123',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
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
            <h1 className="text-3xl font-display font-bold">Welcome back</h1>
            <p className="text-muted-foreground mt-2">
              Sign in to continue planning your adventures
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
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
            </div>

            <Button type="submit" variant="hero" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background text-muted-foreground">Demo Account</span>
            </div>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg text-sm">
            <p className="font-medium mb-1">Try the demo:</p>
            <p className="text-muted-foreground">Email: demo@globetrotter.com</p>
            <p className="text-muted-foreground">Password: demo123</p>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary font-medium hover:underline">
              Sign up for free
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1200&q=80"
          alt="Travel"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
        <div className="absolute bottom-12 left-12 right-12 bg-card/90 backdrop-blur-sm p-8 rounded-2xl">
          <blockquote className="text-lg italic mb-4">
            "GlobeTrotter made planning our honeymoon so effortless. The budget tracking saved us from overspending!"
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" 
                alt="Sarah"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-semibold">Sarah & Michael</p>
              <p className="text-sm text-muted-foreground">Traveled to 5 countries</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
