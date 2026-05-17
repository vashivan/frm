import crypto from "crypto";

export function createWayForPaySignature(fields: Array<string | number>) {
  const secret = process.env.MERCHANT_SECRET_KEY!;

  const signatureString = fields.join(";");

  return crypto
    .createHmac("md5", secret)
    .update(signatureString, "utf8")
    .digest("hex");
}