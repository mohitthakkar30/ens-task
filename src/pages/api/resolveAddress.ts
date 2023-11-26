#!/usr/bin/node --experimental-specifier-resolution=node
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ENS } from "@ensdomains/ensjs";
import { providers } from "ethers";

type Data = {
  value: string;
};

const ens = new ENS();
const URL = process.env.URL;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { value } = req.query as Data;
    if (!value) {
      return res.status(400).json({ error: "Address is required" });
    }
    const provider = new providers.JsonRpcProvider(URL);
    await ens.setProvider(provider);

    const response = await ens.getName(value);
    if (!response?.name) {
      return res.status(400).json({ error: "No domain found" });
    }
    res.status(200).json({ name: response.name });
  } catch (error) {
    console.error("Error in API route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
