"use client";

// Bilingual (EN / FR) support for the whole site.
// A single dictionary holds every user-facing string in both languages.
// Components read strings via the `useI18n()` hook; the choice persists in
// localStorage and updates <html lang> for accessibility/SEO.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type Lang = "en" | "fr";

// -- Structured content: arrays for services / fleet / etc. so a whole
//    section can be translated in one place. --
type ServiceItem = { title: string; description: string; icon: string };
type FleetItem = { name: string; specs: string; description: string; icon: string };
type FeatureItem = { title: string; description: string };
type StatItem = { value: string; label: string };

export type Dict = {
  nav: {
    services: string;
    fleet: string;
    coverage: string;
    about: string;
    contact: string;
    getQuote: string;
  };
  hero: {
    badge: string;
    location: string;
    titleLine1: string;
    titleWith: string;
    titleThe: string;
    titlePack: string;
    lead: string;
    getQuote: string;
    explore: string;
    scroll: string;
  };
  strip: string[];
  services: {
    eyebrow: string;
    title1: string;
    titleAccent: string;
    lead: string;
    items: ServiceItem[];
  };
  fleet: {
    eyebrow: string;
    title1: string;
    titleAccent: string;
    lead: string;
    items: FleetItem[];
  };
  coverage: {
    eyebrow: string;
    title1: string;
    titleAccent: string;
    lead: string;
    regions: string[];
  };
  about: {
    eyebrow: string;
    title1: string;
    titleAccent: string;
    lead: string;
    features: FeatureItem[];
    credVerified: string;
    trustLead: string;
    trustPoints: string[];
  };
  cta: {
    title: string;
    lead: string;
    getQuote: string;
    call: string;
  };
  stats: StatItem[];
  footer: {
    company: string;
    services: string;
    fleet: string;
    coverage: string;
    about: string;
    contact: string;
    getInTouch: string;
    rights: string;
  };
  quote: {
    eyebrow: string;
    title: string;
    lead: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    pickup: string;
    delivery: string;
    service: string;
    serviceSelect: string;
    serviceOther: string;
    details: string;
    detailsPlaceholder: string;
    submit: string;
    close: string;
    formNote: string;
    thanksTitle: string;
    thanksBody: string;
    thanksNote: string;
    another: string;
  };
};

export const dictionaries: Record<Lang, Dict> = {
  en: {
    nav: {
      services: "Services",
      fleet: "Fleet",
      coverage: "Coverage",
      about: "About",
      contact: "Contact",
      getQuote: "Get a Quote",
    },
    hero: {
      badge: "Active",
      location: "Brampton, ON · Canada & US carrier",
      titleLine1: "Freight that moves",
      titleWith: "with",
      titleThe: "the",
      titlePack: "pack.",
      lead: "Bairava Transport delivers reliable, on-time full-truckload and cross-border freight across Canada and the United States — fast, tracked, and backed by 24/7 dispatch.",
      getQuote: "Get a Free Quote",
      explore: "Explore Services",
      scroll: "Scroll",
    },
    strip: [
      "Full Truckload",
      "Cross-Border Freight",
      "Dry Van",
      "Dedicated Lanes",
      "Expedited Delivery",
      "24/7 Dispatch",
    ],
    services: {
      eyebrow: "What We Haul",
      title1: "Freight solutions built for ",
      titleAccent: "reliability",
      lead: "Whatever you're shipping and wherever it's headed, we have the capacity and the discipline to get it there safely and on schedule.",
      items: [
        {
          title: "Full Truckload (FTL)",
          description:
            "Dedicated capacity for your freight — one shipment, one truck, direct from pickup to delivery with no stops in between.",
          icon: "truck",
        },
        {
          title: "Cross-Border Freight",
          description:
            "Seamless Canada–US shipping with customs-ready documentation and drivers experienced on both sides of the border.",
          icon: "border",
        },
        {
          title: "Dry Van Shipping",
          description:
            "Secure, weather-protected transport for palletized and packaged goods across all major lanes.",
          icon: "box",
        },
        {
          title: "Dedicated Lanes",
          description:
            "Consistent, contracted routes with reserved capacity so your supply chain never misses a beat.",
          icon: "route",
        },
        {
          title: "Expedited Delivery",
          description:
            "Time-critical freight moved fast. When the deadline is tight, the pack runs harder.",
          icon: "bolt",
        },
        {
          title: "24/7 Dispatch",
          description:
            "Real people, around the clock. Track your load and reach a dispatcher whenever you need one.",
          icon: "clock",
        },
      ],
    },
    fleet: {
      eyebrow: "Our Equipment",
      title1: "A fleet built to ",
      titleAccent: "keep its promise",
      lead: "Well-maintained, safety-inspected equipment ready for the lanes you run. Don't see exactly what you need? Ask us — we'll find the right capacity.",
      items: [
        {
          name: "Dry Van",
          specs: "53' trailers",
          description:
            "Sealed, weather-protected trailers for palletized freight, packaged goods, and general commodities.",
          icon: "box",
        },
        {
          name: "Cross-Border Ready",
          specs: "PARS / PAPS",
          description:
            "Equipment and paperwork set up for Canada–US crossings, with drivers familiar with the main border points.",
          icon: "border",
        },
        {
          name: "Power-Only",
          specs: "Bring your trailer",
          description:
            "Just need a tractor to move your trailer? We can provide the power and the driver to keep it rolling.",
          icon: "truck",
        },
      ],
    },
    coverage: {
      eyebrow: "Where We Run",
      title1: "Coverage across ",
      titleAccent: "Canada & the US",
      lead: "From our Brampton base we run freight throughout Ontario and Quebec and cross-border into the US heartland — the Great Lakes, Midwest, Northeast, and down to Texas.",
      regions: [
        "Ontario",
        "Quebec",
        "Great Lakes",
        "Midwest US",
        "Northeast US",
        "Texas & South",
      ],
    },
    about: {
      eyebrow: "Who We Are",
      title1: "A registered Ontario carrier you can ",
      titleAccent: "trust",
      lead: "Bairava Transport Inc. is a Brampton-based transport company built on a simple promise: move freight the way we'd want ours moved — on time, in full, and with honest communication every mile of the way.",
      features: [
        {
          title: "Licensed & Incorporated",
          description:
            "A registered Ontario Business Corporation in active standing — fully accountable and compliant.",
        },
        {
          title: "Cross-Border Ready",
          description:
            "Experienced with Canada–US freight, customs paperwork, and the lanes that keep goods moving.",
        },
        {
          title: "On-Time, Every Time",
          description:
            "We treat your deadline as our own. Reliability is the reason our clients stay.",
        },
        {
          title: "Modern Fleet Standards",
          description:
            "Well-maintained equipment and safety-first drivers protect your freight from dock to dock.",
        },
      ],
      credVerified: "✓ Registered Ontario Carrier",
      trustLead:
        "An incorporated Ontario business corporation in active standing — licensed, insured, and accountable for every load we move.",
      trustPoints: [
        "Registered & active in the Ontario Business Registry",
        "Based in Brampton, Ontario",
        "Fully compliant Canada–US carrier",
      ],
    },
    cta: {
      title: "Ready to move your freight?",
      lead: "Tell us where it's going. Our dispatch team will get you a quick, honest quote and reliable capacity — no runaround.",
      getQuote: "Get a Free Quote",
      call: "Call Dispatch",
    },
    stats: [
      { value: "2023", label: "Ontario Incorporated" },
      { value: "24/7", label: "Dispatch & Tracking" },
      { value: "CA ↔ US", label: "Cross-Border Freight" },
      { value: "FTL", label: "Full-Truckload Focus" },
    ],
    footer: {
      company: "Company",
      services: "Services",
      fleet: "Fleet",
      coverage: "Coverage",
      about: "About Us",
      contact: "Contact",
      getInTouch: "Get in Touch",
      rights: "All rights reserved.",
    },
    quote: {
      eyebrow: "Get a Quote",
      title: "Request a freight quote",
      lead: "Tell us about your shipment and our dispatch team will get back to you with pricing and availability.",
      name: "Full name",
      company: "Company",
      email: "Email",
      phone: "Phone",
      pickup: "Pickup location",
      delivery: "Delivery location",
      service: "Service needed",
      serviceSelect: "Select a service…",
      serviceOther: "Other",
      details: "Shipment details",
      detailsPlaceholder:
        "Tell us about your load — weight, dimensions, timeline, and any special requirements.",
      submit: "Request My Quote",
      close: "Close",
      formNote:
        "Opens your email app pre-filled — no account needed on our end.",
      thanksTitle: "Your email is ready to send",
      thanksBody:
        "We've opened your email app with the request pre-filled. Just press Send and our dispatch team will get back to you with a quote.",
      thanksNote: "Nothing opened? Email us directly at",
      another: "Fill out another request",
    },
  },
  fr: {
    nav: {
      services: "Services",
      fleet: "Flotte",
      coverage: "Couverture",
      about: "À propos",
      contact: "Contact",
      getQuote: "Obtenir un devis",
    },
    hero: {
      badge: "Actif",
      location: "Brampton, ON · Transporteur Canada et É.-U.",
      titleLine1: "Du fret qui roule",
      titleWith: "en",
      titleThe: "",
      titlePack: "meute.",
      lead: "Bairava Transport assure un transport de fret fiable et ponctuel, en charge complète et transfrontalier, partout au Canada et aux États-Unis — rapide, suivi et soutenu par une répartition 24/7.",
      getQuote: "Devis gratuit",
      explore: "Voir les services",
      scroll: "Défiler",
    },
    strip: [
      "Charge complète",
      "Fret transfrontalier",
      "Fourgon sec",
      "Trajets dédiés",
      "Livraison accélérée",
      "Répartition 24/7",
    ],
    services: {
      eyebrow: "Ce que nous transportons",
      title1: "Des solutions de fret conçues pour la ",
      titleAccent: "fiabilité",
      lead: "Quel que soit votre envoi et sa destination, nous avons la capacité et la rigueur nécessaires pour le livrer en toute sécurité et à temps.",
      items: [
        {
          title: "Charge complète (FTL)",
          description:
            "Une capacité dédiée à votre fret — un envoi, un camion, directement de l'enlèvement à la livraison, sans arrêt intermédiaire.",
          icon: "truck",
        },
        {
          title: "Fret transfrontalier",
          description:
            "Un transport Canada–États-Unis sans accroc, avec des documents prêts pour la douane et des chauffeurs expérimentés des deux côtés de la frontière.",
          icon: "border",
        },
        {
          title: "Transport en fourgon sec",
          description:
            "Un transport sécurisé et protégé des intempéries pour les marchandises palettisées et emballées sur tous les grands axes.",
          icon: "box",
        },
        {
          title: "Trajets dédiés",
          description:
            "Des itinéraires réguliers sous contrat avec capacité réservée, pour que votre chaîne d'approvisionnement ne s'arrête jamais.",
          icon: "route",
        },
        {
          title: "Livraison accélérée",
          description:
            "Du fret urgent livré rapidement. Quand le délai est serré, la meute redouble d'effort.",
          icon: "bolt",
        },
        {
          title: "Répartition 24/7",
          description:
            "De vraies personnes, à toute heure. Suivez votre chargement et joignez un répartiteur dès que vous en avez besoin.",
          icon: "clock",
        },
      ],
    },
    fleet: {
      eyebrow: "Notre équipement",
      title1: "Une flotte à la hauteur de ",
      titleAccent: "ses engagements",
      lead: "Un équipement bien entretenu et inspecté pour la sécurité, prêt pour vos trajets. Vous ne trouvez pas exactement ce qu'il vous faut? Demandez-nous — nous trouverons la bonne capacité.",
      items: [
        {
          name: "Fourgon sec",
          specs: "Remorques de 53 pi",
          description:
            "Des remorques scellées et protégées des intempéries pour le fret palettisé, les marchandises emballées et les biens généraux.",
          icon: "box",
        },
        {
          name: "Prêt pour la frontière",
          specs: "PARS / PAPS",
          description:
            "Équipement et documents préparés pour les passages Canada–États-Unis, avec des chauffeurs habitués aux principaux postes frontaliers.",
          icon: "border",
        },
        {
          name: "Tracteur seul",
          specs: "Apportez votre remorque",
          description:
            "Besoin uniquement d'un tracteur pour déplacer votre remorque? Nous fournissons la puissance et le chauffeur pour la garder en route.",
          icon: "truck",
        },
      ],
    },
    coverage: {
      eyebrow: "Où nous roulons",
      title1: "Une couverture partout au ",
      titleAccent: "Canada et aux É.-U.",
      lead: "Depuis notre base de Brampton, nous transportons du fret partout en Ontario et au Québec, et au-delà de la frontière vers le cœur des États-Unis — les Grands Lacs, le Midwest, le Nord-Est et jusqu'au Texas.",
      regions: [
        "Ontario",
        "Québec",
        "Grands Lacs",
        "Midwest américain",
        "Nord-Est américain",
        "Texas et Sud",
      ],
    },
    about: {
      eyebrow: "Qui nous sommes",
      title1: "Un transporteur ontarien enregistré, ",
      titleAccent: "digne de confiance",
      lead: "Bairava Transport Inc. est une entreprise de transport basée à Brampton, fondée sur une promesse simple : transporter le fret comme nous voudrions que le nôtre le soit — à temps, au complet et avec une communication honnête à chaque kilomètre.",
      features: [
        {
          title: "Licenciée et constituée en société",
          description:
            "Une société par actions de l'Ontario enregistrée et en règle — pleinement responsable et conforme.",
        },
        {
          title: "Prêt pour la frontière",
          description:
            "Expérimentée en fret Canada–États-Unis, en formalités douanières et sur les trajets qui font avancer les marchandises.",
        },
        {
          title: "Ponctuels, à chaque fois",
          description:
            "Nous traitons votre échéance comme la nôtre. La fiabilité est la raison pour laquelle nos clients restent.",
        },
        {
          title: "Normes de flotte modernes",
          description:
            "Un équipement bien entretenu et des chauffeurs axés sur la sécurité protègent votre fret d'un quai à l'autre.",
        },
      ],
      credVerified: "✓ Transporteur ontarien enregistré",
      trustLead:
        "Une société par actions de l'Ontario constituée et en règle — licenciée, assurée et responsable de chaque chargement que nous transportons.",
      trustPoints: [
        "Enregistrée et active au Registre des entreprises de l'Ontario",
        "Basée à Brampton, Ontario",
        "Transporteur Canada–États-Unis pleinement conforme",
      ],
    },
    cta: {
      title: "Prêt à faire rouler votre fret?",
      lead: "Dites-nous où il va. Notre équipe de répartition vous fournira un devis rapide et honnête ainsi qu'une capacité fiable — sans détour.",
      getQuote: "Devis gratuit",
      call: "Appeler la répartition",
    },
    stats: [
      { value: "2023", label: "Constituée en Ontario" },
      { value: "24/7", label: "Répartition et suivi" },
      { value: "CA ↔ É.-U.", label: "Fret transfrontalier" },
      { value: "FTL", label: "Axée sur la charge complète" },
    ],
    footer: {
      company: "Entreprise",
      services: "Services",
      fleet: "Flotte",
      coverage: "Couverture",
      about: "À propos",
      contact: "Contact",
      getInTouch: "Nous joindre",
      rights: "Tous droits réservés.",
    },
    quote: {
      eyebrow: "Obtenir un devis",
      title: "Demander un devis de fret",
      lead: "Parlez-nous de votre envoi et notre équipe de répartition vous répondra avec les tarifs et les disponibilités.",
      name: "Nom complet",
      company: "Entreprise",
      email: "Courriel",
      phone: "Téléphone",
      pickup: "Lieu d'enlèvement",
      delivery: "Lieu de livraison",
      service: "Service souhaité",
      serviceSelect: "Choisir un service…",
      serviceOther: "Autre",
      details: "Détails de l'envoi",
      detailsPlaceholder:
        "Parlez-nous de votre chargement — poids, dimensions, délais et exigences particulières.",
      submit: "Demander mon devis",
      close: "Fermer",
      formNote:
        "Ouvre votre application de courriel déjà remplie — aucun compte requis de notre côté.",
      thanksTitle: "Votre courriel est prêt à être envoyé",
      thanksBody:
        "Nous avons ouvert votre application de courriel avec la demande déjà remplie. Appuyez simplement sur Envoyer et notre équipe de répartition vous répondra avec un devis.",
      thanksNote: "Rien ne s'est ouvert? Écrivez-nous directement à",
      another: "Remplir une autre demande",
    },
  },
};

type I18nCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
};

const I18nContext = createContext<I18nCtx | null>(null);

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Restore saved preference on mount (client-only, export-safe).
  useEffect(() => {
    const saved = (typeof window !== "undefined" &&
      window.localStorage.getItem("lang")) as Lang | null;
    if (saved === "en" || saved === "fr") {
      setLangState(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("lang", l);
      document.documentElement.lang = l;
    }
  }, []);

  return (
    <I18nContext.Provider value={{ lang, setLang, t: dictionaries[lang] }}>
      {children}
    </I18nContext.Provider>
  );
}
