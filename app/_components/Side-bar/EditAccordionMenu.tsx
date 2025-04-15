"use client";

import { MenuDataType, MenuItemType } from "@/types/menu";
import { useEffect, useState } from "react";
import styles from "./EditAccordionMenu.module.scss";
import { IconMoveHandler } from "@/lib/constants/imagePath";
import Image from "next/image";
import Button from "../atoms/Button";
import { menuService } from "@/app/lib/services/menu";
import { usePathname } from "next/navigation";
import { nanoid } from "nanoid";

const EditAccordionMenu = ({
  flatMenuList,
  setEditMode,
  fetchApi,
}: {
  flatMenuList: MenuItemType[];
  setEditMode: (editMode: boolean) => void;
  fetchApi: () => void;
}) => {
  const pathname = usePathname();

  // 현재 경로에서 카테고리 추출
  const getCurrentCategory = () => {
    const paths = pathname.split("/").filter(Boolean);
    return paths[1] || ""; // 두 번째 경로 세그먼트 추출
  };

  const [flatMenuListState, setFlatMenuListState] =
    useState<MenuItemType[]>(flatMenuList);

  // =================================================================================
  // 들여쓰기/내어쓰기 기능

  // 메뉴 아이템의 들여쓰기를 증가시키는 함수
  // group -> mainMenu -> subMenu 순서로 타입이 변경됨
  const increaseIndent = (menuId: MenuItemType["id"]) => {
    // 각 타입별로 변경될 다음 타입을 정의
    const typeUpgrade: Record<MenuItemType["type"], MenuItemType["type"]> = {
      group: "mainMenu", // group은 mainMenu로 변경
      mainMenu: "subMenu", // mainMenu는 subMenu로 변경
      subMenu: "subMenu", // subMenu는 더 이상 변경 불가
    };

    // flatMenuList를 순회하면서 해당 아이템의 타입만 변경
    const result = flatMenuListState.map((item) => {
      if (item.id === menuId) {
        const newType = typeUpgrade[item.type];
        console.log(`${item.text}의 타입을 ${item.type}에서 ${newType}로 변경`);
        return { ...item, type: newType };
      }
      return item;
    });
    setFlatMenuListState(result);
  };

  // 메뉴 아이템의 들여쓰기를 감소시키는 함수
  // subMenu -> mainMenu -> group 순서로 타입이 변경됨
  const decreaseIndent = (menuId: MenuItemType["id"]) => {
    // 각 타입별로 변경될 다음 타입을 정의
    const typeDowngrade: Record<MenuItemType["type"], MenuItemType["type"]> = {
      group: "group", // group은 더 이상 변경 불가
      mainMenu: "group", // mainMenu는 group으로 변경
      subMenu: "mainMenu", // subMenu는 mainMenu로 변경
    };

    // flatMenuList를 순회하면서 해당 아이템의 타입만 변경
    const result = flatMenuListState.map((item) => {
      if (item.id === menuId) {
        const newType = typeDowngrade[item.type];
        console.log(`${item.text}의 타입을 ${item.type}에서 ${newType}로 변경`);
        return { ...item, type: newType };
      }
      return item;
    });
    setFlatMenuListState(result);
  };

  // =================================================================================
  // 저장 기능

  const save = async () => {
    let isValid = true;
    let hasShownError = false;

    // 각 메뉴 타입별로 필요한 상위 타입을 정의
    const requiredAncestorTypes: Record<
      MenuItemType["type"],
      MenuItemType["type"] | null
    > = {
      group: null, // group은 상위 타입이 필요 없음
      mainMenu: "group", // mainMenu는 group 아래에만 위치 가능
      subMenu: "mainMenu", // subMenu는 mainMenu 아래에만 위치 가능
    };

    // 현재 아이템의 위치부터 위로 올라가면서 상위 타입을 찾는 함수
    const findAndUpdateParent = (
      currentItem: MenuItemType, // 현재 검사 중인 아이템
      requiredType: MenuItemType["type"], // 찾아야 하는 상위 타입
      currentIndex: number // 현재 아이템의 위치
    ): boolean => {
      // 현재 아이템부터 위로 올라가면서 requiredType을 가진 가장 가까운 아이템을 찾음
      for (let i = currentIndex - 1; i >= 0; i--) {
        const potentialParent = flatMenuListState[i];
        if (potentialParent.type === requiredType) {
          // 부모를 찾았으면 parentId 업데이트
          currentItem.parentId = potentialParent.menuUid;
          return true;
        }
      }
      return false;
    };

    // 각 아이템에 대해 유효성 검사 및 parentId 업데이트 수행
    const updatedList = flatMenuListState.map((item, index) => {
      let updatedItem = { ...item, sortOrder: index }; // ← sortOrder 추가

      // group 타입은 항상 parentId를 null로 설정
      if (item.type === "group") {
        updatedItem.parentId = null;
        return updatedItem;
      }

      // 현재 아이템 타입에 필요한 상위 타입 가져오기
      const requiredAncestorType = requiredAncestorTypes[item.type];
      if (!requiredAncestorType) return updatedItem;

      // 상위에 필요한 타입이 있는지 확인하고 parentId 업데이트
      const hasRequiredAncestor = findAndUpdateParent(
        updatedItem,
        requiredAncestorType,
        index
      );

      // 필요한 타입의 상위 요소가 없는 경우 에러 처리
      if (!hasRequiredAncestor) {
        isValid = false;
        if (!hasShownError) {
          const missingAncestor =
            requiredAncestorType.charAt(0).toUpperCase() +
            requiredAncestorType.slice(1);
          alert(
            `오류: '${item.text}'(${item.type})의 상위에 ${missingAncestor} 타입이 필요합니다.`
          );
          hasShownError = true;
        }
      }

      return updatedItem;
    });

    // 모든 검증을 통과한 경우에만 저장 실행
    if (isValid) {
      alert("저장 성공!");
      const res = await menuService.updateMenu(
        updatedList,
        getCurrentCategory()
      );
      setFlatMenuListState(updatedList);
      setEditMode(false);
      fetchApi();
    }
  };

  // =================================================================================
  // 드래그 앤 드롭 기능

  // 드래그 중인 아이템의 ID와 드래그 오버 중인 아이템의 ID를 추적하는 상태
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [draggedOverId, setDraggedOverId] = useState<number | null>(null);

  // 드래그 시작 시 호출되는 함수
  const handleDragStart = (e: React.DragEvent, itemId: number) => {
    e.dataTransfer.setData("text/plain", itemId.toString());
    setDraggedId(itemId);
  };

  // 드래그 종료 시 호출되는 함수
  const handleDragEnd = () => {
    setDraggedId(null);
    setDraggedOverId(null);
  };

  // 드래그 중인 아이템이 다른 아이템 위에 있을 때 호출되는 함수
  const handleDragOver = (e: React.DragEvent, itemId: number) => {
    e.preventDefault();
    if (draggedId !== itemId) {
      setDraggedOverId(itemId);
    }
  };

  // 드래그 중인 아이템이 다른 아이템을 벗어날 때 호출되는 함수
  const handleDragLeave = () => {
    setDraggedOverId(null);
  };

  // 드래그한 아이템을 놓을 때 호출되는 함수
  const handleDrop = (e: React.DragEvent, targetId: number) => {
    e.preventDefault();
    const draggedId = parseInt(e.dataTransfer.getData("text/plain"));

    if (draggedId === targetId) return;

    // 아이템 순서 변경
    const newList = [...flatMenuListState];
    const draggedIndex = newList.findIndex((item) => item.id === draggedId);
    const targetIndex = newList.findIndex((item) => item.id === targetId);

    // 아이템 위치 교환
    const [draggedItem] = newList.splice(draggedIndex, 1);
    newList.splice(targetIndex, 0, draggedItem);

    setFlatMenuListState(newList);
    setDraggedId(null);
    setDraggedOverId(null);
  };

  // 메뉴 아이템의 타입에 따른 CSS 클래스를 결정하는 함수
  const classNameDecider = (type: MenuItemType["type"]) => {
    switch (type) {
      case "group":
        return styles.group;
      case "mainMenu":
        return styles.mainMenu;
      case "subMenu":
        return styles.subMenu;
    }
  };

  const add = () => {
    const newItem = {
      id: Date.now(),
      menuUid: nanoid(),
      text: "새로운 메뉴",
      type: "group",
      parentId: null,
      path: "",
      category: getCurrentCategory(), // 현재 카테고리 사용
      children: [],
    };

    setFlatMenuListState([newItem, ...flatMenuListState]);
  };

  const deleteItem = (id: number) => {
    const newList = flatMenuListState.filter((item) => item.id !== id);
    setFlatMenuListState(newList);
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <Button onClick={save} theme="black">
          저장
        </Button>
        <Button onClick={add} theme="black">
          추가
        </Button>
      </div>
      <ul className={styles.flatMenuList}>
        {flatMenuListState.map((item) => (
          <li
            key={item.id}
            className={`${classNameDecider(item.type)} ${
              draggedId === item.id ? styles.dragging : ""
            } ${draggedOverId === item.id ? styles.dragOver : ""}`}
            draggable
            onDragStart={(e) => handleDragStart(e, item.id)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => handleDragOver(e, item.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, item.id)}
          >
            <p>
              <Image
                src={IconMoveHandler}
                alt="move"
                width={16}
                height={16}
                draggable={false}
              />
              {item.type === "mainMenu" && <span> ― </span>}
              {item.type === "subMenu" && <span> ―― </span>}
              <input
                type="text"
                value={item.text}
                onChange={(e) => {
                  const newList = flatMenuListState.map((menuItem) =>
                    menuItem.menuUid === item.menuUid
                      ? { ...menuItem, text: e.target.value }
                      : menuItem
                  );
                  setFlatMenuListState(newList);
                }}
              />
            </p>
            <div className={styles.indentButtonContainer}>
              <button onClick={() => deleteItem(item.id)}>{"x"}</button>
              <button
                onClick={() => decreaseIndent(item.id)}
                disabled={item.type === "group"}
              >
                {"<"}
              </button>
              <button
                onClick={() => increaseIndent(item.id)}
                disabled={item.type === "subMenu"}
              >
                {">"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditAccordionMenu;
