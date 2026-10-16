/* =========================================================
   SLN Transport Privé — interactions du site
   ========================================================= */

/* ---------- Configuration (à compléter avec les vraies infos) ---------- */
const CONFIG = {
  phone: "+33674760316",          // format international, sans espaces
  phoneLabel: "06 74 76 03 16",
  whatsapp: "33674760316",        // sans le + (à confirmer : même numéro que WhatsApp ?)
  email: "slntransportprive@gmail.com",
  googleReviews: "https://share.google/uKCrQxwhXr0P1DarL", // fiche Google Business
  // Clé Web3Forms (créée sur web3forms.com avec l'adresse qui doit recevoir les demandes).
  // Vide = repli : le formulaire ouvre la messagerie du visiteur.
  web3formsKey: "cd0a8048-9353-4bfa-aa36-dd8cb76a218f",
};

/* Grille tarifaire (TTC). Calcul par tranches successives. */
const TARIF = {
  priseEnCharge: 5,
  tranches: [
    { jusqua: 10, prixKm: 2.8 },
    { jusqua: 30, prixKm: 1.9 },
    { jusqua: Infinity, prixKm: 1.7 },
  ],
  minimum: 25,
  forfaitAeroport: 35,           // aéroport Montpellier ↔ Montpellier
  forfaitGare: 25,               // gares de Montpellier ↔ Montpellier
  majorationNuit: 0.25,          // 22 h – 6 h
  nuitDebut: 22,
  nuitFin: 6,
  horaire: 60,                   // mise à disposition, €/h
  forfaitsDispo: { 4: 230, 8: 430 },
  seuilDevis: 200,               // km au-delà desquels le prix est « à confirmer »
};

const MONTPELLIER = "34172";

/* ---------- Langue (fr par défaut, en sur /en/) ---------- */
const LANG = document.documentElement.lang.startsWith("en") ? "en" : "fr";
const LOCALE = LANG === "en" ? "en-GB" : "fr-FR";
const T = {
  fr: {
    waHello: "Bonjour, je souhaite réserver un trajet avec SLN Transport Privé.",
    menuOpen: "Ouvrir le menu", menuClose: "Fermer le menu",
    noResult: "Aucune adresse trouvée. Essayez avec la ville.", searching: "Recherche…",
    labelFrom: "Lieu de départ", labelPickup: "Lieu de prise en charge",
    errFrom: "Indiquez le lieu de départ.", errTo: "Indiquez la destination.",
    errDate: "Choisissez la date et l'heure.", errDate2: "Choisissez la date et l'heure du retour.",
    errFromNotFound: "Adresse de départ introuvable. Choisissez une suggestion.",
    errToNotFound: "Destination introuvable. Choisissez une suggestion.",
    errNetwork: "Le calcul n'a pas abouti. Vérifiez votre connexion ou contactez-nous directement.",
    computing: "Calcul…", estimate: "Estimer le prix",
    hoursDispo: (h) => `${h} h de mise à disposition`, night: "majoration de nuit incluse",
    forfaitAirport: "Forfait aéroport", forfaitStation: "Forfait gare",
    noteLong: "Long trajet : estimation indicative TTC, à confirmer par devis personnalisé.",
    note: "Estimation TTC calculée sur la distance par la route. Le chauffeur vous répond personnellement pour confirmer la course et son prix.",
    estimateLabel: "Estimation",
    errPast: "Choisissez une heure de départ au moins 30 minutes après maintenant.",
    errReturn: "Le retour doit avoir lieu après l'aller.",
    sumHello: "Bonjour, je souhaite réserver :", sumDispo: (h) => `Mise à disposition : ${h} h`,
    sumPickup: "Prise en charge", sumReturnTrip: "Aller-retour", sumOneWay: "Aller simple",
    sumFrom: "Départ", sumTo: "Destination", sumOn: (d, t) => `Le ${d} à ${t}`, sumBack: (d, t) => `Retour le ${d} à ${t}`,
    pax: (n) => `${n} passager${n > 1 ? "s" : ""}`, sumEstimate: "Estimation du site",
    errName: "Indiquez votre nom.", errPhone: "Indiquez un numéro de téléphone.", errTrip: "Décrivez votre trajet.",
    mClient: "Client", mName: "Nom", mPhone: "Téléphone", mEmail: "E-mail", mSubject: "Demande de réservation",
    sending: "Envoi…", send: "Envoyer ma demande",
    errSend: "L'envoi n'a pas abouti. Réessayez, ou contactez-nous par WhatsApp ou téléphone.",
  },
  en: {
    waHello: "Hello, I would like to book a ride with SLN Transport Privé.",
    menuOpen: "Open menu", menuClose: "Close menu",
    noResult: "No address found. Try adding the city.", searching: "Searching…",
    labelFrom: "Pick-up location", labelPickup: "Pick-up location",
    errFrom: "Please enter a pick-up location.", errTo: "Please enter a destination.",
    errDate: "Please choose a date and time.", errDate2: "Please choose the return date and time.",
    errFromNotFound: "Pick-up address not found. Please choose a suggestion.",
    errToNotFound: "Destination not found. Please choose a suggestion.",
    errNetwork: "We couldn't calculate this trip. Check your connection or contact us directly.",
    computing: "Calculating…", estimate: "Get a price",
    hoursDispo: (h) => `${h} h chauffeur service`, night: "night rate included",
    forfaitAirport: "Airport flat rate", forfaitStation: "Station flat rate",
    noteLong: "Long-distance trip: indicative estimate incl. VAT, to be confirmed with a personalised quote.",
    note: "Estimate incl. VAT, based on the actual road distance. The chauffeur replies personally to confirm the ride and its price.",
    estimateLabel: "Estimate",
    errPast: "Please choose a pick-up time at least 30 minutes from now.",
    errReturn: "The return must be after the outbound trip.",
    sumHello: "Hello, I would like to book:", sumDispo: (h) => `Chauffeur service: ${h} h`,
    sumPickup: "Pick-up", sumReturnTrip: "Return trip", sumOneWay: "One way",
    sumFrom: "From", sumTo: "To", sumOn: (d, t) => `On ${d} at ${t}`, sumBack: (d, t) => `Return on ${d} at ${t}`,
    pax: (n) => `${n} passenger${n > 1 ? "s" : ""}`, sumEstimate: "Website estimate",
    errName: "Please enter your name.", errPhone: "Please enter a phone number.", errTrip: "Please describe your trip.",
    mClient: "Client", mName: "Name", mPhone: "Phone", mEmail: "Email", mSubject: "Booking request",
    sending: "Sending…", send: "Send my request",
    errSend: "Your request could not be sent. Please try again, or contact us on WhatsApp or by phone.",
  },
}[LANG];

/* Lieux clés proposés en priorité dans l'autocomplétion */
const LIEUX = [
  { label: "Aéroport Montpellier-Méditerranée", label_en: "Montpellier-Méditerranée Airport", sub: "Mauguio · Terminal départs/arrivées", sub_en: "Mauguio · Departures/arrivals", lon: 3.9630, lat: 43.5762, kind: "airport", citycode: "34154", icon: "i-plane" },
  { label: "Gare Montpellier Saint-Roch", label_en: "Montpellier Saint-Roch train station", sub: "Centre-ville · Montpellier", sub_en: "City centre · Montpellier", lon: 3.8806, lat: 43.6045, kind: "station", citycode: MONTPELLIER, icon: "i-train" },
  { label: "Gare Montpellier Sud de France", label_en: "Montpellier Sud de France train station", sub: "Odysseum · Montpellier", lon: 3.9215, lat: 43.5958, kind: "station", citycode: MONTPELLIER, icon: "i-train" },
  { label: "Aéroport Nîmes-Alès-Camargue-Cévennes", label_en: "Nîmes-Alès-Camargue-Cévennes Airport", sub: "Saint-Gilles", lon: 4.4163, lat: 43.7574, kind: "poi", citycode: "30258", icon: "i-plane" },
  { label: "Aéroport Marseille-Provence", label_en: "Marseille-Provence Airport", sub: "Marignane", lon: 5.2214, lat: 43.4393, kind: "poi", citycode: "13054", icon: "i-plane" },
];
/* Libellés dans la langue de la page ; la recherche fonctionne dans les deux langues */
LIEUX.forEach((l) => {
  l.search = [l.label, l.label_en, l.sub, l.sub_en].filter(Boolean).join(" ");
  if (LANG === "en") { l.label = l.label_en || l.label; l.sub = l.sub_en || l.sub; }
});

/* ---------- Utilitaires ---------- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const euro = (n) => new Intl.NumberFormat(LOCALE, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };
const icon = (id) => `<svg class="ic" aria-hidden="true"><use href="#${id}"/></svg>`;
const escapeHtml = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- Liens de contact ---------- */
function waLink(text) {
  return `https://wa.me/${CONFIG.whatsapp}${text ? "?text=" + encodeURIComponent(text) : ""}`;
}
$$(".js-tel").forEach((a) => (a.href = `tel:${CONFIG.phone}`));
$$(".js-tel-label").forEach((s) => (s.textContent = LANG === "en" ? "+33 6 74 76 03 16" : CONFIG.phoneLabel));
$$(".js-sms").forEach((a) => (a.href = `sms:${CONFIG.phone}`));
$$(".js-wa").forEach((a) => (a.href = waLink(T.waHello)));
$$(".js-mail").forEach((a) => (a.href = `mailto:${CONFIG.email}`));
$$(".js-mail-label").forEach((s) => (s.textContent = CONFIG.email));
$$(".js-google").forEach((a) => (a.href = CONFIG.googleReviews));
$("#year").textContent = new Date().getFullYear();

/* ---------- En-tête & menu mobile ---------- */
const header = $(".site-header");
const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 20);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

const menuBtn = $(".menu-toggle");
const nav = $("#main-nav");
function setMenu(open) {
  nav.classList.toggle("is-open", open);
  header.classList.toggle("menu-open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? T.menuClose : T.menuOpen);
  menuBtn.querySelector("use").setAttribute("href", open ? "#i-x" : "#i-menu");
}
menuBtn.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
$$("a", nav).forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && nav.classList.contains("is-open")) { setMenu(false); menuBtn.focus(); } });

/* ---------- Apparition au défilement ---------- */
if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  // Les éléments se révèlent un peu AVANT d'entrer à l'écran : jamais de zone vide en défilement rapide
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
  }, { rootMargin: "0px 0px 15% 0px", threshold: 0 });
  $$(".reveal").forEach((el, i) => { el.style.transitionDelay = `${(i % 2) * 40}ms`; io.observe(el); });
} else {
  $$(".reveal").forEach((el) => el.classList.add("is-in"));
}

/* =========================================================
   Autocomplétion d'adresse (Géoplateforme IGN, gratuite)
   ========================================================= */
class AddressField {
  constructor(input) {
    this.input = input;
    this.list = document.getElementById(input.getAttribute("aria-controls"));
    this.items = [];
    this.active = -1;
    this.selected = null;
    this.controller = null;

    this.fetchRemote = debounce(this.fetchRemote.bind(this), 140);
    input.addEventListener("input", () => {
      this.selected = null;
      input.removeAttribute("aria-invalid");
      this.search(input.value.trim());
    });
    input.addEventListener("focus", () => { if (!input.value.trim()) this.render(LIEUX.slice(0, 3)); });
    input.addEventListener("keydown", (e) => this.onKey(e));
    input.addEventListener("blur", () => setTimeout(() => this.close(), 120));
    this.list.addEventListener("mousedown", (e) => {
      const li = e.target.closest("li[data-i]");
      if (li) { e.preventDefault(); this.choose(+li.dataset.i); }
    });
  }

  /* Réponse immédiate : les lieux clés s'affichent à la frappe, sans attente */
  search(q) {
    this.lastQuery = q;
    this.words = norm(q).split(/[\s,'-]+/).filter(Boolean);
    this.local = q ? LIEUX.filter((l) => { const h = norm(l.search); return this.words.every((w) => h.includes(w)); }) : LIEUX.slice(0, 3);
    if (q.length < 3) { this.controller?.abort(); this.render(this.local); return; }
    this.render(this.local, true);
    this.fetchRemote(q);
  }

  /* Seul l'appel réseau est différé (le temps de finir la frappe) */
  async fetchRemote(q) {
    if (q !== this.lastQuery) return;
    const local = this.local, words = this.words;
    try {
      this.controller?.abort();
      this.controller = new AbortController();
      const url = `https://data.geopf.fr/geocodage/search?q=${encodeURIComponent(q)}&limit=6&autocomplete=1&lat=43.61&lon=3.88`;
      const res = await fetch(url, { signal: this.controller.signal });
      const data = await res.json();
      if (q !== this.lastQuery) return;
      const remote = (data.features || []).map((f) => ({
        label: f.properties.name && f.properties.type !== "municipality" ? f.properties.name : f.properties.label,
        sub: f.properties.type === "municipality" ? f.properties.context : `${f.properties.postcode || ""} ${f.properties.city || ""}`.trim(),
        full: f.properties.label,
        lon: f.geometry.coordinates[0],
        lat: f.geometry.coordinates[1],
        citycode: f.properties.citycode,
        kind: "address",
        icon: "i-pin",
      }));
      // Lieux clés en tête seulement si on cherche explicitement une gare / un aéroport
      const KEYS = ["gare", "station", "train", "aeroport", "airport", "terminal"];
      const explicit = local.length > 0 && words.some((w) => w.length >= 3 && KEYS.some((k) => k.startsWith(w) || w.startsWith(k)));
      this.render((explicit ? [...local, ...remote] : [...remote.slice(0, 4), ...local, ...remote.slice(4)]).slice(0, 8));
    } catch (err) {
      if (err.name !== "AbortError" && q === this.lastQuery) this.render(local);
    }
  }

  render(items, loading = false) {
    const keep = this.active > -1 && this.active < items.length ? this.active : -1;
    this.items = items;
    this.active = -1;
    if (!items.length && !loading) {
      this.list.innerHTML = `<li class="combo-empty" role="presentation">${T.noResult}</li>`;
    } else {
      this.list.innerHTML = items.map((it, i) =>
        `<li role="option" id="${this.list.id}-${i}" data-i="${i}" aria-selected="false">${icon(it.icon)}<span>${escapeHtml(it.label)}<small>${escapeHtml(it.sub || "")}</small></span></li>`
      ).join("") + (loading ? `<li class="combo-empty" role="presentation">${T.searching}</li>` : "");
    }
    this.open();
    if (keep > -1) this.highlight(keep);
  }

  open() { this.list.classList.add("is-open"); this.input.setAttribute("aria-expanded", "true"); }
  close() {
    this.list.classList.remove("is-open");
    this.input.setAttribute("aria-expanded", "false");
    this.input.removeAttribute("aria-activedescendant");
  }

  highlight(i) {
    const opts = $$("li[data-i]", this.list);
    if (!opts.length) return;
    this.active = (i + opts.length) % opts.length;
    opts.forEach((o, k) => o.setAttribute("aria-selected", String(k === this.active)));
    opts[this.active].scrollIntoView({ block: "nearest" });
    this.input.setAttribute("aria-activedescendant", opts[this.active].id);
  }

  onKey(e) {
    const isOpen = this.list.classList.contains("is-open");
    if (e.key === "ArrowDown") { e.preventDefault(); if (!isOpen) this.open(); this.highlight(this.active + 1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); this.highlight(this.active - 1); }
    else if (e.key === "Enter" && isOpen && this.active > -1) { e.preventDefault(); this.choose(this.active); }
    else if (e.key === "Escape") { this.close(); }
  }

  choose(i) {
    const it = this.items[i];
    if (!it) return;
    this.selected = it;
    this.input.value = it.full || it.label;
    this.close();
    this.input.dispatchEvent(new CustomEvent("address:chosen", { bubbles: true }));
  }

  /* Si l'utilisateur n'a pas cliqué sur une suggestion, on géocode le texte saisi */
  async resolve() {
    if (this.selected) return this.selected;
    const q = this.input.value.trim();
    if (!q) return null;
    const local = LIEUX.find((l) => norm(l.label) === norm(q));
    if (local) return (this.selected = local);
    // Première suggestion affichée pour ce texte : c'est ce que l'utilisateur a vu
    if (this.lastQuery === q && this.items.length) { this.choose(0); return this.selected; }
    const res = await fetch(`https://data.geopf.fr/geocodage/search?q=${encodeURIComponent(q)}&limit=1&lat=43.61&lon=3.88`);
    const data = await res.json();
    const f = data.features?.[0];
    if (!f) return null;
    return (this.selected = {
      label: f.properties.label, full: f.properties.label,
      lon: f.geometry.coordinates[0], lat: f.geometry.coordinates[1],
      citycode: f.properties.citycode, kind: "address",
    });
  }

  set(place) { this.selected = place; this.input.value = place ? (place.full || place.label) : ""; }
}

/* =========================================================
   Calcul d'itinéraire et de prix
   ========================================================= */
async function routeDistance(a, b) {
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${a.lon},${a.lat};${b.lon},${b.lat}?overview=false`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.code !== "Ok") throw new Error("route");
    return { km: data.routes[0].distance / 1000, min: data.routes[0].duration / 60, approx: false };
  } catch {
    // Repli : distance à vol d'oiseau × 1,3
    const R = 6371, rad = (d) => (d * Math.PI) / 180;
    const dLat = rad(b.lat - a.lat), dLon = rad(b.lon - a.lon);
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2;
    const km = 2 * R * Math.asin(Math.sqrt(h)) * 1.3;
    return { km, min: (km / 70) * 60, approx: true };
  }
}

function prixDistance(km) {
  let prix = TARIF.priseEnCharge, from = 0;
  for (const t of TARIF.tranches) {
    if (km <= from) break;
    prix += (Math.min(km, t.jusqua) - from) * t.prixKm;
    from = t.jusqua;
  }
  return Math.max(TARIF.minimum, prix);
}

function forfait(a, b) {
  const inMtp = (p) => p.citycode === MONTPELLIER && p.kind !== "airport";
  const pair = (x, y) => (x.kind === "airport" && y.citycode === MONTPELLIER) || (y.kind === "airport" && x.citycode === MONTPELLIER);
  if (pair(a, b)) return { prix: TARIF.forfaitAeroport, nom: T.forfaitAirport };
  if ((a.kind === "station" && inMtp(b)) || (b.kind === "station" && inMtp(a))) return { prix: TARIF.forfaitGare, nom: T.forfaitStation };
  return null;
}

const isNight = (time) => {
  if (!time) return false;
  const h = +time.split(":")[0];
  return h >= TARIF.nuitDebut || h < TARIF.nuitFin;
};

function prixTrajet(a, b, km, time) {
  const f = forfait(a, b);
  let prix = f ? f.prix : prixDistance(km);
  const nuit = isNight(time);
  if (nuit) prix *= 1 + TARIF.majorationNuit;
  return { prix: Math.round(prix), forfait: f?.nom || null, nuit };
}

function prixDispo(hours, time) {
  let prix = TARIF.forfaitsDispo[hours] ?? hours * TARIF.horaire;
  const nuit = isNight(time);
  if (nuit) prix *= 1 + TARIF.majorationNuit;
  return { prix: Math.round(prix), nuit };
}

/* =========================================================
   Module de réservation
   ========================================================= */
if ($(".booking")) {
const booking = $(".booking");
const form = $("#booking-form");
const fromF = new AddressField($("#from"));
const toF = new AddressField($("#to"));
const tabs = $$('[role="tab"]', booking);
const btn = $("#estimate-btn");
const errBox = $("#b-error");
const result = $("#b-result");
const live = $("#b-live");
const openResult = (on) => { result.classList.toggle("is-open", on); result.inert = !on; };
openResult(false);
let mode = "simple";
let lastQuote = null;

/* Date et heure par défaut : aujourd'hui, prochaine demi-heure + 1 h */
(function initDate() {
  const d = new Date(Date.now() + 90 * 60000);
  d.setMinutes(d.getMinutes() < 30 ? 30 : 60, 0, 0);
  const iso = (x) => `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}-${String(x.getDate()).padStart(2, "0")}`;
  const today = iso(new Date());
  ["#date", "#date2"].forEach((s) => ($(s).min = today));
  $("#date").value = iso(d);
  $("#time").value = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  $("#date").addEventListener("change", () => {
    $("#date2").min = $("#date").value;
    if ($("#date2").value && $("#date2").value < $("#date").value) $("#date2").value = $("#date").value;
  });
})();

function setMode(m) {
  mode = m;
  booking.dataset.mode = m;
  tabs.forEach((t) => {
    const on = t.dataset.mode === m;
    t.setAttribute("aria-selected", String(on));
    t.tabIndex = on ? 0 : -1;
    if (on) $("#booking-tabpanel").setAttribute("aria-labelledby", t.id);
  });
  $$("[data-show]", form).forEach((el) => (el.hidden = el.dataset.show !== m));
  $$("[data-hide]", form).forEach((el) => (el.hidden = el.dataset.hide === m));
  $("label[for='from']").textContent = m === "dispo" ? T.labelPickup : T.labelFrom;
  if (m === "retour" && !$("#date2").value) $("#date2").value = $("#date").value;
  hideResult();
}
tabs.forEach((t, i) => {
  t.addEventListener("click", () => setMode(t.dataset.mode));
  t.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const n = tabs[(i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length];
    n.focus(); setMode(n.dataset.mode);
  });
});

$("#swap").addEventListener("click", () => {
  const a = fromF.selected, av = fromF.input.value;
  const b = toF.selected, bv = toF.input.value;
  fromF.set(b); if (!b) fromF.input.value = bv;
  toF.set(a); if (!a) toF.input.value = av;
  hideResult();
});

function showError(msg, field) {
  errBox.textContent = msg;
  errBox.hidden = false;
  if (field) { field.setAttribute("aria-invalid", "true"); field.setAttribute("aria-describedby", "b-error"); field.focus(); }
}
function hideResult() { openResult(false); errBox.hidden = true; }

/* Contrôle des horaires dès qu'on modifie un champ ; renvoie le message d'erreur ou null */
function timingProblem() {
  const d = $("#date").value, t = $("#time").value;
  if (d && t && new Date(`${d}T${t}`) < Date.now() + 30 * 60000) return [T.errPast, $("#time")];
  if (mode === "retour" && d && t && $("#date2").value && $("#time2").value &&
      new Date(`${$("#date2").value}T${$("#time2").value}`) <= new Date(`${d}T${t}`)) return [T.errReturn, $("#time2")];
  return null;
}
function liveTimingCheck() {
  $$("[aria-invalid]", form).filter((el) => ["date", "time", "date2", "time2"].includes(el.id))
    .forEach((el) => { el.removeAttribute("aria-invalid"); el.removeAttribute("aria-describedby"); });
  const p = timingProblem();
  if (p) {
    errBox.textContent = p[0]; errBox.hidden = false;
    p[1].setAttribute("aria-invalid", "true"); p[1].setAttribute("aria-describedby", "b-error");
  } else if (!errBox.hidden && [T.errPast, T.errReturn].includes(errBox.textContent)) {
    errBox.hidden = true;
  }
}
["date", "time", "date2", "time2"].forEach((id) => $("#" + id).addEventListener("change", () => { liveTimingCheck(); openResult(false); }));
$("#hours").addEventListener("change", () => openResult(false));
[fromF, toF].forEach((f) => f.input.addEventListener("input", () => openResult(false)));

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errBox.hidden = true;
  $$("[aria-invalid]", form).forEach((el) => { el.removeAttribute("aria-invalid"); el.removeAttribute("aria-describedby"); });

  if (!fromF.input.value.trim()) return showError(T.errFrom, fromF.input);
  if (mode !== "dispo" && !toF.input.value.trim()) return showError(T.errTo, toF.input);
  if (!$("#date").value || !$("#time").value) return showError(T.errDate, $("#date"));
  if (mode === "retour" && (!$("#date2").value || !$("#time2").value)) return showError(T.errDate2, $("#date2"));
  const problem = timingProblem();
  if (problem) return showError(problem[0], problem[1]);

  btn.setAttribute("aria-busy", "true");
  btn.querySelector("span").textContent = T.computing;
  try {
    const a = await fromF.resolve();
    if (!a) return showError(T.errFromNotFound, fromF.input);

    if (mode === "dispo") {
      const h = +$("#hours").value;
      const q = prixDispo(h, $("#time").value);
      lastQuote = { mode, a, hours: h, ...q };
      renderQuote(q.prix, [T.hoursDispo(h), q.nuit ? T.night : null]);
      return;
    }

    const b = await toF.resolve();
    if (!b) return showError(T.errToNotFound, toF.input);

    const r = await routeDistance(a, b);
    const aller = prixTrajet(a, b, r.km, $("#time").value);
    let total = aller.prix;
    let retour = null;
    if (mode === "retour") { retour = prixTrajet(b, a, r.km, $("#time2").value); total += retour.prix; }

    const kmTxt = `${r.approx ? "≈ " : ""}${r.km.toLocaleString(LOCALE, { maximumFractionDigits: r.km < 20 ? 1 : 0 })} km`;
    const durTxt = r.min < 60 ? `${Math.round(r.min)} min` : `${Math.floor(r.min / 60)} h ${String(Math.round(r.min % 60)).padStart(2, "0")}`;
    const meta = [
      mode === "retour" ? `${kmTxt} × 2` : kmTxt,
      durTxt,
      aller.forfait,
      aller.nuit || retour?.nuit ? T.night : null,
    ];
    lastQuote = { mode, a, b, km: r.km, prix: total, aller, retour };
    renderQuote(total, meta, r.km > TARIF.seuilDevis);
  } catch (err) {
    showError(T.errNetwork);
  } finally {
    btn.removeAttribute("aria-busy");
    btn.querySelector("span").textContent = T.estimate;
  }
});

function renderQuote(prix, meta, aConfirmer = false) {
  $("#r-amount").textContent = (aConfirmer ? "≈ " : "") + euro(prix);
  const short = (p) => (p ? (p.label || p.full || "").split(" · ")[0] : "");
  const q = lastQuote;
  $("#r-route").textContent = q ? (q.mode === "dispo" ? short(q.a) : `${short(q.a)} → ${short(q.b)}`) : "";
  $("#r-meta").textContent = meta.filter(Boolean).join(" · ");
  $("#r-note").textContent = aConfirmer ? T.noteLong : T.note;
  $("#r-whatsapp").href = waLink(summary());
  openResult(true);
  if (live) live.textContent = `${T.estimateLabel} : ${$("#r-amount").textContent}. ${$("#r-route").textContent} ${$("#r-meta").textContent}`.trim();
}

function summary() {
  const q = lastQuote;
  if (!q) return "";
  const d = (v) => (v ? new Date(v + "T12:00").toLocaleDateString(LOCALE, { weekday: "long", day: "numeric", month: "long" }) : "");
  const pax = $("#pax").value;
  const sep = LANG === "fr" ? " : " : ": ";
  const lines = [T.sumHello];
  if (q.mode === "dispo") {
    lines.push(T.sumDispo(q.hours), T.sumPickup + sep + fromF.input.value);
  } else {
    lines.push(q.mode === "retour" ? T.sumReturnTrip : T.sumOneWay, T.sumFrom + sep + fromF.input.value, T.sumTo + sep + toF.input.value);
  }
  lines.push(T.sumOn(d($("#date").value), $("#time").value));
  if (q.mode === "retour") lines.push(T.sumBack(d($("#date2").value), $("#time2").value));
  lines.push(T.pax(+pax), T.sumEstimate + sep + euro(q.prix));
  return lines.join("\n");
}

/* « Envoyer une demande » : pré-remplit le formulaire de contact */
$("#r-form").addEventListener("click", () => {
  const txt = summary().split("\n").slice(1).join("\n");
  const trip = $("#c-trip");
  if (trip) {
    trip.value = txt;
    setTimeout(() => $("#c-name").focus({ preventScroll: true }), 600);
  } else {
    // Page service : le formulaire est sur l'accueil, on lui transmet le trajet
    try { sessionStorage.setItem("sln-trip", txt); } catch {}
  }
});
}

/* Bouton « Demander un devis entreprise » : coche « Entreprise » */
$$('[data-client="pro"]').forEach((a) => a.addEventListener("click", () => {
  $('input[name="client"][value="Entreprise"], input[name="client"][value="Business"]').checked = true;
}));

/* =========================================================
   Formulaire de contact
   - Avec CONFIG.web3formsKey : envoi direct, ton frère reçoit un e-mail.
   - Sans clé : repli sur la messagerie du visiteur (mailto).
   ========================================================= */
const contactForm = $("#contact-form");
if (contactForm) {
  try {
    const saved = sessionStorage.getItem("sln-trip");
    if (saved) { $("#c-trip").value = saved; sessionStorage.removeItem("sln-trip"); }
  } catch {}
}
contactForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const f = e.currentTarget;
  const err = $("#f-error");
  const submit = $("#f-submit");
  $$("[aria-invalid]", f).forEach((el) => el.removeAttribute("aria-invalid"));
  const required = [["#c-name", T.errName], ["#c-phone", T.errPhone], ["#c-trip", T.errTrip]];
  for (const [sel, msg] of required) {
    const el = $(sel, f);
    if (!el.value.trim()) { err.textContent = msg; err.hidden = false; el.setAttribute("aria-invalid", "true"); el.focus(); return; }
  }
  err.hidden = true;
  const data = new FormData(f);
  const name = data.get("name").trim();

  if (!CONFIG.web3formsKey) {
    const body = [
      `${T.mClient} : ${data.get("client")}${data.get("company") ? " — " + data.get("company") : ""}`,
      `${T.mName} : ${name}`,
      `${T.mPhone} : ${data.get("phone")}`,
      data.get("email") ? `${T.mEmail} : ${data.get("email")}` : null,
      "",
      data.get("trip"),
    ].filter((l) => l !== null).join("\n");
    window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(T.mSubject + " — " + name)}&body=${encodeURIComponent(body)}`;
    return;
  }

  // Les libellés de l'e-mail reçu restent en français : c'est ton frère qui le lit
  const payload = {
    access_key: CONFIG.web3formsKey,
    subject: `Nouvelle demande SLN — ${name} (${data.get("client")})`,
    from_name: "Site SLN Transport Privé",
    botcheck: data.get("botcheck") ? true : "",
    "Client": data.get("client"),
    "Nom": name,
    "Société": data.get("company") || "—",
    "Téléphone": data.get("phone"),
    "E-mail": data.get("email") || "—",
    "Trajet": data.get("trip"),
    "Langue du site": LANG === "en" ? "Anglais" : "Français",
  };
  if (data.get("email")) payload.replyto = data.get("email");

  submit.setAttribute("aria-busy", "true");
  submit.disabled = true;
  submit.querySelector("span").textContent = T.sending;
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json.success) throw new Error(json.message || res.status);
    f.reset();
    f.classList.add("is-sent");
    const ok = $("#f-success");
    ok.hidden = false;
    ok.focus();
    $("#f-again")?.addEventListener("click", () => {
      f.classList.remove("is-sent");
      ok.hidden = true;
      $("#c-name").focus();
    }, { once: true });
  } catch {
    err.textContent = T.errSend;
    err.hidden = false;
  } finally {
    submit.removeAttribute("aria-busy");
    submit.disabled = false;
    submit.querySelector("span").textContent = T.send;
  }
});
