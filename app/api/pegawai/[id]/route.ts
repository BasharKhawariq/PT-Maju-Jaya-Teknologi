import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const data = await prisma.pegawai.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      jabatan: true,
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

  const data = await prisma.pegawai.update({
    where: {
      id: Number(id),
    },
    data: {
      nama: body.nama,
      gelar: body.gelar,
      jabatanId: body.jabatanId,
    },
  });

  return NextResponse.json(data);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.pegawai.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json({
    success: true,
    message: "Pegawai berhasil dihapus",
  });
}