"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Removed CalendarIcon since we are using native picker
import { Sparkles, Star } from 'lucide-react'; 
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  calculateNameNumber,
  calculateBirthNumber,
  calculateDestinyNumber,
  getCompatibility,
} from '@/lib/numerology';

// Get today's date for the 'max' attribute
const today = new Date().toISOString().split("T")[0];

export default function NumerologyForm() {
  const [name, setName] = useState('');
  const [day, setDay] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [dateInput, setDateInput] = useState(''); // Stores YYYY-MM-DD for the native input

  const [result, setResult] = useState<null | {
    nameNum: number;
    birthNum: number;
    destinyNum: number;
    status: string;
    message: string;
  }>(null);

  // Updated logic to handle native date picker change
  const handleNativeDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value; // Format: YYYY-MM-DD
    setDateInput(val);

    if (val) {
      const [y, m, d] = val.split('-');
      setYear(y);
      setMonth(m);
      setDay(d);
    } else {
      setYear('');
      setMonth('');
      setDay('');
    }
  };

  const handleCalculate = () => {
    if (!name.trim() || !day || !month || !year) return;

    const nameNum = calculateNameNumber(name);
    const birthNum = calculateBirthNumber(parseInt(day));
    const destinyNum = calculateDestinyNumber(
      parseInt(day),
      parseInt(month),
      parseInt(year)
    );

    const compat = getCompatibility(nameNum, birthNum, destinyNum);

    const params = new URLSearchParams({
      name,
      day,
      month,
      year,
      nameNum: String(nameNum),
      birthNum: String(birthNum),
      destinyNum: String(destinyNum),
      status: compat.status,
      message: compat.message,
    });

    window.location.href = `/ty?${params.toString()}`;
  };

  const statusColor = result?.status === 'Favourable'
    ? 'text-emerald-400'
    : result?.status === 'Neutral'
      ? 'text-purple-300'
      : 'text-rose-400';

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-[#0f0817] border border-white/10 rounded-[32px] p-8 md:p-12 shadow-2xl shadow-purple-950/20"
      >
        <div className="flex items-center gap-3 mb-12">
          <span className="text-purple-400 text-xl">✦</span>
          <h2 className="text-xl font-serif tracking-[0.15em] uppercase text-slate-100">
            Enter your details
          </h2>
        </div>

        <div className="space-y-10">
          <div className="space-y-3">
            <label className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400 block">
              Full Name
            </label>
            <Input
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-16 bg-[#181126] border-white/5 text-slate-200 placeholder:text-slate-500 placeholder:font-serif placeholder:italic focus:ring-purple-500/30 rounded-xl px-6 text-lg transition-all"
            />
            <p className="text-[13px] text-slate-500 mt-4 leading-relaxed font-sans opacity-80">
              Use the name on your documents, salary slip, or visiting card.
            </p>
          </div>

          {/* --- UPDATED DATE SECTION START --- */}
          <div className="space-y-3">
            <label className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400 block">
              Date of Birth
            </label>
            <div className="relative">
              <Input
                type="date"
                required
                max={today}
                value={dateInput}
                onChange={handleNativeDateChange}
                className="h-16 bg-[#181126] border-white/5 text-slate-200 focus:ring-purple-500/30 rounded-xl px-6 text-lg w-full transition-all appearance-none block [color-scheme:dark]"
              />
            </div>
          </div>
          {/* --- UPDATED DATE SECTION END --- */}

          <Button
            onClick={handleCalculate}
            disabled={!name.trim() || !day || !month || !year}
            className="w-full h-16 bg-[#1c1529] border border-white/5 hover:bg-[#251b36] text-slate-200 font-medium text-lg rounded-2xl transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-40"
          >
            <span className="text-purple-400 text-lg">✦</span>
            <span className="tracking-wide">Calculate Name Number</span>
          </Button>
        </div>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-12 pt-12 border-t border-white/5"
            >
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { label: 'Name No.', value: result.nameNum },
                  { label: 'Birth No.', value: result.birthNum },
                  { label: 'Destiny No.', value: result.destinyNum },
                ].map((item) => (
                  <div key={item.label} className="bg-[#181126] rounded-2xl p-5 text-center border border-white/5">
                    <div className="text-3xl font-serif font-bold text-purple-400">
                      {item.value}
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.1em] text-slate-500 mt-2 font-bold">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#181126]/50 rounded-2xl p-6 border border-white/5 text-center">
                <div className={`font-serif text-lg mb-2 ${statusColor}`}>
                   {result.status}
                </div>
                <p className="text-sm text-slate-400 leading-relaxed italic">
                  "{result.message}"
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}