import fetch from 'node-fetch';
export default async function handler(req, res) {
  const { prompt } = req.body;
  const OPENAI_TOKEN = process.env.OPENAI_TOKEN;

  if(!OPENAI_TOKEN) return res.status(500).json({ error: 'OpenAI token fehlt' });

  const response = await fetch('https://api.openai.com/v1/completions', {
    method:'POST',
    headers:{
      'Authorization': `Bearer ${OPENAI_TOKEN}`,
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 200
    })
  });

  const data = await response.json();
  res.status(200).json({ text: data.choices?.[0]?.text || '' });
}