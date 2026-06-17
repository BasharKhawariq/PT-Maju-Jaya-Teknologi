import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const data = await prisma.presensi.update({
    where: {
      id: Number(id),
    },
    data: body,
  });

  return NextResponse.json(data);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.presensi.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json({
    message: "Deleted",
  });
}