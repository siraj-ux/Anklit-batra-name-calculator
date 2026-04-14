import { Sparkles, Star, Sun, Hash, Gem } from "lucide-react";

const features = [
  { icon: Sparkles, text: "Personalized spelling options tuned to your best numbers" },
  { icon: Star, text: "Deep reading: Moolank, Bhagyank & Planetary influence" },
  { icon: Sun, text: "Lucky elements: colors, days, dates & seed mantra" },
  { icon: Hash, text: "Compound-total insights & practical remedies" },
  { icon: Gem, text: "Complete name correction with vibration alignment" },
];

const ReportFeatureList = () => {
  return (
    <div className="space-y-4">
      {features.map((feature, index) => (
        <div key={index} className="flex items-start gap-3">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/20">
            <feature.icon className="h-4 w-4 text-accent" />
          </div>
          <p className="text-sm leading-relaxed text-secondary-foreground">{feature.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ReportFeatureList;
