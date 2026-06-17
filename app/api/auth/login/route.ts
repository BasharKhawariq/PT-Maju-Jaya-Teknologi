import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signToken } from "@/lib/jwt";

export async function POST(req: Request) {
  const body = await req.json();

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    return NextResponse.json(
      { message: "Email tidak ditemukan" },
      { status: 404 }
    );
  }

  const isValid = await bcrypt.compare(
    body.password,
    user.password
  );

  if (!isValid) {
    return NextResponse.json(
      { message: "Password salah" },
      { status: 401 }
    );
  }

  const token = signToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  return NextResponse.json({
    token,
    user,
  });
}