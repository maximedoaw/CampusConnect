'use client';

import { Button } from '@/components/ui/button';
import { PostCard } from '@/components/posts/PostCard';
import { useState } from 'react';
import { 
  MessageSquarePlus, 
  Flame, 
  TrendingUp, 
  Clock, 
  Filter,
  Plus,
  Camera,
  Link as LinkIcon,
  BarChart3,
  Mic2,
  Search,
  Users
} from 'lucide-react';
import { CreatePost } from '../posts/CreatePost';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';

const mockPosts = [
  {
    id: '1',
    title: 'Recherche partenaire pour projet IA',
    content: 'Je travaille sur un projet de classification d\'images médicales et je cherche un partenaire avec des connaissances en TensorFlow/PyTorch.',
    author: 'Marie D.',
    authorRole: 'Master IA',
    authorAvatar: 'MD',
    community: 'Informatique',
    timeAgo: '2h',
    comments: 12,
    upvotes: 45,
    isUpvoted: true,
    engagement: 'high' as const
  },
  {
    id: '2',
    title: 'Examens finaux - Conseils de révision',
    content: 'Partagez vos techniques de révision efficaces pour les exams de fin de semestre.',
    author: 'Thomas L.',
    authorRole: 'Licence 3',
    authorAvatar: 'TL',
    community: 'Promo 2024',
    timeAgo: '5h',
    comments: 28,
    upvotes: 89,
    isUpvoted: false,
    engagement: 'very-high' as const
  },
  {
    id: '3',
    title: 'Concert gratuit vendredi',
    content: 'Notre groupe donne un concert gratuit vendredi soir à l\'amphithéâtre. Venez nombreux !',
    author: 'Sophie M.',
    authorRole: 'Club Musique',
    authorAvatar: 'SM',
    community: 'Club Musique',
    timeAgo: '1j',
    comments: 15,
    upvotes: 56,
    isUpvoted: true,
    engagement: 'medium' as const
  },
];

export function Feed() {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [sortBy, setSortBy] = useState('hot');

  return (
    <>
      <div className="space-y-6">
        {/* Création de post */}
        <div className="rounded-xl bg-white p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-orange-100 text-orange-600">
                <Users className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            
            <Button
              variant="outline"
              className="flex-1 h-12 justify-start text-gray-500 hover:text-gray-700 border-gray-300 hover:border-orange-400 rounded-lg"
              onClick={() => setShowCreatePost(true)}
            >
              Créer un post...
            </Button>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 text-gray-500"
                onClick={() => setShowCreatePost(true)}
              >
                <Camera className="h-5 w-5" />
              </Button>
              <Button 
                className="bg-orange-500 hover:bg-orange-600 rounded-lg"
                onClick={() => setShowCreatePost(true)}
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Filtres */}
        <div className="rounded-xl bg-white p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Posts récents</h3>
            <Button variant="ghost" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filtres
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              variant={sortBy === 'hot' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('hot')}
              className={`gap-2 ${sortBy === 'hot' ? 'bg-orange-500 hover:bg-orange-600' : ''}`}
            >
              <Flame className="h-4 w-4" />
              Tendances
            </Button>
            
            <Button
              variant={sortBy === 'new' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('new')}
              className="gap-2"
            >
              <Clock className="h-4 w-4" />
              Récents
            </Button>
            
            <Button
              variant={sortBy === 'top' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('top')}
              className="gap-2"
            >
              <TrendingUp className="h-4 w-4" />
              Top
            </Button>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {mockPosts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>

        {/* Charger plus */}
        <div className="text-center">
          <Button variant="outline" className="rounded-lg">
            Charger plus de posts
          </Button>
        </div>
      </div>

      {/* Modal création post */}
      {showCreatePost && (
        <CreatePost onClose={() => setShowCreatePost(false)} />
      )}
    </>
  );
}