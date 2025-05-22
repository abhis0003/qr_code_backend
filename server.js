const express = require('express');
const { QRCodeStyling } = require('qr-code-styling/lib/qr-code-styling.common.js');
const nodeCanvas = require('canvas');
const { JSDOM } = require('jsdom');

const app = express();
const port = 3000;

// Enable JSON body parsing
app.use(express.json());

// POST endpoint to generate QR code
app.post('/generate', async (req, res) => {
  try {
    const {
      data ,
      width ,
      height,
      image ,
      dotColor = "#4267b2",
      backgroundColor = "#e9ebee",
      dotType = "rounded",
      margin = 20
    } = req.body;

    const options = {
      width,
      height,
      data,
      image,
      dotsOptions: {
        color: dotColor,
        type: dotType,
      },
      backgroundOptions: {
        color: backgroundColor,
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin,
        saveAsBlob: true
      }
    };

    const qrCodeImage = new QRCodeStyling({
      jsdom: JSDOM,
      nodeCanvas,

      ...options
    });

    const buffer = await qrCodeImage.getRawData("png");
    const base64Image = `data:image/png;base64,${buffer.toString('base64')}`;

    res.json({ base64: base64Image });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'QR generation failed' });
  }
});

app.listen(port, () => {
  console.log(`QR code API listening at http://localhost:${port}`);
});

