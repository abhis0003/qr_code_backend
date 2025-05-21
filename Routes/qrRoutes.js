// const express = require('express');
// const QRCode = require('qrcode');
// const path = require('path');
// const fs = require('fs');

// const router = express.Router();

// router.post('/generate', async (req, res) => {
//   const { url, name = 'qr' } = req.body;

//   if (!url) return res.status(400).json({ error: 'No URL provided' });

//   try {
//     const filePath = path.join(__dirname, '../images/qrcodes', `${name}.png`);

//     // Ensure directory exists
//     fs.mkdirSync(path.dirname(filePath), { recursive: true });

//     await QRCode.toFile(filePath, url, {
//       color: {
//         dark: '#000',
//         light: '#FFF',
//       },
//       width: 300,
//     });

//     const qrUrl = `http://localhost:5000/qrcodes/${name}.png`;
//     res.status(200).json({ qrUrl, originalUrl: url });
//   } catch (err) {
//     console.error('QR generation error:', err);
//     res.status(500).json({ error: 'QR generation failed' });
//   }
// });

// module.exports = router;
