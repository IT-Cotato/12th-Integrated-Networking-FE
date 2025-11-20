// src/api/kakao.ts
import axios from 'axios';

export type KakaoPlace = {
  id: string;
  place_name: string;
  address_name: string;
  x: string;
  y: string;
};

export async function searchKakaoKeyword(query: string): Promise<KakaoPlace[]> {
  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const url = 'https://dapi.kakao.com/v2/local/search/keyword.json';
  const headers = {
    Authorization: `KakaoAK ${REST_API_KEY}`
  };
  const params = { query };

  const { data } = await axios.get(url, { headers, params });
  return data.documents.map((doc: any) => ({
    id: doc.id,
    place_name: doc.place_name,
    address_name: doc.address_name,
    x: doc.x,
    y: doc.y
  }));
}
