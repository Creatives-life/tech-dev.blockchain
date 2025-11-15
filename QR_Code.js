// Include QRCodeStyling library dynamically
const script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/qr-code-styling@1.6.0/lib/qr-code-styling.min.js";
document.head.appendChild(script);

script.onload = () => {
  const qrContainer = document.getElementById("qrContainer");
  const generateBtn = document.getElementById("generateBtn");
  const downloadBtn = document.getElementById("downloadBtn");
  const fgColor = document.getElementById("fgColor");
  const bgColor = document.getElementById("bgColor");
  const transparentBg = document.getElementById("transparentBg");
  const styleThumbs = document.querySelectorAll(".style-thumb");
  const qrResolution = document.getElementById("qrResolution");
  const enableBorder = document.getElementById("enableBorder");

  let selectedStyle = "square";
  let qrCode = null;

  // Handle style thumbnail click
  styleThumbs.forEach(img => {
    img.addEventListener("click", () => {
      styleThumbs.forEach(i => i.classList.remove("active"));
      img.classList.add("active");
      selectedStyle = img.getAttribute("data-style");
    });
  });

  // Generate QR Code
  generateBtn.addEventListener("click", () => {
    const text = document.getElementById("qrText").value.trim();
    if (!text) return alert("Please enter text or URL");

    const colorDark = fgColor.value;
    const colorLight = transparentBg.checked ? "rgba(255,255,255,0)" : bgColor.value;
    const size = parseInt(qrResolution.value);

    let dotType = "square";
    if (selectedStyle === "dots") dotType = "dots";
    if (selectedStyle === "rounded") dotType = "rounded";

    // Apply border
    qrContainer.style.border = enableBorder.checked ? "5px solid #0078d7" : "none";

    qrContainer.innerHTML = ""; // Clear old QR

    qrCode = new QRCodeStyling({
      width: size,
      height: size,
      type: "canvas",
      data: text,
      dotsOptions: {
        color: colorDark,
        type: dotType
      },
      backgroundOptions: {
        color: colorLight
      },
      cornersSquareOptions: {
        color: colorDark,
        type: "extra-rounded"
      }
    });

    qrCode.append(qrContainer);
    downloadBtn.style.display = "inline-block";
  });

  // Download QR Code
  downloadBtn.addEventListener("click", () => {
    if (qrCode) qrCode.download({ name: "qr_code", extension: "png" });
  });
};