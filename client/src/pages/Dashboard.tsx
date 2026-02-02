import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  PieChart, 
  Wallet, 
  ArrowRightLeft, 
  Menu,
  Eye,
  Crown
} from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

const assets = [
  { id: 1, name: "EREGL", desc: "Ereğli Demir Çelik", price: "27,540", change: "+%4,1", type: "stock", color: "bg-red-500" },
  { id: 2, name: "TCELL", desc: "Turkcell", price: "113,60", change: "+%3,6", type: "stock", color: "bg-yellow-500" },
  { id: 3, name: "BZY", desc: "BNP PARIBAS CARDI...", price: "0,0613", change: "+%3,4", type: "fund", color: "bg-blue-500" },
  { id: 4, name: "Gr Altın", desc: "Kapalı Çarşı", price: "3.120,44", change: "+%2,9", type: "commodity", color: "bg-amber-500" },
];

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen soft-gradient noise pb-24">
      {/* Header */}
      <header className="p-6 flex items-center justify-between sticky top-0 z-50 glass mb-4 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-linear-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mymo-shadow">
            <Wallet className="text-primary-foreground h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter leading-none">mymo</h1>
            <span className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase">Investment</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full bg-secondary/50">
            <span className="text-xs font-bold">TL</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full bg-secondary/50">
            <Eye className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="px-6 space-y-6 max-w-md mx-auto w-full">
        {/* Total Value Section */}
        <section className="text-center py-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary/50 rounded-full text-xs font-medium mb-2 border border-border/50">
            PORTFÖY_1 <PieChart className="h-3 w-3" />
          </div>
          <h2 className="text-4xl font-black tracking-tight flex items-baseline justify-center gap-1">
            1.070.320 <span className="text-xl text-muted-foreground font-medium uppercase">TL</span>
          </h2>
          <div className="flex items-center justify-center gap-3">
             <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-destructive/10 text-destructive text-sm font-bold">
               - 23.695 <span className="opacity-70 font-medium">%2,2</span>
             </div>
             <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Günlük Değişim</div>
          </div>
        </section>

        {/* Portfolio Distribution Chart Placeholder */}
        <div className="relative aspect-square max-w-[200px] mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-[12px] border-primary/20"></div>
          <div className="absolute inset-0 rounded-full border-[12px] border-primary border-r-transparent border-b-transparent transform -rotate-12 shadow-[0_0_15px_rgba(var(--primary),0.3)]"></div>
          <div className="text-center space-y-1">
            <Crown className="h-5 w-5 text-primary mx-auto" />
            <div className="text-[10px] uppercase font-black text-primary tracking-tighter">Premium</div>
          </div>
          {/* Labels */}
          <div className="absolute top-0 right-0 translate-x-12 text-[10px] font-bold">%0,04 <span className="text-muted-foreground">BIST</span></div>
          <div className="absolute bottom-1/2 left-0 -translate-x-12 text-[10px] font-bold">Emtia <span className="text-primary">%100,0</span></div>
        </div>

        {/* Assets List */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Varlıklarım</h3>
            <Button variant="link" className="text-primary h-auto p-0 font-bold text-xs uppercase tracking-tighter">Tümünü Gör</Button>
          </div>
          <div className="space-y-3">
            {assets.map((asset) => (
              <motion.div 
                key={asset.id}
                whileTap={{ scale: 0.98 }}
                className="glass p-4 rounded-2xl flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${asset.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <span className="text-white font-black text-xs">{asset.name.substring(0,2)}</span>
                  </div>
                  <div>
                    <div className="font-bold flex items-center gap-2 group-hover:text-primary transition-colors">
                      {asset.name}
                      <TrendingUp className="h-3 w-3 text-chart-2" />
                    </div>
                    <div className="text-xs text-muted-foreground font-medium">{asset.desc}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold tracking-tight">{asset.price}</div>
                  <div className="text-[10px] font-black text-chart-2">{asset.change}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Market Summary */}
        <Card className="glass border-none overflow-hidden rounded-3xl">
          <CardContent className="p-0">
             <div className="bg-primary/10 p-4 border-b border-primary/10 flex items-center justify-between">
               <div className="font-black text-xs uppercase tracking-widest">BIST 100</div>
               <div className="flex items-center gap-2">
                 <span className="font-bold">10.418</span>
                 <div className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-chart-2/20 text-chart-2 text-[10px] font-black">+%2,2</div>
               </div>
             </div>
          </CardContent>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 p-4 pb-8 z-50 glass border-t border-border/50 flex items-center justify-between max-w-md mx-auto">
        <Link href="/add">
          <Button variant="ghost" size="icon" className="text-primary-foreground bg-primary rounded-2xl h-14 w-14 shadow-lg shadow-primary/20 active:scale-95 transition-transform">
            <Plus className="h-8 w-8" />
          </Button>
        </Link>
        <Link href="/">
          <Button variant="ghost" size="icon" className="h-14 w-14 text-primary">
            <PieChart className="h-7 w-7" />
          </Button>
        </Link>
        <Link href="/portfolio">
          <Button variant="ghost" size="icon" className="h-14 w-14">
            <div className="w-12 h-12 bg-secondary/50 rounded-2xl flex items-center justify-center">
              <span className="text-primary font-black text-xl">P</span>
            </div>
          </Button>
        </Link>
        <Link href="/transactions">
          <Button variant="ghost" size="icon" className="h-14 w-14">
            <ArrowRightLeft className="h-7 w-7 text-muted-foreground" />
          </Button>
        </Link>
        <Link href="/profile">
          <Button variant="ghost" size="icon" className="h-14 w-14">
            <Menu className="h-7 w-7 text-muted-foreground" />
          </Button>
        </Link>
      </nav>
    </div>
  );
}
