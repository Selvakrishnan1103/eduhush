
import { NextResponse } from 'next/server';
import {connectToMongoDb} from '@/lib/mongoDb';
import Video from '@/models/Video';

export async function PATCH(req, { params }) {
  await connectToMongoDb();
  const param = await params
  const { id } = param;

  try {
    const video = await Video.findById(id);
    if (!video) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    video.views = (video.views || 0) + 1;
    await video.save();

    return NextResponse.json({ message: 'View counted' }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
