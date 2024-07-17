// src/app/api/get-data/route.js
import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

export async function GET(request) {
  // const myKey = "myKey";
  const myKey = 'myKey'

  try {
    // Tes koneksi Redis
    const pong = await redis.ping();
    console.log("Koneksi Redis berhasil:", pong);

    // Mendapatkan data berdasarkan myKey
    const inpUsername = 'andriraymonds'
    const data = await redis.get(myKey);
    const username = await redis.get('username')
    const password = await redis.get('password')

    if (data !== null) {
      let value = ''
      if (inpUsername == username){
        value = 'true'
      }else {
        value = 'false'
      }
      console.log('fuck')
      // return NextResponse.json({ message: "Success", data, username, password, value});
      return NextResponse.json({ message: "success" , username, password, value});
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
