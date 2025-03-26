// hooks/useDraggableList.ts
import { useState } from 'react';

interface UseDraggableListProps<T> {
  initialItems: T[];
  isEnabled: boolean;
  dragClassName?: string; // 드래그 중일 때 적용할 클래스 이름
}

export const useDraggableList = <T>({ initialItems, isEnabled, dragClassName = 'dragging' }: UseDraggableListProps<T>) => {
  const [items, setItems] = useState<T[]>(initialItems);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    if (!isEnabled) return;
    
    setDraggedItem(index);
    const draggedElement = document.querySelector(`[data-index="${index}"]`);
    draggedElement?.classList.add(dragClassName);
  };

  const handleDragEnd = () => {
    if (!isEnabled) return;

    document.querySelectorAll(`.${dragClassName}`).forEach((element) => {
      element.classList.remove(dragClassName);
    });
    setDraggedItem(null);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    if (!isEnabled) return;
    
    e.preventDefault();
    if (draggedItem === null || draggedItem === index) return;

    // 이전 드래그 효과 제거
    document.querySelectorAll(`.${dragClassName}`).forEach((element) => {
      element.classList.remove(dragClassName);
    });

    // 아이템 순서 변경
    const newItems = [...items];
    const draggedItemContent = newItems[draggedItem];
    newItems.splice(draggedItem, 1);
    newItems.splice(index, 0, draggedItemContent);

    // data-index 속성 업데이트
    const elements = document.querySelectorAll(`[data-index]`);
    elements.forEach((element, idx) => {
      element.setAttribute("data-index", idx.toString());
    });

    // 현재 드래그 중인 요소에 효과 적용
    const currentElement = document.querySelector(`[data-index="${index}"]`);
    currentElement?.classList.add(dragClassName);

    setItems(newItems);
    setDraggedItem(index);
  };

  return {
    items,
    setItems,
    draggedItem,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
  };
};