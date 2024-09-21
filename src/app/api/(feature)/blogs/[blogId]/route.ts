/* eslint-disable @typescript-eslint/no-explicit-any */
import connect from "@/lib/db";
import Category from "@/lib/models/category";
import { NextResponse } from "next/server";
import { Types } from "mongoose";
import User from "@/lib/models/user";
import Blog from "@/lib/models/blog";
const ObjectId = Types.ObjectId;

export const GET = async (
  request: Request,
  context: { params: { blogId: string } }
) => {
  const { blogId } = context.params;

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const categoryId = searchParams.get("categoryId");

    if (!userId || !ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "User id invalid" }), {
        status: 400,
      });
    }

    if (!categoryId || !ObjectId.isValid(categoryId)) {
      return new NextResponse(
        JSON.stringify({ message: "Category id invalid" }),
        {
          status: 400,
        }
      );
    }

    if (!blogId || !ObjectId.isValid(blogId)) {
      return new NextResponse(JSON.stringify({ message: "blog id invalid" }), {
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

    const category = await Category.findOne({ _id: categoryId, user: userId });

    if (!category) {
      return new NextResponse(
        JSON.stringify({ message: "Category not found" }),
        {
          status: 404,
        }
      );
    }

    const blog = await Blog.findOne({
      _id: blogId,
      user: userId,
      category: categoryId,
    });

    if (!blog) {
      return new NextResponse(JSON.stringify({ message: "Blog not found" }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify(blog), { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error in fetching blog " + error.message, {
      status: 500,
    });
  }
};

export const PATCH = async (
  request: Request,
  context: { params: { blogId: string } }
) => {
  const { blogId } = context.params;

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const categoryId = searchParams.get("categoryId");

    if (!userId || !ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "User id invalid" }), {
        status: 400,
      });
    }

    if (!categoryId || !ObjectId.isValid(categoryId)) {
      return new NextResponse(
        JSON.stringify({ message: "Category id invalid" }),
        {
          status: 400,
        }
      );
    }

    if (!blogId || !ObjectId.isValid(blogId)) {
      return new NextResponse(JSON.stringify({ message: "blog id invalid" }), {
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

    const category = await Category.findOne({ _id: categoryId, user: userId });

    if (!category) {
      return new NextResponse(
        JSON.stringify({ message: "Category not found" }),
        {
          status: 404,
        }
      );
    }

    const blog = await Blog.findOne({
      _id: blogId,
      user: userId,
      category: categoryId,
    });

    if (!blog) {
      return new NextResponse(JSON.stringify({ message: "Blog not found" }), {
        status: 404,
      });
    }

    const { title, description } = await request.json();

    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        title,
        description,
      },
      { new: true }
    );

    return new NextResponse(
      JSON.stringify({ message: "Blog is updated", blog: updatedBlog }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in updating blog " + error.message, {
      status: 500,
    });
  }
};

export const DELETE = async (
  request: Request,
  context: { params: { blogId: string } }
) => {
  const { blogId } = context.params;

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const categoryId = searchParams.get("categoryId");

    if (!userId || !ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "User id invalid" }), {
        status: 400,
      });
    }

    if (!categoryId || !ObjectId.isValid(categoryId)) {
      return new NextResponse(
        JSON.stringify({ message: "Category id invalid" }),
        {
          status: 400,
        }
      );
    }

    if (!blogId || !ObjectId.isValid(blogId)) {
      return new NextResponse(JSON.stringify({ message: "blog id invalid" }), {
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

    const category = await Category.findOne({ _id: categoryId, user: userId });

    if (!category) {
      return new NextResponse(
        JSON.stringify({ message: "Category not found" }),
        {
          status: 404,
        }
      );
    }

    const blog = await Blog.findOne({
      _id: blogId,
      user: userId,
      category: categoryId,
    });

    if (!blog) {
      return new NextResponse(JSON.stringify({ message: "Blog not found" }), {
        status: 404,
      });
    }

    await Blog.findByIdAndDelete(blogId);

    return new NextResponse(JSON.stringify({ message: "Blog is deleted" }), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse("Error in updating blog " + error.message, {
      status: 500,
    });
  }
};
