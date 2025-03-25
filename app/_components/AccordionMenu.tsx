import styles from "./AccordionMenu.module.scss";
import { AccordionItem } from "./AccordionItem";

interface MenuItem {
  id: number;
  type: "menu" | "subMenu" | "groupTitle";
  text: string;
  path: string | null;
  parentId?: number;
  children?: MenuItem[] | null;
}

interface MenuGroup {
  groupTitle: string;
  children: MenuItem[];
}

interface DataStructure {
  title: string;
  menu: MenuGroup[];
}

interface Props {
  menuData: DataStructure;
}

const AccordionMenu = ({ menuData }: Props) => {
  return (
    <nav className={styles.container}>
      <h2 className={styles.menuTitle}>{menuData.title}</h2>
      <ul>
        {menuData.menu.map((group, groupIdx) => (
          <li key={groupIdx} className={styles.groupItem}>
            <h3 className={styles.groupTitle}>{group.groupTitle}</h3>
            <ul>
              {group.children.map((item, itemIdx) => (
                <AccordionItem key={itemIdx} item={item} />
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AccordionMenu;
