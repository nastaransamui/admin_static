// Next.js API route support:
import fs from 'fs';

export default async function handler(req, res) {
  const countryFolderArray = fs.readFileSync(
    `${process.cwd()}/public/hotelsCountry.json`
  );
  res.status(200).json({ data: JSON.parse(countryFolderArray) });
}
