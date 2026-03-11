# Kuzman Consulting - R Tutorials 📊

Interactive R tutorials with learnr, styled with Kuzman Consulting branding.

## Quick Start

### 1. Clone or Download This Repository

```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

Or download as ZIP and extract.

### 2. Install Required Packages

```r
install.packages(c("learnr", "htmltools", "rmarkdown"))
```

### 3. Open and Run a Tutorial

1. Open RStudio
2. Navigate to `tutorials/` folder
3. Open any `.Rmd` file
4. Click **"Run Document"** button in RStudio

That's it! No package installation needed.

## Creating New Tutorials

### Method 1: Duplicate Template

1. Copy `tutorials/tutorial_template.Rmd`
2. Rename it (e.g., `my_new_tutorial.Rmd`)
3. Edit the content
4. Run it!

### Method 2: Start from Scratch

Copy this header into a new `.Rmd` file in the `tutorials/` folder:

````markdown
---
title: "Your Tutorial Title"
output: 
  learnr::tutorial:
    progressive: true
    allow_skip: true
runtime: shiny_prerendered
---

```{r setup, include=FALSE}
library(learnr)
knitr::opts_chunk$set(echo = FALSE)
```

```{r load-branding, echo=FALSE}
# Load Kuzman Consulting branding (CSS + logos)
source("../assets/setup_branding.R", local = knitr::knit_global())
setup_kuzman_branding()
```

```{r shared-data, exercise.setup=TRUE, include=FALSE}
# Shared data here
```

## Your Content

[Add your tutorial content here]
```
````

## Repository Structure

```
.
├── README.md                    # This file
├── assets/                      # Branding assets (shared)
│   ├── setup_branding.R        # Helper script to load branding
│   ├── kuzman_theme.css        # Color theme
│   ├── kuzman_branding.js      # Logo injection
│   ├── k_logo.png              # Small logo (top right)
│   └── logo_transparent_background.png  # Full logo (footer)
└── tutorials/                   # Tutorial files
    ├── tutorial_template.Rmd
    ├── day1_part1.Rmd          # Add your tutorials here
    └── day1_part2.Rmd
```

## Customizing Branding

All branding assets are in the `assets/` folder:

- **Colors**: Edit `assets/kuzman_theme.css`
- **Logos**: Replace `assets/*.png` files
- **Logo behavior**: Edit `assets/kuzman_branding.js`

After editing, all tutorials will automatically use the updated branding.

## Sharing on GitHub

### Initial Setup

```bash
cd your-repo-folder
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo-name.git
git push -u origin main
```

### Users Can Clone and Run

Anyone can:
1. Clone your repository
2. Install R packages: `install.packages(c("learnr", "htmltools", "rmarkdown"))`
3. Open any `.Rmd` in `tutorials/` folder
4. Click "Run Document"

No package installation, no complex setup!

## Requirements

- R (≥ 4.0)
- RStudio (recommended for best experience)
- R packages:
  - `learnr`
  - `htmltools`
  - `rmarkdown`

## License

MIT License - Copyright (c) 2026 Kuzman Consulting d.o.o.

## Authors

- **dr.sc. Maja Kuzman** - Kuzman Consulting d.o.o.
- **dr.sc. Andrea Gelemanović**

## Support

For questions or issues, contact: [www.kuzmanconsulting.com](https://www.kuzmanconsulting.com)
