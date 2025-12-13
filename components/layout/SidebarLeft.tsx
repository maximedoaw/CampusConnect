'use client';

import { SidebarContent } from './SidebarContent';
import { useStore } from '@/store/useStore';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function SidebarLeft() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Détecter mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {/* Version Desktop - Sidebar fixe avec contenu scrollable */}
      <aside className="hidden lg:block sticky top-16 h-[calc(100vh-4rem)]">
        <div className="h-full flex">
          {/* Sidebar principale */}
          <div className={`
            relative transition-all duration-300 ease-in-out 
            ${isCollapsed ? 'w-0 opacity-0 overflow-hidden' : 'w-64 opacity-100'}
          `}>
            {/* Container avec effet de verre */}
            <div className="h-full rounded-lg bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-sm border border-gray-200/50 shadow-sm overflow-hidden">
              {/* Contenu qui gère son propre scroll */}
              <SidebarContent />
            </div>

            {/* Bouton toggle collapse */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="absolute -right-3 top-6 z-50 flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
              aria-label={isCollapsed ? "Étendre la sidebar" : "Réduire la sidebar"}
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4 text-gray-600" />
              ) : (
                <ChevronLeft className="h-4 w-4 text-gray-600" />
              )}
            </button>
          </div>

          {/* Mini sidebar collapsed */}
          {isCollapsed && (
            <div className="w-16 transition-all duration-300 ease-in-out">
              <div className="h-full py-4 pl-2">
                <ScrollArea className="h-full">
                  <div className="flex flex-col items-center space-y-4 px-1">
                    {/* Logo mini */}
                    <button
                      onClick={() => setIsCollapsed(false)}
                      className="p-3 rounded-lg hover:bg-gray-100 transition-colors group relative"
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                          <span className="text-white font-bold text-sm">C</span>
                        </div>
                        <span className="text-xs mt-1 text-gray-600 group-hover:text-orange-600">Accueil</span>
                      </div>
                    </button>

                    {/* Séparateur */}
                    <div className="w-full px-2">
                      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                    </div>

                    {/* Communautés fréquentes (3 max) */}
                    <div className="w-full px-2 space-y-3">
                      <button className="w-full p-2 rounded-lg hover:bg-gray-100 transition-colors group">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 mx-auto flex items-center justify-center">
                          <span className="text-white text-xs font-bold">I</span>
                        </div>
                        <span className="text-xs mt-1 text-gray-600 truncate group-hover:text-blue-600">Info</span>
                      </button>

                      <button className="w-full p-2 rounded-lg hover:bg-gray-100 transition-colors group">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 mx-auto flex items-center justify-center">
                          <span className="text-white text-xs font-bold">P</span>
                        </div>
                        <span className="text-xs mt-1 text-gray-600 truncate group-hover:text-purple-600">Promo</span>
                      </button>

                      <button className="w-full p-2 rounded-lg hover:bg-gray-100 transition-colors group">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 mx-auto flex items-center justify-center">
                          <span className="text-white text-xs font-bold">B</span>
                        </div>
                        <span className="text-xs mt-1 text-gray-600 truncate group-hover:text-green-600">Biblio</span>
                      </button>
                    </div>

                    {/* Bouton expand */}
                    <button
                      onClick={() => setIsCollapsed(false)}
                      className="mt-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <ChevronRight className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </ScrollArea>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Version Mobile - Sheet */}
      <div className="lg:hidden">
        <MobileSidebarSheet />
      </div>
    </>
  );
}

// Composant Sheet pour mobile
function MobileSidebarSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-gray-600 hover:text-orange-600"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[85vw] max-w-sm p-0">
        <div className="h-full">
          <SidebarContent />
        </div>
      </SheetContent>
    </Sheet>
  );
}