import type { Direction, SiteConfig, UiStrings } from "../config/types";

/**
 * Locale-aware defaults for interface copy and formatted values.
 *
 * The starter is Persian-first: `fa` is the reference dictionary and the
 * default demo. English remains a first-class fallback so an LTR client demo
 * needs no translation layer. Other locales fall back to English copy while
 * still receiving the correct text direction.
 */

const fa: UiStrings = {
  skipToContent: "رفتن به محتوای اصلی",
  primaryNavigation: "ناوبری اصلی",
  openMenu: "باز کردن منو",
  closeMenu: "بستن منو",
  siteMenu: "منوی سایت",
  mobileNavigation: "ناوبری موبایل",
  footerNavigation: "ناوبری پاورقی",
  explore: "بخش‌ها",
  elsewhere: "لینک‌های دیگر",
  findUs: "نشانی",
  backToTop: "بازگشت به بالا",
  contact: "تماس",
  staticNoTracking: "سایت ایستا، بدون ردیابی.",
  imageUnavailable: "تصویر در دسترس نیست",
  contactDetails: {
    email: "ایمیل",
    address: "نشانی",
    hours: "ساعت پاسخگویی",
    phone: "تلفن",
  },
  form: {
    name: "نام",
    email: "ایمیل",
    arrival: "تاریخ ورود",
    departure: "تاریخ خروج",
    guests: "مهمان‌ها",
    projectType: "نوع پروژه",
    message: "پیام",
    messagePlaceholder: "چند خط دربارهٔ سفر، تاریخ‌ها یا پروژه بنویسید.",
    submitHint: "بدون حساب کاربری، بدون پرداخت، بدون ذخیرهٔ داده.",
    successFallback: "این فرم نمایشی است و اطلاعاتی ارسال نمی‌شود.",
    guestOptions: [
      { value: "1", label: "یک مهمان" },
      { value: "2", label: "دو مهمان" },
      { value: "3", label: "سه مهمان" },
      { value: "4", label: "چهار مهمان" },
    ],
    projectTypeFallback: "عمومی",
  },
  gallery: {
    open: "باز کردن عکس:",
    viewer: "نمایشگر عکس",
    close: "بستن نمایشگر عکس",
    previous: "عکس قبلی",
    next: "عکس بعدی",
  },
  notFound: {
    eyebrow: "صفحه پیدا نشد",
    title: "این صفحه پیدا نشد.",
    body: "نشانی صفحه تغییر کرده یا هرگز اینجا نبوده است. به خانه برگردید و مسیر را از نو پیدا کنید.",
    back: "بازگشت به {brand}",
  },
};

const en: UiStrings = {
  skipToContent: "Skip to content",
  primaryNavigation: "Primary",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  siteMenu: "Site menu",
  mobileNavigation: "Mobile",
  footerNavigation: "Footer",
  explore: "Explore",
  elsewhere: "Elsewhere",
  findUs: "Find us",
  backToTop: "Back to top",
  contact: "Contact",
  staticNoTracking: "Static site, no tracking.",
  imageUnavailable: "Image unavailable",
  contactDetails: {
    email: "Email",
    address: "Where to find us",
    hours: "When we answer",
    phone: "Telephone",
  },
  form: {
    name: "Name",
    email: "Email",
    arrival: "Arrival",
    departure: "Departure",
    guests: "Guests",
    projectType: "Project type",
    message: "Message",
    messagePlaceholder: "A few lines about the trip, the dates, or the project.",
    submitHint: "No account, no payment, no data stored.",
    successFallback: "This demo form does not send data.",
    guestOptions: [
      { value: "1", label: "One guest" },
      { value: "2", label: "Two guests" },
      { value: "3", label: "Three guests" },
      { value: "4", label: "Four guests" },
    ],
    projectTypeFallback: "General",
  },
  gallery: {
    open: "Open photograph:",
    viewer: "Photograph viewer",
    close: "Close photograph viewer",
    previous: "Previous photograph",
    next: "Next photograph",
  },
  notFound: {
    eyebrow: "Page not found",
    title: "Lost at sea.",
    body: "The address may have changed, or the page was never here. The house is still where you left it.",
    back: "Back to {brand}",
  },
};

const dictionaries: Record<"fa" | "en", UiStrings> = { fa, en };

const rtlLanguages = new Set([
  "ar",
  "ckb",
  "dv",
  "fa",
  "he",
  "ku",
  "ps",
  "ur",
  "yi",
]);

/** The interface dictionary for a locale, with English as the safe fallback. */
export function languageOf(locale: string): "fa" | "en" {
  return locale.toLowerCase().startsWith("fa") ? "fa" : "en";
}

/** Infer direction from a BCP 47 locale when a config does not set it. */
export function directionFor(locale: string): Direction {
  const language = locale.toLowerCase().split(/[-_]/)[0];
  return rtlLanguages.has(language) ? "rtl" : "ltr";
}

/** The direction actually used by the page. */
export function resolveDirection(site: Pick<SiteConfig, "meta">): Direction {
  return site.meta.direction ?? directionFor(site.meta.locale);
}

/** Merge the locale dictionary with any per-client interface overrides. */
export function resolveUi(site: Pick<SiteConfig, "meta" | "ui">): UiStrings {
  const base = dictionaries[languageOf(site.meta.locale)];
  const overrides = site.ui;

  if (!overrides) return base;

  const { contactDetails, form, gallery, notFound, ...flat } = overrides;
  const merged = { ...base, ...flat } as UiStrings;

  return {
    ...merged,
    contactDetails: { ...base.contactDetails, ...contactDetails },
    form: { ...base.form, ...form },
    gallery: { ...base.gallery, ...gallery },
    notFound: { ...base.notFound, ...notFound },
  };
}

/** Locale-aware number formatting; Persian gets Persian digits. */
export function formatNumber(
  value: number,
  locale: string,
  options: Intl.NumberFormatOptions = {},
): string {
  return new Intl.NumberFormat(locale, options).format(value);
}

/** Zero-padded menu, list, and gallery indices. */
export function formatIndex(value: number, locale: string): string {
  return formatNumber(value, locale, {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
}

/** Copyright year in the locale's calendar (Persian calendar for fa-IR). */
export function formatYear(locale: string, date = new Date()): string {
  return new Intl.DateTimeFormat(locale, { year: "numeric" }).format(date);
}

/** Open Graph uses underscores, not hyphens, in its locale values. */
export function ogLocale(locale: string): string {
  return locale.replace("-", "_");
}
