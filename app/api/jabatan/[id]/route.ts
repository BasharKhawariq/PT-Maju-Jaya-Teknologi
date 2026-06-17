import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const data = await prisma.jabatan.findUnique({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json(data);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const data = await prisma.jabatan.update({
    where: {
      id: Number(id),
    },
    data: {
      namaJabatan: body.namaJabatan,
      gajiPokok: body.gajiPokok,
    },
  });

  return NextResponse.json(data);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.jabatan.delete({
    where: {
      id: Number(id),
    },
  });

  return Response.json({
    success: true,
    message: "Jabatan berhasil dihapus",
  });
}