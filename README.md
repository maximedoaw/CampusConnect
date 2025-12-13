campus-connect/
├── app/
│   ├── layout.tsx           # Layout racine avec auth & providers
│   ├── page.tsx            # Home Page principale
│   ├── (auth)/
│   │   ├── layout.tsx      # Layout pour les pages d'auth
│   │   ├── sign-in/[[...sign-in]]/page.tsx
│   │   └── sign-up/[[...sign-up]]/page.tsx
│   └── api/
│       └── webhooks/
│           └── clerk/
│               └── route.ts
├── components/
│   ├── layout/
│   │   ├── SidebarLeft.tsx
│   │   ├── SidebarRight.tsx
│   │   └── Feed.tsx
│   ├── posts/
│   │   ├── PostCard.tsx
│   │   ├── CreatePost.tsx
│   │   └── PostActions.tsx
│   ├── communities/
│   │   ├── CommunityCard.tsx
│   │   ├── CreateCommunity.tsx
│   │   └── CommunityStats.tsx
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       └── ...autres shadcn
├── lib/
│   ├── convex/
│   │   └── provider.tsx
│   ├── clerk/
│   │   └── provider.tsx
│   └── store/
│       └── useStore.ts      # Zustand store
├── convex/
│   ├── schema.ts
│   ├── posts.ts
│   ├── communities.ts
│   ├── users.ts
│   └── ...
├── public/
├── styles/
│   └── globals.css
└── package.json