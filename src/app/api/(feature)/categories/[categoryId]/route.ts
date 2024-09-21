/* eslint-disable @typescript-eslint/no-explicit-any */
import connect from "@/lib/db";
import Category from "@/lib/models/category";
import { NextResponse } from "next/server";
import { Types } from "mongoose";
import User from "@/lib/models/user";
const ObjectId = Types.ObjectId;

export const PATCH = async (
  request: Request,
  context: { params: { categoryId: string } }
) => {
  const { categoryId } = context.params;
  try {
    const { title } = await request.json();

    if (!title) {
      return new NextResponse(
        JSON.stringify({ message: "Title is required" }),
        { status: 400 }
      );
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId || !ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "User Id invalid" }), {
        status: 400,
      });
    }

    if (!categoryId || !ObjectId.isValid(categoryId)) {
      return new NextResponse(
        JSON.stringify({ message: "Category Id invalid" }),
        { status: 400 }
      );
    }

    await connect();

    const user = await User.findById(userId);

    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const category = await Category.findOne({ _id: categoryId, user: userId });

    if (!category) {
      return new NextResponse(
        JSON.stringify({ message: "Category not found" }),
        { status: 404 }
      );
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { title },
      { new: true }
    );

    return new NextResponse(
      JSON.stringify({
        message: "Category is updated",
        category: updatedCategory,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in updating category " + error.message, {
      status: 500,
    });
  }
};

export const DELETE = async (
  request: Request,
  context: { params: { categoryId: string } }
) => {
  const { categoryId } = context.params;
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId || !ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "User Id invalid" }), {
        status: 400,
      });
    }

    if (!categoryId || !ObjectId.isValid(categoryId)) {
      return new NextResponse(
        JSON.stringify({ message: "Category Id invalid" }),
        { status: 400 }
      );
    }

    await connect();

    const user = await User.findById(userId);

    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const category = await Category.findOne({ _id: categoryId, user: userId });

    if (!category) {
      return new NextResponse(
        JSON.stringify({ message: "Category not found" }),
        { status: 404 }
      );
    }

    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    return new NextResponse(
      JSON.stringify({
        message: "Category is deleted",
        category: deletedCategory,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in deleting category " + error.message, {
      status: 500,
    });
  }
};
