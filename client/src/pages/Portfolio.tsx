import React, { useMemo } from 'react';
import { Label } from "@/components/ui/label";
import { TrendingUp, TrendingDown, Gem, Banknote, Landmark, Bitcoin } from "lucide-react";
import { motion } from "framer-motion";
import { useAssets } from '@/hooks/use-portfolio';

export default function Portfolio() {
  const { data: assets, isLoading } = useAssets();

  const categoryData = useMemo(() => {
    if (!assets) return [];
    
    const groups = new Map<string, { total: number, name: string, icon: React.ReactNode, color: string }>();
    
    assets.forEach(asset => {
      const price = parseFloat(asset.currentPrice || asset.purchasePrice || '0');
      const value = price * parseFloat(asset.quantity);
      const type = asset.type || 'other';
      
      if (!groups.has(type)) {
        const config: Record<string, { name: string, icon: React.ReactNode, color: string }> = {
          'stock': { name: 'BIST Hisse', icon: <TrendingUp className="h-6 w-6 text-purple-500" />, color: 'bg-purple-500' },
          'crypto': { name: 'Kripto', icon: <Bitcoin className="h-6 w-6 text-orange-500" />, color: 'bg-orange-500' },
          'commodity': { name: 'Emtia & Altın', icon: <TrendingUp className="h-6 w-6 text-amber-500" />, color: 'bg-amber-500' },
          'fund': { name: 'Yatırım Fonu', icon: <Landmark className="h-6 w-6 text-blue-500" />, color: 'bg-blue-500' },
        };
        const defaults = { name: 'Diğer', icon: <Banknote className="h-6 w-6 text-gray-500" />, color: 'bg-gray-500' };
        groups.set(type, { ... (config[type] || defaults), total: 0 });
      }
      
      const group = groups.get(type)!;
      group.total += value;
    });
    
    return Array.from(groups.values()).sort((a, b) => b.total - a.total);
  }, [assets]);

  const totalValue = categoryData.reduce((sum, cat) => sum + cat.total, 0);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen soft-gradient pb-32 font-sans">
       <header className="px-6 py-4 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
        <h1 className="text-xl font-bold tracking-tight">Analiz ve Dağılım</h1>
      </header>

      <main className="px-6 py-8 space-y-8 max-w-md mx-auto w-full pb-32">
        <section className="text-center space-y-4">
           <div className="space-y-1">
             <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Toplam Portföy</div>
             <div className="text-primary font-black text-4xl tracking-tight">
               {totalValue.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} <span className="text-lg font-semibold text-muted-foreground">TL</span>
             </div>
           </div>
        </section>

        {/* Dynamic Visualizer Bar */}
        <div className="flex h-3 w-full rounded-full bg-secondary/50 overflow-hidden shadow-inner">
          {categoryData.map((cat, i) => (
            <div 
              key={i} 
              className={`h-full ${cat.color} opacity-80`} 
              style={{ width: `${(cat.total / totalValue) * 100}%` }}
            />
          ))}
        </div>

        <div className="grid gap-3">
          <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Kategoriler</Label>
          {categoryData.map((cat, i) => (
            <motion.div 
              key={cat.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card border border-border/50 p-4 rounded-[1.25rem] flex items-center justify-between group shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary/30 rounded-xl flex items-center justify-center shadow-inner">
                  {cat.icon}
                </div>
                <div className="space-y-0.5">
                  <div className="font-bold text-sm tracking-tight">{cat.name}</div>
                  <div className="text-[11px] font-semibold text-muted-foreground uppercase">{cat.total.toLocaleString('tr-TR')} TL</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-primary/10 text-primary">
                  %{((cat.total / totalValue) * 100).toFixed(1)}
                </div>
              </div>
            </motion.div>
          ))}
          {categoryData.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm">Gösterilecek veri yok.</div>
          )}
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
