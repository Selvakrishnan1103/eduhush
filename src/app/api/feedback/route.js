import { NextResponse } from "next/server";
import { connectToMongoDb } from "@/lib/mongoDb";
import Feedback from "@/models/Feedback";

export async function POST(request) {
  try {
    await connectToMongoDb();
    const body = await request.json();

    const { message, user } = body;

    const feedback = await Feedback.create({
      message,
      user: user || "Anonymous",
    });

    return NextResponse.json({ success: true, feedback });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
