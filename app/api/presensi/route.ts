import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await prisma.presensi.findMany({
    include: {
      pegawai: true,
    },
  });

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();

  const data = await prisma.presensi.create({
    data: {
      pegawaiId: body.pegawaiId,
      tanggal: new Date(body.tanggal),
      statusHadir: body.statusHadir,
      terlambatMenit: body.terlambatMenit,
      lemburMenit: body.lemburMenit,
    },
  });

  return NextResponse.json(data);
}