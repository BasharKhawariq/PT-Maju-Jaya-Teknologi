import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const pegawai =
    await prisma.pegawai.findMany({
      include: {
        jabatan: true,
        presensi: true,
      },
    });

  const data = pegawai.map((p) => {
    const potongan =
      p.presensi.reduce(
        (a, b) =>
          a +
          b.terlambatMenit * 2000 +
          (b.statusHadir === "alpa"
            ? 100000
            : 0),
        0
      );

    const lembur =
      p.presensi.reduce(
        (a, b) =>
          a + b.lemburMenit * 1000,
        0
      );

    return {
      nama: p.nama,
      jabatan: p.jabatan.namaJabatan,
      gajiPokok:
        Number(p.jabatan.gajiPokok),
      potongan,
      lembur,
      totalGaji:
        Number(p.jabatan.gajiPokok) -
        potongan +
        lembur,
    };
  });

  return NextResponse.json(data);
}