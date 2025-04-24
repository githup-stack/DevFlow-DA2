import { NextResponse } from "next/server";

import handleError from "@/app/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/app/lib/http-errors";
import dbConnect from "@/app/lib/mongoose";
import { AccountSchema } from "@/app/lib/validations";
import Account from "@/database/account.model";

export async function POST(request: Request) {
  const { providerAccountId } = await request.json();

  try {
    await dbConnect();

    const validatedData = AccountSchema.partial().safeParse({
      providerAccountId,
    });

    if (!validatedData.success)
      throw new ValidationError(validatedData.error.flatten().fieldErrors);

    const account = await Account.findOne({ providerAccountId });
    if (!account) throw new NotFoundError("Account");

    return NextResponse.json(
      {
        success: true,
        data: account,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
