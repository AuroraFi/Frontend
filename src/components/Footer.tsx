import { motion } from "framer-motion";
import { Twitter, Github, ArrowUpRight, Mic } from "lucide-react";

type FooterLink = {
  name: string;
  href: string;
  external?: boolean;
};

const footerLinks: {
  platform: FooterLink[];
  developers: FooterLink[];
  resources: FooterLink[];
  legal: FooterLink[];
} = {
  platform: [
    { name: "Voice Demo", href: "/demo" },
    { name: "AI Features", href: "/features" },
    { name: "How it Works", href: "/how-it-works" },
    { name: "Security", href: "/security" },
    { name: "Pricing", href: "/pricing" },
  ],
  developers: [
    { name: "Documentation", href: "/docs" },
    { name: "Voice API", href: "/api" },
    { name: "AI Integration", href: "/ai-integration" },
    { name: "Github", href: "https://github.com/AuroraFi", external: true },
  ],
  resources: [
    { name: "Learn DeFi", href: "/learn" },
    { name: "Voice Commands", href: "/commands" },
    { name: "AI Tutorials", href: "/tutorials" },
    { name: "Support", href: "/support" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Use", href: "/terms" },
    { name: "Voice Data Policy", href: "/voice-policy" },
  ],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Footer() {
  return (
    <footer className="bg-[#fbfbe4] border-t border-[#151515]/10">
      <div className="container mx-auto px-6 pt-16 pb-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-12 gap-8 pb-12 border-b border-[#151515]/10"
        >
          <motion.div
            variants={itemVariants}
            className="col-span-2 md:col-span-4"
          >
            <a href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="p-2 bg-[#151515] rounded-full">
                <Mic className="w-6 h-6 text-[#fbfbe4]" />
              </div>
              <span className="text-xl font-bold">AuroraFi</span>
            </a>
            <p className="text-[#151515]/70 mb-6">
              Revolutionizing cryptocurrency interaction through voice commands
              and AI assistance. Making DeFi accessible to everyone.
            </p>
            <div className="flex gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-[#151515]/10 hover:bg-[#151515]/5 transition-colors"
              >
                <Twitter className="w-5 h-5 text-[#151515]" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-[#151515]/10 hover:bg-[#151515]/5 transition-colors"
              >
                <Github className="w-5 h-5 text-[#151515]" />
              </a>
            </div>
          </motion.div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <motion.div
              key={category}
              variants={itemVariants}
              className="col-span-1 md:col-span-2"
            >
              <h3 className="text-[#151515] font-medium mb-4 tracking-tight">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-[#151515]/70 hover:text-[#151515] transition-colors inline-flex items-center gap-1 group"
                    >
                      {link.name}
                      {link.external && (
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#151515]/70"
        >
          <p>© 2024 AuroraFi. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <button className="hover:text-[#151515] transition-colors">
              Voice Data Settings
            </button>
            <a
              href="/accessibility"
              className="hover:text-[#151515] transition-colors"
            >
              Accessibility
            </a>
            <a
              href="/sitemap"
              className="hover:text-[#151515] transition-colors"
            >
              Sitemap
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
