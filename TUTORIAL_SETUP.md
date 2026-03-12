# R Tutorial Setup Instructions

This document contains instructions for setting up and running the interactive R tutorials.

## Prerequisites

- R version 4.0 or higher
- RStudio (recommended)
- Internet connection for package installation

## Quick Start

### 1. Install Dependencies

Open R or RStudio and run:

```r
source("install_dependencies.R")
```

This will automatically install all required packages:
- **learnr** - Interactive tutorial framework
- **gradethis** - Solution checking
- **data.table** - Fast data manipulation
- **ggplot2** - Data visualization
- **plotly** - Interactive plots
- **knitr**, **rmarkdown**, **shiny** - Supporting packages

### 2. Run Tutorials

After installation, you can run any tutorial:

```r
# Introduction to R
rmarkdown::run("tutorials/IntroToR_kc.Rmd")

# Data manipulation with data.table
rmarkdown::run("tutorials/datatable_kc.Rmd")

# Data visualization with ggplot2
rmarkdown::run("tutorials/ggplot2_kc.Rmd")
```

Or in RStudio, open the `.Rmd` file and click **"Run Document"**.

## Troubleshooting

### Installation Issues

If you encounter errors during installation:

1. **Update R and RStudio** to the latest versions
2. **Install packages manually**:
   ```r
   install.packages(c("learnr", "knitr", "rmarkdown", "shiny", 
                      "data.table", "ggplot2", "plotly"))
   
   # Install gradethis from GitHub
   install.packages("remotes")
   remotes::install_github("rstudio/gradethis")
   ```

3. **Clear package cache** if problems persist:
   ```r
   remove.packages(c("learnr", "gradethis"))
   .rs.restartR()  # In RStudio
   source("install_dependencies.R")
   ```

### Running Tutorials

If tutorials don't display correctly:

1. Make sure you're in the project root directory
2. Check that all files in `assets/` folder are present:
   - `setup_branding.R`
   - `kuzman_theme.css`
   - `kuzman_branding.js`

3. Restart R session: `Ctrl + Shift + F10` (Windows) or `Cmd + Shift + 0` (Mac)

## Tutorial Features

### Interactive Exercises
- Write and run R code directly in the tutorial
- Get immediate feedback on your code

### Solution Checking
- Click **"Submit Answer"** to check your solutions
- Receive hints if you're stuck

### Download Functionality
- Click **"📥 Download Tutorial as HTML"** at the end
- Saves your work including code and results

## File Structure

```
.
├── install_dependencies.R      # Package installation script
├── tutorials/
│   ├── IntroToR_kc.Rmd        # Introduction to R
│   ├── datatable_kc.Rmd       # data.table tutorial
│   ├── ggplot2_kc.Rmd         # ggplot2 tutorial
│   └── tutorial_template.Rmd  # Template for new tutorials
└── assets/
    ├── setup_branding.R       # Branding setup
    ├── kuzman_theme.css       # Custom styling
    └── kuzman_branding.js     # Download functionality
```

## Support

For questions or issues, contact:
**dr.sc. Maja Kuzman**
Kuzman Consulting d.o.o.

---

**Note**: The first time you run a tutorial, it may take a few moments to load all dependencies.
