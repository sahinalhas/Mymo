import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft, Plus, Search } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function AddAsset() {
  const [, setLocation] = useLocation();

  return (
    <div className="flex flex-col min-h-screen soft-gradient noise p-6 max-w-md mx-auto w-full">
      <header className="flex items-center gap-4 mb-10">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-xl bg-secondary/50 h-10 w-10">
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-2xl font-black tracking-tighter">Yatırım Ekle</h1>
      </header>

      <div className="space-y-8">
        <div className="space-y-4">
          <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Varlık Arayın</Label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Hisse, fon veya emtia adı..." 
              className="h-16 pl-12 rounded-2xl glass border-border/50 text-lg font-bold"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <div className="space-y-4">
             <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Miktar</Label>
             <Input placeholder="0,00" className="h-16 rounded-2xl glass border-border/50 text-xl font-black text-center" />
           </div>
           <div className="space-y-4">
             <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Birim Fiyat</Label>
             <Input placeholder="0,00" className="h-16 rounded-2xl glass border-border/50 text-xl font-black text-center" />
           </div>
        </div>

        <div className="space-y-4">
           <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Tarih</Label>
           <Input type="date" className="h-16 rounded-2xl glass border-border/50 text-lg font-bold" />
        </div>

        <div className="pt-10">
          <Button 
            onClick={() => setLocation('/')}
            className="w-full h-18 rounded-3xl bg-primary text-primary-foreground text-xl font-black shadow-xl shadow-primary/20 active:scale-95 transition-transform uppercase tracking-wider"
          >
            Portföye Ekle
          </Button>
        </div>
      </div>
    </div>
  );
}
