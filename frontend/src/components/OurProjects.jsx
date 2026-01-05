import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

function OurProjects() {
  const newsItems = [
    {
      title: 'Smart Campus IoT System',
      date: 'November 2025',
      category: 'IoT',
      snippet: 'Developed an integrated IoT solution for campus automation including smart lighting, attendance tracking, and energy management.',
      color: 'from-blue-500 to-cyan-400'
    },
    {
      title: 'AI-Powered Student Assistant',
      date: 'October 2025',
      category: 'AI/ML',
      snippet: 'Created an intelligent chatbot using NLP to help students with course information, timetables, and academic queries.',
      color: 'from-purple-500 to-pink-400'
    },
    {
      title: 'Library Management System',
      date: 'September 2025',
      category: 'Web Development',
      snippet: 'Full-stack application with React and Node.js for efficient book cataloging, issuing, and digital resource management.',
      color: 'from-orange-500 to-red-400'
    },
    {
      title: 'Campus Navigation App',
      date: 'August 2025',
      category: 'Mobile Dev',
      snippet: 'Cross-platform mobile application using React Native with AR features for indoor campus navigation and facility locator.',
      color: 'from-green-500 to-emerald-400'
    }
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
  }

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4"
          >
            Our Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600"
          >
            Innovative solutions build by our students
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {newsItems.map((project, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -10 }}
              className="group relative bg-white rounded-2xl p-8 border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${project.color}`} />

              <div className="flex justify-between items-start mb-6">
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-600 group-hover:bg-slate-900 group-hover:text-white transition-colors`}>
                  {project.category}
                </span>
                <span className="text-sm font-medium text-slate-400">{project.date}</span>
              </div>

              <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                {project.title}
              </h3>

              <p className="text-slate-600 leading-relaxed mb-6">
                {project.snippet}
              </p>

              <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                View Project <ArrowUpRight className="w-4 h-4" />
              </div>

              {/* Decorative background blob */}
              <div className={`absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 rounded-full blur-3xl transition-opacity duration-500`} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default OurProjects
