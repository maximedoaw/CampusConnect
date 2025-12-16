'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  MessageCircle,
  Heart,
  ThumbsUp,
  ThumbsDown,
  MoreVertical,
  Share2,
  Bookmark,
} from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useRouter } from 'next/navigation';

interface PostCardProps {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  image?: string;
  author: {
    username: string;
    avatarUrl?: string;
  } | null;
  community: {
    name: string;
    image?: string;
  } | null;
  comments?: number;
  likes?: number;
  userLiked?: boolean;
}

export function PostCard({
  id,
  title,
  content,
  createdAt,
  image,
  author,
  community,
  comments = 0,
  likes = 0,
  userLiked = false,
}: PostCardProps) {
  const [likeCount, setLikeCount] = useState(likes);
  const [liked, setLiked] = useState(userLiked);
  const router = useRouter();

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (liked) {
      setLikeCount(likeCount - 1);
      setLiked(false);
    } else {
      setLikeCount(likeCount + 1);
      setLiked(true);
    }
  };

  const timeAgo = formatDistanceToNow(createdAt, { addSuffix: true, locale: fr });

  return (
    <Card
      className="overflow-hidden border border-gray-200 hover:border-gray-300 transition-colors bg-white hover:shadow-sm cursor-pointer"
      onClick={() => router.push(`/comments/${id}`)}
    >
      <div className="p-4">
        {/* Métadonnées Header */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
          {community ? (
            <>
              <div className="flex items-center gap-1.5 hover:underline">
                <Avatar className="h-5 w-5 border border-gray-300">
                  {community.image ? (
                    <AvatarImage src={community.image} alt={community.name} />
                  ) : (
                    <AvatarFallback className="text-[10px] bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 font-bold">
                      {community.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <span className="font-semibold text-gray-900 hover:text-black">
                  r/{community.name}
                </span>
              </div>
              <span className="text-gray-400">•</span>
            </>
          ) : null}

          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-500">Posté par</span>
            <div className="flex items-center gap-1 hover:underline">
              <Avatar className="h-4 w-4">
                <AvatarImage src={author?.avatarUrl} />
                <AvatarFallback className="text-[8px] bg-gray-100 text-gray-600">
                  {author?.username?.substring(0, 1).toUpperCase() || '?'}
                </AvatarFallback>
              </Avatar>
              <span className="text-gray-900 font-medium hover:text-black">
                u/{author?.username || 'anonyme'}
              </span>
            </div>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500">{timeAgo}</span>
          </div>
        </div>

        {/* Titre */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-orange-600 transition-colors">
          {title}
        </h3>

        {/* Contenu texte */}
        {content && content.length > 0 && (
          <div className="mb-3">
            <div
              className="text-sm text-gray-800 leading-relaxed font-normal relative"
              style={{
                maxHeight: '150px',
                overflow: 'hidden',
                maskImage: content.length > 120 ? 'linear-gradient(180deg, #000 75%, transparent)' : 'none',
                WebkitMaskImage: content.length > 120 ? 'linear-gradient(180deg, #000 75%, transparent)' : 'none',
              }}
            >
              {content}
            </div>
            {content.length > 120 && (
              <button
                className="text-xs text-orange-600 font-medium hover:underline mt-1"
                onClick={(e) => e.stopPropagation()}
              >
                Voir plus
              </button>
            )}
          </div>
        )}

        {/* Image du post */}
        {image && (
          <div className="my-3 rounded overflow-hidden max-w-full border border-gray-200">
            <img
              src={image}
              alt={title}
              className="max-h-[400px] w-auto object-contain cursor-zoom-in bg-gray-50"
              loading="lazy"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}

        {/* Barre d'actions avec les votes intégrés */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
          {/* Section Votes */}
          <div className="flex items-center bg-gray-50 rounded-lg overflow-hidden">
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 gap-1.5 px-3 rounded-none border-r border-gray-200 ${liked
                ? 'bg-orange-50 text-orange-600 hover:bg-orange-100'
                : 'hover:bg-gray-200 text-gray-600'
                }`}
              onClick={handleLike}
            >
              {liked ? (
                <Heart className="h-4 w-4 fill-current" />
              ) : (
                <ThumbsUp className="h-4 w-4" />
              )}
              <span className="font-medium">{likeCount}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-3 rounded-none hover:bg-gray-200 text-gray-600"
              onClick={(e) => {
                e.stopPropagation();
                // Logique pour disliker
              }}
            >
              <ThumbsDown className="h-4 w-4" />
            </Button>
          </div>

          {/* Bouton Commentaires */}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1.5 px-3 hover:bg-gray-100 rounded text-gray-600 hover:text-gray-800"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/comments/${id}`);
            }}
          >
            <MessageCircle className="h-4 w-4" />
            <span className="font-medium">{comments}</span>
          </Button>

          {/* Bouton Partager */}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-3 hover:bg-gray-100 rounded text-gray-600 hover:text-gray-800"
          >
            <Share2 className="h-4 w-4" />
          </Button>

          {/* Bouton Enregistrer */}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-3 hover:bg-gray-100 rounded text-gray-600 hover:text-gray-800"
          >
            <Bookmark className="h-4 w-4" />
          </Button>

          {/* Bouton Plus d'options */}
          <div className="ml-auto">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-gray-100 rounded text-gray-600"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}