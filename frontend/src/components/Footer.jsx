import { Facebook, Twitter, Linkedin, Instagram, Youtube, MapPin, Mail, Phone } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 font-light">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <img
              src="/images/logo.png"
              alt="KLE Tech"
              className="h-12 w-auto mb-6 brightness-0 invert opacity-80"
            />
            <p className="mb-6 leading-relaxed">
              Empowering the next generation of engineers through innovation, research, and holistic education.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Linkedin, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 tracking-wide">Quick Links</h4>
            <ul className="space-y-4">
              {['About CEER', 'Our Team', 'Research Scope', 'Publications', 'Contact Us'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-red-500 transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 tracking-wide">Resources</h4>
            <ul className="space-y-4">
              {['Student Portal', 'Faculty Login', 'Library', 'Academic Calendar', 'Download Brochure'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-red-500 transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 tracking-wide">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                <span className="leading-relaxed">
                  KLE Technological University,<br />
                  Vidya Nagar, Hubballi,<br />
                  Karnataka 580031
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-red-500 shrink-0" />
                <a href="mailto:info@kletech.ac.in" className="hover:text-white transition-colors">info@kletech.ac.in</a>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-red-500 shrink-0" />
                <a href="tel:+918362378000" className="hover:text-white transition-colors">+91 836 2378000</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm">© 2026 KLE Technological University. All rights reserved.</p>
          <div className="flex gap-8 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
