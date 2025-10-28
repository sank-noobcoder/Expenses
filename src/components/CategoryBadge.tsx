import { ExpenseCategory } from "@/lib/types";
import { Utensils, BookOpen, Car, MoreHorizontal } from "lucide-react";

interface CategoryBadgeProps {
  category: ExpenseCategory;
  size?: "sm" | "md";
}

const categoryConfig = {
  Food: { icon: Utensils, color: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300" },
  Stationery: { icon: BookOpen, color: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300" },
  Travel: { icon: Car, color: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300" },
  Misc: { icon: MoreHorizontal, color: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300" },
};

export const CategoryBadge = ({ category, size = "md" }: CategoryBadgeProps) => {
  const config = categoryConfig[category];
  const Icon = config.icon;
  const sizeClasses = size === "sm" ? "text-xs px-2 py-1" : "text-sm px-3 py-1.5";

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-medium ${config.color} ${sizeClasses}`}>
      <Icon className={size === "sm" ? "h-3 w-3" : "h-4 w-4"} />
      {category}
    </span>
  );
};
