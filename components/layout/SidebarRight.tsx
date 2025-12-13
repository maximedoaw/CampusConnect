"use client"

import { Button } from '@/components/ui/button';
import { CommunityCard } from '@/components/communities/CommunityCard';
import { Settings, FileText, Calendar, Users, Shield } from 'lucide-react';
import { useStore } from '@/store/useStore';

export function SidebarRight() {
  const { activeCommunity } = useStore();

  const communityInfo = {
    name: 'Informatique',
    description: 'Communauté dédiée aux étudiants en informatique. Partagez vos projets, posez des questions et collaborez !',
    members: 452,
    online: 34,
    created: '2023',
    rules: [
      'Respectez les autres membres',
      'Pas de spam ou de publicité',
      'Restez dans le thème informatique',
      'Partagez du code proprement formaté',
    ],
  };

  return (
    <div className="lg:block sticky top-16 h-[calc(100vh-4rem)]">
      {/* Community Card - Style Reddit */}
      <div className="rounded-lg bg-white p-4 shadow-sm border border-gray-200">
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">r/</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">r/{communityInfo.name}</h2>
              <p className="text-sm text-gray-500">{communityInfo.description}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-gray-400" />
              <span className="font-medium">{communityInfo.members}</span>
              <span className="text-gray-500">membres</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="font-medium">{communityInfo.online}</span>
              <span className="text-gray-500">en ligne</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 rounded-lg font-medium">
            Rejoindre
          </Button>
          <Button variant="outline" className="w-full border-gray-300 hover:border-orange-400 hover:text-orange-600 rounded-lg">
            Créer un post
          </Button>
        </div>
      </div>

      {/* Règles - Style Reddit */}
      <div className="rounded-lg bg-white p-5 shadow-sm border border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <Shield className="h-5 w-5 text-orange-500" />
          <h3 className="text-lg font-bold text-gray-900">Règles de la communauté</h3>
        </div>
        <ul className="space-y-3">
          {communityInfo.rules.map((rule, index) => (
            <li key={index} className="flex items-start gap-3 text-sm">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-600">
                {index + 1}
              </span>
              <span className="text-gray-700">{rule}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Événements */}
      <div className="rounded-lg bg-white p-5 shadow-sm border border-gray-200">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-orange-500" />
            <h3 className="text-lg font-bold text-gray-900">Événements à venir</h3>
          </div>
        </div>
        <div className="space-y-3">
          <div className="group cursor-pointer rounded-lg border border-orange-100 bg-orange-50 p-3 transition-all hover:bg-orange-100">
            <div className="text-sm font-bold text-orange-900 group-hover:text-orange-700">Hackathon IA</div>
            <div className="mt-1 flex items-center gap-2 text-xs text-orange-700">
              <span className="font-medium">25-26 Nov</span>
              <span>•</span>
              <span>Campus Principal</span>
            </div>
          </div>
          <div className="group cursor-pointer rounded-lg border border-blue-100 bg-blue-50 p-3 transition-all hover:bg-blue-100">
            <div className="text-sm font-bold text-blue-900 group-hover:text-blue-700">Atelier Git & GitHub</div>
            <div className="mt-1 flex items-center gap-2 text-xs text-blue-700">
              <span className="font-medium">28 Nov</span>
              <span>•</span>
              <span>Salle B203</span>
            </div>
          </div>
        </div>
      </div>

      {/* Liens personnalisés */}
      <div className="rounded-lg bg-gray-50 p-4 border border-gray-200">
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start h-9 px-3 text-sm text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-md">
            <Settings className="mr-2 h-4 w-4" />
            Paramètres du compte
          </Button>
          <Button variant="ghost" className="w-full justify-start h-9 px-3 text-sm text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-md">
            <FileText className="mr-2 h-4 w-4" />
            Mes publications
          </Button>
        </div>
        <div className="mt-4 text-xs text-gray-400 text-center">
          Campus Connect © 2024. All rights reserved.
        </div>
      </div>
    </div>
  );
}