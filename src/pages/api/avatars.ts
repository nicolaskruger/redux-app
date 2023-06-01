import type { NextApiHandler } from "next";
import fs from "fs";

const filesName: NextApiHandler = async (request, response) => {
  return response.json(
    fs.readdirSync("./public/user").map((v) => `/user/${v}`)
  );
};

export default filesName;
