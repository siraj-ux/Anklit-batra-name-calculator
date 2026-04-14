import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import mysticBg from '@/assets/mystic-bg.jpg';
import NumerologyForm from '@/components/NumerologyForm';
import DrBatraSection from '@/components/DrBatraSection';
import CelebrityGallery from '@/components/CelebrityGallery';
import StickyBanner from '@/components/StickyBanner';

const Index = () => {
  return (
    <div className="min-h-screen gradient-royal relative pb-16">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <img
          src={mysticBg}
          alt=""
          className="w-full h-full object-cover opacity-30"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 star-field opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero */}
        <section className="pt-12 md:pt-20 pb-10 px-4">
          <div className="container max-w-3xl mx-auto text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex items-center justify-center gap-2 mb-4"
            >
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-xs font-medium text-primary tracking-widest uppercase">
                Chaldean System
              </span>
              <Sparkles className="w-5 h-5 text-primary" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight mb-4 glow-text"
            >
              Free Name Numerology Calculator
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-secondary-foreground text-sm md:text-base max-w-xl mx-auto leading-relaxed"
            >
              Analyze the vibrational energy of your name. Discover your Name Number, Birth Number
              &amp; Destiny Number — and find out if your name supports success.
            </motion.p>
          </div>

          <NumerologyForm />
        </section>

        <DrBatraSection />
        <CelebrityGallery />
      </div>

      <StickyBanner />
    </div>
  );
};

export default Index;
