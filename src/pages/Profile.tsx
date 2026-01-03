import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Save, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Profile: React.FC = () => {
  const { user, isAuthenticated, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const handleSave = () => {
    updateUser({ name, email });
    toast({ title: 'Profile updated', description: 'Your changes have been saved.' });
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure? This cannot be undone.')) {
      logout();
      localStorage.removeItem('globetrotter_trips');
      navigate('/');
      toast({ title: 'Account deleted', description: 'Your account has been removed.' });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-display font-bold mb-8">Profile Settings</h1>
          
          <Card className="mb-6">
            <CardHeader><CardTitle>Personal Information</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {user?.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{user?.name}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                </div>
              </div>
              
              <Button onClick={handleSave} variant="hero">
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </Button>
            </CardContent>
          </Card>

          <Card className="border-destructive/20">
            <CardHeader><CardTitle className="text-destructive">Danger Zone</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Deleting your account will remove all your trips and data permanently.
              </p>
              <Button variant="destructive" onClick={handleDeleteAccount}>
                <Trash2 className="mr-2 h-4 w-4" /> Delete Account
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Profile;
