const express = require('express');
const cors = require('cors');
const QRCode = require('qrcode');

const app = express();
app.use(cors());
app.use(express.json());

// Helper to validate hex color
const isHexColor = (value) => /^#[0-9A-F]{6}$/i.test(value);

app.post('/generate', async (req, res) => {
  const { url, color = {}, width } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  const defaultColors = {
    dark: '#000000', // black color
    light: '#ffffff',  //white color
  };

  try {
    const qrOptions = {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      color: {
        dark: isHexColor(color.dark) ? color.dark : defaultColors.dark,
        light: isHexColor(color.light) ? color.light : defaultColors.light,
      },
      width: parseInt(width) || 300,
      margin: 2,
    };

    // Generate QR code as a Data URL (base64)
    const qrBase64 = await QRCode.toDataURL(url, qrOptions);

    res.json({ qr: qrBase64 });
  } catch (err) {
    console.error('QR generation error:', err.message);
    res.status(500).json({ error: 'QR code generation failed' });
  }
});

app.listen(5000, () => {
  console.log('Server running at http://localhost:5000');
});
