const API_BASE_URL = process.env.VITE_API_BASE_URL;

export default async function handler(
  req: { method?: string; query: Record<string, string | string[] | undefined>; body?: unknown; headers: Record<string, string | string[] | undefined>; url?: string },
  res: { setHeader: (name: string, value: string) => void; status: (code: number) => { json: (data: unknown) => void; end: () => void } }
) {
  const { path, ...queryParams } = req.query;
  const pathString = Array.isArray(path) ? path.join('/') : path || '';

  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');

  // OPTIONS 요청 처리
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // 쿼리 파라미터 구성
    const queryString = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      if (key !== 'path') {
        if (Array.isArray(value)) {
          value.forEach(v => queryString.append(key, String(v)));
        } else if (value) {
          queryString.append(key, String(value));
        }
      }
    });
    const query = queryString.toString();
    // pathString이 이미 'api'로 시작하면 그대로 사용, 아니면 'api' 추가
    const cleanPath = pathString.startsWith('api/') ? pathString : `api/${pathString}`;
    const targetUrl = `${API_BASE_URL}/${cleanPath}${query ? `?${query}` : ''}`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'accept': '*/*',
    };
    
    if (req.headers.authorization) {
      headers.Authorization = Array.isArray(req.headers.authorization) 
        ? req.headers.authorization[0] 
        : req.headers.authorization;
    }

    const response = await fetch(targetUrl, {
      method: req.method || 'GET',
      headers,
      body: req.method !== 'GET' && req.method !== 'HEAD' && req.body 
        ? JSON.stringify(req.body) 
        : undefined,
    });

    const data = await response.json();
    
    return res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ error: 'Proxy request failed' });
  }
}

