"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { HelpCircle, Trophy, RotateCcw, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { playSparkleSound } from "@/lib/sound";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Apa hal yang paling bikin si Ulang Tahun bahagia di hari spesialnya?",
    options: [
      "Makan makanan favorit bersama orang terdekat 🍕",
      "Tidur seharian tanpa diganggu 😴",
      "Dapat kejutan melimpah 🎁",
      "Semua jawaban di atas benar! 🌟"
    ],
    correctIndex: 3
  },
  {
    id: 2,
    question: "Kalau lagi santai, apa kegiatan yang paling sering dilakukan?",
    options: [
      "Mendengarkan musik sambil melamun indah 🎵",
      "Scrolling medsos & nyari tempat makan lucu 📱",
      "Nonton film / serial maraton 🍿",
      "Menyusun rencana petualangan baru 🗺️"
    ],
    correctIndex: 0
  },
  {
    id: 3,
    question: "Superpower utama dari si Ulang Tahun adalah...?",
    options: [
      "Selalu bisa bikin suasana jadi hangat & ceria ✨",
      "Pendengar yang baik & penuh empati ❤️",
      "Punya selera humor yang receh tapi lucu 😂",
      "Semua sifat manis di atas! 🥰"
    ],
    correctIndex: 3
  }
];

const FunQuiz = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleSelectOption = (idx: number) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(idx);
    playSparkleSound();

    if (idx === QUESTIONS[currentIdx].correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOpt(null);
    } else {
      setIsFinished(true);
      playSparkleSound();
      confetti({
        particleCount: 110,
        spread: 75,
        origin: { y: 0.6 }
      });
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <section id="quiz" className="w-full py-12 px-4 flex flex-col items-center justify-center">
      <div className="max-w-xl w-full space-y-6 text-center">
        
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-border bg-card shadow-badge text-amber-500 text-xs font-semibold">
            <HelpCircle className="size-3.5" /> Kuis Trivia Seru
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Seberapa Tahu Kamu? 🤔
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm max-w-sm mx-auto">
            Uji pengetahuanmu tentang hal-hal manis si Ulang Tahun lewat 3 tebakan sederhana ini!
          </p>
        </div>

        {/* Quiz Card */}
        <Card className="bg-card/80 backdrop-blur-md border border-border shadow-lg rounded-3xl p-5 sm:p-6 text-left">
          <CardContent className="p-0 space-y-5">
            {!isFinished ? (
              <>
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <span className="text-xs font-medium text-rose-500">
                    Pertanyaan {currentIdx + 1} dari {QUESTIONS.length}
                  </span>
                  <Badge variant="secondary" className="text-[10px]">
                    Skor: {score}
                  </Badge>
                </div>

                <h3 className="font-semibold text-sm sm:text-base text-foreground leading-snug">
                  {QUESTIONS[currentIdx].question}
                </h3>

                <div className="space-y-2">
                  {QUESTIONS[currentIdx].options.map((option, idx) => {
                    const isSelected = selectedOpt === idx;
                    const isCorrect = idx === QUESTIONS[currentIdx].correctIndex;
                    
                    let btnClass = "border-border hover:bg-accent";
                    if (selectedOpt !== null) {
                      if (isCorrect) btnClass = "bg-emerald-500 text-white border-emerald-500";
                      else if (isSelected) btnClass = "bg-rose-500 text-white border-rose-500";
                    }

                    return (
                      <button
                        key={idx}
                        disabled={selectedOpt !== null}
                        onClick={() => handleSelectOption(idx)}
                        className={`w-full p-3.5 rounded-xl border text-xs sm:text-sm font-medium text-left transition-all duration-200 flex items-center justify-between cursor-pointer ${btnClass}`}
                      >
                        <span>{option}</span>
                        {selectedOpt !== null && isCorrect && (
                          <CheckCircle2 className="size-4 text-white shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {selectedOpt !== null && (
                  <Button
                    onClick={handleNext}
                    className="w-full rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-medium cursor-pointer"
                  >
                    {currentIdx < QUESTIONS.length - 1 ? "Pertanyaan Selanjutnya →" : "Lihat Hasil Akhir ✨"}
                  </Button>
                )}
              </>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="size-16 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-500 mx-auto flex items-center justify-center shadow-inner">
                  <Trophy className="size-8 fill-amber-400 animate-bounce" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-bold">Luar Biasa! 🎉</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm">
                    Kamu berhasil menjawab <span className="font-bold text-rose-500">{score}</span> dari {QUESTIONS.length} pertanyaan dengan tepat!
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-600 dark:text-rose-300 font-medium">
                  <Sparkles className="size-3.5 inline mr-1 text-amber-500" />
                  Kamu membuktikan betapa dekat dan perhatiannya kamu padanya!
                </div>

                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="rounded-full text-xs border-border flex items-center gap-1.5 mx-auto cursor-pointer"
                >
                  <RotateCcw className="size-3.5" /> Coba Kuis Lagi
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

      </div>
    </section>
  );
};

export default FunQuiz;
