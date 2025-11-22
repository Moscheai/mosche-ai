import fetch from 'node-fetch';
export default async function handler(req, res) {
  const { prompt } = req.body;
  const HF_TOKEN = process.env.HF_TOKEN;
  if(!HF_TOKEN) return res.status(500).json({ error: 'HuggingFace token fehlt' });

  const response = await fetch('https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4', {
    method: 'POST',
    headers: { Authorization: `Bearer ${HF_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ inputs: prompt })
  });

  const result = await response.arrayBuffer();
  const b64 = Buffer.from(result).toString('base64');
  res.status(200).json({ b64 });
}