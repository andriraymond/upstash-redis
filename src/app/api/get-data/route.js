// src/app/api/get-data/route.js
import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

export async function GET(request) {
  const myKey = "myKey"; // Ganti dengan nama kunci yang sesuai di Upstash Redis

  try {
    // Tes koneksi Redis
    const pong = await redis.ping();
    console.log("Koneksi Redis berhasil:", pong);

    // Mendapatkan data berdasarkan myKey
    const data = await redis.get(myKey);

    if (data !== null) {
      return NextResponse.json({ message: "Data ditemukan", data });
    } else {
      return NextResponse.json(
        { message: "Data tidak ditemukan" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Koneksi Redis gagal:", error);
    return NextResponse.json({ error: "Koneksi Redis gagal" }, { status: 500 });
  }
}
