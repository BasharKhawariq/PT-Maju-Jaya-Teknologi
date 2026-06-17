import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const data =
    await prisma.pegawai.findMany({
      include: {
        jabatan: true,
        presensi: true,
      },
    });

  return NextResponse.json(data);
}