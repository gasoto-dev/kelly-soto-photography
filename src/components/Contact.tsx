"use client"

import { useState } from "react"

type FormStatus = "idle" | "submitting" | "success" | "error"

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "YOUR_FORM_ID"

export default function Contact() {
  const [name, setName]       = useState("")
  const [email, setEmail]     = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus]   = useState<FormStatus>("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("submitting")
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, message }),
      })
      if (res.ok) {
        setStatus("success")
        setName("")
        setEmail("")
        setMessage("")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="py-24 px-6 bg-white">
      <div className="max-w-xl mx-auto">
        <p className="text-center text-xs tracking-[0.3em] uppercase text-stone-400 mb-2">
          Get in Touch
        </p>
        <h2
          className="text-center text-3xl md:text-4xl text-stone-700 mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Let&apos;s Make Something Beautiful
        </h2>
        <p className="text-center text-stone-500 font-light leading-relaxed mb-10">
          I&apos;d love to hear about your vision. Whether you know exactly what you want
          or you&apos;re just starting to dream it up, reach out and let&apos;s talk.
        </p>

        {status === "success" ? (
          <div className="text-center py-12">
            <p
              className="text-2xl text-stone-700 mb-3"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Message sent!
            </p>
            <p className="text-stone-500 text-sm">
              Thank you — I&apos;ll be in touch soon.
            </p>
          </div>
        ) : (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs tracking-widest uppercase text-stone-400 mb-1.5">
                Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-stone-200 rounded-sm px-4 py-3 text-stone-700 placeholder-stone-300 focus:outline-none focus:border-rose-200 bg-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-stone-400 mb-1.5">
                Email
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-stone-200 rounded-sm px-4 py-3 text-stone-700 placeholder-stone-300 focus:outline-none focus:border-rose-200 bg-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-stone-400 mb-1.5">
                Message
              </label>
              <textarea
                rows={5}
                placeholder="Tell me about your session..."
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border border-stone-200 rounded-sm px-4 py-3 text-stone-700 placeholder-stone-300 focus:outline-none focus:border-rose-200 bg-white text-sm resize-none"
              />
            </div>

            {status === "error" && (
              <p className="text-xs text-rose-500 text-center">
                Something went wrong — please try again or email directly.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full py-3 text-xs tracking-widest uppercase text-white bg-rose-300 hover:bg-rose-400 disabled:opacity-60 transition-colors rounded-sm"
            >
              {status === "submitting" ? "Sending…" : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
