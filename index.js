const ENERGY_THRESHOLDS = {
  A: 50,
  B: 90,
  C: 150,
  D: 230,
  E: 330,
  F: 450,
};

const GES_THRESHOLDS = {
  A: 5,
  B: 10,
  C: 20,
  D: 35,
  E: 55,
  F: 80,
};

const CURSOR_POSITIONS = {
  A: 0,
  B: 25,
  C: 50,
  D: 75,
  E: 100,
  F: 125,
  G: 150,
};

const UNITS = {
  DPE: "kWhEP/m²/an",
  GES: "kgeqCO2/m²/an",
};

// DOM Elements
const elements = {
  dpe: {
    input: document.getElementById("dpe-input"),
    cursor: document.getElementById("dpe-cursor"),
    label: document.getElementById("dpe-label"),
    title: document.getElementById("dpe-title"),
    cursorContainer: document.getElementById("dpe-cursor-container"),
  },
  ges: {
    input: document.getElementById("ges-input"),
    cursor: document.getElementById("ges-cursor"),
    label: document.getElementById("ges-label"),
    title: document.getElementById("ges-title"),
    cursorContainer: document.getElementById("ges-cursor-container"),
  },
};

// Utility functions
const getEnergyLabel = (value) => {
  if (!value || isNaN(value) || value < 0) return null;

  for (const [label, threshold] of Object.entries(ENERGY_THRESHOLDS)) {
    if (value <= threshold) return label;
  }
  return "G";
};

const getGesLabel = (value) => {
  if (!value || isNaN(value) || value < 0) return null;

  for (const [label, threshold] of Object.entries(GES_THRESHOLDS)) {
    if (value <= threshold) return label;
  }
  return "G";
};

const getCursorPosition = (label) => {
  return CURSOR_POSITIONS[label] ?? CURSOR_POSITIONS.G;
};

// Display update functions
const updateDpeDisplay = (value) => {
  const label = getEnergyLabel(value);
  if (!label) return false;

  elements.dpe.cursor.textContent = value;
  elements.dpe.title.textContent = `${value} ${UNITS.DPE}`;
  elements.dpe.label.textContent = label;
  elements.dpe.cursorContainer.style.transform = `matrix(1,0,0,1,0,${getCursorPosition(
    label
  )})`;
  return true;
};

const updateGesDisplay = (value) => {
  const label = getGesLabel(value);
  if (!label) return false;

  elements.ges.cursor.textContent = value;
  elements.ges.title.textContent = `${value} ${UNITS.GES}`;
  elements.ges.label.textContent = label;
  elements.ges.cursorContainer.style.transform = `matrix(1,0,0,1,0,${getCursorPosition(
    label
  )})`;
  return true;
};

// Event handler
const handleSubmit = (e) => {
  e.preventDefault();

  const dpeValue = parseFloat(elements.dpe.input.value);
  const gesValue = parseFloat(elements.ges.input.value);

  const dpeUpdated = updateDpeDisplay(dpeValue);
  const gesUpdated = updateGesDisplay(gesValue);

  if (!dpeUpdated) {
    console.error("Valeur DPE invalide");
  }

  if (!gesUpdated) {
    console.error("Valeur GES invalide");
  }

  if (dpeUpdated || gesUpdated) {
    e.target.reset();
  }
};

// Event listeners
document.querySelector("form")?.addEventListener("submit", handleSubmit);

// Optional: Add input validation
elements.dpe.input.addEventListener("input", (e) => {
  const value = parseFloat(e.target.value);
  if (value < 0) e.target.value = 0;
});

elements.ges.input.addEventListener("input", (e) => {
  const value = parseFloat(e.target.value);
  if (value < 0) e.target.value = 0;
});
