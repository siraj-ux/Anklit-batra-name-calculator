import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function StickyBanner() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 gradient-mystic py-3 px-4 cursor-pointer"
      onClick={scrollToTop}
    >
      <div className="container flex items-center justify-center gap-3">
        <Sparkles className="w-4 h-4 text-primary-foreground animate-pulse" />
        <span className="font-display text-sm md:text-base font-semibold text-primary-foreground">
          Calculate Your Name Number Today
        </span>
        <span className="bg-primary-foreground/20 text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
          FREE
        </span>
      </div>
    </motion.div>
  );
}
