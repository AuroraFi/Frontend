import { motion } from "framer-motion";
import { Mic, Bot, Shield } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="bg-[#fbfbe4] min-h-screen w-full flex flex-col">
      {/* Hero Section */}
      <section className="container px-20 pt-40 pb-32">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            className="lg:w-1/2 space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4">
              <motion.h1
                className="text-5xl lg:text-7xl font-bold text-[#151515]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Voice-Powered Crypto
                <span className="block">Made Simple</span>
              </motion.h1>
              <motion.p
                className="text-lg text-gray-600 max-w-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Experience DeFi like never before with our revolutionary
                voice-powered platform. Execute trades, manage assets, and learn
                about crypto through natural conversations.
              </motion.p>
            </div>

            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <a
                href="#demo"
                className="px-8 py-4 bg-[#151515] text-[#fbfbe4] rounded-full hover:bg-gray-800 transition-colors"
              >
                Try Voice Demo
              </a>
              <a
                href="https://github.com/yourusername/project"
                className="p-4 border-2 border-[#151515] rounded-full hover:bg-white/50 transition-colors"
              >
                <Bot className="w-6 h-6" />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#fbfbe4] to-transparent z-10" />
              <img
                src="/vector_1.png"
                alt="Voice Interface"
                className="w-full rounded-2xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-32">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Powered by Advanced AI</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform combines voice technology with artificial
              intelligence to make cryptocurrency accessible to everyone.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Mic,
                title: "Voice Commands",
                description:
                  "Execute trades and manage your portfolio using natural voice commands",
              },
              {
                icon: Bot,
                title: "AI Agents",
                description:
                  "Specialized AI assistants handle transactions, education, and analytics",
              },
              {
                icon: Shield,
                title: "Secure & Private",
                description:
                  "End-to-end encrypted voice commands with multi-factor authentication",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="p-8 rounded-2xl border-2 border-[#151515] hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <feature.icon className="w-12 h-12 mb-6" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Our Vision & Roadmap</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Building the future of voice-powered cryptocurrency interactions
            </p>
          </motion.div>

          <div className="space-y-12">
            {[
              {
                phase: "Phase 1",
                title: "Voice Integration",
                description:
                  "Launch of core voice commands and AI agent integration",
                status: "current",
              },
              {
                phase: "Phase 2",
                title: "Advanced Features",
                description: "Multi-chain support and educational AI modules",
                status: "upcoming",
              },
              {
                phase: "Phase 3",
                title: "Ecosystem Growth",
                description: "Community features and developer APIs",
                status: "upcoming",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div
                  className={`
                  w-32 py-2 px-4 rounded-full text-center
                  ${
                    item.status === "current"
                      ? "bg-[#151515] text-[#fbfbe4]"
                      : "border-2 border-[#151515]"
                  }
                `}
                >
                  {item.phase}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-[#151515] text-[#fbfbe4]">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            className="max-w-2xl mx-auto space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold">Ready to Get Started?</h2>
            <p className="text-lg opacity-80">
              Join us in revolutionizing how people interact with cryptocurrency
              through voice commands and AI assistance.
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="#demo"
                className="px-8 py-4 bg-[#fbfbe4] text-[#151515] rounded-full hover:bg-white transition-colors"
              >
                Try Demo
              </a>
              <a
                href="/docs"
                className="px-8 py-4 border-2 border-[#fbfbe4] rounded-full hover:bg-[#151515]/50 transition-colors"
              >
                Read Docs
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
