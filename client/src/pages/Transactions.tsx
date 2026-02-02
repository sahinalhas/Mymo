import React from 'react';
import { Button } from "@/components/ui/button";
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
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-xl bg-secondary/50 h-10 w-10">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-xl font-black tracking-tight">İşlemlerim</h1>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full bg-secondary/50">
          <History className="h-5 w-5" />
        </Button>
      </header>

      <main className="px-6 space-y-6 max-w-md mx-auto w-full">
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {['Tümü', 'Alış', 'Satış', 'Bekleyen'].map((filter, i) => (
            <Button 
              key={filter} 
              variant={i === 0 ? "default" : "secondary"}
              className="rounded-full px-6 text-xs font-bold"
            >
              {filter}
            </Button>
          ))}
        </div>

        <section className="space-y-3">
          {transactions.map((tx, i) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-4 rounded-2xl flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${tx.type === 'buy' ? 'bg-chart-2/10 text-chart-2' : 'bg-destructive/10 text-destructive'}`}>
                  {tx.type === 'buy' ? <ArrowDownLeft className="h-6 w-6" /> : <ArrowUpRight className="h-6 w-6" />}
                </div>
                <div>
                  <div className="font-bold text-sm">{tx.name}</div>
                  <div className="text-[10px] text-muted-foreground font-medium">{tx.date}</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`font-black tracking-tight ${tx.type === 'buy' ? 'text-chart-2' : 'text-destructive'}`}>
                  {tx.type === 'buy' ? '-' : '+'}{tx.amount}
                </div>
                <div className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">{tx.status}</div>
              </div>
            </motion.div>
          ))}
        </section>
      </main>
    </div>
  );
}
