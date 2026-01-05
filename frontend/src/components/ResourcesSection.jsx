import { motion } from 'framer-motion'
import { FileText, Users, Headphones, Star, ArrowRight } from 'lucide-react'

function ResourcesSection() {
  const resources = [
    {
      title: 'Downloads',
      icon: <FileText className="w-8 h-8" />,
      description: 'Academic forms, syllabi, and study materials',
      links: ['Syllabus', 'Previous Papers', 'Notes'],
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Student Forms',
      icon: <Users className="w-8 h-8" />,
      description: 'Essential administrative forms',
      links: ['Leave Application', 'ID Card Request', 'Bonafide Certificate'],
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'Support Services',
      icon: <Headphones className="w-8 h-8" />,
      description: 'Student counseling and technical support',
      links: ['IT Helpdesk', 'Counseling', 'Career Guidance'],
      color: 'bg-indigo-50 text-indigo-600'
    },
    {
      title: 'Student Clubs',
      icon: <Star className="w-8 h-8" />,
      description: 'Join various student organizations',
      links: ['Tech Club', 'Cultural Club', 'Sports Club'],
      color: 'bg-orange-50 text-orange-600'
    }
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
  }

  return (
    <section className="py-24 bg-slate-50" id="resources">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4"
          >
            Student Resources
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600"
          >
            Everything you need for a successful academic journey
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {resources.map((resource, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 group"
            >
              <div className={`w-16 h-16 rounded-2xl ${resource.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {resource.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{resource.title}</h3>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed">{resource.description}</p>
              <ul className="space-y-3">
                {resource.links.map((link, idx) => (
                  <li key={idx}>
                    <a href="#" className="text-slate-500 hover:text-red-500 text-sm font-medium flex items-center gap-2 transition-colors group/link">
                      <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-1" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ResourcesSection
