'use client';

import { Users, Calendar, Shield, MoreHorizontal, ExternalLink, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

interface CommunityCardProps {
    name: string;
    description: string;
    members: number;
    online: number;
    createdDate: string;
    coverImage?: string;
    icon?: string;
    isJoined?: boolean;
}

export function CommunityCard({
    name = "Informatique",
    description = "Bienvenue dans la communauté des passionnés d'informatique ! Ici on partage, on s'entraide et on code ensemble.",
    members = 452,
    online = 34,
    createdDate = "Sept 2023",
    coverImage = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop",
    icon = "CL",
    isJoined = false,
}: CommunityCardProps) {
    const formatNumber = (num: number) => {
        if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
        return num.toString();
    };

    return (
        <Card className="overflow-hidden border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
            {/* Cover Image - Human touch: Colorful and welcoming */}
            <div className="h-24 w-full relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90">
                    {/* Fallback pattern/gradient if no image */}
                </div>
                {coverImage && (
                    <img
                        src={coverImage}
                        alt="Community Cover"
                        className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                    />
                )}
            </div>

            <div className="px-4 pb-4">
                {/* Header with Icon - Overlapping the cover to feel dynamic */}
                <div className="relative -mt-8 mb-3 flex items-end justify-between">
                    <div className="flex items-end gap-3">
                        <div className="relative rounded-2xl bg-white p-1.5 shadow-md">
                            <Avatar className="h-16 w-16 rounded-xl border-2 border-white bg-orange-100">
                                <AvatarFallback className="rounded-xl bg-orange-100 text-orange-600 font-bold text-xl">
                                    {icon.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-1 -right-1 rounded-full bg-green-500 p-1 ring-2 ring-white">
                                <span className="sr-only">Active</span>
                            </div>
                        </div>
                        <div className="mb-1">
                            <h1 className="text-xl font-bold text-gray-900 leading-tight">c/{name}</h1>
                        </div>
                    </div>
                </div>

                {/* Stats Row - Human readable and friendly */}
                <div className="mb-4 flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex flex-col">
                        <span className="font-bold text-gray-900">{formatNumber(members)}</span>
                        <span className="text-xs">Membres</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-gray-900 flex items-center gap-1">
                            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                            {formatNumber(online)}
                        </span>
                        <span className="text-xs">En ligne</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-gray-900">Top 5%</span>
                        <span className="text-xs">Classement</span>
                    </div>
                </div>

                {/* Friendly Description */}
                <p className="mb-4 text-sm text-gray-600 leading-relaxed">
                    {description}
                </p>

                {/* Action Buttons */}
                <div className="space-y-2">
                    <Button
                        className={`w-full rounded-full font-medium shadow-none transition-all ${isJoined
                                ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
                                : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                            }`}
                    >
                        {isJoined ? "Rejoint" : "Rejoindre la communauté"}
                    </Button>

                    <Button variant="outline" className="w-full rounded-full border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Voir le planning des événements
                    </Button>
                </div>

                <Separator className="my-4" />

                {/* Metadata/Footer - Soft details */}
                <div className="flex flex-col gap-2 text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>Créée le {createdDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-orange-500" />
                        <span>Modérée par l'équipe étudiante</span>
                    </div>
                </div>
            </div>
        </Card>
    );
}
