import { motion } from 'framer-motion';
import { Award, Users, BookOpen } from 'lucide-react';
import drBatraImg from '@/assets/dr-batra.jpg';

export default function DrBatraSection() {
  return (
    <section className="py-16 px-4">
      <div className="container max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card/60 backdrop-blur-lg border border-border rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-8"
        >
          <div className="shrink-0">
            <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-primary/40 glow-purple">
              <img
                src={drBatraImg}
                alt="Dr. Ankit Batra"
                className="w-full h-full object-cover"
                loading="lazy"
                width={176}
                height={176}
              />
            </div>
          </div>
          <div className="text-center md:text-left">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-1">
              Dr. Ankit Batra
            </h2>
            <p className="text-primary font-medium text-sm mb-4">
              Numerologist & Astro Consultant
            </p>
            <p className="text-secondary-foreground text-sm leading-relaxed mb-5">
              Dr. Ankit Batra is a renowned numerologist specializing in Chaldean Name Numerology
              and name correction consultations. With years of experience helping individuals and
              businesses align their names for success, he combines ancient wisdom with modern analysis
              to deliver actionable insights.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {[
                { icon: Users, label: '10,000+ Clients' },
                { icon: Award, label: '15+ Years Exp.' },
                { icon: BookOpen, label: 'Chaldean Expert' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Icon className="w-3.5 h-3.5 text-primary" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
