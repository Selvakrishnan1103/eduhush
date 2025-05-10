import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToMongoDb } from '@/lib/mongoDb';
import News from '@/models/News';
import User from '@/models/User';

export async function GET() {
  try {
    await connectToMongoDb();
    const news = await News.find().sort({ createdAt: -1 });
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToMongoDb();
    const user = await User.findOne({ email: session.user.email });

    if (!user || !user.isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { title, content, image } = await req.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    const news = await News.create({
      title,
      content,
      image: image,
      author: session?.user?.name,
    });

    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
