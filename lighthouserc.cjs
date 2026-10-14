// Lighthouse CI Decade — seuils lus dans decade.config.json (performance.*). Copié à la racine du projet par /build-front.
const cfg = require("./decade.config.json");
const p = cfg.performance || {};
const level = p.bloquant ? "error" : "warn";
const stack = cfg.stack;
// Les pages « compte-… » vivent sous /compte/… ; la fiche de commande est mesurée sur une commande réelle de la démo.
const ROUTES = {
  compte: "/compte",
  "compte-commandes": "/compte/commandes",
  "compte-commande": "/compte/commandes/10530",
  "compte-informations": "/compte/informations",
  "compte-magasin": "/compte/magasin",
};
const pages = (cfg.pages || []).map((slug) => (stack === "html" ? `/${slug}.html` : ROUTES[slug] || `/${slug}`));
module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      ...(stack === "html"
        ? { staticDistDir: "./dist", url: pages }
        : { startServerCommand: stack === "nextjs" ? "npm run start" : "npm run preview", url: pages.map((u) => "http://localhost:" + (stack === "nextjs" ? 4000 : 4173) + u + (stack === "nextjs" ? "/" : "")) }),
      settings: { preset: "desktop" },
    },
    assert: {
      assertions: {
        "categories:performance": [level, { minScore: (p.scoreMin ?? 85) / 100 }],
        "largest-contentful-paint": [level, { maxNumericValue: p.lcpMs ?? 2500 }],
        "cumulative-layout-shift": [level, { maxNumericValue: p.cls ?? 0.1 }],
        "total-blocking-time": [level, { maxNumericValue: p.tbtMs ?? 300 }],
        "resource-summary:script:size": [level, { maxNumericValue: (p.jsKo ?? 300) * 1024 }],
        "resource-summary:image:size": [level, { maxNumericValue: (p.imagesKo ?? 200) * 1024 }],
      },
    },
    upload: { target: "filesystem", outputDir: "./qa/lighthouse" },
  },
};
