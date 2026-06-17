import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const jumlahPegawai =
    await prisma.pegawai.count();

  const presensi =
    await prisma.presensi.findMany();

  const totalLembur =
    presensi.reduce(
      (a, b) => a + b.lemburMenit,
      0
    ) * 1000;

  const totalPotongan =
    presensi.reduce(
      (a, b) =>
        a +
        b.terlambatMenit * 2000 +
        (b.statusHadir === "alpa"
          ? 100000
          : 0),
      0
    );

  return NextResponse.json({
    jumlahPegawai,
    totalLembur,
    totalPotongan,
  });
}