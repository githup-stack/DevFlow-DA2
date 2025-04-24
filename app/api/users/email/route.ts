import { NextResponse } from "next/server";

import handleError from "@/app/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/app/lib/http-errors";
import dbConnect from "@/app/lib/mongoose";
import { UserSchema } from "@/app/lib/validations";
import User from "@/database/user.model";

export async function POST(request: Request) {
  const { email } = await request.json();

  try {
    await dbConnect();

    const validatedData = UserSchema.partial().safeParse({ email });

    if (!validatedData.success)
      throw new ValidationError(validatedData.error.flatten().fieldErrors);

    const user = await User.findOne({ email });
    if (!user) throw new NotFoundError("User");

    return NextResponse.json(
      {
        success: true,
        data: user,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
