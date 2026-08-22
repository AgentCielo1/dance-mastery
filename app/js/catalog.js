// The Global Dance Catalog — every dance we can verify, one page.
// Full packs link into the app; everything else shows its family, origin,
// essence, and the real-world scene where it lives (the mission made visible).

import catalog from "./data/catalog.js";
import { STYLES, styleName } from "./data/styles.js";

const $ = (s) => document.querySelector(s);

const FAMILY_META = [
  ["street", "Street & Hip-Hop Family"],
  ["club", "Club & House Family"],
  ["ballroom_scene", "Ballroom Scene (Vogue)"],
  ["dancehall_caribbean", "Dancehall & Caribbean Club"],
  ["afro_club", "African Club Styles"],
  ["electronic", "Electronic & Rave"],
  ["commercial", "Commercial & Pop"],
  ["ballroom_standard", "Ballroom — Standard & Smooth"],
  ["ballroom_latin", "Ballroom — Latin & Rhythm"],
  ["swing", "The Swing Family"],
  ["latin_social", "Latin Social"],
  ["brazilian", "Brazilian Partner Dances"],
  ["afro_partner", "African & Diaspora Partner Dances"],
  ["caribbean_social", "Caribbean Social & Roots"],
  ["country_western", "Country & Western"],
  ["disco_hustle", "Disco & Hustle"],
  ["folk_partner", "European & Folk Partner Dances"],
  ["south_asian", "South Asian Classical & Folk"],
  ["mena", "Middle East & North Africa"],
  ["east_asian", "East & Southeast Asian"],
  ["european_folk", "European Folk & Step Dance"],
  ["african_traditional", "African Traditional & Ceremonial"],
  ["latin_folk", "Latin American Folk"],
  ["oceanian", "Oceania & Pacific"],
  ["north_american", "North American Vernacular & Concert"],
  ["concert", "Concert & Theatrical"],
  ["adaptive", "Adaptive & Integrated Dance"],
];

const packByName = {};
for (const id of Object.keys(STYLES)) packByName[styleName(id).toLowerCase()] = id;

function packLink(style) {
  // a catalog entry with a full pack (by explicit id or name match)
  const id = style.pack ?? packByName[style.name.toLowerCase()];
  return id && STYLES[id] ? id : null;
}

let query = "";

function matches(s) {
  if (!query) return true;
  const q = query.toLowerCase();
  return [s.name, s.region, s.family, s.origin, s.essence, s.scene]
    .some((f) => (f ?? "").toLowerCase().includes(q));
}

function render() {
  const bySection = new Map(FAMILY_META.map(([k]) => [k, []]));
  const other = [];
  let shown = 0;
  for (const s of catalog.styles) {
    if (!matches(s)) continue;
    shown++;
    (bySection.get(s.family) ?? other).push(s);
  }

  $("#stats").textContent =
    `${catalog.styles.length} dances · ${new Set(catalog.styles.map((s) => s.family)).size} families · ` +
    `${Object.keys(STYLES).length} full training packs` +
    (query ? ` · showing ${shown}` : "");

  $("#sections").innerHTML = FAMILY_META.map(([key, label]) => {
    const rows = bySection.get(key) ?? [];
    if (!rows.length) return "";
    return `<section><h2>${label} <span class="count">${rows.length}</span></h2>` +
      rows.map((s) => {
        const pid = packLink(s);
        return `<details class="dance">
          <summary>
            <strong>${s.name}</strong>
            <span class="region">${s.region}</span>
            ${pid ? `<a class="pack" href="index.html?style=${pid}">✦ full pack — train it</a>` : ""}
            ${s.sacred ? `<span class="sacred">community-held</span>` : ""}
          </summary>
          <p><b>Origin.</b> ${s.origin}</p>
          <p><b>Essence.</b> ${s.essence}</p>
          <p><b>Where it lives.</b> ${s.scene}</p>
          <p class="find"><a href="https://www.youtube.com/results?search_query=${encodeURIComponent(s.name + " dance")}" target="_blank" rel="noopener">▶ watch real dancers ↗</a></p>
        </details>`;
      }).join("") + `</section>`;
  }).join("") + (other.length ? `<section><h2>More</h2>${other.map((s) => `<p>${s.name}</p>`).join("")}</section>` : "");
}

$("#q").addEventListener("input", (e) => { query = e.target.value.trim(); render(); });
render();
