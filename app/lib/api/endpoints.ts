export const ENDPOINTS = {
    MENU: {
      LIST: '/blog/menu',
      DETAIL: (id: number)=> `/blog/menu/${id}`,
    },
  } as const;