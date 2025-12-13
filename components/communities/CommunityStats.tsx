'use client';

import { Users, FileText, Calendar, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface CommunityStatsProps {
  members: number;
  posts: number;
  created: string;
  dailyActive?: number;
  growthRate?: number;
}

export function CommunityStats({
  members,
  posts,
  created,
  dailyActive = 124,
  growthRate = 12.5,
}: CommunityStatsProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  return (
    <Card className="p-4 bg-gradient-to-br from-gray-50 to-white">
      <h4 className="mb-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">
        Statistiques
      </h4>
      
      <div className="space-y-4">
        {/* Membres */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Membres</p>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(members)}</p>
            </div>
          </div>
          {growthRate > 0 && (
            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              <TrendingUp className="mr-1 h-3 w-3" />
              +{growthRate}%
            </span>
          )}
        </div>

        {/* Posts */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-100">
              <FileText className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Publications</p>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(posts)}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Actifs aujourd'hui</p>
            <p className="text-sm font-medium text-gray-700">{dailyActive}</p>
          </div>
        </div>

        {/* Date de création */}
        <div className="flex items-center gap-3 pt-2 border-t">
          <div className="p-2 rounded-lg bg-purple-100">
            <Calendar className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Créée en</p>
            <p className="text-lg font-semibold text-gray-900">{created}</p>
          </div>
        </div>

        {/* Barre de progression (engagement) */}
        <div className="pt-4 border-t">
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-gray-600">Taux d'engagement</span>
            <span className="font-medium text-gray-900">72%</span>
          </div>
          <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
              style={{ width: '72%' }}
            />
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Basé sur les interactions des 7 derniers jours
          </p>
        </div>
      </div>
    </Card>
  );
}