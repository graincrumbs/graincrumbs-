// Approx distance (km) from Kharadi 411014 to common Pune pincodes.
// Used only for a tentative delivery cost estimate shown in the Order form.
const PINCODE_DISTANCE_KM: Record<string, number> = {
  // ── Kharadi & immediately adjacent (0–4 km) ─────────────────────────────
  "411014": 0,   // Kharadi
  "411036": 3,   // Wagholi (near side)
  "411032": 4,   // Viman Nagar / Lohegaon
  "411015": 4,   // Vishrantwadi
  "411006": 5,   // Yerwada

  // ── Eastern belt (5–10 km) ───────────────────────────────────────────────
  "412207": 6,   // Wagholi (far)
  "411047": 6,   // Lohegaon
  "411013": 6,   // Hadapsar (near)
  "411060": 7,   // Kharadi / Magarpatta
  "411028": 8,   // Manjri / Fursungi
  "411068": 8,   // Mundhwa
  "411012": 9,   // Koregaon Park
  "411001": 9,   // Pune Cantonment / Camp

  // ── Central Pune (9–14 km) ───────────────────────────────────────────────
  "411011": 10,  // Shivajinagar
  "411005": 10,  // Range Hills / Shivajinagar
  "411016": 11,  // Model Colony
  "411002": 11,  // Budhwar Peth
  "411030": 12,  // Sadashiv Peth
  "411004": 12,  // Deccan Gymkhana
  "411003": 12,  // Pune City / Somwar Peth
  "411037": 11,  // FC Road area (Fergusson)

  // ── South / South-East (8–15 km) ─────────────────────────────────────────
  "411040": 9,   // NIBM / Kondhwa
  "411048": 10,  // Kondhwa
  "411041": 10,  // Wanowrie
  "411022": 12,  // Katraj
  "411046": 13,  // Dhankawadi
  "411043": 13,  // Ambegaon
  "411009": 13,  // Parvati
  "411024": 14,  // Bibwewadi
  "411042": 15,  // Undri / Sus

  // ── West / Kothrud / Aundh / Baner (12–20 km) ───────────────────────────
  "411007": 12,  // Aundh (near)
  "411008": 13,  // Aundh (far)
  "411020": 13,  // Bavdhan
  "411038": 14,  // Kothrud
  "411029": 15,  // Erandwane
  "411052": 15,  // Karve Nagar
  "411045": 14,  // Pashan
  "411021": 15,  // Baner / Pashan
  "411053": 16,  // Baner (extended)
  "411067": 16,  // Sus Road / Baner
  "411023": 17,  // Paud Road / Kothrud far

  // ── Far West — Hinjewadi / Wakad / Pimpri-Chinchwad (17–22 km) ──────────
  "411057": 18,  // Hinjewadi Phase 1
  "411061": 19,  // Hinjewadi Phase 2-3
  "411033": 19,  // Wakad
  "411027": 19,  // Pimple Saudagar
  "411035": 20,  // Pimple Nilakh
  "411017": 18,  // Pimpri
  "411018": 19,  // Chinchwad
  "411019": 21,  // Chinchwad far
  "411044": 21,  // Nigdi
  "411026": 17,  // Bhosari
  "411039": 18,  // Dapodi
  "411031": 20,  // Pimpri-Chinchwad (PCMC)
  "411062": 20,  // Moshi

  // ── Far South-East (14–22 km) ────────────────────────────────────────────
  "412308": 14,  // Loni Kalbhor
  "412210": 16,  // Sanaswadi
  "412311": 18,  // Uruli Kanchan
  "411025": 18,  // Yewalewadi / Handewadi
  "411034": 20,  // Vadgaon Budruk
};

export type DeliveryEstimate =
  | { kind: "ok"; km: number; label: string; charge: string }
  | { kind: "quote"; km: number; label: string }
  | { kind: "unknown" }
  | { kind: "invalid" };

export function estimateDelivery(pincodeRaw: string): DeliveryEstimate {
  const pin = pincodeRaw.trim();
  if (!/^\d{6}$/.test(pin)) return { kind: "invalid" };

  const km = PINCODE_DISTANCE_KM[pin];
  if (km === undefined) return { kind: "unknown" };

  if (km <= 4)  return { kind: "ok", km, label: "2–4 km",   charge: "₹50+"  };
  if (km <= 8)  return { kind: "ok", km, label: "4–8 km",   charge: "₹110+" };
  if (km <= 12) return { kind: "ok", km, label: "8–12 km",  charge: "₹150+" };
  if (km <= 20) return { kind: "ok", km, label: "12–20 km", charge: "₹200+" };

  // 20+ km — known zone but needs individual quote
  return { kind: "quote", km, label: "20+ km" };
}