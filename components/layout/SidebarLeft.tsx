'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Home,
  Flame,
  TrendingUp,
  Users,
  Search,
  PlusCircle,
  ChevronRight,
  BookOpen,
  Coffee,
  Music,
  Code,
  Building,
  Users2,
  GraduationCap,
  BookMarked,
  Mic2,
  Trophy,
  Gamepad2,
  Star
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useStore } from '@/store/useStore';
import { CreateCommunity } from '../communities/CreateCommunity';

// Communautés mockées
const mockCommunities = [
  { id: '1', name: 'Informatique', members: 452, icon: Code, description: 'Programmation & tech', color: 'bg-blue-500', trending: true },
  { id: '2', name: 'Génie Civil', members: 321, icon: Building, description: 'Construction & architecture', color: 'bg-orange-500' },
  { id: '3', name: 'Promo 2024', members: 1200, icon: Users2, description: 'Étudiants 2024', color: 'bg-purple-500', trending: true },
  { id: '4', name: 'Club Musique', members: 89, icon: Music, description: 'Concerts & jam sessions', color: 'bg-pink-500' },
  { id: '5', name: 'Bibliothèque', members: 567, icon: BookMarked, description: 'Ressources & études', color: 'bg-green-500' },
  { id: '6', name: 'Cafétéria', members: 234, icon: Coffee, description: 'Pause café & discussions', color: 'bg-amber-500' },
  { id: '7', name: 'Amphi A', members: 178, icon: GraduationCap, description: 'Cours & révisions', color: 'bg-indigo-500' },
  { id: '8', name: 'Podcast Campus', members: 56, icon: Mic2, description: 'Émissions étudiantes', color: 'bg-rose-500' },
  { id: '9', name: 'Jeux & Esport', members: 312, icon: Gamepad2, description: 'Gaming & compétitions', color: 'bg-emerald-500', trending: true },
  { id: '10', name: 'Champions', members: 98, icon: Trophy, description: 'Sports & compétitions', color: 'bg-red-500' },
];

export default function SidebarLeft() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllCommunities, setShowAllCommunities] = useState(false);
  const { activeCommunity, setActiveCommunity } = useStore();

  const filteredCommunities = mockCommunities.filter(community =>
    community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    community.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedCommunities = showAllCommunities
    ? filteredCommunities
    : filteredCommunities.slice(0, 5);

  const popularCommunities = mockCommunities
    .filter(c => c.trending)
    .sort((a, b) => b.members - a.members)
    .slice(0, 3);

  return (
    <>
      {/* Version Desktop */}
      <div className="hidden lg:block sticky top-16 h-[calc(100vh-4rem)]">
        <ScrollArea className="h-full pr-3 pb-6">
          <div className="space-y-4 pt-4">
            {/* Section Accueil & Populaire - Style Reddit */}
            <div className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">
              <div className="bg-gradient-to-r from-orange-500 to-red-600 p-3">
                <h2 className="text-xs font-bold text-white uppercase tracking-wider">
                  Navigation
                </h2>
              </div>

              <div className="p-2 space-y-1">
                <Button
                  variant="ghost"
                  className={`w-full justify-start rounded-sm px-3 py-2 text-sm ${activeCommunity === 'home' ? 'bg-orange-50 text-orange-600 border border-orange-200' : 'hover:bg-gray-50'}`}
                  onClick={() => setActiveCommunity('home')}
                >
                  <Home className="mr-3 h-4 w-4" />
                  <div className="flex-1 text-left">
                    <div className="font-medium">Accueil</div>
                    <div className="text-xs text-gray-500">Tous les posts</div>
                  </div>
                </Button>

                <Button
                  variant="ghost"
                  className={`w-full justify-start rounded-sm px-3 py-2 text-sm ${activeCommunity === 'popular' ? 'bg-orange-50 text-orange-600 border border-orange-200' : 'hover:bg-gray-50'}`}
                  onClick={() => setActiveCommunity('popular')}
                >
                  <Flame className="mr-3 h-4 w-4" />
                  <div className="flex-1 text-left">
                    <div className="font-medium">Populaire</div>
                    <div className="text-xs text-gray-500">Posts tendance</div>
                  </div>
                </Button>

                <Button
                  variant="ghost"
                  className={`w-full justify-start rounded-sm px-3 py-2 text-sm ${activeCommunity === 'trending' ? 'bg-orange-50 text-orange-600 border border-orange-200' : 'hover:bg-gray-50'}`}
                  onClick={() => setActiveCommunity('trending')}
                >
                  <TrendingUp className="mr-3 h-4 w-4" />
                  <div className="flex-1 text-left">
                    <div className="font-medium">Tendances</div>
                    <div className="text-xs text-gray-500">En ce moment</div>
                  </div>
                </Button>
              </div>
            </div>

            {/* Barre de recherche */}
            <div className="rounded-md border border-gray-200 bg-white p-3 shadow-sm">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Rechercher une communauté..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 text-sm border-gray-300 focus-visible:ring-orange-500"
                />
              </div>
            </div>

            {/* Section Vos communautés */}
            <div className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center justify-between bg-gradient-to-r from-orange-50 to-orange-100 p-3 border-b">
                <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Vos communautés
                </h2>
                <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-bold text-orange-600">
                  {mockCommunities.length}
                </span>
              </div>

              <div className="p-2">
                {displayedCommunities.map((community) => (
                  <Button
                    key={community.id}
                    variant="ghost"
                    className={`w-full justify-start rounded-sm px-3 py-2 text-sm mb-1 ${activeCommunity === community.id ? 'bg-orange-50 border border-orange-200' : 'hover:bg-gray-50'}`}
                    onClick={() => setActiveCommunity(community.id)}
                  >
                    <div className={`mr-3 flex h-6 w-6 items-center justify-center rounded-full ${community.color}`}>
                      <community.icon className="h-3.5 w-3.5 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium">r/{community.name}</div>
                      <div className="text-xs text-gray-500">{community.members} membres</div>
                    </div>
                    {activeCommunity === community.id && (
                      <ChevronRight className="ml-2 h-4 w-4 text-orange-500" />
                    )}
                  </Button>
                ))}

                {filteredCommunities.length > 5 && !showAllCommunities && (
                  <Button
                    variant="ghost"
                    className="w-full justify-center rounded-sm py-2 text-xs text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                    onClick={() => setShowAllCommunities(true)}
                  >
                    Voir plus de communautés
                  </Button>
                )}

                {showAllCommunities && (
                  <Button
                    variant="ghost"
                    className="w-full justify-center rounded-sm py-2 text-xs text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowAllCommunities(false)}
                  >
                    Voir moins
                  </Button>
                )}

                {/* Bouton créer une communauté */}
                <Button
                  className="mt-3 w-full gap-2 rounded-sm bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-sm font-medium shadow-sm"
                  onClick={() => setShowCreateModal(true)}
                >
                  <PlusCircle className="h-4 w-4" />
                  Créer une communauté
                </Button>
              </div>
            </div>

            {/* Section Communautés populaires */}
            {popularCommunities.length > 0 && (
              <div className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">
                <div className="flex items-center justify-between bg-gradient-to-r from-orange-50 to-orange-100 p-3 border-b">
                  <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Populaire aujourd'hui
                  </h2>
                  <Flame className="h-4 w-4 text-orange-500" />
                </div>

                <div className="p-3">
                  {popularCommunities.map((community, index) => (
                    <div
                      key={community.id}
                      className={`flex items-center gap-3 rounded-sm p-2 ${index < popularCommunities.length - 1 ? 'mb-2' : ''} hover:bg-orange-50 cursor-pointer transition-colors`}
                      onClick={() => setActiveCommunity(community.id)}
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-500">
                        <span className="text-xs font-bold text-white">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">r/{community.name}</div>
                        <div className="text-xs text-gray-500">{community.members} membres</div>
                      </div>
                      <div className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-800">
                        ↑ {Math.round(community.members * 0.1)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section découverte */}
            <div className="overflow-hidden rounded-md border border-gray-200 bg-gradient-to-br from-orange-50 to-white p-4 shadow-sm">
              <Star className="mx-auto mb-2 h-8 w-8 text-orange-400" />
              <h3 className="mb-2 text-center text-sm font-bold text-gray-900">
                Découvrez plus
              </h3>
              <p className="mb-3 text-center text-xs text-gray-600">
                Rejoignez de nouvelles communautés pour élargir votre réseau
              </p>
              <Button
                variant="outline"
                className="w-full rounded-sm border-orange-300 text-sm text-orange-600 hover:border-orange-400 hover:bg-orange-50 hover:text-orange-700"
              >
                Explorer les communautés
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Version Mobile */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40">
        <Button
          className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 shadow-lg hover:from-orange-600 hover:to-red-700"
          onClick={() => setShowCreateModal(true)}
        >
          <PlusCircle className="h-6 w-6" />
        </Button>
      </div>

      {/* Bottom Navigation Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-gray-200 bg-white lg:hidden shadow-lg">
        <div className="flex items-center justify-around p-1">
          <Button
            variant="ghost"
            className={`flex-1 flex-col h-14 px-1 ${activeCommunity === 'home' ? 'text-orange-600' : 'text-gray-600'}`}
            onClick={() => setActiveCommunity('home')}
          >
            <Home className="h-5 w-5" />
            <span className="mt-1 text-xs font-medium">Accueil</span>
          </Button>

          <Button
            variant="ghost"
            className={`flex-1 flex-col h-14 px-1 ${activeCommunity === 'popular' ? 'text-orange-600' : 'text-gray-600'}`}
            onClick={() => setActiveCommunity('popular')}
          >
            <Flame className="h-5 w-5" />
            <span className="mt-1 text-xs font-medium">Populaire</span>
          </Button>

          <Button
            variant="ghost"
            className="flex-1 flex-col h-14 px-1 text-gray-600"
            onClick={() => {
              const event = new CustomEvent('openMobileCommunities');
              window.dispatchEvent(event);
            }}
          >
            <Users className="h-5 w-5" />
            <span className="mt-1 text-xs font-medium">Commus</span>
          </Button>

          <Button
            variant="ghost"
            className={`flex-1 flex-col h-14 px-1 ${activeCommunity === 'trending' ? 'text-orange-600' : 'text-gray-600'}`}
            onClick={() => setActiveCommunity('trending')}
          >
            <TrendingUp className="h-5 w-5" />
            <span className="mt-1 text-xs font-medium">Tendances</span>
          </Button>
        </div>
      </div>

      {/* Modal création communauté */}
      {showCreateModal && (
        <CreateCommunity onClose={() => setShowCreateModal(false)} />
      )}
    </>
  );
}