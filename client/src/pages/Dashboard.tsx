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
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const assets = [
  { id: 1, name: "EREGL", desc: "Ereğli Demir Çelik", price: "27,540", change: "+%4,1", type: "stock", color: "bg-red-500", value: 400000 },
  { id: 2, name: "TCELL", desc: "Turkcell", price: "113,60", change: "+%3,6", type: "stock", color: "bg-yellow-500", value: 300000 },
  { id: 3, name: "BZY", desc: "BNP PARIBAS CARDI...", price: "0,0613", change: "+%3,4", type: "fund", color: "bg-blue-500", value: 200000 },
  { id: 4, name: "Gr Altın", desc: "Kapalı Çarşı", price: "3.120,44", change: "+%2,9", type: "commodity", color: "bg-amber-500", value: 170320 },
];

const chartData = assets.map(a => ({
  name: a.name,
  value: a.value,
  color: a.id === 1 ? '#ef4444' : a.id === 2 ? '#eab308' : a.id === 3 ? '#3b82f6' : '#f59e0b'
}));

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
        <section className="space-y-8">
          <div className="space-y-3 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/50 rounded-full border border-border/50 text-muted-foreground">
               <span className="text-[10px] font-bold uppercase tracking-widest">Toplam Varlık</span>
               <PieChart className="h-3 w-3" />
            </div>
            <div className="flex items-baseline justify-center gap-2">
              <h2 className="text-5xl font-black tracking-tight">1.070.320</h2>
              <span className="text-xl text-muted-foreground font-semibold uppercase">TL</span>
            </div>
            <div className="flex items-center justify-center gap-2">
               <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-destructive/10 text-destructive text-sm font-bold">
                 <TrendingDown className="h-3.5 w-3.5" />
                 <span>23.695</span>
                 <span className="opacity-70 text-xs font-semibold">(%2,2)</span>
               </div>
               <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Bugün</div>
            </div>
          </div>

          {/* Elegant Pie Chart */}
          <div className="h-64 w-full relative bg-card/50 backdrop-blur-sm rounded-[3rem] border border-border/50 shadow-sm p-4 overflow-hidden group">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={8}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '20px', 
                    border: 'none', 
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                    backgroundColor: 'hsl(var(--card))',
                    padding: '12px'
                  }}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
               <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-1">Dağılım</div>
               <div className="text-xl font-black text-primary tracking-tighter">%100</div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { icon: Plus, label: "Ekle", color: "bg-primary text-primary-foreground shadow-primary/20", href: "/add" },
            { icon: ArrowRightLeft, label: "Takas", color: "bg-secondary text-foreground", href: "/transactions" },
            { icon: PieChart, label: "Analiz", color: "bg-secondary text-foreground", href: "/portfolio" },
            { icon: Crown, label: "Pro", color: "bg-secondary text-foreground", href: "/profile" },
          ].map((action, i) => (
            <Link key={i} href={action.href}>
              <div className="flex flex-col items-center gap-2 cursor-pointer group">
                <div className={`w-14 h-14 ${action.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-300 border border-white/5`}>
                  <action.icon className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{action.label}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Assets List */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Varlık Dağılımı</h3>
            <Button variant="ghost" size="sm" className="text-primary h-auto p-0 font-bold text-[10px] uppercase tracking-wider hover:bg-transparent">Hepsini Gör</Button>
          </div>
          <div className="grid gap-3">
            {assets.map((asset) => (
              <motion.div 
                key={asset.id}
                whileTap={{ scale: 0.98 }}
                className="bg-card/50 backdrop-blur-sm border border-border/50 p-4 rounded-[1.5rem] flex items-center justify-between group cursor-pointer hover:border-primary/20 transition-all duration-300 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${asset.color} rounded-2xl flex items-center justify-center shadow-lg border border-white/10`}>
                    <span className="text-white font-black text-xs">{asset.name.substring(0,2)}</span>
                  </div>
                  <div className="space-y-0.5">
                    <div className="font-bold text-sm tracking-tight group-hover:text-primary transition-colors">
                      {asset.name}
                    </div>
                    <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{asset.desc}</div>
                  </div>
                </div>
                <div className="text-right space-y-0.5">
                  <div className="font-black text-sm tracking-tight">{asset.price}</div>
                  <div className="flex items-center justify-end gap-1 text-[10px] font-black text-chart-2 bg-chart-2/10 px-2 py-0.5 rounded-full">
                    <TrendingUp className="h-2.5 w-2.5" />
                    {asset.change}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Market Summary Card */}
        <Card className="bg-primary/5 border-primary/10 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
             <div className="flex items-center justify-between">
               <div className="space-y-1">
                 <div className="font-bold text-[10px] uppercase tracking-[0.2em] text-muted-foreground">BIST 100 Endeksi</div>
                 <div className="text-3xl font-black tracking-tighter">10.418,24</div>
               </div>
               <div className="flex flex-col items-end gap-2">
                 <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-chart-2 text-chart-2-foreground text-[10px] font-black shadow-lg shadow-chart-2/20">
                   <TrendingUp className="h-3 w-3" />
                   +%2,24
                 </div>
                 <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Piyasa Açık</div>
               </div>
             </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
