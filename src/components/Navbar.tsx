import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/book", label: "Book Now" },
  { to: "/reviews", label: "Reviews" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-border border-glow-hover">
      <div className="container mx-auto flex items-center justify-between h-28 px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Link to="/" className="flex items-center hover:drop-shadow-lg transition-all duration-300">
            <img src={logo} alt="Global Integrated Support" className="h-24 w-auto" />
          </Link>
        </motion.div>

        {/* Desktop */}
        <motion.div 
          className="hidden lg:flex items-center gap-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          {NAV_LINKS.map((link, index) => (
            <motion.div
              key={link.to}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.05, ease: "easeOut" }}
            >
              <Link
                to={link.to}
                className={`text-sm font-medium tracking-wide uppercase transition-all duration-300 hover:text-primary link-hover ${
                  location.pathname === link.to ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="hidden lg:flex items-center gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <motion.a 
            href="tel:+15551234567" 
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-all duration-300 link-hover"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Phone className="w-4 h-4" />
            </motion.div>
            (555) 123-4567
          </motion.a>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/book">
              <Button className="bg-gradient-sky text-primary-foreground font-semibold px-6 btn-glow shine-hover">
                Book Now
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Mobile toggle */}
        <motion.button 
          onClick={() => setOpen(!open)} 
          className="lg:hidden text-foreground"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.div>
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0, y: -10 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden glass-dark border-b border-border"
          >
            <motion.div 
              className="flex flex-col gap-4 px-4 py-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {NAV_LINKS.map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + index * 0.05 }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={`text-sm font-medium tracking-wide uppercase transition-all duration-300 hover:text-primary link-hover ${
                      location.pathname === link.to ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Link to="/book" onClick={() => setOpen(false)}>
                  <Button className="w-full bg-gradient-sky text-primary-foreground font-semibold btn-glow shine-hover">
                    Book Now
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
