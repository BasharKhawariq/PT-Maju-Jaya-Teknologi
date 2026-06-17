"use client";

import { useEffect, useMemo, useState } from "react";

type RekapGaji = {
  nama: string;
  jabatan: string;
  gajiPokok: number;
  potongan: number;
  lembur: number;
  totalGaji: number;
};

export default function Home() {
  const [dashboard, setDashboard] = useState({
    jumlahPegawai: 0,
    totalLembur: 0,
    totalPotongan: 0,
  });

  const [gaji, setGaji] = useState<RekapGaji[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("salary");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const dashboardRes = await fetch(
      "/api/dashboard"
    );

    const dashboardData =
      await dashboardRes.json();

    setDashboard(dashboardData);

    const gajiRes = await fetch(
      "/api/rekap-gaji"
    );

    const gajiData =
      await gajiRes.json();

    setGaji(gajiData);
  }

  const filteredData = useMemo(() => {
    let data = [...gaji];

    if (search) {
      data = data.filter((item) =>
        item.nama
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );
    }

    if (sortBy === "salary") {
      data.sort(
        (a, b) =>
          b.totalGaji - a.totalGaji
      );
    }

    if (sortBy === "name") {
      data.sort((a, b) =>
        a.nama.localeCompare(b.nama)
      );
    }

    return data;
  }, [gaji, search, sortBy]);

  async function exportData() {
    const res = await fetch(
      "/api/export"
    );

    const data = await res.json();

    const blob = new Blob(
      [
        JSON.stringify(
          data,
          null,
          2
        ),
      ],
      {
        type: "application/json",
      }
    );

    const url =
      window.URL.createObjectURL(
        blob
      );

    const a =
      document.createElement("a");

    a.href = url;
    a.download =
      "laporan-pegawai.json";

    a.click();
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Dashboard Pegawai
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="border rounded p-4">
          <h2 className="font-semibold">
            Jumlah Pegawai
          </h2>

          <p className="text-2xl font-bold">
            {
              dashboard.jumlahPegawai
            }
          </p>
        </div>

        <div className="border rounded p-4">
          <h2 className="font-semibold">
            Total Lembur
          </h2>

          <p className="text-2xl font-bold">
            Rp{" "}
            {dashboard.totalLembur.toLocaleString()}
          </p>
        </div>

        <div className="border rounded p-4">
          <h2 className="font-semibold">
            Total Potongan
          </h2>

          <p className="text-2xl font-bold">
            Rp{" "}
            {dashboard.totalPotongan.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Cari Pegawai..."
          className="border p-2 rounded"
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

        <select
          className="border p-2 rounded"
          value={sortBy}
          onChange={(e) =>
            setSortBy(
              e.target.value
            )
          }
        >
          <option value="salary">
            Sort Gaji
          </option>

          <option value="name">
            Sort Nama
          </option>
        </select>

        <button
          onClick={exportData}
          className="border px-4 rounded"
        >
          Export JSON
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">
              Nama
            </th>

            <th className="border p-2">
              Jabatan
            </th>

            <th className="border p-2">
              Gaji Pokok
            </th>

            <th className="border p-2">
              Potongan
            </th>

            <th className="border p-2">
              Lembur
            </th>

            <th className="border p-2">
              Total Gaji
            </th>
          </tr>
        </thead>

        <tbody>
          {filteredData.map(
            (item) => (
              <tr
                key={item.nama}
              >
                <td className="border p-2">
                  {item.nama}
                </td>

                <td className="border p-2">
                  {
                    item.jabatan
                  }
                </td>

                <td className="border p-2">
                  Rp{" "}
                  {item.gajiPokok.toLocaleString()}
                </td>

                <td className="border p-2">
                  Rp{" "}
                  {item.potongan.toLocaleString()}
                </td>

                <td className="border p-2">
                  Rp{" "}
                  {item.lembur.toLocaleString()}
                </td>

                <td className="border p-2 font-bold">
                  Rp{" "}
                  {item.totalGaji.toLocaleString()}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </main>
  );
}