import * as crypto from "crypto"

export const md5 = (query: string) => {
  return crypto
    .createHash("md5")
    .update(query)
    .digest("hex")
}
