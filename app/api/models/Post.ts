import mongoose, { Schema, Document } from "mongoose";
import dbConnect from "../../utils/mongodb";

export interface IPost extends Document {
   title: string;
   content: string;
   category?: string;
   tags?: string[];
   author?: mongoose.Schema.Types.ObjectId;
   slug: string;
   createdAt: Date;
}

const PostSchema = new Schema<IPost>({
   title: { type: String, required: true },
   content: { type: String, required: true },
   category: { type: String },
   tags: [{ type: String }],
   author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
   slug: { type: String, required: true, unique: true },
   createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);

const getPost = async (slug: string): Promise<IPost | null> => {
   await dbConnect();
   return Post.findOne({ slug }).exec();
};

const getPosts = async (): Promise<IPost[]> => {
   await dbConnect();
   return Post.find({}).sort({ createdAt: -1 }).exec();
};

const createPost = async (post: Partial<IPost>): Promise<IPost> => {
   await dbConnect();
   const newPost = new Post(post);
   return newPost.save();
};

const updatePost = async (
   slug: string,
   updateData: Partial<IPost>
): Promise<IPost | null> => {
   await dbConnect();
   return Post.findOneAndUpdate({ slug }, updateData, { new: true }).exec();
};

const deletePost = async (slug: string): Promise<IPost | null> => {
   await dbConnect();
   return Post.findOneAndDelete({ slug }).exec();
};

export { Post, getPost, getPosts, createPost, updatePost, deletePost };
