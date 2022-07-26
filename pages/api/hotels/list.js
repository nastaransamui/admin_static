// Next.js API route support:
import fs from 'fs';

export default async function handler(req, res) {
  const countryFolderArray = fs.readdirSync(
    `${process.cwd()}/public/newHotels`
  );
  res.status(200).json({ data: countryFolderArray });
}
