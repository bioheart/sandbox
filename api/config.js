// Vercel Serverless Function to safely provide Environment Variables to client
export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/javascript');
  res.setHeader('Cache-Control', 's-maxage=0, max-age=0');
  
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '';
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '';

  res.status(200).send(`
    if (!window.DEFAULT_CLOUD_SYNC || !window.DEFAULT_CLOUD_SYNC.url) {
      window.DEFAULT_CLOUD_SYNC = {
        url: ${JSON.stringify(url)},
        token: ${JSON.stringify(token)}
      };
    }
  `);
}
