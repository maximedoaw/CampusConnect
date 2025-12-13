import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createPost = mutation({
    args: {
        title: v.string(),
        content: v.string(),
        communityId: v.id("communities"),
    },
    handler: async (ctx, args) => {
        const existingPost = await ctx.db.query("posts")
            .filter((q) => q.eq(q.field("title"), args.title))
            .first();

        if (existingPost) return;

        return await ctx.db.insert("posts", {
            ...args,
            createdAt: Date.now(),
        });
    },
});