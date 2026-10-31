import Contact from "./Contact.astro";
import Faq from "./Faq.astro";
import Features from "./Features.astro";
import Gallery from "./Gallery.astro";
import Hero from "./Hero.astro";
import Pricing from "./Pricing.astro";
import Services from "./Services.astro";
import Statement from "./Statement.astro";
import Story from "./Story.astro";
import Testimonials from "./Testimonials.astro";

export const sectionComponents = {
  hero: Hero,
  statement: Statement,
  story: Story,
  services: Services,
  features: Features,
  gallery: Gallery,
  pricing: Pricing,
  testimonials: Testimonials,
  faq: Faq,
  contact: Contact,
} as const;
