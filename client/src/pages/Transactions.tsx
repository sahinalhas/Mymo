import React from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ArrowRightLeft, History, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const transactions = [
  { id: 1, type: 'buy', name: 'EREGL', amount: '1.200 TL', date: 'Bugün, 14:20', status: 'Tamamlandı' },
  { id: 2, type: 'sell', name: 'TCELL', amount: '3.450 TL', date: 'Dün, 11:05', status: 'Tamamlandı' },
  { id: 3, type: 'buy', name: 'Gr Altın', amount: '10.000 TL', date: '28 Oca', status: 'Tamamlandı' },
  { id: 4, type: 'buy', name: 'BZY', amount: '500 TL', date: '25 Oca', status: 'Tamamlandı' },
];

export default function Transactions() {
  return (
    <div className="flex flex-col min-h-screen soft-gradient noise pb-24">
      <header className="p-6 flex items-center justify-between sticky top-0 z-50 glass mb-4 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-black tracking-tight">İşlemlerim</h1>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full bg-secondary/50">
          <History className="h-5 w-5" />
        </Button>
      </header>

      <main className="px-6 py-8 space-y-6 max-w-md mx-auto w-full">
        <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
          {['Tümü', 'Alış', 'Satış', 'Bekleyen'].map((filter, i) => (
            <Button 
              key={filter} 
              variant={i === 0 ? "default" : "outline"}
              className={`rounded-xl px-6 text-xs font-bold h-10 border-border/50 ${i === 0 ? 'bg-primary shadow-lg shadow-primary/20' : 'bg-card'}`}
            >
              {filter}
            </Button>
          ))}
        </div>

        <section className="space-y-3">
          <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Son İşlemler</Label>
          {transactions.map((tx, i) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card border border-border/50 p-4 rounded-[1.25rem] flex items-center justify-between group cursor-pointer hover:border-primary/20 transition-all shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${tx.type === 'buy' ? 'bg-chart-2/10 text-chart-2' : 'bg-destructive/10 text-destructive shadow-sm'}`}>
                  {tx.type === 'buy' ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                </div>
                <div className="space-y-0.5">
                  <div className="font-bold text-sm tracking-tight">{tx.name}</div>
                  <div className="text-[10px] text-muted-foreground font-semibold uppercase">{tx.date}</div>
                </div>
              </div>
              <div className="text-right space-y-0.5">
                <div className={`font-black text-sm tracking-tight ${tx.type === 'buy' ? 'text-chart-2' : 'text-destructive'}`}>
                  {tx.type === 'buy' ? '-' : '+'}{tx.amount}
                </div>
                <div className="text-[10px] font-bold text-muted-foreground uppercase opacity-60 tracking-wider">{tx.status}</div>
              </div>
            </motion.div>
          ))}
        </section>
      </main>
    </div>
  );
}
