import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, Settings, User, Bell, Shield, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

const menuItems = [
  { icon: <User className="h-5 w-5" />, label: "Profil Bilgileri", sub: "Kişisel detaylar ve tercihler" },
  { icon: <Bell className="h-5 w-5" />, label: "Bildirimler", sub: "Fiyat alarmları ve haberler" },
  { icon: <Shield className="h-5 w-5" />, label: "Güvenlik", sub: "Şifre ve biyometrik veriler" },
  { icon: <Settings className="h-5 w-5" />, label: "Uygulama Ayarları", sub: "Dil ve görünüm" },
  { icon: <HelpCircle className="h-5 w-5" />, label: "Yardım & Destek", sub: "Sıkça sorulan sorular" },
];

export default function Profile() {
  return (
    <div className="flex flex-col min-h-screen soft-gradient noise pb-24">
      <header className="p-6 flex items-center justify-between sticky top-0 z-50 glass mb-4 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-xl bg-secondary/50 h-10 w-10">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-xl font-black tracking-tight">Menü</h1>
        </div>
      </header>

      <main className="px-6 space-y-8 max-w-md mx-auto w-full">
        {/* User Card */}
        <section className="glass p-6 rounded-[2.5rem] flex items-center gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-12 translate-x-12 blur-3xl"></div>
          <div className="w-20 h-20 rounded-3xl bg-linear-to-br from-primary to-primary/60 p-0.5 shadow-xl">
            <div className="w-full h-full rounded-[1.4rem] bg-background flex items-center justify-center overflow-hidden">
               <span className="text-2xl font-black text-primary">AY</span>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-black tracking-tight">Ahmet Yılmaz</h2>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-wider mt-1">
              Premium Üye
            </div>
          </div>
        </section>

        {/* Menu List */}
        <section className="space-y-3">
          {menuItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass p-4 rounded-2xl flex items-center justify-between cursor-pointer group hover:bg-primary/5 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-secondary/50 flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                  {item.icon}
                </div>
                <div>
                  <div className="font-bold text-sm">{item.label}</div>
                  <div className="text-[10px] text-muted-foreground font-medium">{item.sub}</div>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground/30 group-hover:text-primary transition-colors" />
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-4 rounded-2xl flex items-center gap-4 cursor-pointer text-destructive hover:bg-destructive/5 transition-all mt-4"
          >
            <div className="w-11 h-11 rounded-xl bg-destructive/10 flex items-center justify-center">
              <LogOut className="h-5 w-5" />
            </div>
            <div className="font-black text-sm uppercase tracking-wider">Çıkış Yap</div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
