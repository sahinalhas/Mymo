import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft, Plus, Search } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function AddAsset() {
  const [, setLocation] = useLocation();

  const assetTypes = [
    { id: 'stock', label: 'Hisse', icon: '📈', color: 'bg-blue-500' },
    { id: 'fund', label: 'Fon', icon: '🏦', color: 'bg-indigo-500' },
    { id: 'crypto', label: 'Kripto', icon: '₿', color: 'bg-orange-500' },
    { id: 'commodity', label: 'Emtia', icon: '🟡', color: 'bg-amber-500' },
  ];

  return (
    <div className="flex flex-col min-h-screen soft-gradient pb-24 font-sans">
      <header className="px-6 py-4 flex items-center gap-4 sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50 mb-6">
        <h1 className="text-xl font-bold tracking-tight">Yeni Varlık Ekle</h1>
      </header>

      <main className="px-6 space-y-8 max-w-md mx-auto w-full">
        {/* Asset Type Selection */}
        <section className="space-y-4">
          <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Varlık Tipi</Label>
          <div className="grid grid-cols-4 gap-3">
            {assetTypes.map((type) => (
              <button
                key={type.id}
                className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all group"
              >
                <div className={`w-12 h-12 ${type.color} rounded-xl flex items-center justify-center text-xl shadow-lg shadow-black/5 group-active:scale-90 transition-transform`}>
                  {type.icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{type.label}</span>
              </button>
            ))}
          </div>
        </section>

        <div className="space-y-6">
          <div className="space-y-3">
            <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Varlık Arayın</Label>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input 
                placeholder="Sembol veya isim (örn: THYAO)" 
                className="h-14 pl-12 rounded-2xl bg-card border-border/50 text-base font-semibold focus-visible:ring-primary/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-3">
               <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Adet / Miktar</Label>
               <Input 
                 placeholder="0.00" 
                 type="number"
                 className="h-14 rounded-2xl bg-card border-border/50 text-lg font-bold text-center focus-visible:ring-primary/20" 
               />
             </div>
             <div className="space-y-3">
               <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Alış Fiyatı</Label>
               <div className="relative">
                 <Input 
                   placeholder="0.00" 
                   type="number"
                   className="h-14 rounded-2xl bg-card border-border/50 text-lg font-bold text-center focus-visible:ring-primary/20" 
                 />
                 <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted-foreground">TL</span>
               </div>
             </div>
          </div>

          <div className="space-y-3">
             <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">İşlem Tarihi</Label>
             <Input 
               type="date" 
               className="h-14 rounded-2xl bg-card border-border/50 text-base font-semibold focus-visible:ring-primary/20 px-4" 
             />
          </div>
        </div>

        <div className="pt-6">
          <Button 
            onClick={() => setLocation('/')}
            className="w-full h-14 rounded-2xl bg-primary text-primary-foreground text-base font-bold shadow-xl shadow-primary/20 active:scale-[0.98] transition-all"
          >
            Kaydet ve Ekle
          </Button>
          <p className="text-center text-[10px] text-muted-foreground font-medium mt-4 px-6 leading-relaxed">
            Eklediğiniz varlıklar otomatik olarak portföy değerinize yansıtılacaktır.
          </p>
        </div>
      </main>
    </div>
  );
}
