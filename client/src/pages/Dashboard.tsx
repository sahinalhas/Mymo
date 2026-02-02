import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  PieChart, 
  Wallet, 
  Eye,
  Crown
} from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useAssets } from '@/hooks/use-portfolio';
import { useQuery } from '@tanstack/react-query';

export default function Dashboard() {
  const { data: assets, isLoading: assetsLoading } = useAssets();
  
  const { data: marketData, isLoading: marketLoading } = useQuery({
    queryKey: ['/api/market-data', { type: 'BIST' }],
  });

  if (assetsLoading || marketLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest animate-pulse">Veriler Çekiliyor...</p>
      </div>
    );
  }

  // Calculate totals and distribution
  const totalValue = assets?.reduce((sum, asset) => {
    const price = parseFloat(asset.currentPrice || asset.purchasePrice || '0');
    return sum + (price * parseFloat(asset.quantity));
  }, 0) || 0;

  const totalCost = assets?.reduce((sum, asset) => {
    return sum + (parseFloat(asset.purchasePrice) * parseFloat(asset.quantity));
  }, 0) || 0;

  const totalProfitLoss = totalValue - totalCost;
  const profitLossPercentage = totalCost > 0 ? (totalProfitLoss / totalCost) * 100 : 0;

  // Group assets for pie chart
  const distributionMap = new Map<string, number>();
  assets?.forEach(asset => {
    const price = parseFloat(asset.currentPrice || asset.purchasePrice || '0');
    const value = price * parseFloat(asset.quantity);
    const type = asset.type || 'Other';
    distributionMap.set(type, (distributionMap.get(type) || 0) + value);
  });

  const chartData = Array.from(distributionMap.entries()).map(([name, value], index) => {
    const colors = ['#10b981', '#ef4444', '#3b82f6', '#f59e0b', '#8b5cf6'];
    const typeLabels: Record<string, string> = {
      'stock': 'Hisse',
      'crypto': 'Kripto',
      'commodity': 'Emtia',
      'fund': 'Fon'
    };
    return {
      name: typeLabels[name] || name,
      value,
      color: colors[index % colors.length]
    };
  });

  return (
    <div className="flex flex-col min-h-screen bg-background pb-32 font-sans selection:bg-primary/10">
      <header className="px-6 py-6 flex items-center justify-between sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/10">
            <Wallet className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">mymo</h1>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-[0.15em]">Portföyüm</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-2xl h-10 w-10 hover:bg-white/5">
            <Eye className="h-5 w-5 text-muted-foreground" />
          </Button>
        </div>
      </header>

      <main className="px-6 py-10 space-y-10 max-w-lg mx-auto w-full">
        <section className="space-y-8 animate-in fade-in duration-700">
          <div className="space-y-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/50 rounded-full border border-border/40 text-muted-foreground/80">
               <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Toplam Varlık</span>
               <PieChart className="h-3 w-3" />
            </div>
            <div className="flex items-baseline justify-center gap-2">
              <h2 className="text-6xl font-black tracking-tight text-foreground">
                {totalValue.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}
              </h2>
              <span className="text-xl text-muted-foreground/60 font-medium uppercase">TL</span>
            </div>
            <div className="flex items-center justify-center gap-3">
               <div className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full border ${
                 totalProfitLoss >= 0 
                   ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                   : 'bg-red-500/10 text-red-400 border-red-500/20'
               } text-sm font-bold`}>
                 {totalProfitLoss >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                 <span>{Math.abs(totalProfitLoss).toLocaleString('tr-TR', { maximumFractionDigits: 0 })}</span>
                 <span className="opacity-70 text-xs font-semibold">({profitLossPercentage >= 0 ? '+' : ''}{profitLossPercentage.toFixed(1)}%)</span>
               </div>
            </div>
          </div>

          <div className="h-72 w-full relative bg-card rounded-[3.5rem] border border-border/50 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] p-6 overflow-hidden transition-all duration-500">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={chartData.length > 0 ? chartData : [{ name: 'Boş', value: 1, color: '#333' }]}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={105}
                  paddingAngle={6}
                  dataKey="value"
                  strokeWidth={0}
                  animationBegin={0}
                  animationDuration={1000}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [value.toLocaleString('tr-TR'), 'Değer']}
                  contentStyle={{ 
                    borderRadius: '24px', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                    backgroundColor: 'hsl(var(--card))',
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

        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60">Varlıklarım</h3>
            <Link href="/portfolio">
              <Button variant="ghost" size="sm" className="text-primary h-auto p-0 font-bold text-[11px] uppercase tracking-widest hover:bg-transparent hover:opacity-70">Tümünü Gör</Button>
            </Link>
          </div>
          <div className="grid gap-4">
            {assets?.slice(0, 4).map((asset, i) => {
              const currentPrice = parseFloat(asset.currentPrice || asset.purchasePrice);
              const value = currentPrice * parseFloat(asset.quantity);
              return (
                <motion.div 
                  key={asset.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card border border-border/40 p-5 rounded-[2rem] flex items-center justify-between group cursor-pointer hover:border-primary/20 transition-all duration-500"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center shadow-lg border border-white/5">
                      <span className="text-primary font-black text-sm">{asset.symbol.substring(0,3)}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="font-bold text-base tracking-tight text-foreground">{asset.name}</div>
                      <div className="text-[10px] text-muted-foreground/70 font-bold uppercase tracking-widest">{asset.quantity} Adet</div>
                    </div>
                  </div>
                  <div className="text-right space-y-1.5">
                    <div className="font-black text-base tracking-tight text-foreground">{value.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} TL</div>
                    <div className="text-[10px] text-muted-foreground/60 font-bold uppercase tracking-widest">{currentPrice.toLocaleString('tr-TR')} TL</div>
                  </div>
                </motion.div>
              );
            })}
            {(!assets || assets.length === 0) && (
              <div className="text-center py-12 bg-card rounded-[2rem] border border-dashed border-border/60">
                <p className="text-muted-foreground text-sm">Henüz varlık eklemediniz.</p>
                <Link href="/add">
                  <Button variant="link" className="text-primary font-bold mt-2">Varlık Ekle</Button>
                </Link>
              </div>
            )}
          </div>
        </section>

        <section className="px-1">
          <div className="bg-primary p-8 rounded-[3rem] shadow-2xl shadow-primary/20 relative overflow-hidden group cursor-pointer">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-16 -translate-y-16 blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
            <div className="flex items-center gap-8 relative z-10">
              <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-[2rem] flex items-center justify-center border border-white/20 shadow-inner">
                <Crown className="w-12 h-12 text-white drop-shadow-2xl" />
              </div>
              <div className="flex-1 space-y-2">
                <h4 className="text-white font-black text-xl leading-tight">Pro Analiz Araçları</h4>
                <p className="text-white/60 text-[11px] font-medium uppercase tracking-widest">AI Destekli Portföy Yönetimi</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
