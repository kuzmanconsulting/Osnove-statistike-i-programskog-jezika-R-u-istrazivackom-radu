# Osnove statistike i programskog jezika R u istraživačkom radu

Interactive R tutorials for learning statistics and R programming in research.

**Author:** dr.sc. Maja Kuzman - Kuzman Consulting d.o.o.

---

## 📚 Available Tutorials

1. **Introduction to R** (`tutorials/IntroToR_kc.Rmd`)
   - R as a calculator
   - Variables and vectors
   - Subsetting and operations
   - Essential R functions

2. **Data.table** (`tutorials/datatable_kc.Rmd`)
   - Fast data manipulation
   - DT[i, j, by] syntax
   - Special symbols (.N, .SD, .I, .GRP)
   - Keys and joins

3. **ggplot2** (`tutorials/ggplot2_kc.Rmd`)
   - Data visualization
   - Grammar of graphics
   - Layers and aesthetics
   - Faceting and themes

---

## 🚀 Quick Start

### 1. Install Dependencies

```r
source("install_dependencies.R")
```

### 2. Run a Tutorial

```r
# In R or RStudio
rmarkdown::run("tutorials/IntroToR_kc.Rmd")
```

Or open the `.Rmd` file in RStudio and click **"Run Document"**.

See [TUTORIAL_SETUP.md](TUTORIAL_SETUP.md) for detailed setup instructions.

---

## 🌿 Git Branch Structure

### `main` branch
- **Purpose:** Stable, production-ready code
- **Use:** Code that is tested and ready for workshops/courses
- **Protection:** Should be protected, requires pull request reviews

### `dev` branch
- **Purpose:** Active development and testing
- **Use:** 
  - New features and improvements
  - Tutorial enhancements
  - Bug fixes
  - Experimental changes
- **Workflow:**
  - All development work happens here first
  - Test thoroughly before merging to `main`
  - Create feature branches from `dev` if needed

### Feature Branches (optional)
- **Naming:** `feature/description` or `fix/description`
- **Purpose:** Isolated development of specific features
- **Workflow:** Branch from `dev` → develop → merge back to `dev`

---

## 🔄 Development Workflow

### Working on the `dev` branch:

```bash
# Make sure you're on dev
git checkout dev

# Pull latest changes
git pull origin dev

# Make your changes...

# Commit changes
git add .
git commit -m "Description of changes"

# Push to remote
git push origin dev
```

### Merging `dev` to `main` (when ready for release):

```bash
# Switch to main
git checkout main

# Merge dev
git merge dev

# Push to remote
git push origin main

# Tag the release (optional)
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

---

## 📁 Project Structure

```
.
├── README.md                   # This file
├── TUTORIAL_SETUP.md          # Detailed setup instructions
├── install_dependencies.R     # Automated package installation
├── install_gradethis.R        # Install gradethis for solution checking
├── tutorials/
│   ├── IntroToR_kc.Rmd       # Introduction to R tutorial
│   ├── datatable_kc.Rmd      # data.table tutorial
│   ├── ggplot2_kc.Rmd        # ggplot2 tutorial
│   └── tutorial_template.Rmd # Template for new tutorials
└── assets/
    ├── setup_branding.R      # Kuzman Consulting branding
    ├── kuzman_theme.css      # Custom CSS styling
    └── kuzman_branding.js    # JavaScript functionality
```

---

## ✨ Features

- **Interactive exercises** with live R code execution
- **Solution checking** powered by gradethis
- **Professional styling** with custom CSS and branding
- **Download functionality** - save completed tutorials as HTML
- **Callout boxes** for important concepts, tips, and warnings
- **Progressive tutorials** with hints and solutions

---

## 🛠️ For Contributors

### Creating a New Tutorial

1. Make a copy of `tutorials/tutorial_template.Rmd`
2. Update the title and content
3. Add exercises with solutions
4. Test thoroughly
5. Commit to `dev` branch

### Adding Solution Checking

For each exercise, add a check chunk:

```r
```{r exercise-name-check}
grade_this_code()
```
```

### Testing Changes

Before pushing:
1. Run `install_dependencies.R` to ensure all packages are available
2. Test each tutorial in RStudio
3. Check that download functionality works
4. Verify all callout boxes render correctly

---

## 📦 Required Packages

- learnr - Interactive tutorials
- knitr, rmarkdown, shiny - Tutorial infrastructure
- data.table - Fast data manipulation
- ggplot2 - Data visualization
- plotly - Interactive plots

---

## 📄 License

See [LICENSE](LICENSE) file.

---

## 📧 Contact

**dr.sc. Maja Kuzman**  
Kuzman Consulting d.o.o.

---

**Current Branch:** `dev` (active development)  
**Stable Version:** `main` (production-ready)
