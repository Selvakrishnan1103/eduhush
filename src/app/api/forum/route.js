import { connectToMongoDb } from '@/lib/mongoDb';
import ForumPost from '@/models/ForumPost';

export async function GET() {
  await connectToMongoDb();
  const posts = await ForumPost.find().sort({ createdAt: -1 });
  return new Response(JSON.stringify(posts), { status: 200 });
}

export async function POST(req) {
  await connectToMongoDb();
  const { content, author } = await req.json();

  if (!content || !author) {
    return new Response(JSON.stringify({ message: 'Missing fields' }), { status: 400 });
  }

  const post = await ForumPost.create({ content, author });
  return new Response(JSON.stringify(post), { status: 201 });
}
