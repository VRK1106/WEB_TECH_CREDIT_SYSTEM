# GDC Credit Management System · Web Technologies UI Components

> **Web Technologies Project Component Submission**  
> A standalone, responsive UI component system and interactive credit ledger for college clubs and developer communities.

---

## 🌐 Live Hosted Application
- **Hosted Website URL:** [https://vrk1106.github.io/WEB_TECH_CREDIT_SYSTEM/](https://vrk1106.github.io/WEB_TECH_CREDIT_SYSTEM/)
- **GitHub Repository:** [https://github.com/VRK1106/WEB_TECH_CREDIT_SYSTEM](https://github.com/VRK1106/WEB_TECH_CREDIT_SYSTEM)

---

## 📌 Project Overview
This project represents a simplified, standalone version of the Game Development Cell (GDC) Credit Management System, specifically built and formatted for the **Web Technologies project component submission**. 

It demonstrates core web technology competencies:
1. **Semantic HTML5** for structured, accessible markup.
2. **Modern CSS3** featuring CSS custom properties (variables), glassmorphism (`backdrop-filter`), CSS Flexbox, CSS Grid, and fluid responsive design without heavy external frameworks.
3. **Vanilla JavaScript (ES6+)** for reactive state handling, DOM manipulation, animated toast notifications, modal dialog management, and persistent client-side storage via `localStorage`.

---

## 🧩 UI Components Catalog

The project includes an interactive **UI Components Library** view directly in the web app where each individual component can be tested and inspected alongside its source code:

1. **Navigation Bar Component**
   - Sticky blur backdrop, responsive brand badge, view switching tabs, active user chip, and modal action triggers.
2. **Interactive Button Controls**
   - Semantic color variants (Primary Violet, Cyan, Secondary Glass, Outline, Danger), subtle micro-interaction hover lifts, and glowing box-shadows.
3. **Status Chips & Pill Badges**
   - Translucent badges for member roles, hosteller vs. day scholar statuses, attendance warnings, and credit tier indicators.
4. **Form Inputs & Search Controls**
   - Custom styled text inputs, floating selects with custom SVG arrows, and real-time search boxes with embedded SVG icons.
5. **Metric & Stat Display Cards**
   - KPI metric cards showing credit sums, member levels, attendance percentages, and ranking trends.
6. **Circular Radial Gauge & Progress Meters**
   - Dynamic SVG circular progress gauge computing `strokeDashoffset` dynamically based on target credits, plus responsive horizontal progress bars.
7. **Ledger Table & Activity Feed**
   - Responsive credit transaction feed with positive/negative color badges, and a sortable, searchable member directory table.
8. **Accessible Modal Dialogs**
   - Lightweight overlay dialogs with backdrop blur, smooth scale animation, ESC key listener, and backdrop click dismissal.
9. **Toast Notification System**
   - Animated notification alerts (Success, Error, Info) that slide into view and auto-dismiss after a configurable timeout.

---

## 🖥️ Live Views in the Web App

- **Live Dashboard (`dashboardSection`):**
  - **Member View:** Inspect credit breakdown (Meetings 3x, Events 4x, Evening Workshops 2x, Bonuses), attendance gauge, and personal activity log.
  - **Admin View:** Allocate or deduct credit points with an interactive form, live directory search, and residency filtering.
  - **Quick Member Switcher:** Easily toggle between different students (`M01` through `M08`) to preview different tiers and stats.
- **UI Components Library (`showcaseSection`):**
  - Isolated component playground showcasing raw HTML snippets and live previews.

---

## 📁 Repository Structure

```text
WEB_TECH_CREDIT_SYSTEM/
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions auto-deploy to GitHub Pages
├── css/
│   └── styles.css          # Modern CSS3 design tokens, layouts, and animations
├── js/
│   └── app.js              # Application state, DOM events, and calculations
├── .gitignore              # Standard gitignore
├── index.html              # Single page entry point with semantic HTML5
└── README.md               # Project documentation and submission details
```

---

## 🚀 Running Locally

No server setup, Node.js installation, or build step is required:

1. Clone or download this repository:
   ```bash
   git clone https://github.com/VRK1106/WEB_TECH_CREDIT_SYSTEM.git
   cd WEB_TECH_CREDIT_SYSTEM
   ```
2. Double-click `index.html` or open it with any modern web browser (Chrome, Firefox, Edge, Safari).

---

## 📄 License
MIT License. Created for the Web Technologies course component.
