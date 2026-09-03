"use client";

import React, { useState } from "react";
import { Camera, Heart, Calendar, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface MemoryItem {
  id: number;
  title: string;
  category: "Tawa" | "Petualangan" | "Spesial";
  date: string;
  description: string;
  bgGradient: string;
  emoji: string;
}

const MEMORIES: MemoryItem[] = [
  {
    id: 1,
    title: "Senyum Pertama Tahun Ini",
    category: "Spesial",
    date: "Januari 2026",
    description: "Momen saat kita tertawa lepas tanpa beban di sore hari yang menyenangkan.",
    bgGradient: "from-rose-400 to-amber-300",
    emoji: "☀️"
  },
  {
    id: 2,
    title: "Petualangan Tak Terlupakan",
    category: "Petualangan",
    date: "Maret 2026",
    description: "Menjelajahi tempat baru bersama, menikmati angin malam dan cerita tak bertepi.",
    bgGradient: "from-sky-400 to-indigo-400",
    emoji: "🏔️"
  },
  {
    id: 3,
    title: "Kopi & Lelucon Lucu",
    category: "Tawa",
    date: "Mei 2026",
    description: "Cangkir kopi yang dingin karena terlalu asyik mengobrol hal-hal tak penting.",
    bgGradient: "from-amber-400 to-orange-400",
    emoji: "☕"
  },
  {
    id: 4,
    title: "Perayaan Kecil Bertabur Harapan",
    category: "Spesial",
    date: "Agustus 2026",
    description: "Momen berharga di mana semua impian kecil kita terasa semakin dekat.",
    bgGradient: "from-pink-400 to-purple-400",
    emoji: "✨"
  }
];

const MemoryGallery = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("Semua");
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);

  const filteredMemories = MEMORIES.filter(
    (item) => selectedFilter === "Semua" || item.category === selectedFilter
  );

  return (
    <section id="memories" className="w-full py-8 flex flex-col items-center justify-center">
      <div className="max-w-5xl w-full space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-border bg-card shadow-badge text-rose-500 text-xs font-semibold">
            <Camera className="size-3.5" /> Galeri Momen Indah
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Galeri Kenangan Manis 📸
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm max-w-lg mx-auto">
            Setiap detik yang telah kita lewati penuh dengan jejak cerita indah dan tawa yang selalu dirindukan.
          </p>

          {/* Filter Categories */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {["Semua", "Spesial", "Petualangan", "Tawa"].map((cat) => (
              <Button
                key={cat}
                variant={selectedFilter === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(cat)}
                className={`rounded-full text-xs transition-all cursor-pointer ${
                  selectedFilter === cat
                    ? "bg-rose-500 hover:bg-rose-600 text-white shadow-sm"
                    : "border-border hover:bg-accent"
                }`}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Bento Grid Polaroid Memories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredMemories.map((item) => (
            <Card
              key={item.id}
              onClick={() => setSelectedMemory(item)}
              className="group cursor-pointer bg-card/80 backdrop-blur-md border border-border rounded-2xl p-3 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <CardContent className="p-0 space-y-3">
                <div className={`relative w-full h-44 rounded-xl bg-gradient-to-tr ${item.bgGradient} flex items-center justify-center overflow-hidden shadow-inner`}>
                  <span className="text-4xl group-hover:scale-125 transition-transform duration-300">
                    {item.emoji}
                  </span>
                  
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <Eye className="size-6" />
                  </div>

                  <Badge className="absolute top-2.5 left-2.5 bg-background/80 text-foreground text-[10px] backdrop-blur-md border-border">
                    {item.category}
                  </Badge>
                </div>

                <div className="px-1.5 space-y-1">
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Calendar className="size-3 text-rose-500" />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="font-semibold text-sm text-foreground group-hover:text-rose-500 transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>

      {/* Memory Lightbox Modal */}
      <Dialog open={!!selectedMemory} onOpenChange={() => setSelectedMemory(null)}>
        {selectedMemory && (
          <DialogContent className="sm:max-w-lg rounded-3xl bg-card border border-border p-6 space-y-4">
            <DialogHeader className="space-y-2">
              <div className={`w-full h-52 rounded-2xl bg-gradient-to-tr ${selectedMemory.bgGradient} flex items-center justify-center text-6xl shadow-md`}>
                {selectedMemory.emoji}
              </div>
              <div className="flex items-center gap-2 pt-2">
                <Badge variant="outline" className="text-rose-500 border-rose-300 text-xs">
                  {selectedMemory.category}
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="size-3" /> {selectedMemory.date}
                </span>
              </div>
              <DialogTitle className="text-xl font-bold text-left">
                {selectedMemory.title}
              </DialogTitle>
            </DialogHeader>
            <p className="text-muted-foreground text-sm leading-relaxed text-left">
              {selectedMemory.description}
            </p>
            <div className="pt-2 flex justify-end">
              <Button
                size="sm"
                onClick={() => setSelectedMemory(null)}
                className="rounded-full bg-rose-500 text-white hover:bg-rose-600 cursor-pointer"
              >
                Tutup <Heart className="size-3.5 ml-1 fill-white" />
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
};

export default MemoryGallery;
