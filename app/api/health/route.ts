export async function GET() {
  return Response.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'suribass-client',
    version: process.env.VERSION || '1.0.0'
  });
}
