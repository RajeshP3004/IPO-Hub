const state = { ipos: [], lots: new Map(), filter: "all" };
const money = amount => `₹${Math.round(amount).toLocaleString("en-IN")}`;
const date = value => value ? new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short" }).format(new Date(value)) : "TBA";

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".filter").forEach(button => button.addEventListener("click", () => {
    state.filter = button.dataset.filter;
    document.querySelectorAll(".filter").forEach(item => item.classList.toggle("active", item === button));
    renderIpos();
  }));
  document.getElementById("apply-button").addEventListener("click", openReview);
  document.getElementById("close-modal").addEventListener("click", closeReview);
  document.getElementById("cancel-review").addEventListener("click", closeReview);
  document.getElementById("confirm-application").addEventListener("click", () => { closeReview(); showToast("Your selection has been saved for review."); });
  document.getElementById("review-modal").addEventListener("click", event => { if (event.target.id === "review-modal") closeReview(); });
  fetchIpos();
});

async function fetchIpos() {
  const empty = document.getElementById("empty-state");
  try {
    const response = await fetch("/api/ipos/");
    if (!response.ok) throw new Error("Unable to load IPOs");
    state.ipos = await response.json();
    empty.hidden = state.ipos.length > 0;
    empty.textContent = state.ipos.length ? "" : "No IPOs have been added yet.";
    document.getElementById("open-count").textContent = state.ipos.length;
    document.getElementById("all-count").textContent = state.ipos.length;
    renderIpos();
  } catch (error) {
    empty.hidden = false;
    empty.textContent = "Could not load IPOs. Make sure the backend is running.";
    console.error("Error fetching IPOs:", error);
  }
}

function renderIpos() {
  const list = document.getElementById("ipo-list");
  list.innerHTML = "";
  state.ipos.filter(matchesFilter).forEach(ipo => {
    const lots = state.lots.get(ipo.id) || 0;
    const card = document.createElement("article");
    card.className = "ipo-card";
    card.innerHTML = `<div class="ipo-top"><div><div class="ipo-segment ${isSme(ipo) ? "sme" : ""}">${escapeHtml(ipo.segment || "Mainboard")}</div><h3>${escapeHtml(ipo.name)}</h3><div class="ipo-meta">${escapeHtml(ipo.symbol)} · Lot size ${ipo.lot_size.toLocaleString("en-IN")} · Closes ${date(ipo.close_date)}</div></div><div class="price"><strong>${money(ipo.cutoff_price || ipo.price_max)}</strong><span>Cut-off price</span></div></div><div class="application-row"><div class="lot-copy"><strong>Select lots</strong><span>${money(ipo.price_min)} – ${money(ipo.price_max)} · ${ipo.minimum_lots || 1}–${ipo.maximum_lots || "—"} lots</span></div><div class="lot-controls"><div class="stepper"><button type="button" aria-label="Remove lot">−</button><span>${lots}</span><button type="button" aria-label="Add lot">+</button></div><strong class="lot-amount">${lots ? money(lots * priceFor(ipo) * ipo.lot_size) : "—"}<span>${lots ? "Estimated amount" : "No lots"}</span></strong></div></div>`;
    const [minus, plus] = card.querySelectorAll(".stepper button");
    minus.addEventListener("click", () => changeLots(ipo, -1));
    plus.addEventListener("click", () => changeLots(ipo, 1));
    list.appendChild(card);
  });
  updateSummary();
}

function isSme(ipo) { return String(ipo.segment || "").toLowerCase().includes("sme"); }
function matchesFilter(ipo) { return state.filter === "all" || (state.filter === "sme" ? isSme(ipo) : !isSme(ipo)); }
function priceFor(ipo) { return Number(ipo.cutoff_price || ipo.price_max || 0); }
function changeLots(ipo, change) { const next = Math.max(0, Math.min((ipo.maximum_lots || 100), (state.lots.get(ipo.id) || 0) + change)); state.lots.set(ipo.id, next); renderIpos(); }
function selections() { return state.ipos.filter(ipo => (state.lots.get(ipo.id) || 0) > 0).map(ipo => ({ ipo, lots: state.lots.get(ipo.id), amount: state.lots.get(ipo.id) * priceFor(ipo) * ipo.lot_size })); }
function updateSummary() { const selected = selections(), total = selected.reduce((sum, item) => sum + item.amount, 0), lots = selected.reduce((sum, item) => sum + item.lots, 0); document.getElementById("stat-issues").textContent = state.ipos.length; document.getElementById("stat-lots").textContent = lots; document.getElementById("stat-total").textContent = money(total); document.getElementById("sidebar-total").textContent = money(total); const box = document.getElementById("selection-list"); box.innerHTML = selected.length ? selected.map(item => `<div class="selection-item"><span>${escapeHtml(item.ipo.name)} · ${item.lots} lot${item.lots === 1 ? "" : "s"}</span><strong>${money(item.amount)}</strong></div>`).join("") : '<span class="summary-empty">No lots selected yet.</span>'; document.getElementById("apply-button").disabled = !selected.length; }
function openReview() { const selected = selections(); document.getElementById("review-details").innerHTML = selected.map(item => `<div><strong>${escapeHtml(item.ipo.name)}</strong><br>${item.lots} lot${item.lots === 1 ? "" : "s"} · ${money(item.amount)}</div>`).join("<hr>") + `<hr><strong>Total estimated investment: ${money(selected.reduce((sum, item) => sum + item.amount, 0))}</strong>`; document.getElementById("review-modal").hidden = false; }
function closeReview() { document.getElementById("review-modal").hidden = true; }
function showToast(message) { const toast = document.getElementById("toast"); toast.textContent = `✓ ${message}`; toast.classList.add("show"); setTimeout(() => toast.classList.remove("show"), 3500); }
function escapeHtml(value) { return String(value ?? "").replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]); }
