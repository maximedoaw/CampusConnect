'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useStore } from '@/store/useStore';

const mockCommunities = [
  {
    id: '1',
    name: 'Informatique',
    members: 452,
    description: 'Programmation & tech',
    color: 'bg-blue-500'
  },
  {
    id: '2',
    name: 'Génie Civil',
    members: 321,
    description: 'Construction & architecture',
    color: 'bg-orange-500'
  },
  {
    id: '3',
    name: 'Promo 2024',
    members: 1200,
    description: 'Étudiants 2024',
    color: 'bg-purple-500'
  },
  {
    id: '4',
    name: 'Club Musique',
    members: 89,
    description: 'Concerts & jam sessions',
    color: 'bg-pink-500'
  },
  {
    id: '5',
    name: 'Bibliothèque',
    members: 567,
    description: 'Ressources & études',
    color: 'bg-green-500'
  },
];

export function Communities() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { setActiveCommunity } = useStore();

  useEffect(() => {
    const handleOpenMobileCommunities = () => {
      setIsOpen(true);
    };

    window.addEventListener('openMobileCommunities', handleOpenMobileCommunities);
    return () => {
      window.removeEventListener('openMobileCommunities', handleOpenMobileCommunities);
    };
  }, []);

  const filteredCommunities = mockCommunities.filter(community =>
    community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    community.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Panel */}
      <div className="absolute inset-y-0 left-0 w-full max-w-sm bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="border-b px-4 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Communautés</h2>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Search */}
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Rechercher une communauté..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Communities List */}
          <ScrollArea className="flex-1 px-2 py-4">
            <div className="space-y-2">
              {filteredCommunities.map((community) => (
                <Button
                  key={community.id}
                  variant="ghost"
                  className="w-full justify-start px-3 py-3 h-auto"
                  onClick={() => {
                    setActiveCommunity(community.id);
                    setIsOpen(false);
                  }}
                >
                  <div className={`mr-3 flex h-8 w-8 items-center justify-center rounded-full ${community.color}`}>
                    <span className="text-xs font-bold text-white">
                      {community.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium">r/{community.name}</div>
                    <div className="text-xs text-gray-500">{community.members} membres</div>
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="border-t p-4">
            <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
              Créer une communauté
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}