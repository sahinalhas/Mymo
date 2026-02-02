import React from 'react';
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  PieChart, 
  Wallet, 
  Plus, 
  ArrowRightLeft, 
  Menu 
} from "lucide-react";

export default function BottomNav() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", icon: PieChart, label: "Ana Sayfa" },
    { href: "/portfolio", icon: Wallet, label: "Portföy" },
    { href: "/add", icon: Plus, label: "Ekle", isCenter: true },
    { href: "/transactions", icon: ArrowRightLeft, label: "İşlemler" },
    { href: "/profile", icon: Menu, label: "Profil" },
  ];

  return (
    <nav className="fixed bottom-6 left-6 right-6 p-2 z-50 bg-card/80 backdrop-blur-xl border border-border/50 rounded-full flex items-center justify-between max-w-md mx-auto shadow-2xl">
      {navItems.map((item) => {
        const isActive = location === item.href;
        
        if (item.isCenter) {
          return (
            <div key={item.href} className="relative -top-1">
              <Link href={item.href}>
                <Button 
                  size="icon" 
                  className={`h-14 w-14 rounded-full shadow-2xl transition-all ${
                    isActive 
                      ? "bg-primary shadow-primary/40 scale-110" 
                      : "bg-primary shadow-primary/20 hover:scale-110 active:scale-95"
                  }`}
                >
                  <item.icon className="h-8 w-8 text-primary-foreground" />
                </Button>
              </Link>
            </div>
          );
        }

        return (
          <Link key={item.href} href={item.href}>
            <Button 
              variant="ghost" 
              size="icon" 
              className={`h-12 w-12 rounded-full transition-all ${
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "hover:bg-secondary/50 text-muted-foreground"
              }`}
            >
              <item.icon className="h-6 w-6" />
            </Button>
          </Link>
        );
      })}
    </nav>
  );
}
