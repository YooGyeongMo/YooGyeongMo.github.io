import { getAllCategories } from "@/lib/til";
import { TilContent } from "./TilContent";

export default function TilPage() {
  const categories = getAllCategories();
  return <TilContent categories={categories} />;
}
