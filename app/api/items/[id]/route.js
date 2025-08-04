import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/db";
import Item from "@/models/Item";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { name, description, price } = await request.json();
    await connectMongoDB();

    const item = await Item.findByIdAndUpdate(
      id,
      { name, description, price },
      { new: true }
    );

    if (!item) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Item updated successfully", item },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating item", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectMongoDB();

    const item = await Item.findOne({ _id: id });

    if (!item) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }
    return NextResponse.json({ item }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching item", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await connectMongoDB();

    const item = await Item.findByIdAndDelete(id);

    if (!item) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Item deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting item", error: error.message },
      { status: 500 }
    );
  }
}
