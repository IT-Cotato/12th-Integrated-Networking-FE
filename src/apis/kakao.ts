export type KakaoPlaceDocument = {
  place_name: string;
  address_name: string;
  road_address_name: string | null;
  x: string; // 경도
  y: string; // 위도
};

export type KakaoSearchResponse = {
  documents: KakaoPlaceDocument[];
};

export async function searchPlaces(keyword: string) {
  const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;

  const res = await fetch(
    `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(
      keyword,
    )}`,
    {
      headers: {
        Authorization: `KakaoAK ${REST_API_KEY}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error("카카오 API 오류");
  }

  const data: KakaoSearchResponse = await res.json();

  return data.documents.map(doc => ({
    name: doc.place_name,
    address: doc.road_address_name || doc.address_name,
    lat: parseFloat(doc.y), // y = 위도
    lng: parseFloat(doc.x), // x = 경도
  }));
}
