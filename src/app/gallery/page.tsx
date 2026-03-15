import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import GalleryGrid from "@/components/GalleryGrid"

export const metadata = {
  title: "Gallery | Kelly Soto Photography",
  description: "Browse the full portfolio of Kelly Soto Photography — portraits, families, and events.",
}

export default function GalleryPage() {
  return (
    <>
      <Nav />
      <main className="pt-24 pb-24 px-6 min-h-screen" style={{ backgroundColor: "#fafaf8" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-2">
            <a
              href="/"
              className="text-xs tracking-widest uppercase text-stone-400 hover:text-stone-600 transition-colors"
            >
              ← Back
            </a>
          </div>

          <GalleryGrid showTitle />
        </div>
      </main>
      <Footer />
    </>
  )
}
