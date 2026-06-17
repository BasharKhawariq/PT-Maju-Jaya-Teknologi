import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await prisma.pegawai.findMany({
    include: {
      jabatan: true,
    },
  });

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();

  const data = await prisma.pegawai.create({
    data: {
      nama: body.nama,
      gelar: body.gelar,
      jabatanId: body.jabatanId,
    },
  });

  return NextResponse.json(data);
}