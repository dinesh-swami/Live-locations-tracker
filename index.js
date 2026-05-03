import "dotenv/config";

import http from 'node:http';
import path from 'node:path';
import jwt from "jsonwebtoken";

import express from 'express';
import { Server } from 'socket.io';
import initializeSocket from './socket.js';
import connectToDatabase from "./db.js";
import startLocationHistoryConsumer from "./location-history-consumer.js";

async function main() {
  const PORT = process.env.PORT ?? 8000;

  await connectToDatabase();

  const app = express();
  const server = http.createServer(app);
  const io = new Server();

  await initializeSocket(server);
  await startLocationHistoryConsumer();


  app.use(express.static(path.resolve('./public')));
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  app.get('/health', (req, res) => {
    return res.json({ healthy: true });
  });

  app.post("/authenticate", async (req, res) => {
    console.log(req.body, "response body");
    const { code, nonce } = req.body;

    if (!code) {
      throw new Error("invalid code");
    };

    const response = await fetch("https://oidc-t4w5.onrender.com/o/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        grant_type: "authorization_code",
        redirect_url: "http://localhost:8000/callback.html",
      }),
    });

    const data = await response.json();
    console.log(data, "data from oidc server");
    const idToken = data.data.idToken;

    const decode = jwt.decode(idToken);

    if (decode.nonce !== nonce) {
      throw new Error("invalid nonce!");
    }

    return res.status(200).json({ data: data.data.accessToken });
  });

  server.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`),
  );
}

main();
