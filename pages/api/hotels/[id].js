export default async function handler(req, res) {
  const StreamZip = require('node-stream-zip');
  const zip = new StreamZip({
    file: `${process.cwd()}/public/newHotels.zip`,
    storeEntries: true,
  });
  const { id } = req.query;
  zip.on('ready', () => {
    const fileArray = Object.values(zip.entries()).filter(
      (a) => a.name == `newHotels/${id?.toUpperCase()}/`
    );
    if (fileArray.length > 0) {
      let zipDotTxtContents = zip
        .entryDataSync(
          `newHotels/${id?.toUpperCase()}/${id?.toUpperCase()}_all.json`
        )
        .toString('utf8');
      res
        .status(200)
        .json({ success: true, data: JSON.parse(zipDotTxtContents) });
      zip.close();
    } else {
      res.status(400).json({ success: false, data: [] });
      zip.close();
    }
  });
}
