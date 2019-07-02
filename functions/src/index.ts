import * as fs from "fs"
import * as path from 'path';
import * as os from 'os';

import * as admin from "firebase-admin"
import * as functions from "firebase-functions"
import fetch from "node-fetch"

// import * as storage from "./storage";
import { md5 } from "./md5"

admin.initializeApp()
const bucket = admin.storage().bucket()

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// fetchImage?q=https://jp.vuejs.org/images/logo.png
export const fetchImage = functions.https.onRequest(async (req, res) => {
  const query: string = req.query.q || ""
  try {
    const result = await fetch(query)
    const buffer = await result.buffer()
    const filename = md5(query)
    const filepath = path.join(os.tmpdir(), filename);

    if (!result.ok) return

    fs.writeFileSync(filepath, buffer, "binary")
    await bucket.upload(filepath)
  } catch (error) {
    console.error(error)
  }
  res.send("fetchImage!")
})
