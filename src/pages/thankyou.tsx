import { useSearchParams } from "react-router-dom";
import { Sparkles, AlertTriangle, ChevronRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button-thankyou";
import NumberBadge from "@/components/thankyou/NumberBadge";
import ReportFeatureList from "@/components/thankyou/ReportFeatureList";
import StickyCtaBar from "@/components/thankyou/StickyCtaBar";

const Thankyou = () => {
  const [searchParams] = useSearchParams();

  const name = searchParams.get("name") || "Guest";
  const nameNumber = searchParams.get("nameNum") || "0";
  const moolank = searchParams.get("birthNum") || "0";
  const bhagyank = searchParams.get("destinyNum") || "0";
  const status = searchParams.get("status") || "Neutral";
  const message = searchParams.get("message") || "Analysis complete.";
  
  const day = searchParams.get("day");
  const month = searchParams.get("month");
  const year = searchParams.get("year");

  return (
    <div className="relative min-h-screen bg-[#0a0514] pb-24 text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-purple-900/20 blur-[120px]" />
        <div className="absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-fuchsia-900/10 blur-[100px]" />
        <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-purple-950/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-lg px-4 py-12">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
            <Sparkles className="h-4 w-4 text-[#d946ef]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-purple-200">Name Numerology Result</span>
          </div>
          <h1 className="mb-2 font-serif text-4xl font-bold leading-tight text-white capitalize">
            Congratulations, <span className="text-[#d946ef]">{name}</span>!
          </h1>
          <p className="text-purple-100/70">
            Your Name Number is <span className="font-bold text-[#d946ef]">{nameNumber}</span>
          </p>
        </div>

        {/* Number Badges */}
        <div className="mb-10 grid grid-cols-3 gap-4">
          <NumberBadge label="MoolANK" value={moolank} className="bg-[#1c162d] border-white/5" />
          <NumberBadge label="BHAGYANK" value={bhagyank} className="bg-[#1c162d] border-white/5" />
          <NumberBadge label="NAMANK" value={nameNumber} highlighted className="bg-[#1c162d] border-purple-500/20 shadow-[0_0_20px_rgba(217,70,239,0.1)]" />
        </div>

        {/* Dynamic Alert */}
        <div className={`mb-8 rounded-2xl border p-6 shadow-lg ${
            status === "Neutral" ? "border-orange-500/20 bg-orange-500/5" : "border-purple-500/20 bg-purple-500/5"
        }`}>
          <div className="mb-3 flex items-center gap-2">
            <AlertTriangle className={`h-6 w-6 ${status === "Neutral" ? "text-orange-400" : "text-purple-400"}`} />
            <h2 className="font-display text-xl font-bold text-white">
                {status === "Neutral" ? "Name Needs Correction" : "Analysis Status"}
            </h2>
          </div>
          <p className="text-[15px] leading-relaxed text-slate-300">
            {message}
          </p>
        </div>

        {/* Description Card */}
        <div className="mb-8 rounded-2xl border border-white/5 bg-[#161122] p-6 shadow-2xl">
          <h3 className="mb-3 font-display text-lg font-bold text-white">
            Vibration {nameNumber} — Meaning
          </h3>
          <p className="text-[14px] leading-relaxed text-slate-300">
            Based on your birth date <span className="text-white font-bold">{day}/{month}/{year}</span>, your Name Number <span className="font-bold text-[#d946ef]">{nameNumber}</span> influences your life's path.
          </p>
          <p className="mt-4 text-[14px] leading-relaxed text-slate-300">
            A misalignment with your Moolank ({moolank}) can create <span className="font-semibold text-white">unnecessary delays</span>. A corrected name can help align you with your Destiny Number ({bhagyank}).
          </p>
        </div>

        {/* CTA Section */}
        <div className="rounded-2xl border border-purple-500/20 bg-[#1c162d] p-8 shadow-[0_0_40px_rgba(168,85,247,0.1)]">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-fuchsia-500/20 px-3 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-fuchsia-400">Recommended</span>
          </div>
          <h2 className="mb-3 mt-4 font-display text-2xl font-bold text-white">
            Unlock Your <span className="bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-200 bg-clip-text text-transparent">Golden Name</span> Report
          </h2>
          
          <ReportFeatureList />

          <Button 
            variant="cta" 
            size="lg" 
            className="group relative mt-8 w-full overflow-hidden rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-600 bg-[length:200%_auto] py-6 sm:py-8 px-4 shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-500 hover:bg-right hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="relative z-10 flex items-center justify-center gap-2 text-center leading-tight">
              <span className="text-[15px] sm:text-xl font-black uppercase tracking-tight sm:tracking-normal">
                Get Your Name Report Now — ₹696
              </span>
              <ChevronRight className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1 sm:h-6 sm:w-6" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
          </Button>

          <p className="mt-4 text-center text-xs text-slate-500">
            <Shield className="mr-1.5 inline h-3.5 w-3.5" />
            Vedic alignment based on your specific birth numbers.
          </p>
        </div>

        <p className="mt-12 text-center text-[10px] font-semibold uppercase tracking-widest text-slate-600 opacity-80">
          Powered by Vedic Numerology · Results for {name}
        </p>
      </div>

      <StickyCtaBar />
    </div>
  );
};

export default Thankyou;