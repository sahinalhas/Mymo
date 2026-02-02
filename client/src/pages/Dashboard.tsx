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
    <div className="flex flex-col min-h-screen soft-gradient pb-24 font-sans selection:bg-primary/20">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
            <Wallet className="text-primary h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">mymo</h1>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-chart-2 animate-pulse" />
              <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Live Market</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9 px-3 rounded-xl border-border/50 bg-secondary/30">
            <span className="text-xs font-semibold">TL</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-xl h-9 w-9 hover:bg-secondary/50">
            <Eye className="h-5 w-5 text-muted-foreground" />
          </Button>
        </div>
      </header>

      <main className="px-6 py-8 space-y-8 max-w-md mx-auto w-full">
        {/* Total Value Section */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-muted-foreground">
             <span className="text-xs font-bold uppercase tracking-widest">Toplam Varlık</span>
             <PieChart className="h-3 w-3" />
          </div>
          <div className="flex items-baseline gap-2">
            <h2 className="text-4xl font-black tracking-tight">1.070.320</h2>
            <span className="text-xl text-muted-foreground font-semibold uppercase">TL</span>
          </div>
          <div className="flex items-center gap-2">
             <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-destructive/10 text-destructive text-sm font-bold">
               <TrendingDown className="h-3.5 w-3.5" />
               <span>23.695</span>
               <span className="opacity-70 text-xs font-semibold">(%2,2)</span>
             </div>
             <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Bugün</div>
          </div>
        </section>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { icon: Plus, label: "Ekle", color: "bg-primary text-primary-foreground", href: "/add" },
            { icon: ArrowRightLeft, label: "Takas", color: "bg-secondary text-foreground", href: "/transactions" },
            { icon: PieChart, label: "Analiz", color: "bg-secondary text-foreground", href: "/portfolio" },
            { icon: Crown, label: "Pro", color: "bg-secondary text-foreground", href: "/profile" },
          ].map((action, i) => (
            <Link key={i} href={action.href}>
              <div className="flex flex-col items-center gap-2 cursor-pointer group">
                <div className={`w-14 h-14 ${action.color} rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200 border border-white/10`}>
                  <action.icon className="h-6 w-6" />
                </div>
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">{action.label}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Assets List */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Varlık Dağılımı</h3>
            <Button variant="ghost" size="sm" className="text-primary h-auto p-0 font-bold text-[10px] uppercase tracking-wider hover:bg-transparent">Hepsini Gör</Button>
          </div>
          <div className="grid gap-3">
            {assets.map((asset) => (
              <motion.div 
                key={asset.id}
                whileTap={{ scale: 0.98 }}
                className="bg-card border border-border/50 p-4 rounded-[1.25rem] flex items-center justify-between group cursor-pointer hover:border-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-11 h-11 ${asset.color} rounded-xl flex items-center justify-center shadow-md border border-white/20`}>
                    <span className="text-white font-black text-xs">{asset.name.substring(0,2)}</span>
                  </div>
                  <div className="space-y-0.5">
                    <div className="font-bold text-sm tracking-tight group-hover:text-primary transition-colors">
                      {asset.name}
                    </div>
                    <div className="text-[11px] text-muted-foreground font-semibold uppercase tracking-tight">{asset.desc}</div>
                  </div>
                </div>
                <div className="text-right space-y-0.5">
                  <div className="font-bold text-sm tracking-tight">{asset.price}</div>
                  <div className="flex items-center justify-end gap-1 text-[10px] font-black text-chart-2">
                    <TrendingUp className="h-2.5 w-2.5" />
                    {asset.change}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Market Summary Card */}
        <Card className="bg-card border-border/50 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-0">
             <div className="bg-primary/5 p-5 flex items-center justify-between">
               <div className="space-y-1">
                 <div className="font-bold text-xs uppercase tracking-widest text-muted-foreground">BIST 100 Endeksi</div>
                 <div className="text-2xl font-black tracking-tighter">10.418,24</div>
               </div>
               <div className="flex flex-col items-end gap-1">
                 <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-chart-2/10 text-chart-2 text-[10px] font-black">
                   <TrendingUp className="h-3 w-3" />
                   +%2,24
                 </div>
                 <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Bugün</div>
               </div>
             </div>
          </CardContent>
        </Card>
      </main>

      {/* Modern Bottom Navigation */}
      <nav className="fixed bottom-6 left-6 right-6 p-2 z-50 bg-background/90 backdrop-blur-xl border border-border/50 rounded-full flex items-center justify-between max-w-md mx-auto shadow-2xl">
        <Link href="/">
          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full text-primary bg-primary/10">
            <PieChart className="h-6 w-6" />
          </Button>
        </Link>
        <Link href="/portfolio">
          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full hover:bg-secondary/50">
            <Wallet className="h-6 w-6 text-muted-foreground" />
          </Button>
        </Link>
        <div className="relative -top-1">
          <Link href="/add">
            <Button size="icon" className="h-14 w-14 rounded-full shadow-lg shadow-primary/25 hover:scale-105 active:scale-95 transition-all">
              <Plus className="h-8 w-8" />
            </Button>
          </Link>
        </div>
        <Link href="/transactions">
          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full hover:bg-secondary/50">
            <ArrowRightLeft className="h-6 w-6 text-muted-foreground" />
          </Button>
        </Link>
        <Link href="/profile">
          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full hover:bg-secondary/50">
            <Menu className="h-6 w-6 text-muted-foreground" />
          </Button>
        </Link>
      </nav>
    </div>
  );
}
