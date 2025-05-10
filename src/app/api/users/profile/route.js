import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToMongoDb } from '@/lib/mongoDb';
import User from '@/models/User';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

  await connectToMongoDb();
  const user = await User.findOne({ email: session.user.email }).select('-_id -__v');

  return new Response(JSON.stringify(user), { status: 200 });
}

export async function PUT(req) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

  const { firstName, lastName, bio, profilePicture } = await req.json();
  await connectToMongoDb();

  const user = await User.findOneAndUpdate(
    { email: session.user.email },
    { firstName, lastName, bio, profilePicture },
    { new: true }
  ).select('-_id -__v');

  return new Response(JSON.stringify(user), { status: 200 });
}
