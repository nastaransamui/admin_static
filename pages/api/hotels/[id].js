import path from 'path';
export default async function handler(req, res) {
  const StreamZip = require('node-stream-zip');

  const { id } = req.query;
  try {
    const file = path.join(process.cwd(), 'public', 'newHotels.zip');
    const zip = new StreamZip.async({
      file: file,
      storeEntries: true,
    });
    const zipObj = await zip.entries();
    const fileArray = Object.values(zipObj).filter(
      (a) => a.name == `newHotels/${id?.toUpperCase()}/`
    );
    if (fileArray.length > 0) {
      let zipDotTxtContents = await zip.entryData(
        `newHotels/${id?.toUpperCase()}/${id?.toUpperCase()}_all.json`
      );
      let data = JSON.parse(zipDotTxtContents);
      res.status(200).json({ success: true, data: data });
    } else {
      res.status(400).json({ success: true, data: [] });
    }
  } catch (error) {
    res.status(400).json({ success: false, Error: error.toString() });
  }
}
