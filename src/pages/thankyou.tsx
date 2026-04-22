import { useSearchParams } from "react-router-dom";
import { Sparkles, AlertTriangle, ChevronRight, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button-thankyou";
import NumberBadge from "@/components/thankyou/NumberBadge";
import ReportFeatureList from "@/components/thankyou/ReportFeatureList";
import StickyCtaBar from "@/components/thankyou/StickyCtaBar";

/* =========================
   🔢 NUMEROLOGY FUNCTIONS (Unchanged)
========================= */

const getNameNumber = (name) => {
  const values = {
    A:1,B:2,C:3,D:4,E:5,F:6,G:7,H:8,I:9,
    J:1,K:2,L:3,M:4,N:5,O:6,P:7,Q:8,R:9,
    S:1,T:2,U:3,V:4,W:5,X:6,Y:7,Z:8
  };
  let sum = 0;
  name.toUpperCase().replace(/[^A-Z]/g, "").split("").forEach((letter) => {
    sum += values[letter] || 0;
  });
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split("").reduce((a, b) => a + Number(b), 0);
  }
  return sum;
};

const getMoolank = (day) => {
  let num = Number(day);
  while (num > 9 && num !== 11 && num !== 22) {
    num = num.toString().split("").reduce((a, b) => a + Number(b), 0);
  }
  return num;
};

const getBhagyank = (day, month, year) => {
  let sum = `${day}${month}${year}`.split("").reduce((a, b) => a + Number(b), 0);
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split("").reduce((a, b) => a + Number(b), 0);
  }
  return sum;
};

/* =========================
   📊 DEEPER NUMBER MEANINGS
========================= */

const numberMeanings = {
  1: {
    title: "The Visionary Leader",
    traits: ["Sovereignty", "Innovation", "Willpower", "Originality"],
    description: "Number 1 is the seed of all life. You are designed to lead, not follow. Your energy is that of the pioneer who clears the path for others to follow.",
    mission: "To develop self-reliance and lead with integrity.",
    shadow: "Avoid being overly demanding or prone to extreme self-doubt.",
    energy: "Yang - Initiating Masculine Force",
    planet: "Sun ☉"
  },
  2: {
    title: "The Intuitive Diplomat",
    traits: ["Cooperation", "Sensitivity", "Intuition", "Harmony"],
    description: "The power behind the throne. You possess a unique ability to sense what others feel and create harmony in chaotic environments.",
    mission: "To learn the power of cooperation and trust your 'gut' feelings.",
    shadow: "Tendency to be over-sensitive or dependent on others' approval.",
    energy: "Yin - Harmonizing Receptive energy",
    planet: "Moon ☽"
  },
  3: {
    title: "The Creative Communicator",
    traits: ["Expressive", "Optimistic", "Social", "Inspirational"],
    description: "Number 3 represents the expansion of energy through speech and art. You are here to inspire and uplift the world's spirit through your joy.",
    mission: "To communicate deep truths and avoid scattering your creative energy.",
    shadow: "Avoid being superficial or using words to exaggerate reality.",
    energy: "Yang - Expansive Creative energy",
    planet: "Jupiter ♃"
  },
  4: {
    title: "The Master Architect",
    traits: ["Practical", "Organized", "Disciplined", "Stable"],
    description: "The foundation of the world. You turn abstract ideas into concrete reality through hard work, system, and incredible discipline.",
    mission: "To build lasting structures and find security within yourself.",
    shadow: "Beware of being too rigid, stubborn, or losing sight of the big picture.",
    energy: "Yin - Grounding Structural energy",
    planet: "Rahu (North Node) ☊"
  },
  5: {
    title: "The Dynamic Explorer",
    traits: ["Adventurous", "Versatile", "Freedom-loving", "Magnetic"],
    description: "Number 5 is the agent of change. You crave experience, travel, and variety. You are the pivot point around which others rotate.",
    mission: "To experience the world fully while maintaining inner discipline.",
    shadow: "Restlessness, impulsiveness, or a constant need to escape reality.",
    energy: "Yang - Mobile Transformative energy",
    planet: "Mercury ♿"
  },
  6: {
    title: "The Nurturing Guardian",
    traits: ["Responsible", "Caring", "Harmonious", "Protective"],
    description: "The vibration of the home. You have a natural urge to fix things and nurture those in need. You represent love in action.",
    mission: "To find balance between serving others and self-care.",
    shadow: "Avoid the 'Martyr Complex' where you over-sacrifice and feel resentful.",
    energy: "Yin - Nurturing Magnetic energy",
    planet: "Venus ♀"
  },
  7: {
    title: "The Mystic Seeker",
    traits: ["Analytical", "Spiritual", "Introspective", "Wise"],
    description: "The seeker of hidden truths. You don't care for the surface; you must know the 'why' behind the universe through deep analysis.",
    mission: "To bridge the gap between logic and spiritual intuition.",
    shadow: "Emotional coldness, secrecy, or becoming overly critical of others.",
    energy: "Yin - Introspective Mystical energy",
    planet: "Ketu (South Node) ☋"
  },
  8: {
    title: "The Powerhouse Alchemist",
    traits: ["Ambitious", "Authoritative", "Material", "Efficiency"],
    description: "The number of power and manifestation. You understand that what you give is what you get. You are here to master the material world.",
    mission: "To master money and power for the benefit of humanity.",
    shadow: "Obsession with status or being overly controlling and cold.",
    energy: "Yang - Commanding Executive energy",
    planet: "Saturn ♄"
  },
  9: {
    title: "The Global Humanitarian",
    traits: ["Compassion", "Idealistic", "Generous", "Universal"],
    description: "An old soul with universal consciousness. You carry the traits of all numbers and are here to serve the collective good.",
    mission: "To learn the art of letting go and serving without expectation.",
    shadow: "Living in the past or feeling 'burdened' by the world's problems.",
    energy: "Yang - Expansive Selfless energy",
    planet: "Mars ♂"
  },
  11: {
    title: "The Illuminator",
    traits: ["Visionary", "Intuitive", "Inspirational", "Spiritual"],
    description: "Master number of spiritual messengers. You carry double power to illuminate the path for others through high intuition.",
    mission: "To inspire and guide others through spiritual insight.",
    shadow: "Nervous tension or feeling like an outsider in the world.",
    energy: "Master - High-frequency spiritual energy",
    planet: "Sun ☉ (Elevated)"
  },
  22: {
    title: "The Master Builder",
    traits: ["Visionary", "Practical", "Powerful", "Legacy"],
    description: "The most powerful number. You combine the vision of the 11 with the practical execution of the 4 to build lasting legacies.",
    mission: "To build something tangible that serves the greater good.",
    shadow: "Greed or being overwhelmed by the weight of your own potential.",
    energy: "Master - Manifesting spiritual blueprints",
    planet: "Moon ☽ (Elevated)"
  },
  33: {
    title: "The Master Teacher",
    traits: ["Selfless", "Nurturing", "Healing", "Guiding"],
    description: "The frequency of pure compassion. You are a natural healer and spiritual guide here to raise the world's vibration.",
    mission: "To teach through love and raise collective consciousness.",
    shadow: "Self-sacrifice to the point of total physical exhaustion.",
    energy: "Master - Universal love and healing",
    planet: "Jupiter ♃ (Elevated)"
  }
};

/* =========================
   🔗 UPDATED RELATIONSHIP ANALYSIS
========================= */

const analyzeRelationship = (num1, num2) => {
  if (num1 === num2) return { type: "harmonious", color: "emerald", label: "Harmonious" };
  const friendlyPairs = [[1,3],[1,5],[1,6],[1,9],[2,4],[2,6],[2,7],[2,9],[3,5],[3,6],[3,9],[4,6],[4,7],[4,8],[5,7],[5,9],[6,7],[6,9],[7,9],[8,6]];
  const neutralPairs = [[1,2],[1,7],[1,8],[2,3],[2,5],[2,8],[3,4],[3,7],[3,8],[4,5],[4,9],[5,6],[5,8],[6,8],[7,8]];
  const isPair = (n1, n2, pairs) => pairs.some(([a,b]) => (a === n1 && b === n2) || (a === n2 && b === n1));
  if (isPair(num1, num2, friendlyPairs)) return { type: "harmonious", color: "emerald", label: "Harmonious" };
  if (isPair(num1, num2, neutralPairs)) return { type: "neutral", color: "blue", label: "Neutral" };
  return { type: "challenging", color: "rose", label: "Challenging" };
};

const getRelationshipInsight = (fromNum, toNum, fromLabel, toLabel, relType) => {
  const insights = {
    harmonious: {
      title: "Perfect Alignment",
      general: `Your ${fromLabel} and ${toLabel} are perfectly aligned. This creates a powerful resonance that amplifies your natural strengths.`,
      specific: {
        "moolank-namank": "Your inner nature and your public identity are one. Success comes to you naturally because people see exactly who you truly are. Your name acts as a magnet for your desires.",
        "bhagyank-namank": "Your name is a perfect vehicle for your destiny. Imagine driving a sports car on a clear highway—opportunities find you effortlessly because your vibration is clear.",
        "moolank-bhagyank": "You were born for your purpose. Your natural tendencies align perfectly with what you're meant to accomplish, leading to a life of deep internal peace."
      }
    },
    neutral: {
      title: "Growth Through Tension",
      general: `Your ${fromLabel} and ${toLabel} create dynamic friction. This isn't negative, but it requires conscious effort to manage.`,
      specific: {
        "moolank-namank": "Your name pushes you faster than your core self finds comfortable. You may feel like you have a 'professional persona' that is more intense than your private self.",
        "bhagyank-namank": "Your name supports your path, but doesn't accelerate it. You may have to work slightly harder than others to get the same level of recognition.",
        "moolank-bhagyank": "Your personality and destiny are teaching you different lessons. It’s rewarding, but sometimes exhausting to balance your natural desires with your higher path."
      }
    },
    challenging: {
      title: "Active Opposition",
      general: `Your ${fromLabel} and ${toLabel} are in conflict. This creates a 'Headwind' effect in your life that requires correction.`,
      specific: {
        "moolank-namank": "Your name contradicts your nature. You likely feel misunderstood by society or forced into roles that drain your soul. A name correction is highly recommended to stop this energy leak.",
        "bhagyank-namank": "Your name actively works against your life purpose. Every time you get close to a breakthrough, your name's vibration creates a delay or a misunderstanding.",
        "moolank-bhagyank": "Your core nature and destiny are fundamentally mismatched. Success in this life requires you to go against your natural grain, which requires massive willpower."
      }
    }
  };
  const key = `${fromLabel.toLowerCase()}-${toLabel.toLowerCase()}`;
  const insight = insights[relType];
  return {
    title: insight.title,
    description: insight.specific[key] || insight.general
  };
};

/* =========================
   🚀 COMPONENT (Structure Maintained)
========================= */

const Thankyou = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") || "Guest";
  const day = Number(searchParams.get("day") || 0);
  const month = Number(searchParams.get("month") || 0);
  const year = Number(searchParams.get("year") || 0);

  const nameNumber = getNameNumber(name);
  const moolank = getMoolank(day);
  const bhagyank = getBhagyank(day, month, year);

  const nameMoolRel = analyzeRelationship(nameNumber, moolank);
  const nameBhagyRel = analyzeRelationship(nameNumber, bhagyank);
  const moolBhagyRel = analyzeRelationship(moolank, bhagyank);

  let overallStatus = "Needs Correction";
  let overallMessage = "Your name vibration is currently not supporting your natural gifts and destiny.";
  
  if (nameNumber === bhagyank && nameNumber === moolank) {
    overallStatus = "Triple Alignment ✨";
    overallMessage = "Rare perfection! Your name, personality, and destiny are in complete harmony.";
  } else if (nameNumber === bhagyank || nameNumber === moolank) {
    overallStatus = "Partially Aligned";
    overallMessage = "Your name supports some aspects of your life but could be optimized for greater success.";
  } else if (nameMoolRel.type === "harmonious" || nameBhagyRel.type === "harmonious") {
    overallStatus = "Supportive";
    overallMessage = "Your name has friendly vibrations with your core numbers.";
  }

  return (
    <div className="relative min-h-screen bg-[#0a0514] pb-24 text-white">
      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-purple-900/20 blur-[120px]" />
        <div className="absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-fuchsia-900/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-2xl px-4 py-12">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5">
            <Sparkles className="h-4 w-4 text-[#d946ef]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-purple-200">
              Complete Numerology Analysis
            </span>
          </div>
          <h1 className="mb-2 font-serif text-4xl font-bold capitalize">
            Welcome, <span className="text-[#d946ef]">{name}</span>
          </h1>
          <p className="text-purple-100/70">Born {day}/{month}/{year}</p>
        </div>

        {/* Number Badges */}
        <div className="mb-10 grid grid-cols-3 gap-4">
          <NumberBadge label="MOOLANK" value={moolank} />
          <NumberBadge label="BHAGYANK" value={bhagyank} />
          <NumberBadge label="NAMANK" value={nameNumber} highlighted />
        </div>

        {/* Overall Status Alert */}
        <div className={`mb-8 rounded-2xl border p-6 ${
          overallStatus.includes("Triple") ? "border-emerald-500/30 bg-emerald-500/10" 
          : overallStatus === "Partially Aligned" || overallStatus === "Supportive"
          ? "border-blue-500/20 bg-blue-500/5" : "border-orange-500/20 bg-orange-500/5"
        }`}>
          <div className="mb-3 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6" />
            <h2 className="text-xl font-bold">{overallStatus}</h2>
          </div>
          <p className="text-sm text-slate-300">{overallMessage}</p>
        </div>

        {/* Individual Number Explanations */}
        <div className="space-y-6 mb-8">
          {[
            { label: "MOOLANK (Birth Number)", num: moolank, sub: "Your Core Personality", color: "purple" },
            { label: "BHAGYANK (Destiny Number)", num: bhagyank, sub: "Your Life Path & Purpose", color: "fuchsia" },
            { label: "NAMANK (Name Number)", num: nameNumber, sub: "How the World Sees You", color: "pink", highlight: true }
          ].map((item) => (
            <div key={item.label} className={`rounded-2xl border ${item.highlight ? 'border-[#d946ef]/30 bg-gradient-to-br from-[#1c162d] to-[#161122]' : 'border-white/5 bg-[#161122]'} p-6`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className={`text-lg font-bold text-${item.color}-300`}>{item.label} — {item.num}</h3>
                  <p className="text-sm text-slate-400">{item.sub}</p>
                </div>
                <div className="text-3xl font-bold text-[#d946ef]">{item.num}</div>
              </div>
              <h4 className="text-xl font-semibold mb-2">{numberMeanings[item.num].title}</h4>
              <p className="text-sm text-slate-300 mb-3">{numberMeanings[item.num].description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <div className="rounded-lg bg-white/5 p-3 text-xs leading-relaxed">
                  <span className="block font-bold text-emerald-400 uppercase mb-1">Your Mission</span>
                  {numberMeanings[item.num].mission}
                </div>
                <div className="rounded-lg bg-white/5 p-3 text-xs leading-relaxed">
                  <span className="block font-bold text-rose-400 uppercase mb-1">Shadow Aspect</span>
                  {numberMeanings[item.num].shadow}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {numberMeanings[item.num].traits.map((trait, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-white/10 text-slate-200 text-xs">{trait}</span>
                ))}
              </div>
              <div className="text-xs text-slate-400 space-y-1 pt-2 border-t border-white/5">
                <p>🔮 <strong>Energy:</strong> {numberMeanings[item.num].energy}</p>
                <p>🪐 <strong>Ruling Planet:</strong> {numberMeanings[item.num].planet}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Visual Triangle Diagram (Unchanged Structure) */}
        <div className="mb-8 rounded-2xl border border-white/5 bg-[#161122] p-8">
          <h3 className="text-xl font-bold mb-8 text-center">Your Numerology Map</h3>
          <div className="relative mx-auto" style={{ width: '320px', height: '340px' }}>
            <svg width="320" height="340" viewBox="0 0 320 340" className="absolute inset-0">
              <line x1="80" y1="80" x2="240" y2="80" stroke={moolBhagyRel.type === "harmonious" ? "#10b981" : moolBhagyRel.type === "neutral" ? "#64748b" : "#f43f5e"} strokeWidth="2" strokeDasharray={moolBhagyRel.type === "harmonious" ? "0" : "6,6"} opacity="0.5" />
              <line x1="80" y1="80" x2="160" y2="260" stroke={nameMoolRel.type === "harmonious" ? "#10b981" : nameMoolRel.type === "neutral" ? "#64748b" : "#f43f5e"} strokeWidth="2" strokeDasharray={nameMoolRel.type === "harmonious" ? "0" : "6,6"} opacity="0.5" />
              <line x1="240" y1="80" x2="160" y2="260" stroke={nameBhagyRel.type === "harmonious" ? "#10b981" : nameBhagyRel.type === "neutral" ? "#64748b" : "#f43f5e"} strokeWidth="2" strokeDasharray={nameBhagyRel.type === "harmonious" ? "0" : "6,6"} opacity="0.5" />
            </svg>
            <div className="absolute" style={{ left: '10px', top: '10px' }}>
              <div className="flex flex-col items-center">
                <div className="w-[140px] h-[140px] rounded-full border-4 border-purple-300/30 bg-purple-900/20 flex items-center justify-center backdrop-blur-sm"><div className="text-4xl font-bold text-purple-300">{moolank}</div></div>
                <div className="mt-2 text-center text-xs font-bold text-purple-300 uppercase tracking-wider">Moolank</div>
              </div>
            </div>
            <div className="absolute" style={{ left: '170px', top: '10px' }}>
              <div className="flex flex-col items-center">
                <div className="w-[140px] h-[140px] rounded-full border-4 border-fuchsia-300/30 bg-fuchsia-900/20 flex items-center justify-center backdrop-blur-sm"><div className="text-4xl font-bold text-fuchsia-300">{bhagyank}</div></div>
                <div className="mt-2 text-center text-xs font-bold text-fuchsia-300 uppercase tracking-wider">Bhagyank</div>
              </div>
            </div>
            <div className="absolute" style={{ left: '90px', top: '190px' }}>
              <div className="flex flex-col items-center">
                <div className="w-[140px] h-[140px] rounded-full border-4 border-[#d946ef] bg-gradient-to-br from-[#d946ef]/20 to-purple-900/20 flex items-center justify-center backdrop-blur-sm"><div className="text-4xl font-bold text-[#d946ef]">{nameNumber}</div></div>
                <div className="mt-2 text-center text-xs font-bold text-[#d946ef] uppercase tracking-wider">Naamank</div>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap gap-4 justify-center text-[10px] uppercase tracking-widest">
            <div className="flex items-center gap-2"><div className="w-8 h-0.5 bg-emerald-500"></div><span className="text-slate-400">Harmonious</span></div>
            <div className="flex items-center gap-2"><div className="w-8 h-0.5 border-t border-dashed border-slate-500"></div><span className="text-slate-400">Neutral</span></div>
            <div className="flex items-center gap-2"><div className="w-8 h-0.5 border-t border-dashed border-rose-500"></div><span className="text-slate-400">Challenging</span></div>
          </div>
        </div>

        {/* Detailed Relationship Insights */}
        <div className="space-y-4 mb-8">
          {[
            { n1: moolank, n2: nameNumber, l1: "Moolank", l2: "Naamank", rel: nameMoolRel, sub: "Personality + Identity" },
            { n1: bhagyank, n2: nameNumber, l1: "Bhagyank", l2: "Naamank", rel: nameBhagyRel, sub: "Destiny + Name Energy" },
            { n1: moolank, n2: bhagyank, l1: "Moolank", l2: "Bhagyank", rel: moolBhagyRel, sub: "Personality + Life Purpose" }
          ].map((pair, i) => {
            const insight = getRelationshipInsight(pair.n1, pair.n2, pair.l1, pair.l2, pair.rel.type);
            return (
              <div key={i} className="rounded-2xl border border-white/5 bg-[#161122] p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-slate-200">{pair.l1} ({pair.n1}) ↔ {pair.l2} ({pair.n2})</h4>
                    <p className="text-xs text-slate-500">{pair.sub}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold bg-${pair.rel.color}-500/20 text-${pair.rel.color}-200 border border-${pair.rel.color}-500/30 uppercase`}>
                    {pair.rel.label}
                  </span>
                </div>
                <p className="text-sm font-semibold text-white mb-1">{insight.title}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{insight.description}</p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="rounded-2xl border border-purple-500/20 bg-[#1c162d] p-8">
          <h2 className="text-2xl font-bold mb-4">Unlock Your Complete Name Report</h2>
          <ReportFeatureList />
          <Button className="mt-6 w-full">Get Your Personalized Report — ₹696 <ChevronRight className="ml-2" /></Button>
          <p className="mt-4 text-center text-xs text-slate-500"><Shield className="inline h-3.5 w-3.5 mr-1" /> Based on Vedic Numerology Principles</p>
        </div>
      </div>
      <StickyCtaBar />
    </div>
  );
};

export default Thankyou;