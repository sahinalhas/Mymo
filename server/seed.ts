import { db } from "./db";
import { categories } from "@shared/schema";

async function seed() {
  console.log("Seeding database...");
  
  const defaultCategories = [
    { name: "Türk Lirası", icon: "Banknote", color: "bg-red-500" },
    { name: "BIST Hisse", icon: "TrendingUp", color: "bg-purple-500" },
    { name: "Emtia & Altın", icon: "TrendingUp", color: "bg-amber-500" },
    { name: "Döviz", icon: "Banknote", color: "bg-green-500" },
    { name: "Yatırım Fonu", icon: "Landmark", color: "bg-blue-500" },
    { name: "Kripto", icon: "Bitcoin", color: "bg-orange-500" },
  ];
  
  for (const category of defaultCategories) {
    try {
      await db.insert(categories).values(category).onConflictDoNothing();
      console.log(`✓ Added category: ${category.name}`);
    } catch (error) {
      console.error(`✗ Failed to add category: ${category.name}`, error);
    }
  }
  
  console.log("Seeding completed!");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});
