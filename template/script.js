const config = window.templateConfig || {};

const setText = (id, value) => {
  const node = document.getElementById(id);
  if (node && value) node.textContent = value;
};

setText("kicker", config.kicker);
setText("title", config.title);
setText("subtitle", config.subtitle);
setText("displayName", config.displayName);
setText("displayBio", config.displayBio);
setText("instagramHandle", config.instagramHandle);
setText("snapchatHandle", config.snapchatHandle);

const typeTabTitle = (text) => {
  const fullText = text || "N.Rishitha";
  let index = 0;
  let deleting = false;

  window.setInterval(() => {
    document.title = fullText.slice(0, index) || " ";

    if (!deleting) {
      index += 1;
      if (index > fullText.length + 8) deleting = true;
    } else {
      index -= 1;
      if (index < 1) deleting = false;
    }
  }, deleting ? 95 : 150);
};

typeTabTitle(config.tabTitle);

const avatarImage = document.getElementById("avatarImage");
if (avatarImage && config.avatarImage) {
  avatarImage.src = config.avatarImage;
}

const instagramLink = document.getElementById("instagramLink");
if (instagramLink && config.instagramUrl) {
  instagramLink.href = config.instagramUrl;
}

const snapchatLink = document.getElementById("snapchatLink");
if (snapchatLink && config.snapchatUrl) {
  snapchatLink.href = config.snapchatUrl;
}

if (config.accentColor) {
  document.documentElement.style.setProperty("--accent", config.accentColor);
}

if (config.secondAccentColor) {
  document.documentElement.style.setProperty("--accent-2", config.secondAccentColor);
}

const wallpaper = document.getElementById("wallpaper");
if (wallpaper && config.wallpaper) {
  wallpaper.style.backgroundImage = `url("${config.wallpaper}")`;
}

const spotifyMount = document.getElementById("spotifyMount");
const getSpotifyEmbedUrl = () => {
  if (!config.spotifyUrl) return "";
  const trackMatch = config.spotifyUrl.match(/track\/([^?]+)/);
  if (!trackMatch?.[1]) return "";
  return `https://open.spotify.com/embed/track/${trackMatch[1]}?utm_source=generator&autoplay=1`;
};

const mountSpotifyPlayer = () => {
  if (!spotifyMount || spotifyMount.querySelector("iframe")) return;
  const spotifyUrl = getSpotifyEmbedUrl();
  if (!spotifyUrl) return;

  const iframe = document.createElement("iframe");
  iframe.dataset.testid = "embed-iframe";
  iframe.style.borderRadius = "12px";
  iframe.src = spotifyUrl;
  iframe.width = "100%";
  iframe.height = "352";
  iframe.frameBorder = "0";
  iframe.allowFullscreen = true;
  iframe.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
  iframe.loading = "lazy";
  spotifyMount.appendChild(iframe);
};

const cursorHeart = document.getElementById("cursorHeart");
const cursorTrail = document.getElementById("cursorTrail");
let lastTrailAt = 0;

const addTrailHeart = (x, y) => {
  if (!cursorTrail) return;
  const heart = document.createElement("span");
  heart.className = "trail-heart";
  heart.textContent = "\u2665";
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  heart.style.setProperty("--drift", `${Math.random() * 34 - 17}px`);
  cursorTrail.appendChild(heart);
  window.setTimeout(() => heart.remove(), 950);
};

window.addEventListener("pointermove", (event) => {
  if (cursorHeart) {
    cursorHeart.style.left = `${event.clientX}px`;
    cursorHeart.style.top = `${event.clientY}px`;
  }

  const now = performance.now();
  if (now - lastTrailAt > 45) {
    addTrailHeart(event.clientX, event.clientY);
    lastTrailAt = now;
  }
});

const stars = [...document.querySelectorAll(".stars span")];
window.addEventListener("pointermove", (event) => {
  stars.forEach((star) => {
    const rect = star.getBoundingClientRect();
    const starX = rect.left + rect.width / 2;
    const starY = rect.top + rect.height / 2;
    const distance = Math.hypot(event.clientX - starX, event.clientY - starY);

    if (distance < 90) {
      const pushX = (starX - event.clientX) / 5;
      const pushY = (starY - event.clientY) / 5;
      star.classList.add("is-active");
      star.style.marginLeft = `${pushX}px`;
      star.style.marginTop = `${pushY}px`;
    } else {
      star.classList.remove("is-active");
      star.style.marginLeft = "0px";
      star.style.marginTop = "0px";
    }
  });
});

const entryGate = document.getElementById("entryGate");
const entryButton = document.getElementById("entryButton");
entryButton?.addEventListener("click", () => {
  entryGate?.classList.add("is-hidden");
  mountSpotifyPlayer();
});
