// Next.js API route support:
import fs from 'fs';
import path from 'path';

export function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export default async function handler(req, res) {
  const hotelJson = path.join(process.cwd(), 'public', 'hotelsCountry.json');
  const hotelsFolderArray = fs.readFileSync(hotelJson);
  const hotelData = JSON.parse(hotelsFolderArray);
  if (Object.keys(req.query).length === 0) {
    res.status(200).json({ data: hotelData });
  } else {
    const filterValue = Object.values(req.query)[0];
    const fieldValue = Object.keys(req.query)[0];
    const searchRegex = new RegExp(escapeRegExp(filterValue), 'i');
    var filteredData = hotelData.filter((row) => {
      return Object.keys(row).some((field) => {
        if (field == fieldValue) {
          if (row[field] !== null) {
            return searchRegex.test(row[field].toString());
          }
        }
      });
    });
    res.status(200).json({ data: filteredData });
  }
}
