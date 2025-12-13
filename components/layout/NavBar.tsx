'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Home, TrendingUp, Bell, User, LogIn, UserPlus } from 'lucide-react';
import Link from 'next/link';

export function NavBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // À remplacer par Clerk

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Recherche:', searchQuery);
    // Implémenter la logique de recherche
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo et navigation gauche */}
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-600">
                <span className="text-xl font-bold text-white">C</span>
              </div>
              <span className="hidden text-2xl font-bold text-gray-900 sm:inline">
                Campus<span className="text-orange-600">Connect</span>
              </span>
            </Link>
          </div>

          {/* Barre de recherche centrale */}
          <div className="flex-1 max-w-2xl px-6">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Rechercher des communautés, posts ou utilisateurs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full pl-10 pr-4"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <span className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-500">
                  Ctrl+K
                </span>
              </div>
            </form>
          </div>

          {/* Actions droite */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            {isAuthenticated && (
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  3
                </span>
              </Button>
            )}

            {/* Actions d'authentification */}
            {isAuthenticated ? (
              <>
                {/* Menu utilisateur */}
                <Button variant="ghost" className="gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="hidden text-left sm:block">
                    <p className="text-sm font-medium">Marie Dupont</p>
                    <p className="text-xs text-gray-500">Étudiante</p>
                  </div>
                </Button>

                {/* Bouton créer */}
                <Button className="hidden bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 sm:flex">
                  Créer
                </Button>
              </>
            ) : (
              <>
                {/* Boutons connexion/inscription */}
                <div className="hidden items-center gap-2 sm:flex">
                  <Button variant="outline" className="gap-2">
                    <LogIn className="h-4 w-4" />
                    Se connecter
                  </Button>
                  <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <UserPlus className="h-4 w-4" />
                    S'inscrire
                  </Button>
                </div>

                {/* Version mobile */}
                <div className="flex items-center gap-1 sm:hidden">
                  <Button variant="ghost" size="icon">
                    <LogIn className="h-5 w-5" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Navigation mobile secondaire */}
        <div className="flex items-center justify-between border-t py-2 md:hidden">
          <Button variant="ghost" size="sm" className="flex-1">
            <Search className="mr-2 h-4 w-4" />
            Rechercher
          </Button>
        </div>
      </div>
    </nav>
  );
}