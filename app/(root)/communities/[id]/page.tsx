'use client';

import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useParams } from 'next/navigation';
import { Id } from '@/convex/_generated/dataModel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { PostCard } from '@/components/posts/PostCard';
import { PostSkeleton } from '@/components/posts/PostSkeleton';
import { Users } from 'lucide-react';
import { toast } from 'sonner';

export default function CommunityPage() {
    const params = useParams();
    const communityId = params.id as Id<"communities">;

    const community = useQuery(api.communities.getCommunity, { communityId });
    const posts = useQuery(api.posts.getCommunityPosts, { communityId });

    const joinCommunity = useMutation(api.communities.joinCommunity);
    const leaveCommunity = useMutation(api.communities.leaveCommunity);

    const handleToggleJoin = async () => {
        if (!community) return;

        try {
            if (community.isJoined) {
                await leaveCommunity({ communityId });
                toast.success(`Vous avez quitté ${community.name}`);
            } else {
                await joinCommunity({ communityId });
                toast.success(`Vous avez rejoint ${community.name}`);
            }
        } catch (error) {
            toast.error("Erreur lors de l'action");
            console.error(error);
        }
    };

    if (community === undefined) {
        return (
            <div className="max-w-3xl mx-auto py-8 px-4 space-y-6">
                <div className="h-48 w-full bg-gray-200 rounded-xl animate-pulse" />
                <div className="h-12 w-1/3 bg-gray-200 rounded animate-pulse" />
                <PostSkeleton />
            </div>
        );
    }

    if (community === null) {
        return (
            <div className="max-w-3xl mx-auto py-8 px-4 text-center">
                <h1 className="text-2xl font-bold text-gray-800">Communauté introuvable</h1>
                <p className="text-gray-600">Cette communauté n'existe pas ou a été supprimée.</p>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto py-8 px-4 space-y-6">
            {/* En-tête de la communauté */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                {/* Cover Image */}
                <div className="h-40 sm:h-52 w-full bg-gradient-to-r from-orange-400 to-red-500 relative">
                    {community.image && (
                        <img
                            src={community.image}
                            alt={community.name}
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>

                <div className="px-6 pb-6 relative">
                    <div className="flex justify-between items-end -mt-10 mb-4">
                        <div className="bg-white p-1.5 rounded-xl shadow-sm">
                            <Avatar className="h-24 w-24 sm:h-32 sm:w-32 rounded-lg border-2 border-white text-3xl font-bold">
                                <AvatarImage src={community.image} />
                                <AvatarFallback className="bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700">
                                    {community.name.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </div>

                        <Button
                            onClick={handleToggleJoin}
                            className={community.isJoined ? "bg-white text-gray-800 border-gray-300 hover:bg-gray-50 hover:text-red-600 border" : "bg-gray-900 text-white hover:bg-gray-800"}
                        >
                            {community.isJoined ? "Ne plus suivre" : "Rejoindre"}
                        </Button>
                    </div>

                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">r/{community.name}</h1>
                        <p className="text-gray-500 mt-2">{community.description}</p>

                        <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                <span className="font-semibold text-gray-900">{community.memberCount}</span>
                                <span>membres</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feed de la communauté */}
            <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800 ml-1">Publications récentes</h2>

                {posts === undefined ? (
                    <PostSkeleton />
                ) : posts.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                        <p className="text-gray-500">Aucune publication pour le moment.</p>
                    </div>
                ) : (
                    posts.map((post) => (
                        <PostCard
                            key={post._id}
                            id={post._id}
                            title={post.title}
                            content={post.content}
                            createdAt={post.createdAt}
                            image={post.image}
                            author={post.author}
                            community={post.community}
                            comments={0} // TODO: Fetch separate count if needed
                            likes={0} // TODO: Fetch separate count if needed
                        />
                    ))
                )}
            </div>
        </div>
    )
}