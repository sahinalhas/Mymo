import React from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ChevronLeft, TrendingUp, TrendingDown, Gem, Banknote, Landmark, Bitcoin, PieChart as PieChartIcon } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

const categories = [
  { name: "Türk Lirası", icon: <Banknote className="h-6 w-6 text-red-500" />, amount: "15.420 TL", change: "+%0,2" },
  { name: "BIST Hisse", icon: <TrendingUp className="h-6 w-6 text-purple-500" />, amount: "412.300 TL", change: "+%8,2" },
  { name: "Emtia & Altın", icon: <TrendingUp className="h-6 w-6 text-amber-500" />, amount: "319.902 TL", change: "-%6,9", isNegative: true },
  { name: "Döviz", icon: <Banknote className="h-6 w-6 text-green-500" />, amount: "84.200 TL", change: "+%1,4" },
  { name: "Yatırım Fonu", icon: <Landmark className="h-6 w-6 text-blue-500" />, amount: "215.400 TL", change: "+%4,4" },
  { name: "Kripto", icon: <Bitcoin className="h-6 w-6 text-orange-500" />, amount: "23.100 TL", change: "+%12,1" },
];

export default function Portfolio() {
  return (
    <div className="flex flex-col min-h-screen soft-gradient pb-32 font-sans">
       <header className="px-6 py-4 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-secondary/50 h-10 w-10">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold tracking-tight">Analiz ve Dağılım</h1>
        </div>
      </header>

      <main className="px-6 py-8 space-y-8 max-w-md mx-auto w-full">
        <section className="text-center space-y-4">
           <div className="space-y-1">
             <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">En Büyük Pay</div>
             <div className="text-primary font-black text-4xl tracking-tight">
               319.902 <span className="text-lg font-semibold text-muted-foreground">TL</span>
             </div>
           </div>
           <div className="flex items-center justify-center gap-2">
             <div className="px-3 py-1 bg-destructive/10 text-destructive text-[11px] font-bold rounded-lg flex items-center gap-1">
               <TrendingDown className="h-3 w-3" />
               23.726 (%6,9)
             </div>
             <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">GÜNLÜK</div>
           </div>
        </section>

        {/* Portfolio Visualizer (Mini Chart) */}
        <div className="flex h-3 w-full rounded-full bg-secondary/50 overflow-hidden shadow-inner">
          <div className="h-full bg-purple-500 w-[40%]" />
          <div className="h-full bg-amber-500 w-[30%]" />
          <div className="h-full bg-blue-500 w-[20%]" />
          <div className="h-full bg-green-500 w-[10%]" />
        </div>

        <div className="grid gap-3">
          <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Kategoriler</Label>
          {categories.map((cat, i) => (
            <motion.div 
              key={cat.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-card border border-border/50 p-4 rounded-[1.25rem] flex items-center justify-between group cursor-pointer hover:border-primary/20 transition-all shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary/30 rounded-xl flex items-center justify-center shadow-inner group-hover:bg-secondary/50 transition-colors">
                  {cat.icon}
                </div>
                <div className="space-y-0.5">
                  <div className="font-bold text-sm tracking-tight group-hover:text-primary transition-colors">{cat.name}</div>
                  <div className="text-[11px] font-semibold text-muted-foreground uppercase">{cat.amount}</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${cat.isNegative ? 'bg-destructive/10 text-destructive' : 'bg-chart-2/10 text-chart-2'}`}>
                  {cat.change}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <div className="fixed bottom-24 left-6 right-6 flex items-center justify-center pointer-events-none">
         <div className="bg-primary px-8 py-4 rounded-2xl shadow-2xl shadow-primary/25 pointer-events-auto flex items-center gap-3 active:scale-95 transition-all cursor-pointer border border-white/10">
           <Gem className="text-primary-foreground h-5 w-5" />
           <span className="text-primary-foreground font-bold text-sm uppercase tracking-wider">Premium Özellikleri Aç</span>
         </div>
      </div>
    </div>
  );
}

const Crown = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
  </svg>
);
