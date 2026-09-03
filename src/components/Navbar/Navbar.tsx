"use client";

import React, { useState } from "react";
import { Sparkles, Music, VolumeX, Cake, Image as ImageIcon, Mail, HeartHandshake, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toggleBirthdayMelody, playSparkleSound } from "@/lib/sound";

const Navbar = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleAudioToggle = () => {
    const active = toggleBirthdayMelody(setIsPlaying);
    if (active) {
      playSparkleSound();
    }
  };

  const navLinks = [
    { href: "#cake", label: "Tiup Lilin", icon: Cake },
    { href: "#memories", label: "Kenangan", icon: ImageIcon },
    { href: "#envelope", label: "Surat Rahasia", icon: Mail },
    { href: "#wishes", label: "Ucapan", icon: HeartHandshake },
    { href: "#quiz", label: "Kuis", icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 left-0 right-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Brand Logo Mark */}
        <a href="#" className="flex items-center gap-2.5 text-lg font-semibold group">
          <div className="size-8 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="size-4 animate-pulse" />
          </div>
          <span className="text-base font-bold tracking-tight bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">
            Birthday ✨
          </span>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.href}
                href={link.href}
                className="group inline-flex h-8 items-center justify-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <Icon className="size-3.5 text-rose-500 group-hover:scale-110 transition-transform" />
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleAudioToggle}
            className={`rounded-full h-8 px-3 text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
              isPlaying
                ? "bg-rose-500 text-white border-rose-500 hover:bg-rose-600 shadow-md animate-pulse"
                : "border-border hover:bg-accent"
            }`}
          >
            {isPlaying ? (
              <>
                <Music className="size-3.5 animate-bounce" />
                <span className="hidden sm:inline font-medium">Musik Play</span>
              </>
            ) : (
              <>
                <VolumeX className="size-3.5 text-muted-foreground" />
                <span className="hidden sm:inline font-medium">Putar Musik</span>
              </>
            )}
          </Button>

          <a href="#cake" className="hidden sm:inline-flex">
            <Button size="sm" className="rounded-full h-8 px-4 text-xs font-medium bg-rose-500 hover:bg-rose-600 text-white cursor-pointer shadow-sm">
              Rayakan 🎉
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;