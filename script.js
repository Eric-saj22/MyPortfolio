"use strict";

const projectDetails = {
  trading: {
    category: "RESEARCH & AUTOMATION",
    title: "S&P 500 Order-Flow Trading Bot",
    intro:
      "An AI-assisted build of a reproducible research, replay and paper-trading system for an S&P 500 futures order-flow strategy.",
    tags: ["Python", "MCP", "Alpaca API", "Databento"],
    sections: [
      {
        title: "My role",
        items: [
          "Directed an AI coding agent through a staged build covering Databento data ingestion, feature engineering and risk management.",
        ],
      },
      {
        title: "Verification before confidence",
        items: [
          "Rejected an unverified AI-generated strategy summary and required provenance for every rule.",
          "Labelled unproven interpretations as experimental rather than treating them as facts.",
        ],
      },
      {
        title: "A reproducible research pipeline",
        items: [
          "Designed deterministic replay, walk-forward validation and comparisons against baselines to avoid information leakage.",
          "Structured the risk gate as offline replay, followed by paper trading, then live review using MCP and the Alpaca API.",
        ],
      },
    ],
    note: "Live trading remains disabled pending approval. This is a research and paper-trading project; no live performance claim is made.",
  },
  stocks: {
    category: "TIME SERIES & VISUALIZATION",
    title: "Stock Prediction Application",
    intro:
      "An interactive Streamlit application for exploring stock-price history and ARIMA time-series forecasts.",
    tags: ["Python", "Streamlit", "Yahoo Finance", "PMDARIMA", "Matplotlib"],
    sections: [
      {
        title: "From data to exploration",
        items: [
          "Integrated the Yahoo Finance API to fetch historical stock data beginning in 2015.",
          "Used ARIMA models from PMDARIMA to forecast stock trends.",
          "Visualized historical and forecasted prices with Matplotlib.",
        ],
      },
      {
        title: "An interactive experience",
        items: [
          "Built a web interface with dynamic stock selection and a slider to configure the prediction period.",
        ],
      },
    ],
    note: "The portfolio graphic is a concept illustration, not actual market data or a measured forecast result.",
  },
  sentiment: {
    category: "MACHINE LEARNING & NLP",
    title: "Sentiment Analysis Application",
    intro:
      "A Random Forest pipeline for classifying Twitter messages as positive or negative.",
    tags: ["Python", "Random Forest", "NLTK", "TF-IDF"],
    sections: [
      {
        title: "Preparing language for a model",
        items: [
          "Removed stop words, punctuation and numeric characters from raw text.",
          "Applied NLTK lemmatization and engineered TF-IDF features with n-gram support.",
        ],
      },
      {
        title: "Classification and evaluation",
        items: [
          "Used a Random Forest classifier to identify positive and negative messages.",
          "Evaluated classification performance on a held-out test set.",
        ],
      },
    ],
    note: "The pipeline graphic illustrates the approach. No unverified accuracy figure is presented.",
  },
};

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const menuButton = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

function setMenu(open) {
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation",
  );
  mobileMenu.hidden = !open;
}
menuButton.addEventListener("click", () => setMenu(mobileMenu.hidden));
mobileMenu
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", () => setMenu(false)));
document.addEventListener("click", (event) => {
  if (!mobileMenu.hidden && !event.target.closest(".site-header"))
    setMenu(false);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !mobileMenu.hidden) {
    setMenu(false);
    menuButton.focus();
  }
});
window.matchMedia("(min-width: 601px)").addEventListener("change", (event) => {
  if (event.matches) setMenu(false);
});

// Native dialogs provide keyboard focus containment, Escape dismissal and focus return.
const dialog = document.querySelector("#project-dialog");
const dialogBody = document.querySelector("#dialog-body");
const dialogTags = document.querySelector("#dialog-tags");
let projectTrigger = null;
document.querySelectorAll(".project-open").forEach((button) => {
  button.addEventListener("click", () => {
    const project = projectDetails[button.dataset.project];
    if (!project) return;
    projectTrigger = button;
    document.querySelector("#dialog-category").textContent = project.category;
    document.querySelector("#dialog-title").textContent = project.title;
    document.querySelector("#dialog-intro").textContent = project.intro;
    dialogTags.replaceChildren(
      ...project.tags.map((tag) => {
        const element = document.createElement("span");
        element.textContent = tag;
        return element;
      }),
    );
    dialogBody.replaceChildren();
    project.sections.forEach((section) => {
      const heading = document.createElement("h3");
      heading.textContent = section.title;
      const list = document.createElement("ul");
      section.items.forEach((item) => {
        const line = document.createElement("li");
        line.textContent = item;
        list.append(line);
      });
      dialogBody.append(heading, list);
    });
    const note = document.createElement("p");
    note.className = "dialog-note";
    note.textContent = project.note;
    dialogBody.append(note);
    document.body.classList.add("modal-open");
    dialog.showModal();
    dialog.scrollTop = 0;
  });
});
document
  .querySelector(".dialog-close")
  .addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  const bounds = dialog.getBoundingClientRect();
  if (
    event.target === dialog &&
    (event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom)
  )
    dialog.close();
});
dialog.addEventListener("close", () => {
  document.body.classList.remove("modal-open");
  projectTrigger?.focus({ preventScroll: true });
});

// Clipboard failure leaves the original, selectable mail link available.
const copyButton = document.querySelector(".copy-email");
const copyStatus = document.querySelector(".copy-status");
let copyTimer;
copyButton.addEventListener("click", async () => {
  clearTimeout(copyTimer);
  try {
    await navigator.clipboard.writeText("ericsaju22@gmail.com");
    copyStatus.textContent = "Email copied.";
  } catch {
    copyStatus.textContent = "Select the email address to copy it.";
  }
  copyTimer = setTimeout(() => {
    copyStatus.textContent = "";
  }, 4000);
});

// One-time entrances and counters. All essential content exists in the HTML.
function formatCount(value, format) {
  if (format === "sales")
    return `€${(value / 1000000).toFixed(1).replace(".0", "")}m+`;
  if (format === "decimal") return value.toFixed(1);
  if (format === "plus") return `${Math.round(value)}+`;
  if (format === "euro") return `€${Math.round(value).toLocaleString("en-IE")}`;
  return String(Math.round(value));
}
function animateCount(element) {
  const original = element.textContent;
  const target = Number(element.dataset.count);
  const start = performance.now();
  element.setAttribute("aria-label", original);
  function frame(now) {
    const progress = Math.min((now - start) / 1100, 1);
    if (reducedMotion.matches) {
      element.textContent = original;
      return;
    }
    element.textContent = formatCount(
      target * (1 - Math.pow(1 - progress, 3)),
      element.dataset.format,
    );
    if (progress < 1) requestAnimationFrame(frame);
    else element.textContent = original;
  }
  requestAnimationFrame(frame);
}
if ("IntersectionObserver" in window) {
  if (!reducedMotion.matches) {
    document.documentElement.classList.add("motion-ready");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    document
      .querySelectorAll(".reveal")
      .forEach((element) => revealObserver.observe(element));
    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            countObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.8 },
    );
    document
      .querySelectorAll("[data-count]")
      .forEach((element) => countObserver.observe(element));
  }
}
reducedMotion.addEventListener("change", (event) => {
  if (event.matches) document.documentElement.classList.remove("motion-ready");
});

// Schedule scroll work once per frame; do not intercept native scrolling.
const progressBar = document.querySelector(".scroll-progress");
const trackedSections = [...document.querySelectorAll("main > section[id]")];
const navLinks = [...document.querySelectorAll(".desktop-links a")];
let scrollQueued = false;
function updateScroll() {
  const height = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.transform = `scaleX(${height > 0 ? Math.min(window.scrollY / height, 1) : 0})`;
  let active = "";
  trackedSections.forEach((section) => {
    if (section.getBoundingClientRect().top <= window.innerHeight * 0.35)
      active = `#${section.id}`;
  });
  navLinks.forEach((link) => {
    if (link.getAttribute("href") === active)
      link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
  scrollQueued = false;
}
function scheduleScroll() {
  if (!scrollQueued) {
    scrollQueued = true;
    requestAnimationFrame(updateScroll);
  }
}
window.addEventListener("scroll", scheduleScroll, { passive: true });
window.addEventListener("resize", scheduleScroll, { passive: true });
updateScroll();

// Small pointer-driven changes in perspective only on devices with a fine pointer.
const art = document.querySelector(".hero-art");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
art.addEventListener("pointermove", (event) => {
  if (reducedMotion.matches || !finePointer.matches) return;
  const rect = art.getBoundingClientRect();
  art.style.setProperty(
    "--pointer-x",
    `${((event.clientX - rect.left) / rect.width - 0.5) * 12}deg`,
  );
  art.style.setProperty(
    "--pointer-y",
    `${((event.clientY - rect.top) / rect.height - 0.5) * -8}deg`,
  );
});
art.addEventListener("pointerleave", () => {
  art.style.setProperty("--pointer-x", "0deg");
  art.style.setProperty("--pointer-y", "0deg");
});
