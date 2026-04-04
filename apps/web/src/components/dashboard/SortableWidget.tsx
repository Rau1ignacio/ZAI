import React, { forwardRef } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { motion } from "framer-motion";
import WidgetContainer from "./WidgetContainer";
import { DashboardWidgetId } from "../../types/dashboard";

interface SortableWidgetProps {
  id: DashboardWidgetId;
  title: string;
  icon: string;
  isEditing: boolean;
  isLoading: boolean;
  onDelete: () => void;
  children: React.ReactNode;
  index: number;
}

const SortableWidget = forwardRef<HTMLDivElement, SortableWidgetProps>(
  (
    {
      id,
      title,
      icon,
      isEditing,
      isLoading,
      onDelete,
      children,
      index,
    },
    ref
  ) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
      isOver,
    } = useSortable({
      id: id,
      disabled: !isEditing,
    });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
      zIndex: isDragging ? 1000 : 0,
    };

    return (
      <motion.div
        ref={setNodeRef}
        style={style as any}
        layout
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <WidgetContainer
          id={id}
          title={title}
          icon={icon}
          isEditing={isEditing}
          isLoading={isLoading}
          onDelete={onDelete}
          isDragging={isDragging}
          dragAttributes={isEditing ? attributes : undefined}
          dragListeners={isEditing ? listeners : undefined}
        >
          {children}
        </WidgetContainer>
      </motion.div>
    );
  }
);

SortableWidget.displayName = "SortableWidget";

export default SortableWidget;
