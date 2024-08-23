const nextConnect = require('next-connect');
const StreamZip = require('node-stream-zip');
var zlib = require('zlib');
import path from 'path';
import fs from 'fs';
const apiRoute = nextConnect({
  onNoMatch(req, res) {
    res
      .status(405)
      .json({ success: false, Error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.get(async (req, res, next) => {
  try {
    //
    // const fileToRead = `${process.cwd()}/public/countries.json`;
    // let rawdata = fs.readFileSync(fileToRead);
    // let data = JSON.parse(rawdata);
    const file = path.join(process.cwd(), 'public', 'countries.zip');
    const zip = new StreamZip.async({
      file: file,
      storeEntries: true,
    });
    const zipObj = await zip.entries();
    console.log(zipObj);
    const completeHotels = await zip.stream(`countries.json`);
    res.writeHead(200, { 'content-encoding': 'deflate' });
    completeHotels.pipe(zlib.createDeflate()).pipe(res);
    // res.status(200).json({
    //   success: true,
    //   data: [],
    //   totalCount: 0,
    // });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString() });
  }
});

export default apiRoute;
