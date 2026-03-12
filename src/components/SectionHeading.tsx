import { motion } from "framer-motion";

interface Props {
  subtitle?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}

export default function SectionHeading({ subtitle, title, description, align = "center" }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={align === "center" ? "text-center" : "text-left"}
    >
      {subtitle && (
        <motion.span
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-primary font-medium text-sm uppercase tracking-[0.2em] mb-2 block text-hover-glow"
        >
          {subtitle}
        </motion.span>
      )}
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
          className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
