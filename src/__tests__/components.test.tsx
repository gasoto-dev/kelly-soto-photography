import { render, screen, fireEvent } from "@testing-library/react"
import Nav from "@/components/Nav"
import Hero from "@/components/Hero"
import Gallery from "@/components/Gallery"
import GalleryGrid from "@/components/GalleryGrid"
import About from "@/components/About"
import Services from "@/components/Services"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import GalleryPage from "@/app/gallery/page"

describe("Nav", () => {
  it("renders without crashing", () => {
    render(<Nav />)
  })
  it("shows Kelly Soto branding", () => {
    render(<Nav />)
    expect(screen.getByText("Kelly Soto")).toBeInTheDocument()
  })
  it("includes a Book a Session CTA", () => {
    render(<Nav />)
    expect(screen.getByText(/Book a Session/i)).toBeInTheDocument()
  })
  it("has navigation links", () => {
    render(<Nav />)
    expect(screen.getByText("Gallery")).toBeInTheDocument()
    expect(screen.getByText("About")).toBeInTheDocument()
    expect(screen.getByText("Contact")).toBeInTheDocument()
  })
  it("Gallery nav link points to /gallery", () => {
    render(<Nav />)
    const link = screen.getByText("Gallery").closest("a") as HTMLAnchorElement
    expect(link.href).toContain("/gallery")
  })
})

describe("Hero", () => {
  it("renders without crashing", () => {
    render(<Hero />)
  })
  it("displays the photographer name", () => {
    render(<Hero />)
    expect(screen.getByText("Kelly Soto")).toBeInTheDocument()
  })
  it("shows the tagline", () => {
    render(<Hero />)
    expect(screen.getByText(/Capturing light\. Telling stories\./i)).toBeInTheDocument()
  })
  it("renders a hero image with correct alt text", () => {
    render(<Hero />)
    expect(screen.getByAltText("Kelly Soto Photography hero")).toBeInTheDocument()
  })
})

describe("Gallery (homepage 3x3 preview)", () => {
  it("renders without crashing", () => {
    render(<Gallery />)
  })
  it("shows the section heading", () => {
    render(<Gallery />)
    expect(screen.getByText("The Work")).toBeInTheDocument()
  })
  it("renders 9 images by default (3x3 preview, All tab)", () => {
    render(<Gallery />)
    const images = screen.getAllByRole("img")
    expect(images.length).toBe(9)
  })
  it("uses picsum.photos for placeholder images", () => {
    render(<Gallery />)
    const images = screen.getAllByRole("img") as HTMLImageElement[]
    expect(images[0].src).toContain("picsum.photos")
  })
  it("renders category tabs", () => {
    render(<Gallery />)
    expect(screen.getByRole("tab", { name: /All/i })).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: /Portraits/i })).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: /Families/i })).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: /Events/i })).toBeInTheDocument()
  })
  it("All tab is selected by default", () => {
    render(<Gallery />)
    expect(screen.getByRole("tab", { name: /All/i })).toHaveAttribute("aria-selected", "true")
  })
  it("filters to portraits when Portraits tab is clicked", () => {
    render(<Gallery />)
    fireEvent.click(screen.getByRole("tab", { name: /Portraits/i }))
    expect(screen.getByRole("tab", { name: /Portraits/i })).toHaveAttribute("aria-selected", "true")
    const images = screen.getAllByRole("img")
    expect(images.length).toBe(7)
  })
  it("filters to families when Families tab is clicked", () => {
    render(<Gallery />)
    fireEvent.click(screen.getByRole("tab", { name: /Families/i }))
    const images = screen.getAllByRole("img")
    expect(images.length).toBe(3)
  })
  it("filters to events when Events tab is clicked", () => {
    render(<Gallery />)
    fireEvent.click(screen.getByRole("tab", { name: /Events/i }))
    const images = screen.getAllByRole("img")
    expect(images.length).toBe(2)
  })
  it("renders lightbox trigger buttons with aria-labels", () => {
    render(<Gallery />)
    const buttons = screen.getAllByRole("button", { name: /Open .* in lightbox/i })
    expect(buttons.length).toBe(9)
  })
  it("has a View Full Gallery link to /gallery", () => {
    render(<Gallery />)
    const link = screen.getByText(/View Full Gallery/i).closest("a") as HTMLAnchorElement
    expect(link.href).toContain("/gallery")
  })
})

describe("GalleryGrid (full collection)", () => {
  it("renders all 12 images when no limit is set", () => {
    render(<GalleryGrid />)
    const images = screen.getAllByRole("img")
    expect(images.length).toBe(12)
  })
  it("respects limit prop", () => {
    render(<GalleryGrid limit={6} />)
    const images = screen.getAllByRole("img")
    expect(images.length).toBe(6)
  })
  it("shows title when showTitle is true", () => {
    render(<GalleryGrid showTitle />)
    expect(screen.getByText("The Work")).toBeInTheDocument()
  })
  it("renders 12 lightbox trigger buttons for full collection", () => {
    render(<GalleryGrid />)
    const buttons = screen.getAllByRole("button", { name: /Open .* in lightbox/i })
    expect(buttons.length).toBe(12)
  })
})

describe("/gallery page (smoke)", () => {
  it("renders without crashing", () => {
    render(<GalleryPage />)
  })
  it("shows the gallery heading", () => {
    render(<GalleryPage />)
    expect(screen.getByText("The Work")).toBeInTheDocument()
  })
  it("shows all 12 images", () => {
    render(<GalleryPage />)
    const images = screen.getAllByRole("img")
    // Nav logo + 12 gallery images (hero image not on this page)
    const galleryImages = (images as HTMLImageElement[]).filter((img) =>
      img.src.includes("picsum.photos")
    )
    expect(galleryImages.length).toBe(12)
  })
  it("has a back link to homepage", () => {
    render(<GalleryPage />)
    expect(screen.getByText(/← Back/i)).toBeInTheDocument()
  })
  it("shows category tabs", () => {
    render(<GalleryPage />)
    expect(screen.getByRole("tab", { name: /All/i })).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: /Portraits/i })).toBeInTheDocument()
  })
})

describe("About", () => {
  it("renders without crashing", () => {
    render(<About />)
  })
  it("shows the greeting", () => {
    render(<About />)
    expect(screen.getByText(/Hello, I'm Kelly/i)).toBeInTheDocument()
  })
  it("renders the headshot placeholder", () => {
    render(<About />)
    expect(screen.getByAltText("Kelly Soto")).toBeInTheDocument()
  })
  it("contains bio text about natural light", () => {
    render(<About />)
    expect(screen.getByText(/natural light/i)).toBeInTheDocument()
  })
})

describe("Services", () => {
  it("renders without crashing", () => {
    render(<Services />)
  })
  it("shows all three service types", () => {
    render(<Services />)
    expect(screen.getByText("Portraits")).toBeInTheDocument()
    expect(screen.getByText("Family Sessions")).toBeInTheDocument()
    expect(screen.getByText("Events")).toBeInTheDocument()
  })
  it("shows the section heading", () => {
    render(<Services />)
    expect(screen.getByText("Sessions")).toBeInTheDocument()
  })
})

describe("Contact", () => {
  it("renders without crashing", () => {
    render(<Contact />)
  })
  it("shows the heading", () => {
    render(<Contact />)
    expect(screen.getByText(/Let's Make Something Beautiful/i)).toBeInTheDocument()
  })
  it("renders name, email, and message fields", () => {
    render(<Contact />)
    expect(screen.getByPlaceholderText("Your name")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("your@email.com")).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Tell me about your session/i)).toBeInTheDocument()
  })
  it("has a submit button", () => {
    render(<Contact />)
    expect(screen.getByRole("button", { name: /Send Message/i })).toBeInTheDocument()
  })
})

describe("Footer", () => {
  it("renders without crashing", () => {
    render(<Footer />)
  })
  it("shows Kelly Soto Photography branding", () => {
    render(<Footer />)
    expect(screen.getByText("Kelly Soto Photography")).toBeInTheDocument()
  })
  it("shows copyright", () => {
    render(<Footer />)
    expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument()
  })
})
