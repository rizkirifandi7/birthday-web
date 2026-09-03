"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, MailOpen, Lock, Heart, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { playSparkleSound } from "@/lib/sound";

const SurpriseEnvelope = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleEnvelope = () => {
    playSparkleSound();
    setIsOpen((prev) => !prev);
  };

  return (
    <section id="envelope" className="w-full py-8 flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full flex flex-col items-center text-center space-y-6">
        
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-border bg-card shadow-badge text-rose-500 text-xs font-semibold">
            <Mail className="size-3.5" /> Surat Rahasia Spesial
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Pesan Khusus Untukmu ✉️
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm max-w-md mx-auto">
            Ada sebuah surat rahasia yang ditulis sepenuh hati. Tekan segel lilin di bawah untuk membukanya.
          </p>
        </div>

        <div className="w-full max-w-xl">
          <Card className="bg-card/80 backdrop-blur-md border border-border shadow-xl overflow-hidden rounded-3xl p-6 relative">
            <CardContent className="p-0 flex flex-col items-center justify-center space-y-6">
              
              {!isOpen ? (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center space-y-6 py-6"
                >
                  <div className="relative group cursor-pointer" onClick={toggleEnvelope}>
                    <div className="absolute inset-0 bg-rose-500/20 blur-xl rounded-full group-hover:scale-110 transition-transform" />
                    
                    <div className="relative w-64 h-44 rounded-2xl bg-gradient-to-tr from-rose-100 via-rose-50 to-amber-50 dark:from-zinc-900 dark:via-zinc-850 dark:to-zinc-900 border border-border flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
                      <div className="absolute top-0 inset-x-0 h-20 bg-rose-200/30 dark:bg-rose-950/30 rounded-b-full border-b border-rose-300/30" />
                      
                      {/* Wax Stamp Button */}
                      <div className="relative z-10 size-14 rounded-full bg-gradient-to-tr from-rose-600 to-red-500 text-white flex items-center justify-center shadow-lg shadow-rose-600/40 border-2 border-rose-300 group-hover:rotate-12 transition-transform duration-300">
                        <Heart className="size-7 fill-white animate-pulse" />
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={toggleEnvelope}
                    size="lg"
                    className="rounded-full px-8 bg-rose-500 hover:bg-rose-600 text-white font-semibold shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <MailOpen className="size-4" /> Buka Surat Rahasia 💌
                  </Button>
                </motion.div>
              ) : (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="w-full text-left space-y-5 p-4 sm:p-6 bg-amber-50/70 dark:bg-zinc-900/90 rounded-2xl border border-amber-200/70 dark:border-zinc-800 font-serif shadow-inner"
                  >
                    <div className="flex items-center justify-between border-b border-amber-200 dark:border-zinc-800 pb-3 font-sans">
                      <div className="flex items-center gap-2 text-rose-500 font-semibold text-xs sm:text-sm">
                        <Quote className="size-4" />
                        <span>Dari Hati Yang Terdalam</span>
                      </div>
                      <Badge variant="outline" className="text-[10px] border-amber-300 text-amber-700 dark:text-amber-300">
                        <Star className="size-3 mr-1 fill-amber-400 text-amber-400" /> Wajib Dibaca
                      </Badge>
                    </div>

                    <div className="space-y-3.5 text-foreground/90 text-xs sm:text-sm leading-relaxed tracking-wide">
                      <p className="font-semibold text-rose-600 dark:text-rose-400 text-base">
                        Hai kamu yang luar biasa,
                      </p>
                      
                      <p>
                        Hari ini bukan sekadar bertambahnya usiamu, tapi juga hari untuk merayakan betapa berharganya kehadiranmu di dunia ini. Senyummu selalu membawa kehangatan, dan kebaikanmu menerangi hari-hari orang di sekitarmu.
                      </p>

                      <p>
                        Semoga di usia yang baru ini, setiap impian yang selama ini kamu simpan di dalam doa perlahan terwujud satu per satu. Jangan pernah lelah untuk menjadi dirimu yang jujur, hangat, dan penuh semangat!
                      </p>

                      <p className="pt-1 italic text-rose-500 dark:text-rose-400 font-medium">
                        &quot;Semoga kebahagiaan selalu memelukmu erat, hari ini dan selamanya.&quot;
                      </p>
                    </div>

                    <div className="pt-3 border-t border-amber-200 dark:border-zinc-800 flex items-center justify-between gap-2 font-sans">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                        <Heart className="size-3.5 text-rose-500 fill-rose-500" />
                        <span>Dengan Cinta & Doa Terbaik</span>
                      </div>

                      <Button
                        onClick={toggleEnvelope}
                        variant="outline"
                        size="sm"
                        className="rounded-full text-xs border-amber-300 hover:bg-amber-100 dark:hover:bg-zinc-800 cursor-pointer flex items-center gap-1.5"
                      >
                        <Lock className="size-3.5" /> Tutup Surat
                      </Button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}

            </CardContent>
          </Card>
        </div>

      </div>
    </section>
  );
};

export default SurpriseEnvelope;
