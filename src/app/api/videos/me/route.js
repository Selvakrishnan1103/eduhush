import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToMongoDb } from '@/lib/mongoDb';
import Video from '@/models/Video';
import User from '@/models/User'; 

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    await connectToMongoDb();


    const videos = await Video.find({ uploadedBy: session.user.name }).sort({ createdAt: -1 });

    const user = await User.findOne({ email: session.user.email }).select('profilePicture');
    console.log(user)
    return new Response(
      JSON.stringify({
        videos,
        profilePic: user?.profilePicture || '',
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch user data' }), { status: 500 });
  }
}
