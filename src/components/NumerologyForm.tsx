import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  calculateNameNumber,
  calculateBirthNumber,
  calculateDestinyNumber,
  getCompatibility,
  numberMeanings,
} from '@/lib/numerology';

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);

export default function NumerologyForm() {
  const [name, setName] = useState('');
  const [day, setDay] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [result, setResult] = useState<null | {
    nameNum: number;
    birthNum: number;
    destinyNum: number;
    status: string;
    message: string;
  }>(null);

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

  // ✅ Redirect to /ty with params
  window.location.href = `/ty?${params.toString()}`;
};

  const statusColor = result?.status === 'Favourable'
    ? 'text-emerald-400'
    : result?.status === 'Neutral'
      ? 'text-accent'
      : 'text-rose-400';

  return (
    <div className="w-full max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-6 md:p-8 glow-purple"
      >
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-display font-semibold text-foreground">
            Enter Your Details
          </h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
              Full Name
            </label>
            <Input
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground focus:ring-primary"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Use the name on your documents / salary slip / visiting card
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
              Date of Birth
            </label>
            <div className="grid grid-cols-3 gap-2">
              <Select value={day} onValueChange={setDay}>
                <SelectTrigger className="bg-secondary/50 border-border text-foreground">
                  <SelectValue placeholder="Day" />
                </SelectTrigger>
                <SelectContent>
                  {days.map((d) => (
                    <SelectItem key={d} value={String(d)}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={month} onValueChange={setMonth}>
                <SelectTrigger className="bg-secondary/50 border-border text-foreground">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((m, i) => (
                    <SelectItem key={m} value={String(i + 1)}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={year} onValueChange={setYear}>
                <SelectTrigger className="bg-secondary/50 border-border text-foreground">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((y) => (
                    <SelectItem key={y} value={String(y)}>{y}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleCalculate}
            disabled={!name.trim() || !day || !month || !year}
            className="w-full gradient-mystic text-primary-foreground font-semibold text-base py-6 rounded-xl hover:opacity-90 transition-opacity"
          >
            <Star className="w-4 h-4 mr-2" />
            Calculate Name Number
          </Button>
        </div>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6 border-t border-border pt-6"
            >
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: 'Name Number', value: result.nameNum },
                  { label: 'Birth Number', value: result.birthNum },
                  { label: 'Destiny Number', value: result.destinyNum },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="bg-secondary/60 rounded-xl p-3 text-center"
                  >
                    <div className="text-2xl font-display font-bold text-primary glow-text">
                      {item.value}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{item.label}</div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-secondary/40 rounded-xl p-4">
                <div className={`font-display font-semibold text-sm mb-1 ${statusColor}`}>
                  Status: {result.status}
                </div>
                <p className="text-sm text-secondary-foreground leading-relaxed">
                  {result.message}
                </p>
                {numberMeanings[result.nameNum] && (
                  <p className="text-xs text-muted-foreground mt-2">
                    <span className="text-primary font-medium">Name Number {result.nameNum}:</span>{' '}
                    {numberMeanings[result.nameNum]}
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <p className="text-xs text-muted-foreground text-center mt-4 max-w-md mx-auto leading-relaxed opacity-60">
        This calculator is for educational guidance only. We don't store your personal data. For paid services, we follow ISO 27001 and the DPDP Act 2023.
      </p>
    </div>
  );
}
