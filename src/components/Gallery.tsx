"use client"

import GalleryGrid from "./GalleryGrid"

export type GalleryCategory = "all" | "portraits" | "families" | "events"

export interface GalleryImage {
  seed: string
  w: number
  h: number
  alt: string
  category: Exclude<GalleryCategory, "all">
}

export const GALLERY_IMAGES: GalleryImage[] = [
  { seed: "ks-g1",  w: 800, h: 600, alt: "Portrait session",       category: "portraits" },
  { seed: "ks-g2",  w: 800, h: 600, alt: "Family moment",          category: "families"  },
  { seed: "ks-g3",  w: 800, h: 600, alt: "Outdoor portrait",       category: "portraits" },
  { seed: "ks-g4",  w: 800, h: 600, alt: "Natural light portrait",  category: "portraits" },
  { seed: "ks-g5",  w: 800, h: 600, alt: "Event photography",      category: "events"    },
  { seed: "ks-g6",  w: 800, h: 600, alt: "Lifestyle session",      category: "portraits" },
  { seed: "ks-g7",  w: 800, h: 600, alt: "Family portrait",        category: "families"  },
  { seed: "ks-g8",  w: 800, h: 600, alt: "Golden hour portrait",   category: "portraits" },
  { seed: "ks-g9",  w: 800, h: 600, alt: "Candid moment",          category: "events"    },
  { seed: "ks-g10", w: 800, h: 600, alt: "Studio portrait",        category: "portraits" },
  { seed: "ks-g11", w: 800, h: 600, alt: "Outdoor family",         category: "families"  },
  { seed: "ks-g12", w: 800, h: 600, alt: "Portrait close-up",      category: "portraits" },
]

export const CATEGORIES: { value: GalleryCategory; label: string }[] = [
  { value: "all",       label: "All"       },
  { value: "portraits", label: "Portraits" },
  { value: "families",  label: "Families"  },
  { value: "events",    label: "Events"    },
]

/** Homepage gallery — shows first 9 photos (3×3 preview grid) */
export default function Gallery() {
  return (
    <section id="gallery" className="py-24 px-6" style={{ backgroundColor: "#fafaf8" }}>
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-xs tracking-[0.3em] uppercase text-stone-400 mb-2">
          Portfolio
        </p>
        <h2
          className="text-center text-3xl md:text-4xl text-stone-700 mb-8"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          The Work
        </h2>

        <GalleryGrid limit={9} />

        <div className="text-center mt-10">
          <a
            href="/gallery"
            className="inline-block text-xs tracking-widest uppercase text-rose-400 hover:text-rose-500 border border-rose-200 hover:border-rose-300 px-6 py-3 transition-colors"
          >
            View Full Gallery
          </a>
        </div>
      </div>
    </section>
  )
}
