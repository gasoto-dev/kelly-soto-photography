export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-stone-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span
          className="text-xl tracking-widest text-stone-700"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Kelly Soto
        </span>
        <ul className="hidden md:flex items-center gap-8 text-sm text-stone-500 tracking-wide">
          {[
            { label: "Gallery",  href: "/gallery"   },
            { label: "About",    href: "#about"     },
            { label: "Services", href: "#services"  },
            { label: "Contact",  href: "#contact"   },
          ].map((item) => (
            <li key={item.label}>
              <a href={item.href} className="hover:text-stone-800 transition-colors">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="text-xs tracking-widest uppercase text-rose-400 hover:text-rose-500 border border-rose-200 hover:border-rose-300 px-4 py-2 transition-colors"
        >
          Book a Session
        </a>
      </div>
    </nav>
  )
}
