"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { MessageSquarePlus, Heart, Send, Sparkles, User, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { playSparkleSound } from "@/lib/sound";

interface WishItem {
  id: number;
  name: string;
  message: string;
  emoji: string;
  timestamp: string;
  likes: number;
}

const INITIAL_WISHES: WishItem[] = [
  {
    id: 1,
    name: "Teman Dekat",
    message: "Selamat ulang tahun ya! Semoga panjang umur, sehat selalu, dan semua cita-citamu tercapai tahun ini!",
    emoji: "🎉",
    timestamp: "Baru saja",
    likes: 12
  },
  {
    id: 2,
    name: "Pengagum Rahasia",
    message: "HBD! Tetap jadi sosok yang ceria dan menginspirasi banyak orang. Senyummu selalu bikin hari cerah!",
    emoji: "💖",
    timestamp: "10 menit lalu",
    likes: 8
  },
  {
    id: 3,
    name: "Sahabat Sejati",
    message: "Selamat bertambah usia bro! Sukses terus karir dan studinya, makin solid hubungan kita!",
    emoji: "🎁",
    timestamp: "1 jam lalu",
    likes: 15
  }
];

const EMOJI_OPTIONS = ["🎉", "💖", "🎁", "🌟", "🎂", "✨"];

const WishesBoard = () => {
  const [wishes, setWishes] = useState<WishItem[]>(INITIAL_WISHES);
  const [nameInput, setNameInput] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("🎉");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    playSparkleSound();
    
    confetti({
      particleCount: 55,
      spread: 65,
      origin: { y: 0.8 },
      colors: ['#f43f5e', '#ec4899', '#fbbf24']
    });

    const newWish: WishItem = {
      id: Date.now(),
      name: nameInput.trim() || "Kawan Spesial",
      message: messageInput.trim(),
      emoji: selectedEmoji,
      timestamp: "Baru saja",
      likes: 1
    };

    setWishes([newWish, ...wishes]);
    setNameInput("");
    setMessageInput("");
  };

  const handleLike = (id: number) => {
    playSparkleSound();
    setWishes(wishes.map((w) => (w.id === id ? { ...w, likes: w.likes + 1 } : w)));
  };

  return (
    <section id="wishes" className="w-full py-8 flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-border bg-card shadow-badge text-rose-500 text-xs font-semibold">
            <MessageSquarePlus className="size-3.5" /> Papan Doa & Harapan
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Kirim Doa & Ucapan Manis 💌
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm max-w-md mx-auto">
            Tuliskan harapan dan kata-kata semangatmu di bawah ini untuk membagikan kehangatan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          
          {/* Wish Form */}
          <Card className="lg:col-span-2 bg-card/80 backdrop-blur-md border border-border shadow-md rounded-2xl p-4 sm:p-5">
            <CardContent className="p-0 space-y-4">
              <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                <Sparkles className="size-4 text-rose-500" /> Tulis Ucapanmu
              </h3>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-muted-foreground flex items-center gap-1">
                    <User className="size-3" /> Namamu (Opsional)
                  </label>
                  <Input
                    placeholder="Contoh: Sahabat Kecil"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="rounded-xl border-border text-xs focus-visible:ring-rose-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-muted-foreground">Pilih Icon Emojimu</label>
                  <div className="flex gap-1.5 overflow-x-auto pb-1">
                    {EMOJI_OPTIONS.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setSelectedEmoji(emoji)}
                        className={`size-8 rounded-full text-sm flex items-center justify-center transition-transform cursor-pointer ${
                          selectedEmoji === emoji
                            ? "bg-rose-500 text-white scale-105 shadow-sm"
                            : "bg-muted hover:scale-105 border border-border"
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-muted-foreground">Pesan & Doa</label>
                  <Textarea
                    placeholder="Tuliskan ucapan dan harapan terbaikmu..."
                    rows={3}
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="rounded-xl border-border text-xs focus-visible:ring-rose-500 resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="size-3.5" /> Kirim Ucapan ✨
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Wishes Feed */}
          <Card className="lg:col-span-3 bg-card/80 backdrop-blur-md border border-border shadow-md rounded-2xl p-4 sm:p-5">
            <CardContent className="p-0 space-y-3">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <Heart className="size-4 text-rose-500 fill-rose-500" /> Doa Yang Terkumpul
                </h3>
                <Badge variant="secondary" className="rounded-full text-[10px] font-medium">
                  {wishes.length} Ucapan
                </Badge>
              </div>

              <ScrollArea className="h-[320px] pr-2">
                <div className="space-y-3">
                  {wishes.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl bg-background border border-border shadow-2xs hover:border-rose-300 transition-colors space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="text-base">{item.emoji}</span>
                          <span className="font-semibold text-xs text-foreground">{item.name}</span>
                        </div>
                        <span className="text-[10px] text-muted-foreground">{item.timestamp}</span>
                      </div>
                      
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.message}
                      </p>

                      <div className="flex justify-end pt-1">
                        <button
                          onClick={() => handleLike(item.id)}
                          className="flex items-center gap-1 text-[11px] text-rose-500 hover:text-rose-600 bg-rose-50 dark:bg-rose-950/40 px-2.5 py-0.5 rounded-full border border-rose-200 dark:border-rose-900/50 transition-transform active:scale-95 cursor-pointer"
                        >
                          <ThumbsUp className="size-3" />
                          <span>{item.likes}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

        </div>

      </div>
    </section>
  );
};

export default WishesBoard;
