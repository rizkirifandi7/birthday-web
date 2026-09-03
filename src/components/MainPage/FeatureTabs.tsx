"use client";

import React, { useState } from "react";
import { Cake, Camera, Mail, HeartHandshake, Sparkles } from "lucide-react";
import BirthdayCake from "./BirthdayCake";
import MemoryGallery from "./MemoryGallery";
import SurpriseEnvelope from "./SurpriseEnvelope";
import WishesBoard from "./WishesBoard";

const FeatureTabs = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs = [
    { id: 0, label: "Tiup Lilin 🎂", icon: Cake },
    { id: 1, label: "Galeri Foto 📸", icon: Camera },
    { id: 2, label: "Surat Rahasia ✉️", icon: Mail },
    { id: 3, label: "Papan Ucapan 💌", icon: HeartHandshake },
  ];

  return (
    <section id="demo" className="w-full relative border-b border-border">
      <div className="w-full flex flex-col">
        
        {/* Codeforge Tab Bar */}
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 overflow-hidden border-b border-border divide-x divide-border bg-card/40">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative cursor-pointer overflow-hidden w-full min-h-[52px] px-4 py-3.5 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors text-center flex items-center justify-center gap-2 group ${
                  isActive
                    ? "bg-accent/60 text-rose-500"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
                }`}
              >
                <Icon className={`size-4 ${isActive ? "text-rose-500" : "text-muted-foreground"}`} />
                <span>{tab.label}</span>
                
                {/* Active Indicator Line */}
                {isActive && (
                  <span className="pointer-events-none absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500" />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Preview Area */}
        <div className="w-full p-4 sm:p-8 relative bg-background/50">
          {activeTab === 0 && <BirthdayCake />}
          {activeTab === 1 && <MemoryGallery />}
          {activeTab === 2 && <SurpriseEnvelope />}
          {activeTab === 3 && <WishesBoard />}
        </div>

      </div>
    </section>
  );
};

export default FeatureTabs;
