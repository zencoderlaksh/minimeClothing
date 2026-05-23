import React from 'react'

const Extra = () => {
  return (
    <div>
        <div className="relative mx-auto flex min-h-[90vh] max-w-7xl items-center px-6 py-20 lg:px-12">
            {/* SOFT BACKGROUND GLOW */}

            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute left-[-10%] top-[10%] h-[420px] w-[420px] rounded-full bg-[#f3e4c8]/40 blur-3xl" />
              <div className="absolute bottom-[-10%] right-[-5%] h-[380px] w-[380px] rounded-full bg-[#d4af37]/10 blur-3xl" />
            </div>

            {/* CONTENT WRAPPER */}

            <div className="relative z-10 grid w-full grid-cols-1 items-center gap-20 lg:grid-cols-[1.1fr_0.9fr]">
              {/* LEFT CONTENT */}

              <div className="max-w-2xl">
                {/* TOP LABEL */}

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="mb-10 flex items-center gap-4"
                >
                  <div className="h-px w-20 bg-[#d4af37]" />

                  <span className="text-[11px] uppercase tracking-[0.45em] text-ink/50">
                    Modern Essentials
                  </span>
                </motion.div>

                {/* HERO TITLE */}

                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="font-serif-display text-[clamp(4rem,7vw,7rem)] leading-[0.92] tracking-[-0.05em] text-ink"
                >
                  {tagline.split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: i * 0.12,
                        duration: 0.9,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="mr-4 inline-block"
                    >
                      {word === "Confidence." ? (
                        <em className="gold-gradient-text not-italic">
                          {word}
                        </em>
                      ) : (
                        word
                      )}
                    </motion.span>
                  ))}
                </motion.h1>


                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.5,
                    duration: 0.9,
                  }}
                  className="mt-10 max-w-lg text-[15px] leading-[2] tracking-[0.01em] text-ink/60"
                >
                  A quiet wardrobe of elevated essentials crafted from the
                  finest fabrics — designed for timeless silhouettes and
                  effortless living.
                  <span className="mt-4 block text-ink/40">{kicker}</span>
                </motion.p>


                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.8,
                    duration: 0.8,
                  }}
                  className="mt-12 flex items-center gap-8"
                >
                  <button className="rounded-full bg-ink px-8 py-4 text-[11px] uppercase tracking-[0.35em] text-white transition hover:scale-[1.03]">
                    Explore Collection
                  </button>

                  <button className="group flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-ink/55 transition hover:text-ink">
                    View Lookbook
                    <span className="h-px w-10 bg-ink/30 transition-all duration-300 group-hover:w-16" />
                  </button>
                </motion.div>
              </div>


              <div className="relative hidden h-[650px] lg:block">

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 1,
                    delay: 0.3,
                  }}
                  className="absolute right-0 top-0 w-[420px] rounded-[36px] border border-white/30 bg-white/40 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur-2xl"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.35em] text-ink/45">
                      Showroom
                    </span>

                    <div className="h-2 w-2 rounded-full bg-emerald-400" />
                  </div>

                  <div className="mt-24">
                    <h3 className="font-serif-display text-4xl leading-tight text-ink">
                      Soft
                      <br />
                      Tailoring
                    </h3>

                    <p className="mt-5 text-sm leading-relaxed text-ink/55">
                      Crafted with linen, silk, and brushed cashmere for a
                      refined everyday silhouette.
                    </p>
                  </div>
                </motion.div>


                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 1,
                    delay: 0.6,
                  }}
                  className="absolute bottom-12 left-0 w-[260px] rounded-[28px] border border-black/5 bg-[#f9f5ef]/80 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.05)] backdrop-blur-xl"
                >
                  <span className="text-[10px] uppercase tracking-[0.35em] text-ink/45">
                    Edition 01
                  </span>

                  <p className="mt-6 text-lg leading-relaxed text-ink/75">
                    The Essentials Capsule
                  </p>

                  <div className="mt-8 h-[2px] w-full overflow-hidden rounded-full bg-black/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "72%" }}
                      transition={{
                        delay: 1.1,
                        duration: 1.8,
                      }}
                      className="h-full rounded-full bg-[#d4af37]"
                    />
                  </div>
                </motion.div>

                {/* VERTICAL ACCENT */}

                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{
                    delay: 1,
                    duration: 1,
                  }}
                  className="absolute left-[48%] top-20 h-[420px] w-px origin-top bg-gradient-to-b from-[#d4af37] to-transparent"
                />
              </div>
            </div>
          </div>
    </div>
  )
}

export default Extra
