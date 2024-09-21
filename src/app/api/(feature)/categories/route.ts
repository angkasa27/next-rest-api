/* eslint-disable @typescript-eslint/no-explicit-any */
import connect from "@/lib/db";
import Category from "@/lib/models/category";
import { NextResponse } from "next/server";
import { Types } from "mongoose";
import User from "@/lib/models/user";
const ObjectId = Types.ObjectId;

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId || !ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "User id invalid" }), {
        status: 400,
      });
    }

    await connect();

    const user = await User.findById(userId);

    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const categories = await Category.find({ user: new ObjectId(userId) });

    return new NextResponse(JSON.stringify(categories), { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error in fetching categories " + error.message, {
      status: 500,
    });
  }
};

export const POST = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId || !ObjectId.isValid(userId)) {
      return new NextResponse("User Id invalid", { status: 400 });
    }

    const { title } = await request.json();

    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    await connect();

    const user = await User.findById(userId);

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const newCategory = new Category({ title, user: new ObjectId(userId) });

    await newCategory.save();

    return new NextResponse(
      JSON.stringify({ message: "Category is created", category: newCategory }),
      { status: 201 }
    );
  } catch (error: any) {
    return new NextResponse("Error in creating category " + error.message, {
      status: 500,
    });
  }
};
