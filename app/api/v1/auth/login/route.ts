import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { userLoginSchema } from "@/app/lib/validations/users";
import jwt from "jsonwebtoken";
import type { users } from "@/app/generated/prisma-client";
import { getPrismaConnection } from "@/app/db/prisma/prisma-connection";
import { JWT_SECRET } from "@/app/backend-config";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const prisma = getPrismaConnection();

    // validate
    await userLoginSchema.validate(body);

    // collect data
    const { email, password } = body;

    console.log(email, password);

    // business logic

    // call dao
    const result = await prisma.$queryRaw<
      users[]
    >`select * from users where email=${email}`;
    console.log(result);
    if (result.length == 0) throw "No such user account";

    const foundUser = result[0];
    const isMatch = bcrypt.compareSync(password, foundUser.password);
    console.log(isMatch);
    if (!isMatch) throw "Invalid Password. Please try again";

    if (!JWT_SECRET) throw "Server error, secret key not set";
    console.log(JWT_SECRET);

    const SECRET_KEY = JWT_SECRET as string;
    const token = jwt.sign(
      { id: foundUser.id?.toString(), name: foundUser.name },
      SECRET_KEY,
      {
        expiresIn: "2 days",
      },
    );

    return NextResponse.json({ msg: "OK", data: token });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "NOT OK", data: error });
  }
}
