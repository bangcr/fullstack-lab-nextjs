interface FetchOptions extends RequestInit {
    revalidate?: number;
  }
  
  // 브라우저 환경 체크 함수
  const isBrowser = () => typeof window !== 'undefined';
  
  // 토큰 가져오기 함수
  const getToken = () => {
    if (isBrowser()) {
      return localStorage.getItem('token');
    }
    return null; // 서버에서는 null 반환
  };
  
  // 기본 fetch 함수 래핑
  async function fetchApi<T>(url: string, options: FetchOptions = {}): Promise<T> {
    // 요청 인터셉터 로직
    const { revalidate, ...fetchOptions } = options;
    const fullUrl = url.startsWith('http') ? url : `${process.env.NEXT_PUBLIC_API_URL}${url}`;
    
    // 환경에 따른 조건부 헤더 설정
    const token = getToken();
    let config: RequestInit = {
      ...fetchOptions,
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
    };
    
    // 서버/클라이언트 모두에서 동작하는 로깅
    console.log(`요청: ${fullUrl}`);
    
    // 실제 fetch 요청 보내기
    const nextConfig = typeof revalidate === 'number' ? { next: { revalidate } } : {};
    const response = await fetch(fullUrl, { ...config, ...nextConfig });
    
    // 응답 인터셉터 로직
    if (!response.ok) {
      // 에러 핸들링 (ex: 401 인증 오류시 리다이렉션)
      if (response.status === 401 && isBrowser()) {
        // 토큰 만료 처리 로직
        localStorage.removeItem('token');
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
      
      throw new Error(`API 오류: ${response.status}`);
    }
    
    // 응답 데이터 처리
    const data = await response.json();
    console.log(`응답: ${fullUrl}`, data);
    
    return data;
  }
  
  // HTTP 메서드별 헬퍼 함수들
  export const api = {
    get: <T>(url: string, options?: FetchOptions) => 
      fetchApi<T>(url, { ...options, method: 'GET' }),
    
    post: <T>(url: string, body: any, options?: FetchOptions) => 
      fetchApi<T>(url, { ...options, method: 'POST', body: JSON.stringify(body) }),
    
    put: <T>(url: string, body: any, options?: FetchOptions) => 
      fetchApi<T>(url, { ...options, method: 'PUT', body: JSON.stringify(body) }),
    
    delete: <T>(url: string, options?: FetchOptions) => 
      fetchApi<T>(url, { ...options, method: 'DELETE' }),
  };