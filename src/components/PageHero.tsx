import { motion } from "framer-motion";

interface Props {
  subtitle?: string;
  title: string;
  description?: string;
  backgroundImage: string;
  children?: React.ReactNode;
}

export default function PageHero({ subtitle, title, description, backgroundImage, children }: Props) {
  return (
    <section className="page-hero">
      <div className="absolute inset-0">
        <img src={backgroundImage} alt="" className="w-full h-full object-cover" />
        <div className="page-hero-overlay" />
      </div>
      <div className="relative container mx-auto px-4 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {subtitle && (
            <motion.span
              initial={{ opacity: 0, letterSpacing: "0.1em", scale: 0.95 }}
              animate={{ opacity: 1, letterSpacing: "0.3em", scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
              className="text-primary font-medium text-xs sm:text-sm uppercase tracking-[0.3em] mb-3 block"
            >
              {subtitle}
            </motion.span>
          )}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4"
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
              className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg leading-relaxed"
            >
              {description}
            </motion.p>
          )}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
