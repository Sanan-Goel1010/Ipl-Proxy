export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { matchId, type } = req.query;

  try {
    let url;
    if (type === 'recent') {
      url = 'https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent';
    } else if (type === 'upcoming') {
      url = 'https://cricbuzz-cricket.p.rapidapi.com/matches/v1/upcoming';
    } else if (type === 'live') {
      url = 'https://cricbuzz-cricket.p.rapidapi.com/matches/v1/live';
    } else if (matchId) {
      url = `https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${matchId}/scard`;
    } else {
      return res.status(400).json({ error: 'Provide matchId or type' });
    }

    const response = await fetch(url, {
      headers: {
        'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com',
        'x-rapidapi-key': 'b2b08f7d42msh762a849bc2d5696p1a2010jsn8fa70ff4ca7c'
      }
    });
    const text = await response.text();
    try {
      res.json(JSON.parse(text));
    } catch(e) {
      res.status(200).json({ error: 'Invalid JSON', raw: text.slice(0,100) });
    }
  } catch(e) {
    res.status(200).json({ error: e.message });
  }
}
