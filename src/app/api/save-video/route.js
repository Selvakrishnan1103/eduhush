import { connectToMongoDb } from '@/lib/mongoDb';
import Video from '@/models/Video';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await connectToMongoDb();
    const body = await req.json();

    const { title, videoUrl, thumbnailUrl, uploadedBy } = body;

    if (!title || !videoUrl || !uploadedBy) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const video = await Video.create({ title, videoUrl, thumbnailUrl, uploadedBy });

    return NextResponse.json({ success: true, video }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
