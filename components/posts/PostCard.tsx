'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  MessageCircle, 
  Share2, 
  Bookmark, 
  MoreVertical, 
  ChevronUp, 
  ChevronDown,
  Flame,
  Clock,
  User
} from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface PostCardProps {
  id: string;
  title: string;
  content: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  community: string;
  timeAgo: string;
  comments: number;
  upvotes: number;
  isUpvoted: boolean;
  engagement?: 'low' | 'medium' | 'high' | 'very-high';
}

export function PostCard({
  title,
  content,
  author,
  authorRole,
  authorAvatar,
  community,
  timeAgo,
  comments,
  upvotes,
  isUpvoted,
  engagement = 'medium'
}: PostCardProps) {
  const [upvoted, setUpvoted] = useState(isUpvoted);
  const [saved, setSaved] = useState(false);
  const [voteCount, setVoteCount] = useState(upvotes);

  const handleUpvote = () => {
    if (upvoted) {
      setVoteCount(voteCount - 1);
    } else {
      setVoteCount(voteCount + 1);
    }
    setUpvoted(!upvoted);
  };

  return (
    <Card className="overflow-hidden border-gray-200 hover:border-gray-300 transition-colors">
      <div className="flex">
        {/* Votes */}
        <div className="w-12 flex flex-col items-center py-3 border-r border-gray-100">
          <Button
            variant="ghost"
            size="sm"
            className={`h-8 w-8 p-0 ${upvoted ? 'text-orange-500' : 'text-gray-400'}`}
            onClick={handleUpvote}
          >
            <ChevronUp className="h-5 w-5" />
          </Button>
          <span className="my-1 text-sm font-medium text-gray-900">{voteCount}</span>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400">
            <ChevronDown className="h-5 w-5" />
          </Button>
        </div>

        {/* Contenu */}
        <div className="flex-1 p-4">
          {/* En-tête */}
          <div className="flex items-center gap-2 mb-3">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs bg-gray-100">
                {authorAvatar.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 text-sm">
                <span className="font-medium text-gray-900 truncate">{author}</span>
                <span className="text-gray-400">•</span>
                <span className="text-orange-600 font-medium">r/{community}</span>
              </div>
              <div className="text-xs text-gray-500">
                {timeAgo} • {authorRole}
              </div>
            </div>
          </div>

          {/* Titre */}
          <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>

          {/* Contenu */}
          <p className="mb-4 text-gray-700 line-clamp-2">{content}</p>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 gap-1 text-gray-600">
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">{comments}</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="h-8 gap-1 text-gray-600">
              <Share2 className="h-4 w-4" />
              <span className="text-sm">Partager</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 gap-1 text-gray-600"
              onClick={() => setSaved(!saved)}
            >
              <Bookmark className={`h-4 w-4 ${saved ? 'fill-current text-orange-500' : ''}`} />
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 ml-auto text-gray-400"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}