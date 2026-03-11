# Setting Up Your GitHub Repository

## Step-by-Step Guide to Publish Your Tutorials

### 1. Prepare the Repository Locally

Your `github_structure/` folder is already set up and ready to go!

```
github_structure/
├── README.md
├── LICENSE
├── .gitignore
├── assets/
│   ├── setup_branding.R
│   ├── kuzman_theme.css
│   ├── kuzman_branding.js
│   ├── k_logo.png
│   └── logo_transparent_background.png
└── tutorials/
    └── tutorial_template.Rmd
```

### 2. Add Your Existing Tutorials

Just copy your `.Rmd` files to the `tutorials/` folder:

```bash
cp Day1_IRB25_part1_learnr.Rmd github_structure/tutorials/day1_part1.Rmd
```

Make sure your `.Rmd` files have this clean branding setup:

```r
```{r setup, include=FALSE}
library(learnr)
knitr::opts_chunk$set(echo = FALSE)
```

```{r load-branding, echo=FALSE}
source("../assets/setup_branding.R", local = knitr::knit_global())
setup_kuzman_branding()
```
```
### 3. Create GitHub Repository

**Option A: Via GitHub Website**
1. Go to [github.com](https://github.com)
2. Click **"+"** → **"New repository"**
3. Name it (e.g., `r-statistics-tutorials`)
4. Choose **Public** or **Private**
5. **DON'T** initialize with README (we already have one)
6. Click **"Create repository"**

**Option B: Via GitHub CLI**
```bash
gh repo create r-statistics-tutorials --public --source=github_structure --push
```

### 4. Push to GitHub

```bash
cd github_structure

# Initialize git
git init
git add .
git commit -m "Initial commit: R tutorials with Kuzman branding"

# Connect to GitHub
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push
git push -u origin main
```

### 5. Share with Students/Colleagues

They can now:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

Then open RStudio, navigate to `tutorials/`, open any `.Rmd`, and click "Run Document"!
then open RStudio, navigate to `tutorials/`, open any `.Rmd`, and click "Run Document"!

---

## Questions?

- **Can students see the CSS/JS files?** Yes, they're in the `tutorials/` folder alongside `.Rmd` files
- **Do I need to edit paths?** No! Everything is in the same folder, so relative paths work perfectly

