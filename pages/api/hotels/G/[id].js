import path from 'path';
import nextConnect from 'next-connect';
const StreamZip = require('node-stream-zip');
var zlib = require('zlib');
const apiRoute = nextConnect({
  onNoMatch(req, res) {
    res
      .status(405)
      .json({ success: false, Error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.get(async (req, res) => {
  const { id } = req.query;
  try {
    const file = path.join(process.cwd(), 'public', 'G.zip');
    const zip = new StreamZip.async({
      file: file,
      storeEntries: true,
    });
    const zipObj = await zip.entries();
    const fileArray = Object.values(zipObj).filter(
      (a) => a.name == `G/${id?.toUpperCase()}/`
    );
    if (fileArray.length > 0) {
      const completeHotels = await zip.stream(
        `G/${id?.toUpperCase()}/${id?.toUpperCase()}.json`
      );
      res.writeHead(200, { 'content-encoding': 'deflate' });
      completeHotels.pipe(zlib.createDeflate()).pipe(res);
    } else {
      res.status(400).json({ success: false, Error: 'notFound' });
    }
  } catch (error) {
    res.status(400).json({ success: false, Error: error.toString() });
  }
});
export default apiRoute;
