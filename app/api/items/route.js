import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/db";
import Item from "@/models/Item";

export async function POST(request) {
  const { name, description, price } = await request.json();
  await connectMongoDB();
  await Item.create({ name, description, price });
  return NextResponse.json(
    { message: "Item created successfully" },
    { status: 201 }
  );
}

export async function GET() {
  await connectMongoDB();
  const items = await Item.find();
  return NextResponse.json({ items }, { status: 200 });
}

 