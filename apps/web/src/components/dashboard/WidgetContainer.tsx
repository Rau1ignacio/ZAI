import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { GripVertical, Trash2, Maximize2 } from "lucide-react";
import Skeleton from "react-loading-skeleton";

interface WidgetContainerProps {
  id: string;
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  isEditing?: boolean;
  isLoading?: boolean;
  onDelete?: () => void;
  onExpand?: () => void;
  isDragging?: boolean;
  dragHandleProps?: any;
  dragAttributes?: any;
  dragListeners?: any;
}

export default function WidgetContainer({
  id,
  title,
  icon,
  children,
  isEditing = false,
  isLoading = false,
  onDelete,
  onExpand,
  isDragging = false,
  dragHandleProps,
  dragAttributes,
  dragListeners,
}: WidgetContainerProps) {
  // Merge dnd-kit attributes with any existing dragHandleProps
  const mergedDragProps = {
    ...dragHandleProps,
    ...dragAttributes,
  };
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      whileHover={!isDragging && !isEditing ? { y: -4 } : undefined}
      className={`group relative rounded-2xl border transition-all duration-300 ${
        isDragging
          ? "border-emerald-500/50 bg-slate-900/80 shadow-lg shadow-emerald-500/30"
          : "border-slate-700 bg-slate-900/50 hover:border-emerald-500/30"
      } ${isLoading ? "blur-sm" : ""}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 p-4">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {isEditing && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              {...mergedDragProps}
              {...dragListeners}
              className="p-1 rounded-lg hover:bg-slate-800 transition cursor-grab active:cursor-grabbing flex-shrink-0"
              title="Arrastra para mover"
            >
              <GripVertical className="w-5 h-5 text-slate-400" />
            </motion.button>
          )}

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              {icon && <span className="text-lg flex-shrink-0">{icon}</span>}
              <h3 className="text-sm font-semibold text-slate-50 truncate">{title}</h3>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
          {!isEditing && onExpand && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onExpand}
              className="p-2 rounded-lg hover:bg-slate-800 transition opacity-0 group-hover:opacity-100 transition-opacity"
              title="Expandir"
            >
              <Maximize2 className="w-4 h-4 text-slate-400 hover:text-emerald-400" />
            </motion.button>
          )}

          {isEditing && onDelete && (
            <motion.button
              whileHover={{ scale: 1.1, color: "#f43f5e" }}
              whileTap={{ scale: 0.95 }}
              onClick={onDelete}
              className="p-2 rounded-lg hover:bg-rose-500/10 transition"
              title="Eliminar"
            >
              <Trash2 className="w-4 h-4 text-slate-400" />
            </motion.button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton count={3} height={20} />
          </div>
        ) : (
          <>{children}</>
        )}
      </div>

      {/* Drag overlay indicator */}
      {isDragging && (
        <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-emerald-400/50 pointer-events-none bg-emerald-400/5" />
      )}

      {/* Edit mode indicator */}
      {isEditing && !isDragging && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="px-2 py-1 rounded text-xs bg-emerald-500/20 border border-emerald-500/30 text-emerald-300">
            Editando
          </span>
        </div>
      )}
    </motion.div>
  );
}
