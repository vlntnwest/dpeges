const dpeInput = document.getElementById("dpe-input");
const gesInput = document.getElementById("ges-input");
const dpeCursor = document.getElementById("dpe-cursor");
const gesCursor = document.getElementById("ges-cursor");
const dpeLabel = document.getElementById("dpe-label");
const gesLabel = document.getElementById("ges-label");
const dpeTitle = document.getElementById("dpe-title");
const gesTitle = document.getElementById("ges-title");
const dpeCursorContainer = document.getElementById("dpe-cursor-container");
const gesCursorContainer = document.getElementById("ges-cursor-container");

const handleSubmit = (e) => {
  e.preventDefault();

  const dpeValue = dpeInput.value;
  const gesValue = gesInput.value;

  const dpeLabelValue =
    dpeValue <= 50
      ? "A"
      : dpeValue <= 90
      ? "B"
      : dpeValue <= 150
      ? "C"
      : dpeValue <= 230
      ? "D"
      : dpeValue <= 330
      ? "E"
      : dpeValue <= 450
      ? "F"
      : "G";

  const gesLabelValue =
    gesValue <= 5
      ? "A"
      : gesValue <= 10
      ? "B"
      : gesValue <= 20
      ? "C"
      : gesValue <= 35
      ? "D"
      : gesValue <= 55
      ? "E"
      : gesValue <= 80
      ? "F"
      : "G";

  const DPE_POSITIONS = {
    A: 0,
    B: 25,
    C: 50,
    D: 75,
    E: 100,
    F: 125,
    G: 150,
  };

  const cursorPosition = (value) => DPE_POSITIONS[value] ?? 150;

  if (dpeValue > 0) {
    dpeCursor.textContent = dpeValue;
    dpeTitle.textContent = `${dpeValue} kWhEP/m²/an`;
    dpeLabel.textContent = dpeLabelValue;
    dpeCursorContainer.style.transform = `matrix(1,0,0,1,0,${cursorPosition(
      dpeLabelValue
    )})`;
  }

  if (gesValue > 0) {
    gesCursor.textContent = gesValue;
    gesTitle.textContent = `${gesValue} kgeqCO2/m²/an`;
    gesLabel.textContent = gesLabelValue;
    gesCursorContainer.style.transform = `matrix(1,0,0,1,0,${cursorPosition(
      gesLabelValue
    )})`;
  }

  e.target.reset();
};
