// Lightweight Backend for LADY NAYRA: Serves the app + Auto-uploads & sends PDF via Meta WhatsApp Cloud API
const express = require('express');
const multer = require('multer');
const FormData = require('form-data');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const upload = multer();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));

app.post('/api/send-whatsapp-pdf', upload.single('pdf'), async (req, res) => {
  try {
    const { phoneId, token, to, billNo, shopName } = req.body;
    if (!phoneId || !token || !to || !req.file) {
      return res.status(400).json({ error: 'Missing phoneId, token, recipient, or PDF file.' });
    }

    // 1. Upload PDF to WhatsApp Cloud Media API
    const form = new FormData();
    form.append('messaging_product', 'whatsapp');
    form.append('file', req.file.buffer, { filename: `${billNo}.pdf`, contentType: 'application/pdf' });

    const mediaRes = await fetch(`https://graph.facebook.com/v19.0/${phoneId}/media`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, ...form.getHeaders() },
      body: form
    });
    const mediaData = await mediaRes.json();
    if (!mediaData.id) return res.status(502).json({ error: 'Media upload failed', details: mediaData });

    // 2. Send PDF Document message to Party WhatsApp
    const msgRes = await fetch(`https://graph.facebook.com/v19.0/${phoneId}/messages`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to,
        type: 'document',
        document: {
          id: mediaData.id,
          filename: `${billNo}.pdf`,
          caption: `Thank you for shopping with ${shopName || 'LADY NAYRA'}! Attached is your bill ${billNo}.`
        }
      })
    });
    const msgData = await msgRes.json();
    res.json({ ok: true, msgData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`LADY NAYRA server running at http://localhost:${PORT}`));
