# ============================================================================
# Install Dependencies for R Tutorials
# ============================================================================
# This script installs all required packages for running the learnr tutorials
# Author: Kuzman Consulting d.o.o.
# ============================================================================

cat("\n")
cat("========================================\n")
cat("  Installing Tutorial Dependencies\n")
cat("========================================\n\n")

# Set CRAN mirror
options(repos = c(CRAN = "https://cloud.r-project.org/"))

# List of CRAN packages required
cran_packages <- c(
  "learnr",         # Interactive tutorials
  "knitr",          # Document generation
  "rmarkdown",      # R Markdown support
  "shiny",          # Web applications (required by learnr)
  "data.table",     # Fast data manipulation
  "ggplot2",        # Data visualization
  "plotly"          # Interactive plots
)

# List of GitHub packages
github_packages <- list(
  gradethis = "rstudio/gradethis"  # Solution checking for learnr
)

# Function to install and check a single package
install_if_missing <- function(pkg, from = "CRAN") {
  if (!requireNamespace(pkg, quietly = TRUE)) {
    cat(sprintf("Installing %s from %s...\n", pkg, from))
    if (from == "CRAN") {
      install.packages(pkg, dependencies = TRUE)
    } else if (from == "GitHub") {
      if (!requireNamespace("remotes", quietly = TRUE)) {
        install.packages("remotes")
      }
      remotes::install_github(github_packages[[pkg]])
    }
    cat(sprintf("✓ %s installed successfully\n\n", pkg))
  } else {
    cat(sprintf("✓ %s already installed (version %s)\n", 
                pkg, packageVersion(pkg)))
  }
}

# Install CRAN packages
cat("\n--- Installing CRAN Packages ---\n\n")
for (pkg in cran_packages) {
  tryCatch({
    install_if_missing(pkg, from = "CRAN")
  }, error = function(e) {
    cat(sprintf("✗ Error installing %s: %s\n\n", pkg, e$message))
  })
}

# Install GitHub packages
cat("\n--- Installing GitHub Packages ---\n\n")
for (pkg in names(github_packages)) {
  tryCatch({
    install_if_missing(pkg, from = "GitHub")
  }, error = function(e) {
    cat(sprintf("✗ Error installing %s: %s\n\n", pkg, e$message))
  })
}

# Verify all packages can be loaded
cat("\n--- Verifying Installation ---\n\n")
all_packages <- c(cran_packages, names(github_packages))
failed_packages <- character()

for (pkg in all_packages) {
  result <- tryCatch({
    library(pkg, character.only = TRUE)
    cat(sprintf("✓ %s loads successfully\n", pkg))
    TRUE
  }, error = function(e) {
    cat(sprintf("✗ %s failed to load: %s\n", pkg, e$message))
    failed_packages <<- c(failed_packages, pkg)
    FALSE
  })
}

# Summary
cat("\n========================================\n")
cat("  Installation Summary\n")
cat("========================================\n\n")

if (length(failed_packages) == 0) {
  cat("✓ All packages installed and verified successfully!\n")
  cat("✓ You are ready to run the tutorials.\n\n")
  cat("To run a tutorial, use:\n")
  cat("  rmarkdown::run('tutorials/IntroToR_kc.Rmd')\n")
  cat("  rmarkdown::run('tutorials/datatable_kc.Rmd')\n")
  cat("  rmarkdown::run('tutorials/ggplot2_kc.Rmd')\n\n")
} else {
  cat("⚠ Some packages failed to install:\n")
  for (pkg in failed_packages) {
    cat(sprintf("  - %s\n", pkg))
  }
  cat("\nPlease try installing these manually:\n")
  cat(sprintf("  install.packages(c(%s))\n", 
              paste(sprintf('"%s"', failed_packages), collapse = ", ")))
}

cat("\n")
