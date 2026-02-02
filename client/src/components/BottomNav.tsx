import React from 'react';
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  PieChart, 
  Wallet, 
  Plus, 
  TrendingUp, 
  ArrowRightLeft 
} from "lucide-react";

export default function BottomNav() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", icon: PieChart, label: "Ana Sayfa" },
    { href: "/portfolio", icon: Wallet, label: "Portföy" },
    { href: "/add", icon: Plus, label: "Ekle", isCenter: true },
    { href: "/markets", icon: TrendingUp, label: "Piyasalar" },
    { href: "/transactions", icon: ArrowRightLeft, label: "İşlemler" },
  ];

  return (
    <nav className="fixed bottom-6 left-6 right-6 p-2 z-50 bg-card/60 backdrop-blur-2xl border border-white/10 rounded-3xl flex items-center justify-between max-w-md mx-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      {navItems.map((item) => {
        const isActive = location === item.href;
        
        if (item.isCenter) {
          return (
            <div key={item.href} className="relative -top-4">
              <Link href={item.href}>
                <div 
                  className={`h-16 w-16 rounded-2xl flex items-center justify-center transition-all duration-500 cursor-pointer ${
                    isActive 
                      ? "bg-primary shadow-[0_10px_30px_rgba(var(--primary),0.4)] scale-110" 
                      : "bg-primary shadow-lg shadow-primary/20 hover:scale-110 active:scale-95"
                  }`}
                >
                  <item.icon className="h-8 w-8 text-primary-foreground" />
                </div>
              </Link>
            </div>
          );
        }

        return (
          <Link key={item.href} href={item.href}>
            <div 
              className={`flex flex-col items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 cursor-pointer ${
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "hover:bg-white/5 text-muted-foreground/60"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className={`text-[8px] font-bold uppercase mt-1 tracking-tighter ${isActive ? "opacity-100" : "opacity-0"}`}>{item.label.split(' ')[0]}</span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
