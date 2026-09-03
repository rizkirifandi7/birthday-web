"use client";

import React from "react";
import { Heart, ArrowUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full py-12 px-6 border-t border-border bg-card/30 backdrop-blur-md flex flex-col items-center justify-center text-center space-y-6">
      <div className="max-w-md space-y-3">
        <div className="flex items-center justify-center gap-2 text-rose-500 font-semibold text-sm">
          <Sparkles className="size-4 animate-spin" style={{ animationDuration: '8s' }} />
          <span>Selamat Ulang Tahun & Bahagia Selalu</span>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          Semoga setiap hari yang baru senantiasa dipenuhi keajaiban, tawa yang indah, dan kasih sayang tak terhingga dari orang-orang tersayang.
        </p>

        <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground pt-2">
          <span>Dibuat dengan</span>
          <Heart className="size-3.5 text-rose-500 fill-rose-500 animate-pulse" />
          <span>khusus untuk momen istimewamu</span>
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={scrollToTop}
        className="rounded-full text-xs border-border hover:bg-accent flex items-center gap-1.5 cursor-pointer"
      >
        <ArrowUp className="size-3.5 text-rose-500" /> Kembali ke Atas
      </Button>
    </footer>
  );
};

export default Footer;
