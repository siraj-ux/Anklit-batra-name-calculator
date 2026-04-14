import { Button } from "@/components/ui/button-thankyou";
import { Lock } from "lucide-react";

const StickyCtaBar = () => {
  return (
    // Updated background to deep purple/black and border to subtle white/purple
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/5 bg-[#0a0514]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-4">
        <div>
          <p className="text-sm font-bold text-white tracking-tight">Unlock Your Golden Name Report</p>
          <p className="text-[11px] font-medium text-slate-400">Detailed analysis & correction</p>
        </div>
        
        {/* Button updated with Magenta/Fuchsia gradient and glow effect */}
        <Button 
          variant="cta" 
          size="lg" 
          className="shrink-0 rounded-full px-8 py-6 text-base font-bold bg-gradient-to-r from-[#8b5cf6] to-[#d946ef] hover:opacity-90 shadow-[0_0_20px_rgba(217,70,239,0.3)] border-0 transition-all active:scale-95"
        >
          <Lock className="mr-2 h-4 w-4 fill-current" />
          ₹696
        </Button>
      </div>
    </div>
  );
};

export default StickyCtaBar;