import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
});

export const createPost = mutation({
    args: {
        title: v.string(),
        content: v.string(),
        communityId: v.optional(v.id("communities")),
        image: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthenticated");

        const user = await ctx.db.query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .first();

        if (!user) throw new Error("User not found");

        const existingPost = await ctx.db.query("posts")
            .filter((q) => q.eq(q.field("title"), args.title))
            .first();

        if (existingPost) return;

const { image, ...argsWithoutImage } = args;

        return await ctx.db.insert("posts", {
            ...argsWithoutImage,
            image: args.image, // Stocké comme storageId
            authorId: user._id,
            createdAt: Date.now(),
        });
    },
});

export const getFeed = query({
    handler: async (ctx) => {
        const posts = await ctx.db.query("posts").order("desc").take(50);

        return await Promise.all(
            posts.map(async (post) => {
                const author = await ctx.db.get(post.authorId);
                const community = post.communityId ? await ctx.db.get(post.communityId) : null;
                
                let imageUrl = undefined;
                if (post.image) {
                    imageUrl = await ctx.storage.getUrl(post.image) || undefined;
                }

                let communityImageUrl = undefined;
                if (community && community.image) {
                   communityImageUrl = await ctx.storage.getUrl(community.image) || undefined;
                }

                const votes = await ctx.db.query("likes")
                    .withIndex("by_target", (q) => q.eq("targetType", "post").eq("targetId", post._id))
                    .collect();

                const upvotes = votes.filter(v => v.type === "like").length;
                const downvotes = votes.filter(v => v.type === "dislike").length;
                let userVote = undefined;

                const identity = await ctx.auth.getUserIdentity();
                if (identity) {
                         const user = await ctx.db.query("users")
                            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
                            .first();
                        if (user) {
                            const myVote = votes.find(v => v.userId === user._id);
                            if (myVote) userVote = myVote.type;
                        }
                    }

                return {
                    ...post,
                    image: imageUrl,
                    author: author ? {
                        username: author.username,
                        avatarUrl: author.avatarUrl,
                    } : null,
                    community: community ? {
                        name: community.name,
                        image: communityImageUrl,
                    } : null,
                    upvotes,
                    downvotes,
                    userVote,
                };
            })
    );
    },
});

export const getPost = query({
    args: { postId: v.id("posts") },
    handler: async (ctx, args) => {
        const post = await ctx.db.get(args.postId);
        if (!post) return null;

        const author = await ctx.db.get(post.authorId);
        const community = post.communityId ? await ctx.db.get(post.communityId) : null;

        let imageUrl = undefined;
        if (post.image) {
            imageUrl = await ctx.storage.getUrl(post.image) || undefined;
        }

        let communityImageUrl = undefined;
        if (community && community.image) {
            communityImageUrl = await ctx.storage.getUrl(community.image) || undefined;
        }

        const commentCount = await ctx.db.query("comments")
            .withIndex("by_post", (q) => q.eq("postId", post._id))
            .collect()
            .then((comments) => comments.length);

        const votes = await ctx.db.query("likes")
            .withIndex("by_target", (q) => q.eq("targetType", "post").eq("targetId", post._id))
            .collect();

        const upvotes = votes.filter(v => v.type === "like").length;
        const downvotes = votes.filter(v => v.type === "dislike").length;
        let userVote = undefined;

        if (args.postId) { // Check auth for single post
             const identity = await ctx.auth.getUserIdentity();
             if (identity) {
                 const user = await ctx.db.query("users")
                    .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
                    .first();
                if (user) {
                     const myVote = votes.find(v => v.userId === user._id);
                     if (myVote) userVote = myVote.type;
                }
             }
        }

        return {
            ...post,
            image: imageUrl,
            author: author ? {
                username: author.username,
                avatarUrl: author.avatarUrl,
            } : null,
            community: community ? {
                name: community.name,
                image: communityImageUrl,
            } : null,
            upvotes,
            downvotes,
            userVote,
            commentCount,
        };
    },
});

export const getCommunityPosts = query({
    args: { communityId: v.id("communities") },
    handler: async (ctx, args) => {
        const posts = await ctx.db.query("posts")
            .withIndex("by_community", (q) => q.eq("communityId", args.communityId))
            .order("desc")
            .take(50);

        return await Promise.all(
            posts.map(async (post) => {
                const author = await ctx.db.get(post.authorId);
                const community = await ctx.db.get(args.communityId);
                
                let imageUrl = undefined;
                if (post.image) {
                    imageUrl = await ctx.storage.getUrl(post.image) || undefined;
                }

                let communityImageUrl = undefined;
                if (community && community.image) {
                   communityImageUrl = await ctx.storage.getUrl(community.image) || undefined;
                }

                const commentCount = await ctx.db.query("comments")
                    .withIndex("by_post", (q) => q.eq("postId", post._id))
                    .collect()
                    .then((comments) => comments.length);

                const votes = await ctx.db.query("likes")
                    .withIndex("by_target", (q) => q.eq("targetType", "post").eq("targetId", post._id))
                    .collect();

                const upvotes = votes.filter(v => v.type === "like").length;
                const downvotes = votes.filter(v => v.type === "dislike").length;
                let userVote = undefined;

                const identity = await ctx.auth.getUserIdentity();
                 if (identity) {
                     const user = await ctx.db.query("users")
                        .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
                        .first();
                    if (user) {
                         const myVote = votes.find(v => v.userId === user._id);
                         if (myVote) userVote = myVote.type;
                    }
                 }

                return {
                    ...post,
                    image: imageUrl,
                    author: author ? {
                        username: author.username,
                        avatarUrl: author.avatarUrl,
                    } : null,
                    community: community ? {
                        name: community.name,
                        image: communityImageUrl,
                    } : null,
                    upvotes,
                    downvotes,
                    userVote,
                };
            })
        );
    },
});