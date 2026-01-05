import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const images = [
    '/images/rh.jpg',
    '/images/college.png',
    '/images/sir.jpg',
    '/images/stu.jpg'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 25000) // 25 seconds delay

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <section className="relative min-h-screen bg-slate-950 overflow-hidden flex items-center pt-20 pb-32">
      {/* Animated Background with Ken Burns Effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <motion.div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${images[currentImageIndex]}')` }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 25, ease: "linear" }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-900/70 to-slate-950/80" />

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Content - Centered and Properly Spaced */}
      <div className="relative w-full py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            {/* Establishment Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 bg-red-950/30 backdrop-blur-sm">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                <span className="text-red-400 font-semibold tracking-wider uppercase text-xs">
                  Establishment of
                </span>
              </div>
            </motion.div>

            {/* Main Title - Medium Size */}
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-serif font-black text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              CEER
            </motion.h1>

            <motion.h2
              className="text-2xl md:text-4xl lg:text-5xl font-serif font-light text-slate-300 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Centre for Engineering<br />
              Education Research
            </motion.h2>

            {/* Description - Medium Size */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-base md:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10"
            >
              Access your portal, resources & community. Your gateway to academic excellence and student life at KLE Tech.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex justify-center"
            >
              <a
                href="/login"
                className="px-10 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-red-500/30 hover:scale-105"
              >
                Access Portal
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-xs uppercase tracking-wider font-medium">Scroll</span>
        <motion.div
          className="w-5 h-8 border-2 border-slate-600 rounded-full p-1"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-1.5 bg-red-500 rounded-full mx-auto"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>

      {/* Image Indicators */}
      <div className="absolute bottom-20 right-8 flex gap-1.5">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`h-1 rounded-full transition-all duration-500 ${index === currentImageIndex
                ? 'w-8 bg-red-500'
                : 'w-6 bg-slate-600 hover:bg-slate-500'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default Hero
