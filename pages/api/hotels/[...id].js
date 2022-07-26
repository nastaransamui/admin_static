export default async function handler(req, res) {
  const StreamZip = require('node-stream-zip');
  const zip = new StreamZip({
    file: `${process.cwd()}/public/newHotels.zip`,
    storeEntries: true,
  });
  const { id } = req.query;
  let fileIsExist = false;
  zip.on('ready', () => {
    // Read a file in memory
    if (id.length == 2) {
      console.log(
        `newHotels/${id[0]?.toUpperCase()}/${id[1]?.toUpperCase()}_all.json`
      );
      for (const entry of Object.values(zip.entries())) {
        entry.name ==
        `newHotels/${id[0]?.toUpperCase()}/${id[1]?.toUpperCase()}_all.json`
          ? (fileIsExist = true)
          : (fileIsExist = false);
      }
      if (fileIsExist) {
        let zipDotTxtContents = zip
          .entryDataSync(
            `newHotels/${id[0]?.toUpperCase()}/${id[1]?.toUpperCase()}_all.json`
          )
          .toString('utf8');
        res
          .status(200)
          .json({ success: true, data: JSON.parse(zipDotTxtContents) });
        zip.close();
      } else {
        zip.close();
        res.status(400).json({ success: false, data: [] });
      }
    } else {
      res.status(400).json({ success: false, data: [] });
    }
  });
}
