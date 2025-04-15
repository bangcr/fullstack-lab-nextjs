import { api } from '../api/client';
import { ENDPOINTS } from '../api/endpoints';
import { MenuItemType } from '@/types/menu';

export const menuService = {
  getMenuList: async (category: string) => {
    const res = await api.get<MenuItemType[]>(
      ENDPOINTS.MENU.LIST + `?category=${category}`
    );
    return res;
  },
  
  updateMenu: async (menuData: MenuItemType[], category: string) => {
    const { data } = await api.post(ENDPOINTS.MENU.LIST + `?category=${category}`, menuData);
    return data;
  },
};