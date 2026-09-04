const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// 代理网易云API
app.get('/api/*', async (req, res) => {
  try {
    const path = req.params[0];
    const query = req.query;
    const targetUrl = `https://music.163.com/api/${path}`;
    const resp = await axios.get(targetUrl, { params: query });
    res.json(resp.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`music‑server listen on ${PORT}`);
});
