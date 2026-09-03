"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Sparkles, PartyPopper, Heart, Edit2, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { playSparkleSound } from "@/lib/sound";

interface HeroProps {
  name?: string;
}

const Hero: React.FC<HeroProps> = ({ name: initialName = "Sahabat Tercinta" }) => {
  const [name, setName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(initialName);

  const triggerConfetti = () => {
    playSparkleSound();
    
    const count = 200;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55, colors: ['#f43f5e', '#fbbf24', '#38bdf8'] });
    fire(0.2, { spread: 60, colors: ['#ec4899', '#8b5cf6', '#10b981'] });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, colors: ['#f43f5e', '#fbbf24', '#a855f7'] });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const handleSaveName = () => {
    if (tempName.trim()) {
      setName(tempName.trim());
    }
    setIsEditing(false);
  };

  return (
    <section id="hero" className="relative flex flex-col items-center justify-center px-4 py-16 md:py-24 overflow-hidden border-b border-border">
      {/* Codeforge Crosshair Corner Lines */}
      <div className="h-px absolute w-3 bg-current z-40 -bottom-px -left-3 text-muted-foreground/40" />
      <div className="h-px absolute w-3 bg-current z-40 -bottom-px left-0 text-muted-foreground/40" />
      <div className="w-px absolute h-3 bg-current z-40 -bottom-3 -left-px text-muted-foreground/40" />
      <div className="w-px absolute h-3 bg-current z-40 bottom-0 -left-px text-muted-foreground/40" />
      
      <div className="h-px absolute w-3 bg-current z-40 -bottom-px -right-3 text-muted-foreground/40" />
      <div className="h-px absolute w-3 bg-current z-40 -bottom-px right-0 text-muted-foreground/40" />
      <div className="w-px absolute h-3 bg-current z-40 -bottom-3 -right-px text-muted-foreground/40" />
      <div className="w-px absolute h-3 bg-current z-40 bottom-0 -right-px text-muted-foreground/40" />

      {/* Codeforge Magic UI Glowing Radial Gradient */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-radial-[at_50%_65%] from-rose-500/20 via-amber-500/5 to-transparent blur-[60px]" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-6 max-w-4xl mx-auto">
        
        {/* Codeforge Announcement Pill Badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full shadow-badge bg-card border border-border max-w-full overflow-hidden">
          <span className="shrink-0 text-rose-500">
            <Sparkles className="size-4 animate-spin" style={{ animationDuration: '6s' }} />
          </span>
          <span className="text-xs sm:text-sm font-medium text-foreground truncate">
            Introducing Birthday Edition ✨ Hari Paling Spesial
          </span>
        </div>

        {/* Codeforge High-Impact Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter text-balance leading-tight">
          Selamat Ulang Tahun,{" "}
          <span className="inline-block relative bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 bg-clip-text text-transparent pb-1">
            {isEditing ? (
              <span className="inline-flex items-center gap-2">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSaveName()}
                  className="border-b-2 border-rose-500 bg-transparent text-foreground text-3xl sm:text-5xl font-bold focus:outline-none text-center max-w-[280px]"
                  autoFocus
                />
                <button
                  onClick={handleSaveName}
                  className="p-1 rounded-full bg-rose-500 text-white text-xs hover:bg-rose-600 transition"
                >
                  <Check className="size-4" />
                </button>
              </span>
            ) : (
              <span className="group cursor-pointer inline-flex items-center gap-2 hover:opacity-90 transition" onClick={() => setIsEditing(true)}>
                {name}
                <Edit2 className="size-4 text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </span>
            )}
          </span>
          ! 🎉
        </h1>

        {/* Subtitle */}
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed text-balance">
          Satu tempat terindah untuk merayakan hadirnya dirimu. Penuh dengan kehangatan, lilin harapan, kenangan manis, dan ucapan dari teman-teman terbaik.
        </p>

        {/* Codeforge Shiny CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button
            size="lg"
            onClick={triggerConfetti}
            className="rounded-full px-8 py-6 text-base font-medium text-white bg-gradient-to-b from-rose-500 to-rose-600 ring-2 ring-rose-600 hover:from-rose-600 hover:to-rose-700 shadow-magic-btn cursor-pointer transition-all flex items-center gap-2"
          >
            <PartyPopper className="size-5 animate-bounce" />
            Rayakan Sekarang!
          </Button>

          <a href="#cake">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-7 py-6 text-base font-medium border-border hover:bg-accent text-foreground flex items-center gap-2 cursor-pointer"
            >
              <Heart className="size-4 text-rose-500 fill-rose-500" />
              Tiup Lilin <ArrowRight className="size-4 text-muted-foreground" />
            </Button>
          </a>
        </div>

        {/* Minimalist Stats Grid */}
        <div className="mt-8 grid grid-cols-3 divide-x divide-border border border-border rounded-2xl bg-card/60 backdrop-blur-md max-w-lg w-full">
          <div className="p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-rose-500">365+</div>
            <div className="text-[11px] text-muted-foreground font-medium">Hari Kebahagiaan</div>
          </div>
          <div className="p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-amber-500">100%</div>
            <div className="text-[11px] text-muted-foreground font-medium">Harapan Terwujud</div>
          </div>
          <div className="p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-pink-500">∞</div>
            <div className="text-[11px] text-muted-foreground font-medium">Cinta & Kasih</div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
