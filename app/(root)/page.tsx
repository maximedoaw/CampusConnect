import { Communities } from '@/components/layout/Communities';
import { Feed } from '@/components/layout/Feed';
import SidebarLeft from '@/components/layout/SidebarLeft';
import { SidebarRight } from '@/components/layout/SidebarRight';

export default function HomePage() {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-0 py-4 md:py-6">
          <div className="flex gap-4 md:gap-6 px-3 md:px-4 lg:px-0">
            {/* Sidebar gauche - Communautés (Desktop) */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <SidebarLeft />
            </aside>

            {/* Colonne centrale - Feed */}
            <main className="flex-1 min-w-0 w-full max-w-3xl mx-auto">
              <div className="space-y-4 md:space-y-6">
                <Feed />
              </div>
            </main>

            {/* Sidebar droite - Infos communauté (Desktop) */}
            <aside className="hidden xl:block w-80 flex-shrink-0">
              <SidebarRight />
            </aside>
          </div>
        </div>

        {/* Espace pour la navigation mobile */}
        <div className="h-16 lg:hidden" />
      </div>

      {/* Modal pour les communautés mobile */}
      <Communities />
    </>
  );
}