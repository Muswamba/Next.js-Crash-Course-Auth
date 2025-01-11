import { NextResponse } from "next/server";
import { getPosts } from "../models/Post";

// Handle GET requests
export async function GET() {
   const posts = await getPosts();

   console.log(posts);
   // return JSON data
   return NextResponse.json(posts, { status: 200 });
}

// Handle POST requests
export async function POST(request: Request) {}
