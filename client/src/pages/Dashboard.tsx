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
    <div className="flex flex-col min-h-screen bg-background pb-24 font-sans selection:bg-primary/10">
      {/* Header */}
      <header className="px-6 py-6 flex items-center justify-between sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/10">
            <Wallet className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">mymo</h1>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-[0.15em]">Piyasalar Açık</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="h-10 px-4 rounded-2xl border-border/60 bg-white/50 hover:bg-white hover:border-primary/20 transition-all duration-300">
            <span className="text-xs font-semibold">AI Analiz</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-2xl h-10 w-10 hover:bg-secondary">
            <Eye className="h-5 w-5 text-muted-foreground" />
          </Button>
        </div>
      </header>

      <main className="px-6 py-10 space-y-10 max-w-lg mx-auto w-full">
        {/* Total Value Section */}
        <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="space-y-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/50 rounded-full border border-border/40 text-muted-foreground/80">
               <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Toplam Varlık</span>
               <PieChart className="h-3 w-3" />
            </div>
            <div className="flex items-baseline justify-center gap-2">
              <h2 className="text-6xl font-black tracking-tight text-foreground">1.070.320</h2>
              <span className="text-xl text-muted-foreground/60 font-medium uppercase">TL</span>
            </div>
            <div className="flex items-center justify-center gap-3">
               <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-sm font-bold border border-emerald-100">
                 <TrendingUp className="h-4 w-4" />
                 <span>23.695</span>
                 <span className="opacity-70 text-xs font-semibold">(%2,2)</span>
               </div>
               <div className="text-[10px] text-muted-foreground/60 uppercase tracking-widest font-bold">Bugün</div>
            </div>
          </div>

          {/* Elegant Pie Chart */}
          <div className="h-72 w-full relative bg-white rounded-[3.5rem] border border-border/50 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] p-6 overflow-hidden group hover:shadow-[0_48px_80px_-16px_rgba(0,0,0,0.08)] transition-all duration-500">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={105}
                  paddingAngle={6}
                  dataKey="value"
                  strokeWidth={0}
                  animationBegin={200}
                  animationDuration={1200}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#10b981' : entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '24px', 
                    border: '1px solid rgba(0,0,0,0.05)', 
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)',
                    backgroundColor: 'white',
                    padding: '16px'
                  }}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
               <div className="text-[11px] font-bold text-muted-foreground/50 uppercase tracking-[0.3em] mb-1">Dağılım</div>
               <div className="text-2xl font-black text-foreground tracking-tighter">Portföy</div>
            </div>
          </div>
        </section>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-5">
          <Card className="bg-white border-border/40 rounded-[2rem] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <CardContent className="p-6 flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-1 border border-emerald-100">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-[0.2em]">Yıllık Temettü</div>
              <div className="font-black text-xl text-foreground">12.450 <span className="text-[10px] text-muted-foreground uppercase font-medium">TL</span></div>
            </CardContent>
          </Card>
          <Card className="bg-white border-border/40 rounded-[2rem] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <CardContent className="p-6 flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-1 border border-primary/10">
                <PieChart className="h-6 w-6" />
              </div>
              <div className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-[0.2em]">Portföy Skoru</div>
              <div className="font-black text-xl text-foreground">84 <span className="text-[10px] text-muted-foreground uppercase font-medium">/100</span></div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-6 py-2">
          {[
            { icon: Plus, label: "Ekle", color: "bg-primary text-primary-foreground shadow-xl shadow-primary/20", href: "/add" },
            { icon: ArrowRightLeft, label: "Takas", color: "bg-white text-foreground border border-border/60 shadow-sm", href: "/transactions" },
            { icon: PieChart, label: "Analiz", color: "bg-white text-foreground border border-border/60 shadow-sm", href: "/portfolio" },
            { icon: Crown, label: "Pro", color: "bg-white text-foreground border border-border/60 shadow-sm", href: "/profile" },
          ].map((action, i) => (
            <Link key={i} href={action.href}>
              <div className="flex flex-col items-center gap-3 cursor-pointer group">
                <div className={`w-16 h-16 ${action.color} rounded-[1.5rem] flex items-center justify-center group-hover:scale-105 group-hover:-translate-y-1.5 transition-all duration-500`}>
                  <action.icon className="h-7 w-7" />
                </div>
                <span className="text-[11px] font-bold text-muted-foreground/70 uppercase tracking-widest">{action.label}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Assets List */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60">Varlık Dağılımı</h3>
            <Button variant="ghost" size="sm" className="text-primary h-auto p-0 font-bold text-[11px] uppercase tracking-widest hover:bg-transparent hover:opacity-70">Hepsini Gör</Button>
          </div>
          <div className="grid gap-4">
            {assets.map((asset, i) => (
              <motion.div 
                key={asset.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white border border-border/40 p-5 rounded-[2rem] flex items-center justify-between group cursor-pointer hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
              >
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 ${asset.color} rounded-2xl flex items-center justify-center shadow-lg border border-white/20 group-hover:rotate-3 transition-transform duration-500`}>
                    <span className="text-white font-black text-sm">{asset.name.substring(0,2)}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-base tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {asset.name}
                    </div>
                    <div className="text-[10px] text-muted-foreground/70 font-bold uppercase tracking-widest">{asset.desc}</div>
                  </div>
                </div>
                <div className="text-right space-y-1.5">
                  <div className="font-black text-base tracking-tight text-foreground">{asset.price}</div>
                  <div className="flex items-center justify-end gap-1.5 text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                    <TrendingUp className="h-3 w-3" />
                    {asset.change}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Pro Card */}
        <section className="px-1">
          <div className="bg-primary p-8 rounded-[3rem] shadow-2xl shadow-primary/20 relative overflow-hidden group cursor-pointer">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-16 -translate-y-16 blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
            <div className="flex items-center gap-8 relative z-10">
              <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-[2rem] flex items-center justify-center border border-white/20 shadow-inner">
                <Crown className="w-12 h-12 text-white drop-shadow-2xl" />
              </div>
              <div className="flex-1 space-y-2">
                <h4 className="text-white font-black text-xl leading-tight">Portföyünü Bir Üst Seviyeye Taşı</h4>
                <p className="text-white/60 text-[11px] font-medium uppercase tracking-widest">Profesyonel analiz araçlarını keşfet</p>
                <div className="pt-3">
                  <Button size="sm" className="bg-white text-primary hover:bg-white/90 font-black rounded-2xl h-10 px-6 text-[11px] uppercase tracking-widest transition-all duration-300">Hemen Dene</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Market Summary Card */}
        <Card className="bg-primary/5 border-primary/10 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-shadow mt-10">
          <CardContent className="p-6">
             <div className="flex items-center justify-between">
               <div className="space-y-1">
                 <div className="font-bold text-[10px] uppercase tracking-[0.2em] text-muted-foreground">BIST 100 Endeksi</div>
                 <div className="text-3xl font-black tracking-tighter">10.418,24</div>
               </div>
               <div className="flex flex-col items-end gap-2">
                 <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-black shadow-lg shadow-emerald-500/20">
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
