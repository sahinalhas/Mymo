import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, TrendingUp, TrendingDown, Gem, Banknote, Landmark, Bitcoin } from "lucide-react";
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
    <div className="flex flex-col min-h-screen soft-gradient noise pb-32">
       <header className="p-6 flex items-center justify-between sticky top-0 z-50 glass mb-4">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-xl bg-secondary/50 h-10 w-10">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold tracking-tight">Varlık Gruplarım</h1>
        </div>
      </header>

      <main className="px-6 space-y-4 max-w-md mx-auto w-full">
        <section className="text-center py-6 space-y-2">
           <div className="text-primary font-black text-3xl tracking-tight">
             319.902 TL <span className="text-sm font-bold text-muted-foreground opacity-60">%42,7</span>
           </div>
           <div className="flex items-center justify-center gap-2">
             <div className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-black rounded-full">- 23.726 %6,9</div>
             <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">GÜNLÜK DEĞİŞİM</div>
           </div>
        </section>

        <div className="grid gap-3">
          {categories.map((cat, i) => (
            <motion.div 
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileTap={{ scale: 0.98 }}
              className="glass p-5 rounded-[2rem] flex items-center justify-between group cursor-pointer border border-border/20"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-secondary/50 rounded-2xl flex items-center justify-center shadow-inner">
                  {cat.icon}
                </div>
                <div>
                  <div className="font-black text-sm uppercase tracking-tight group-hover:text-primary transition-colors">{cat.name}</div>
                  <div className="text-xs font-bold text-muted-foreground">{cat.amount}</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-[10px] font-black px-2 py-0.5 rounded-full ${cat.isNegative ? 'bg-destructive/10 text-destructive' : 'bg-chart-2/10 text-chart-2'}`}>
                  {cat.change}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <div className="fixed bottom-10 left-6 right-6 flex items-center justify-center pointer-events-none">
         <div className="bg-primary px-8 py-4 rounded-full shadow-2xl shadow-primary/40 pointer-events-auto flex items-center gap-3 active:scale-95 transition-transform cursor-pointer">
           <Crown className="text-primary-foreground h-5 w-5" />
           <span className="text-primary-foreground font-black text-sm uppercase tracking-wider">Premium Üyeliğe Geç</span>
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
