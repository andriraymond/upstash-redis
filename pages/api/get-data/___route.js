import { Redis } from "@upstash/redis";
import express from "express";

const app = express();

export const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL || "",
    token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

// export default async function handler(req, res) {
//     try {
//     // Tes koneksi Redis
//         const pong = await redis.ping();
//         res.status(200).json({ message: "Koneksi Redis berhasil", pong });

//         const data = await redis.get(myKey);
//         req.Redis.set(myKey)
//         confirm(data.message, data.Redis.get(myKey));
        

//     } catch (error) {
//         console.error("Koneksi Redis gagal:", error);
//         res.status(500).json({ error: "Koneksi Redis gagal" });
//     }
// }

export default async function handler(req, res) {
    // const { myKey } = req.query;
    const myKey = "MyKey"

    try {
    // Tes koneksi Redis
        const pong = await redis.ping();
        console.log("Koneksi Redis berhasil:", pong);

    // Mendapatkan data berdasarkan myKey
    const data = await redis.get(myKey);

    if (data) {
        res.status(200).json({ message: "Data ditemukan", data });
    } else {
        res.status(404).json({ message: "Data tidak ditemukan" });
    }
    } catch (error) {
        console.error("Koneksi Redis gagal:", error);
        res.status(500).json({ error: "Koneksi Redis gagal" });
    }
}