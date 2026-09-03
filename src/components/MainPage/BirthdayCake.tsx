"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Flame, Wind, Sparkles, RefreshCw, Heart, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { playSparkleSound } from "@/lib/sound";

const BirthdayCake = () => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [showWishModal, setShowWishModal] = useState(false);

  const handleBlowCandles = () => {
    if (!candlesLit) return;
    
    setCandlesLit(false);
    playSparkleSound();

    confetti({
      particleCount: 140,
      spread: 85,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fbbf24', '#e11d48', '#38bdf8']
    });

    setTimeout(() => {
      setShowWishModal(true);
    }, 600);
  };

  const handleRelight = () => {
    setCandlesLit(true);
    playSparkleSound();
  };

  return (
    <section id="cake" className="w-full py-8 flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full flex flex-col items-center text-center space-y-6">
        
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-border bg-card shadow-badge text-rose-500 text-xs font-semibold">
            <Gift className="size-3.5" /> Ritual Spesial Tiup Lilin
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Make a Wish & Tiup Lilinnya! 🎂
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm max-w-md mx-auto">
            Pejamkan mata, bayangkan impian terbesarmu, lalu tekan tombol di bawah ini untuk meniupnya.
          </p>
        </div>

        {/* Cake Container Card */}
        <Card className="w-full max-w-md bg-card/80 backdrop-blur-md border border-border shadow-xl overflow-hidden rounded-3xl relative">
          <CardContent className="p-6 sm:p-8 flex flex-col items-center justify-center space-y-6">
            
            <div
              onClick={handleBlowCandles}
              className={`relative cursor-pointer transition-transform duration-300 ${
                candlesLit ? "hover:scale-105" : ""
              }`}
            >
              {candlesLit && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-24 bg-amber-400/30 blur-2xl rounded-full animate-pulse" />
              )}

              {/* Vector Cake Graphic */}
              <div className="relative w-56 h-56 flex flex-col items-center justify-end">
                {/* Candles Container */}
                <div className="flex items-center justify-center gap-6 mb-1 z-10">
                  {[0, 1, 2].map((idx) => (
                    <div key={idx} className="relative flex flex-col items-center">
                      {candlesLit ? (
                        <div className="animate-flame mb-0.5">
                          <Flame className="size-6 text-amber-500 fill-amber-400 filter drop-shadow-[0_0_8px_rgba(245,158,11,0.9)]" />
                        </div>
                      ) : (
                        <div className="h-6 flex items-center justify-center mb-0.5">
                          <span className="w-1.5 h-3 bg-zinc-400/50 rounded-full blur-[1px] animate-ping" />
                        </div>
                      )}

                      <div className="w-3 h-10 bg-gradient-to-b from-rose-300 via-pink-400 to-rose-500 rounded-t-sm shadow-inner border-x border-rose-400/30" />
                    </div>
                  ))}
                </div>

                {/* Cake Tier 1 */}
                <div className="w-44 h-12 bg-gradient-to-r from-rose-100 via-white to-rose-100 dark:from-rose-900/60 dark:via-rose-800/80 dark:to-rose-900/60 rounded-t-2xl shadow-md border-t-4 border-rose-300 dark:border-rose-700 flex items-center justify-around px-2">
                  <div className="size-3 rounded-full bg-rose-400 shadow-sm" />
                  <div className="size-3 rounded-full bg-amber-400 shadow-sm" />
                  <div className="size-3 rounded-full bg-rose-400 shadow-sm" />
                </div>

                {/* Cake Tier 2 */}
                <div className="w-52 h-16 bg-gradient-to-r from-rose-400 via-pink-500 to-rose-400 rounded-t-xl shadow-lg border-t-2 border-white/40 flex items-center justify-between px-4">
                  <div className="w-full h-2 bg-white/30 rounded-full" />
                </div>

                {/* Cake Stand */}
                <div className="w-60 h-4 bg-zinc-200 dark:bg-zinc-700 rounded-full shadow-md" />
              </div>
            </div>

            {/* Candle Controls */}
            <div className="space-y-3 w-full">
              {candlesLit ? (
                <Button
                  onClick={handleBlowCandles}
                  size="lg"
                  className="w-full rounded-full bg-rose-500 hover:bg-rose-600 text-white font-semibold shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Wind className="size-5 animate-pulse" />
                  Tiup Lilin Sekarang 🕯️
                </Button>
              ) : (
                <div className="space-y-2">
                  <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-300 text-xs sm:text-sm font-medium flex items-center justify-center gap-2 border border-rose-200 dark:border-rose-900">
                    <Sparkles className="size-4 text-amber-500" />
                    Lilin berhasil ditiup! Harapanmu tercatat ✨
                  </div>
                  <Button
                    onClick={handleRelight}
                    variant="outline"
                    size="sm"
                    className="rounded-full text-xs border-border flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
                  >
                    <RefreshCw className="size-3.5" /> Nyalakan Lilin Kembali
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Celebratory Wish Modal */}
      <Dialog open={showWishModal} onOpenChange={setShowWishModal}>
        <DialogContent className="sm:max-w-md rounded-3xl bg-card border border-border text-center p-6 space-y-4">
          <DialogHeader className="space-y-2">
            <div className="size-14 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-500 mx-auto flex items-center justify-center shadow-inner">
              <Heart className="size-8 fill-rose-500 animate-bounce" />
            </div>
            <DialogTitle className="text-2xl font-bold text-foreground">
              Semoga Harapanmu Terwujud! 🌟
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm leading-relaxed">
              &quot;Setiap lilin yang padam melambangkan satu doa manis yang diterbangkan ke langit. Semoga di usiamu yang baru, langkahmu selalu dipermudah dan dikelilingi kebahagiaan tak terhingga.&quot;
            </DialogDescription>
          </DialogHeader>

          <Button
            onClick={() => setShowWishModal(false)}
            className="w-full rounded-full bg-rose-500 hover:bg-rose-600 text-white font-medium shadow-md cursor-pointer"
          >
            Lanjut Jelajahi Kenangan ✨
          </Button>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default BirthdayCake;
