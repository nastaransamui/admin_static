// Next.js API route support:
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const hotelJson = path.join(process.cwd(), 'public', 'hotelsCountry.json');
  const hotelsFolderArray = fs.readFileSync(hotelJson);
  const hotelData = JSON.parse(hotelsFolderArray);
  res.status(200).json({ data: hotelData });
}
