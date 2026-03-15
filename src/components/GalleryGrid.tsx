"use client"

import { useState } from "react"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import { GALLERY_IMAGES, CATEGORIES, GalleryCategory } from "./Gallery"

interface GalleryGridProps {
  /** Limit the number of images shown (undefined = show all) */
  limit?: number
  showTitle?: boolean
}

export default function GalleryGrid({ limit, showTitle = false }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all")
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  const filtered = GALLERY_IMAGES.filter(
    (img) => activeCategory === "all" || img.category === activeCategory
  )
  const visible = limit !== undefined ? filtered.slice(0, limit) : filtered

  const lightboxSlides = visible.map((img) => ({
    src: `https://picsum.photos/seed/${img.seed}/${img.w}/${img.h}`,
    alt: img.alt,
    width: img.w,
    height: img.h,
  }))

  return (
    <div>
      {showTitle && (
        <div className="mb-8 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-2">Portfolio</p>
          <h1
            className="text-3xl md:text-4xl text-stone-700"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            The Work
          </h1>
        </div>
      )}

      {/* Category tabs */}
      <div role="tablist" className="flex justify-center gap-1 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            role="tab"
            aria-selected={activeCategory === cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`px-5 py-2 text-xs tracking-widest uppercase transition-colors rounded-sm ${
              activeCategory === cat.value
                ? "bg-stone-800 text-white"
                : "text-stone-500 hover:text-stone-800 border border-stone-200 hover:border-stone-400"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map((img, idx) => (
          <button
            key={img.seed}
            onClick={() => setLightboxIndex(idx)}
            className="group relative overflow-hidden rounded-sm w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-300"
            style={{ aspectRatio: "4/3" }}
            aria-label={`Open ${img.alt} in lightbox`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://picsum.photos/seed/${img.seed}/${img.w}/${img.h}`}
              alt={img.alt}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
          </button>
        ))}
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={lightboxSlides}
      />
    </div>
  )
}
