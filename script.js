/**
 * Valentine's Day Proposal - Behavior
 * Customize CONFIG below (name, messages, cat image URLs, thresholds).
 */

(function () {
  "use strict";

  // ========== CONFIG (easy to customize) ==========
  const CONFIG = {
    // Add a name for "Will you be my Valentine, [Name]?" — leave empty for no name
    name: "Ozavisa Obioma",

    // After this many "No" clicks, the button text starts cycling through noMessages
    noClickCountForMessages: 3,

    // After this many "No" clicks, we give up and show "Okay fine" / hide No / force Yes
    noClickCountForGiveUp: 10,

    // Messages that cycle when they keep clicking No (after threshold)
    noMessages: [
      "Wait... really? 🥺",
      "Think again pls...",
      "My heart is breaking...",
      "Pretty please? 🐱",
      "You wouldn't do this to a cat lover 😿",
      "Error 404: No option found",
      "Try Yes instead? 😉",
    ],

    // Cat reaction images (show in modal on No clicks). Replace with your own tenor/imgur links.
    // Example tenor: https://media.tenor.com/images/.../xxx.gif
    catImageUrls: [
      "https://placekitten.com/300/300?image=1",
      "https://placekitten.com/300/300?image=2",
      "https://placekitten.com/300/300?image=3",
      "https://placekitten.com/300/300?image=4",
      "https://placekitten.com/300/300?image=5",
      "https://placekitten.com/300/300?image=6",
    ],

    // Captions shown under the cat image (random one per popup)
    catCaptions: [
      "This is fine. 🐱",
      "How could you...",
      "I'm not mad. Just disappointed.",
      "The cat is judging you.",
      "Say yes for the cats.",
    ],
  };

  // ========== STATE ==========
  let noClickCount = 0;
  let yesScale = 1;
  const scaleIncrement = 0.1;
  const maxYesScale = 2;

  // ========== DOM REFERENCES ==========
  const proposalScreen = document.getElementById("proposalScreen");
  const nameSuffix = document.getElementById("nameSuffix");
  const btnYes = document.getElementById("btnYes");
  const btnNo = document.getElementById("btnNo");
  const celebrationOverlay = document.getElementById("celebrationOverlay");
  const confettiContainer = document.getElementById("confettiContainer");
  const heartsFloat = document.getElementById("heartsFloat");
  const catModal = document.getElementById("catModal");
  const catImage = document.getElementById("catImage");
  const catCaption = document.getElementById("catCaption");
  const catModalClose = document.getElementById("catModalClose");
  const forceYesModal = document.getElementById("forceYesModal");
  const forceYesBtn = document.getElementById("forceYesBtn");

  // ========== INIT: Set heading name ==========
  if (CONFIG.name && CONFIG.name.trim()) {
    nameSuffix.textContent = ", " + CONFIG.name.trim();
  }

  // ========== YES BUTTON ==========
  function showCelebration() {
    celebrationOverlay.classList.remove("hidden");
    triggerConfetti();
    triggerFloatingHearts();
  }

  function triggerConfetti() {
    const colors = ["#ff6b9d", "#ff9ebb", "#e85d7a", "#7cba7c", "#fff8f0"];
    const hearts = ["💕", "💖", "♥", "💗", "❤"];
    const count = 50;

    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      el.className = "confetti-piece";
      const isHeart = Math.random() > 0.5;
      if (isHeart) {
        el.classList.add("heart-char");
        el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        el.style.left = Math.random() * 100 + "%";
        el.style.animationDelay = Math.random() * 0.5 + "s";
        el.style.animationDuration = 2 + Math.random() * 2 + "s";
      } else {
        el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        el.style.left = Math.random() * 100 + "%";
        el.style.animationDelay = Math.random() * 0.5 + "s";
        el.style.animationDuration = 2.5 + Math.random() * 1.5 + "s";
      }
      confettiContainer.appendChild(el);
      setTimeout(function () {
        el.remove();
      }, 5000);
    }
  }

  function triggerFloatingHearts() {
    const symbols = ["💖", "💕", "♥", "💗"];
    for (let i = 0; i < 12; i++) {
      const el = document.createElement("span");
      el.className = "heart heart-float";
      el.textContent = symbols[i % symbols.length];
      el.style.cssText =
        "position:absolute;font-size:2rem;left:" +
        Math.random() * 100 +
        "%;top:" +
        Math.random() * 100 +
        "%;animation:float-heart 4s ease-in-out infinite;animation-delay:" +
        Math.random() * 2 +
        "s;pointer-events:none;";
      heartsFloat.appendChild(el);
      setTimeout(function () {
        el.remove();
      }, 6000);
    }
  }

  btnYes.addEventListener("click", function () {
    showCelebration();
  });

  forceYesBtn.addEventListener("click", function () {
    forceYesModal.classList.add("hidden");
    showCelebration();
  });

  // ========== NO BUTTON ==========
  function getRandomPosition() {
    const btn = btnNo.getBoundingClientRect();
    // Larger padding on mobile so button stays away from notch/edges
    const padding = window.innerWidth < 500 ? 40 : 20;
    const maxX = window.innerWidth - btn.width - padding;
    const maxY = window.innerHeight - btn.height - padding;
    const x = Math.max(padding, Math.min(maxX, Math.random() * Math.max(0, maxX)));
    const y = Math.max(padding, Math.min(maxY, Math.random() * Math.max(0, maxY)));
    return { x, y };
  }

  function moveNoButton() {
    btnNo.classList.add("no-running");
    const pos = getRandomPosition();
    btnNo.style.position = "fixed";
    btnNo.style.left = pos.x + "px";
    btnNo.style.top = pos.y + "px";
    btnNo.style.transform = "scale(" + (1 - noClickCount * 0.03) + ")";
    if (noClickCount >= CONFIG.noClickCountForMessages) {
      const idx = (noClickCount - CONFIG.noClickCountForMessages) % CONFIG.noMessages.length;
      btnNo.textContent = CONFIG.noMessages[idx];
    }
  }

  function growYesButton() {
    yesScale = Math.min(maxYesScale, 1 + noClickCount * scaleIncrement);
    btnYes.style.transform = "scale(" + yesScale + ")";
  }

  function showCatModal() {
    const url =
      CONFIG.catImageUrls[Math.floor(Math.random() * CONFIG.catImageUrls.length)];
    const caption =
      CONFIG.catCaptions[Math.floor(Math.random() * CONFIG.catCaptions.length)];
    catImage.src = url;
    catImage.alt = "Reaction";
    catCaption.textContent = caption;
    catModal.classList.remove("hidden");
  }

  function hideCatModal() {
    catModal.classList.add("hidden");
  }

  catModalClose.addEventListener("click", hideCatModal);
  catModal.addEventListener("click", function (e) {
    if (e.target === catModal) hideCatModal();
  });

  function giveUpNo() {
    btnNo.style.display = "none";
    forceYesModal.classList.remove("hidden");
  }

  btnNo.addEventListener("click", function () {
    noClickCount += 1;

    // First few clicks: move the No button around
    if (noClickCount <= 2) {
      moveNoButton();
    } else {
      moveNoButton();
      if (noClickCount >= CONFIG.noClickCountForMessages) {
        const idx =
          (noClickCount - CONFIG.noClickCountForMessages) %
          CONFIG.noMessages.length;
        btnNo.textContent = CONFIG.noMessages[idx];
      }
    }

    growYesButton();

    // Show cat popup every No click (or every 2nd if you prefer)
    showCatModal();

    if (noClickCount >= CONFIG.noClickCountForGiveUp) {
      giveUpNo();
    }
  });

  // Optional: make "No" slightly harder on first hover (tease)
  btnNo.addEventListener("mouseenter", function () {
    if (noClickCount === 0) {
      const dx = (Math.random() - 0.5) * 30;
      const dy = (Math.random() - 0.5) * 30;
      btnNo.style.transform = "translate(" + dx + "px," + dy + "px)";
    }
  });
  btnNo.addEventListener("mouseleave", function () {
    if (noClickCount === 0) {
      btnNo.style.transform = "";
    }
  });
})();
