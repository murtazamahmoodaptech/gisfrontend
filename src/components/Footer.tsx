import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

export default function Footer() {
  const footerSections = [
    {
      label: "Quick Links",
      items: [
        { to: "/services", label: "Services" },
        { to: "/book", label: "Book Appointment" },
        { to: "/reviews", label: "Reviews" },
        { to: "/about", label: "About Us" },
        { to: "/contact", label: "Contact" },
        { to: "/privacy-policy", label: "Privacy Policy" },
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <footer className="bg-gradient-card border-t border-glow-hover">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand */}
          <motion.div variants={itemVariants}>
            <motion.div 
              className="flex items-center gap-3 mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img src={logo} alt="Global Integrated Support" className="h-14 w-auto" />
            </motion.div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Global Integrated Support — premium car detailing services that bring out the best in your vehicle. Experience luxury treatment for your ride.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-primary font-display text-lg mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[
                { to: "/services", label: "Services" },
                { to: "/book", label: "Book Appointment" },
                { to: "/reviews", label: "Reviews" },
                { to: "/about", label: "About Us" },
                { to: "/contact", label: "Contact" },
                { to: "/privacy-policy", label: "Privacy Policy" },
              ].map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ x: 5 }}
                >
                  <Link to={l.to} className="text-muted-foreground text-sm hover:text-primary transition-all duration-300 link-hover">
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h4 className="text-primary font-display text-lg mb-4">Services</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              {["Interior Detailing", "Exterior Detailing", "Super Wax Detail", "Ceramic Coating", "Paint Correction"].map((service, i) => (
                <motion.span
                  key={service}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:text-primary transition-colors duration-300 cursor-pointer"
                >
                  {service}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h4 className="text-primary font-display text-lg mb-4">Contact</h4>
            <div className="flex flex-col gap-3">
              <motion.a 
                href="tel:+15551234567" 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-all duration-300"
                whileHover={{ x: 5 }}
              >
                <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
                  <Phone className="w-4 h-4 text-primary" />
                </motion.div>
                (555) 123-4567
              </motion.a>
              <motion.a 
                href="mailto:support@globalintegratedsupport.com" 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-all duration-300"
                whileHover={{ x: 5 }}
              >
                <Mail className="w-4 h-4 text-primary" /> support@globalintegratedsupport.com
              </motion.a>
              <motion.div 
                className="flex items-start gap-2 text-sm text-muted-foreground"
                whileHover={{ x: 5 }}
              >
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>123 Detail Lane<br />Auto City, AC 12345</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <span>© {new Date().getFullYear()} Global Integrated Support. All rights reserved.</span>
          <Link to="/privacy-policy" className="hover:text-primary transition-all duration-300 link-hover">Privacy Policy</Link>
        </motion.div>
      </div>
    </footer>
  );
}
