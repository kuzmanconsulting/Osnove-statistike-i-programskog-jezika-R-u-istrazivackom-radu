#' Setup Kuzman Consulting Branding for learnr Tutorials
#'
#' This function loads the custom CSS theme and JavaScript for logos.
#' Call this in your setup chunk to apply Kuzman Consulting branding.
#'
#' @param assets_path Path to the assets folder (default: "../assets")
#' @return HTML tags for CSS and JavaScript
#' 
setup_kuzman_branding <- function(assets_path = "../assets") {
  
  # Get absolute path to assets folder
  assets_full_path <- normalizePath(assets_path, mustWork = FALSE)
  
  # Register assets path for Shiny/learnr (use 'images' to match JS references)
  shiny::addResourcePath("images", assets_full_path)
  
  # Load CSS theme
  css_file <- file.path(assets_full_path, "kuzman_theme.css")
  css_content <- readLines(css_file, warn = FALSE)
  css_tag <- htmltools::tags$style(htmltools::HTML(paste(css_content, collapse = "\n")))
  
  # Load JavaScript for logos and progress bar
  js_file <- file.path(assets_full_path, "kuzman_branding.js")
  js_content <- readLines(js_file, warn = FALSE)
  js_tag <- htmltools::tags$script(htmltools::HTML(paste(js_content, collapse = "\n")))
  
  # Return combined HTML tags
  htmltools::tagList(css_tag, js_tag)
}
