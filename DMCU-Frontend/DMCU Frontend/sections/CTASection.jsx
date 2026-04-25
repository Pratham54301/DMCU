"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Container from "@/components/Container";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle email submission here
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3004);
  };

  return (
    <section className="relative py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glass-card p-12 max-w-2xl mx-auto">
            <motion.h2
              className="font-display text-4xl uppercase tracking-[0.16em] text-text mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Join the Dharma
            </motion.h2>

            <motion.p
              className="text-lg text-muted mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Be the first to know when new chapters unfold. Enter the universe and stay connected with the latest from DMCU.
            </motion.p>

            {!isSubmitted ? (
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your cosmic address"
                    className="w-full px-6 py-4 bg-surface/50 border border-primary/30 rounded-full text-text placeholder-muted focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  className="gold-button w-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Awaken Your Journey
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="text-4xl mb-4">✨</div>
                <p className="text-primary font-semibold text-lg">
                  Welcome to the Universe
                </p>
                <p className="text-muted mt-2">
                  Your journey begins now.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}