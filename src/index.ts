import * as fs from "fs"
import * as path from "path"
import * as os from "os"
import * as functions from "firebase-functions"
import fetch from "node-fetch"

import * as crypto from "./crypto"
import * as storage from "./storage"

/**
 * fetchImage?q=https://jp.vuejs.org/images/logo.png
 */
export const fetchImage = functions.https.onRequest(async (req, res) => {
  const query: string = req.query.q || ""
  try {
    // Fetch
    const result = await fetch(query)
    if (!result.ok) throw new Error("fail result")
    const buffer = await result.buffer()

    // Write
    const filetype = result.headers.get("content-type")
    const filename = crypto.md5(query)
    const filepath = path.join(os.tmpdir(), filename)
    // const base64 = buffer.toString("base64")
    fs.writeFileSync(filepath, buffer, "binary")

    // Response
    res.status(200)
    res.header({ "Content-Type": filetype || "" })
    return res.sendFile(filepath)
  } catch (error) {
    console.error(error)
  }
})

/**
 * uploadImage?q=https://jp.vuejs.org/images/logo.png
 */
export const uploadImage = functions.https.onRequest(async (req, res) => {
  const query: string = req.query.q || ""
  try {
    const result = await fetch(query)
    if (!result.ok) {
      throw new Error("Fail fetch")
    }
    const buffer = await result.buffer()
    const filename = crypto.md5(query)
    const filepath = path.join(os.tmpdir(), filename)
    fs.writeFileSync(filepath, buffer, "binary")
    await storage.upload(filepath)
  } catch (error) {
    console.error(error.message)
  }
  res.send("success")
})
