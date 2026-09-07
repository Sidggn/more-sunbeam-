const defaultConfig = {
  style: "classic",
  frameColor: {
    name: "Black",
    color: "#111111"
  },
  lensColor: {
    name: "Smoke",
    color: "#4a4a4a"
  },
  templeColor: {
    name: "Black",
    color: "#111111"
  },
  size: "standard",
  material: {
    value: "plastic",
    name: "Acetate"
  },
  polarisation: "yes",
  uv: "yes",
  templeText: ""
};

let config = JSON.parse(JSON.stringify(defaultConfig));


const glasses = document.getElementById("glasses");

const lensLeft = document.querySelector(".lens-left");
const lensRight = document.querySelector(".lens-right");

const bridge = document.querySelector(".bridge");

const armLeft = document.querySelector(".arm-left");
const armRight = document.querySelector(".arm-right");

const templeNameLeft = document.getElementById("templeNameLeft");
const templeNameRight = document.getElementById("templeNameRight");

const previewName = document.getElementById("previewName");

const previewStyle = document.getElementById("previewStyle");
const previewProtection = document.getElementById("previewProtection");


/* LABELS */

const styleValue = document.getElementById("styleValue");
const frameColorValue = document.getElementById("frameColorValue");
const lensColorValue = document.getElementById("lensColorValue");
const templeColorValue = document.getElementById("templeColorValue");
const sizeValue = document.getElementById("sizeValue");
const materialValue = document.getElementById("materialValue");
const polarisationValue = document.getElementById("polarisationValue");
const uvValue = document.getElementById("uvValue");


/* SUMMARY */

const summaryName = document.getElementById("summaryName");
const summaryDescription = document.getElementById("summaryDescription");
const summaryMaterial = document.getElementById("summaryMaterial");
const summaryLens = document.getElementById("summaryLens");
const summaryProtection = document.getElementById("summaryProtection");


/* INPUT */

const templeInput = document.getElementById("templeText");
const charCount = document.getElementById("charCount");


/* BUTTONS */

const resetButton = document.getElementById("resetButton");
const saveButton = document.getElementById("saveButton");

const toast = document.getElementById("toast");


/* -------------------------------- */
/* OPTION CLICK HANDLING             */
/* -------------------------------- */

document.querySelectorAll(".option").forEach(option => {

  option.addEventListener("click", () => {

    const type = option.dataset.type;

    if (!type) return;


    /*
      Remove selected state from options
      belonging to the same category.
    */

    document
      .querySelectorAll(`.option[data-type="${type}"]`)
      .forEach(item => {
        item.classList.remove("selected");
      });

    option.classList.add("selected");


    /* STYLE */

    if (type === "style") {

      config.style = option.dataset.value;

    }


    /* FRAME COLOR */

    if (type === "frameColor") {

      config.frameColor = {
        name: option.dataset.name,
        color: option.dataset.color
      };

    }


    /* LENS COLOR */

    if (type === "lensColor") {

      config.lensColor = {
        name: option.dataset.name,
        color: option.dataset.color
      };

    }


    /* TEMPLE COLOR */

    if (type === "templeColor") {

      config.templeColor = {
        name: option.dataset.name,
        color: option.dataset.color
      };

    }


    /* SIZE */

    if (type === "size") {

      config.size = option.dataset.value;

    }


    /* MATERIAL */

    if (type === "material") {

      config.material = {
        value: option.dataset.value,
        name: option.dataset.name
      };

    }


    /* POLARISATION */

    if (type === "polarisation") {

      config.polarisation = option.dataset.value;

    }


    /* UV */

    if (type === "uv") {

      config.uv = option.dataset.value;

    }


    updatePreview();

  });

});


/* -------------------------------- */
/* TEMPLE PERSONALISATION            */
/* -------------------------------- */

templeInput.addEventListener("input", () => {

  config.templeText = templeInput.value
    .replace(/[<>]/g, "")
    .slice(0, 18);

  templeInput.value = config.templeText;

  charCount.textContent =
    `${config.templeText.length} / 18`;

  updatePreview();

});


/* -------------------------------- */
/* UPDATE PREVIEW                    */
/* -------------------------------- */

function updatePreview() {

  updateGlassesClasses();

  updateColors();

  updateLabels();

  updateSummary();

  updateTempleText();

}


/* -------------------------------- */
/* GLASSES CLASSES                   */
/* -------------------------------- */

function updateGlassesClasses() {

  glasses.className =
    `glasses style-${config.style} size-${config.size} material-${config.material.value}`;

}


/* -------------------------------- */
/* COLORS                            */
/* -------------------------------- */

function updateColors() {

  /*
    Frame
  */

  lensLeft.style.borderColor =
    config.frameColor.color;

  lensRight.style.borderColor =
    config.frameColor.color;

  bridge.style.background =
    config.frameColor.color;


  /*
    Lens
  */

  lensLeft.style.backgroundColor =
    config.lensColor.color;

  lensRight.style.backgroundColor =
    config.lensColor.color;


  /*
    Temples
  */

  armLeft.style.background =
    config.templeColor.color;

  armRight.style.background =
    config.templeColor.color;


  /*
    Make clear lenses visually transparent.
  */

  if (config.lensColor.name === "Clear") {

    lensLeft.style.opacity = "0.5";
    lensRight.style.opacity = "0.5";

  } else {

    lensLeft.style.opacity = "0.94";
    lensRight.style.opacity = "0.94";

  }


  /*
    Polarisation visual treatment
  */

  if (config.polarisation === "yes") {

    lensLeft.style.filter = "saturate(.82)";
    lensRight.style.filter = "saturate(.82)";

  } else {

    lensLeft.style.filter = "none";
    lensRight.style.filter = "none";

  }

}


/* -------------------------------- */
/* LABELS                            */
/* -------------------------------- */

function updateLabels() {

  styleValue.textContent =
    capitalize(config.style.replace("-", " "));

  frameColorValue.textContent =
    config.frameColor.name;

  lensColorValue.textContent =
    config.lensColor.name;

  templeColorValue.textContent =
    config.templeColor.name;

  sizeValue.textContent =
    capitalize(config.size);

  materialValue.textContent =
    config.material.name;

  polarisationValue.textContent =
    config.polarisation === "yes"
      ? "Yes"
      : "No";

  uvValue.textContent =
    config.uv === "yes"
      ? "Required"
      : "Not required";


  /*
    Preview footer
  */

  previewStyle.textContent =
    `${capitalize(config.style.replace("-", " "))} / ${capitalize(config.size)}`;


  let protection = [];

  if (config.uv === "yes") {

    protection.push("UV400");

  }

  if (config.polarisation === "yes") {

    protection.push("POLARISED");

  }

  if (protection.length === 0) {

    protection.push("STANDARD");

  }

  previewProtection.textContent =
    protection.join(" + ");

}


/* -------------------------------- */
/* TEMPLE TEXT                       */
/* -------------------------------- */

function updateTempleText() {

  const text =
    config.templeText.trim();


  if (text) {

    templeNameLeft.textContent = text;
    templeNameRight.textContent = text;

  } else {

    templeNameLeft.textContent = "";
    templeNameRight.textContent = "";

  }

}


/* -------------------------------- */
/* SUMMARY                           */
/* -------------------------------- */

function updateSummary() {

  const style =
    capitalize(config.style.replace("-", " "));

  const size =
    capitalize(config.size);

  summaryName.textContent =
    `${style} / ${size}`;


  let description =
    `${config.frameColor.name} ${config.material.name.toLowerCase()} frame with ${config.lensColor.name.toLowerCase()} lenses.`;


  if (config.templeText.trim()) {

    description +=
      ` Personalised with "${config.templeText.trim()}".`;

  }


  summaryDescription.textContent =
    description;


  summaryMaterial.textContent =
    config.material.name.toUpperCase();


  summaryLens.textContent =
    `${config.lensColor.name.toUpperCase()} LENSES`;


  let protection = [];

  if (config.uv === "yes") {

    protection.push("UV400");

  }

  if (config.polarisation === "yes") {

    protection.push("POLARISED");

  }


  if (protection.length === 0) {

    protection.push("STANDARD");

  }


  summaryProtection.textContent =
    protection.join(" / ");

}


/* -------------------------------- */
/* RESET                             */
/* -------------------------------- */

resetButton.addEventListener("click", () => {

  config = JSON.parse(
    JSON.stringify(defaultConfig)
  );

  restoreSelectedOptions();

  templeInput.value = "";

  charCount.textContent = "0 / 18";

  updatePreview();

  showToast("DESIGN RESET");

});


/* -------------------------------- */
/* SAVE                              */
/* -------------------------------- */

saveButton.addEventListener("click", () => {

  localStorage.setItem(
    "sunglassCustomDesign",
    JSON.stringify(config)
  );

  showToast("DESIGN SAVED");

});


/* -------------------------------- */
/* LOAD SAVED DESIGN                 */
/* -------------------------------- */

function loadSavedDesign() {

  const saved =
    localStorage.getItem(
      "sunglassCustomDesign"
    );


  if (!saved) {

    updatePreview();

    return;

  }


  try {

    const parsed =
      JSON.parse(saved);


    config = {
      ...defaultConfig,
      ...parsed
    };


    /*
      Make sure nested objects exist.
    */

    config.frameColor =
      parsed.frameColor || defaultConfig.frameColor;

    config.lensColor =
      parsed.lensColor || defaultConfig.lensColor;

    config.templeColor =
      parsed.templeColor || defaultConfig.templeColor;

    config.material =
      parsed.material || defaultConfig.material;


    templeInput.value =
      config.templeText || "";

    charCount.textContent =
      `${templeInput.value.length} / 18`;


    restoreSelectedOptions();

    updatePreview();

  } catch (error) {

    console.error(
      "Could not load saved design:",
      error
    );

    updatePreview();

  }

}


/* -------------------------------- */
/* RESTORE SELECTED OPTIONS          */
/* -------------------------------- */

function restoreSelectedOptions() {

  document.querySelectorAll(".option")
    .forEach(option => {

      option.classList.remove("selected");

    });


  /*
    Style
  */

  selectOption(
    "style",
    config.style
  );


  /*
    Frame color
  */

  selectColorOption(
    "frameColor",
    config.frameColor.name
  );


  /*
    Lens color
  */

  selectColorOption(
    "lensColor",
    config.lensColor.name
  );


  /*
    Temple color
  */

  selectColorOption(
    "templeColor",
    config.templeColor.name
  );


  /*
    Size
  */

  selectOption(
    "size",
    config.size
  );


  /*
    Material
  */

  selectOption(
    "material",
    config.material.value
  );


  /*
    Polarisation
  */

  selectOption(
    "polarisation",
    config.polarisation
  );


  /*
    UV
  */

  selectOption(
    "uv",
    config.uv
  );

}


/* -------------------------------- */
/* SELECT NORMAL OPTION              */
/* -------------------------------- */

function selectOption(type, value) {

  const option =
    document.querySelector(
      `.option[data-type="${type}"][data-value="${value}"]`
    );


  if (option) {

    option.classList.add("selected");

  }

}


/* -------------------------------- */
/* SELECT COLOR OPTION               */
/* -------------------------------- */

function selectColorOption(type, name) {

  const option =
    document.querySelector(
      `.option[data-type="${type}"][data-name="${name}"]`
    );


  if (option) {

    option.classList.add("selected");

  }

}


/* -------------------------------- */
/* CAPITALIZE                        */
/* -------------------------------- */

function capitalize(value) {

  return value
    .split(" ")
    .map(word =>
      word.charAt(0).toUpperCase() +
      word.slice(1)
    )
    .join(" ");

}


/* -------------------------------- */
/* TOAST                             */
/* -------------------------------- */

let toastTimer;

function showToast(message) {

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer =
    setTimeout(() => {

      toast.classList.remove("show");

    }, 2200);

}


/* -------------------------------- */
/* INITIALISE                        */
/* -------------------------------- */

loadSavedDesign();
