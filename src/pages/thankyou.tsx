import { useSearchParams } from "react-router-dom";
import { Sparkles, AlertTriangle, ChevronRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button-thankyou";
import NumberBadge from "@/components/thankyou/NumberBadge";
import ReportFeatureList from "@/components/thankyou/ReportFeatureList";
import StickyCtaBar from "@/components/thankyou/StickyCtaBar";

/* =========================
   🔢 NUMEROLOGY FUNCTIONS
========================= */

// Name Number (Namank)
const getNameNumber = (name) => {
  const values = {
    A:1,B:2,C:3,D:4,E:5,F:6,G:7,H:8,I:9,
    J:1,K:2,L:3,M:4,N:5,O:6,P:7,Q:8,R:9,
    S:1,T:2,U:3,V:4,W:5,X:6,Y:7,Z:8
  };

  let sum = 0;

  name
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .split("")
    .forEach((letter) => {
      sum += values[letter] || 0;
    });

  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum
      .toString()
      .split("")
      .reduce((a, b) => a + Number(b), 0);
  }

  return sum;
};

// Moolank (Birth Number → Day)
const getMoolank = (day) => {
  let num = Number(day);

  while (num > 9 && num !== 11 && num !== 22) {
    num = num
      .toString()
      .split("")
      .reduce((a, b) => a + Number(b), 0);
  }

  return num;
};

// Bhagyank (Destiny Number → Full DOB)
const getBhagyank = (day, month, year) => {
  let sum = `${day}${month}${year}`
    .split("")
    .reduce((a, b) => a + Number(b), 0);

  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum
      .toString()
      .split("")
      .reduce((a, b) => a + Number(b), 0);
  }

  return sum;
};

/* =========================
   🚀 COMPONENT
========================= */

const Thankyou = () => {
  const [searchParams] = useSearchParams();

  const name = searchParams.get("name") || "Guest";

  const day = Number(searchParams.get("day") || 0);
  const month = Number(searchParams.get("month") || 0);
  const year = Number(searchParams.get("year") || 0);

  // ✅ Calculated values
  const nameNumber = getNameNumber(name);
  const moolank = getMoolank(day);
  const bhagyank = getBhagyank(day, month, year);

  // ✅ Auto Status Logic
  let status = "Neutral";
  let message = "Your name may need correction for better alignment.";

  if (nameNumber === bhagyank) {
    status = "Aligned";
    message = "Your name is perfectly aligned with your destiny number. This is a powerful combination for success.";
  } else if (nameNumber === moolank) {
    status = "Partially Aligned";
    message = "Your name aligns with your personality but may not fully support your life path.";
  }

  return (
    <div className="relative min-h-screen bg-[#0a0514] pb-24 text-white">
      
      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-purple-900/20 blur-[120px]" />
        <div className="absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-fuchsia-900/10 blur-[100px]" />
        <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-purple-950/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-lg px-4 py-12">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5">
            <Sparkles className="h-4 w-4 text-[#d946ef]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-purple-200">
              Name Numerology Result
            </span>
          </div>

          <h1 className="mb-2 font-serif text-4xl font-bold capitalize">
            Congratulations, <span className="text-[#d946ef]">{name}</span>!
          </h1>

          <p className="text-purple-100/70">
            Your Name Number is{" "}
            <span className="font-bold text-[#d946ef]">{nameNumber}</span>
          </p>
        </div>

        {/* Number Badges */}
        <div className="mb-10 grid grid-cols-3 gap-4">
          <NumberBadge label="MOOLANK" value={moolank} />
          <NumberBadge label="BHAGYANK" value={bhagyank} />
          <NumberBadge label="NAMANK" value={nameNumber} highlighted />
        </div>

        {/* Alert */}
        <div
          className={`mb-8 rounded-2xl border p-6 ${
            status === "Neutral"
              ? "border-orange-500/20 bg-orange-500/5"
              : "border-purple-500/20 bg-purple-500/5"
          }`}
        >
          <div className="mb-3 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6" />
            <h2 className="text-xl font-bold">
              {status === "Neutral"
                ? "Name Needs Correction"
                : "Analysis Status"}
            </h2>
          </div>
          <p className="text-sm text-slate-300">{message}</p>
        </div>

        {/* Description */}
        <div className="mb-8 rounded-2xl border border-white/5 bg-[#161122] p-6">
          <h3 className="mb-3 text-lg font-bold">
            Vibration {nameNumber} — Meaning
          </h3>

          <p className="text-sm text-slate-300">
            Based on your birth date{" "}
            <span className="font-bold">
              {day}/{month}/{year}
            </span>
            , your Name Number{" "}
            <span className="text-[#d946ef] font-bold">{nameNumber}</span>{" "}
            influences your life path.
          </p>

          <p className="mt-4 text-sm text-slate-300">
            If your name is not aligned with your Moolank ({moolank}) or
            Bhagyank ({bhagyank}), it may cause delays or struggles.
          </p>
        </div>

        {/* CTA */}
        <div className="rounded-2xl border border-purple-500/20 bg-[#1c162d] p-8">
          <h2 className="text-2xl font-bold mb-4">
            Unlock Your Golden Name Report
          </h2>

          <ReportFeatureList />

          <Button className="mt-6 w-full">
            Get Your Name Report Now — ₹696
            <ChevronRight className="ml-2" />
          </Button>

          <p className="mt-4 text-center text-xs text-slate-500">
            <Shield className="inline h-3.5 w-3.5 mr-1" />
            Based on Vedic Numerology
          </p>
        </div>

        <p className="mt-10 text-center text-xs text-slate-600">
          Results for {name}
        </p>
      </div>

      <StickyCtaBar />
    </div>
  );
};

export default Thankyou;