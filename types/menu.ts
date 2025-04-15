export interface MenuItemType {
  id: number;
  menuUid: string;
  parentId: string | null;
  category: string;
  type: "group" | "mainMenu" | "subMenu";
  text: string;
  path: string | null;
  children: MenuItemType[] | null;
  }
  
export interface MenuDataType {
  title: string;
  menu: MenuItemType[];
}
