# Eric Melparambil — Portfolio

A responsive portfolio for my work at the intersection of computer science, finance and customer service.

**Live website:** https://eric-saj22.github.io/MyPortfolio/

## Profile

- B.S. in Computer Science International, Technological University Dublin; expected graduation May 2027.
- CFA Level I candidate, with the exam scheduled for February 2027.
- Sales Assistant at Currys PC World, Blanchardstown, since September 2024. Over €1 million in personal sales with 1.8 units per transaction.
- Lead organizer of the Indian Family Club charity football tournament in August 2026: 12 teams, over 120 players, and €2,700 raised through registration fees.

## Featured projects

1. **S&P 500 Order-Flow Trading Bot** — AI-assisted research, replay and paper-trading system using Python, MCP, Alpaca API and Databento. Rule provenance, deterministic replay, walk-forward validation, baseline comparisons and staged risk gates. Live trading remains disabled pending approval.
2. **Stock Prediction Application** — Streamlit interface using Yahoo Finance historical data, ARIMA models via PMDARIMA and Matplotlib visualizations.
3. **Sentiment Analysis Application** — Random Forest classification of Twitter messages using NLTK preprocessing and TF-IDF features with n-gram support, evaluated on a held-out test set.

The stock graphic is a concept illustration, not market data or a performance claim. Project descriptions reflect the supplied CV; unavailable demos are not represented as live products.

## Design and interactions

- Graphite, ivory and soft-green palette; system typography and responsive layouts.
- Lightweight CSS glass artwork with pointer-driven perspective.
- Scroll entrances, count-up statistics and reading progress, respecting reduced-motion preferences.
- Accessible native project dialogs, mobile navigation, keyboard focus styles and a skip link.
- Expandable coursework, email-copy feedback and a downloadable current CV.
- No third-party JavaScript, build tools, tracking scripts or external font requests.

## Run locally

```sh
python3 -m http.server 8000
```

Open http://localhost:8000. No package installation or build step is required.

## Structure

- `index.html`: semantic page content and project dialog.
- `style.css`: visual system, components and motion.
- `mediaaqueries.css`: tablet and mobile layouts (existing filename retained).
- `script.js`: project details and progressive interactions.
- `assets/EM-CV.pdf`: current downloadable CV.
- `assets/favicon.svg`: portfolio favicon.

Existing image assets are retained. The legacy `styles.css` is not loaded.

## Contact

[Email](mailto:ericsaju22@gmail.com) · [LinkedIn](https://www.linkedin.com/in/eric-saju-177240256/) · [GitHub](https://github.com/Eric-saj22)
