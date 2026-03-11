/**
 * Kuzman Consulting - Logo Injection Script
 * Adds company branding to learnr tutorials
 */

$(document).on('ready shiny:connected', function() {
  console.log("Kuzman branding script loaded");
  
  // Wait a bit for Shiny to fully initialize
  setTimeout(function() {
    console.log("Attempting to add logos...");
    console.log("Body exists:", $('body').length);
    console.log("TopicsList exists:", $('.topicsList').length);
    
    // Get the base URL for the tutorial
    var baseUrl = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '');
    console.log("Base URL:", baseUrl);
    
    // Try multiple possible paths for the logo
    var possiblePaths = [
      'images/k_logo.png',
      'assets/k_logo.png',
      '../assets/k_logo.png',
      baseUrl + '/../assets/k_logo.png',
      'session/' + window.location.pathname.split('/')[1] + '/assets/k_logo.png'
    ];
    
    console.log("Trying logo paths:", possiblePaths);
    
    var logoPath = possiblePaths[0]; // default to first option
    
    // Add fixed K logo to top right corner (stays visible when scrolling)
    var kLogo = '<img id="k-logo-top" src="' + logoPath + '" ' +
                'style="position: fixed; right: 20px; top: 10px; height: 60px; z-index: 9999;" ' +
                'alt="Kuzman Consulting" />';
    $('body').append(kLogo);
    console.log("K logo added with path:", logoPath);
    
    // Try fallback paths if first one fails
    $('#k-logo-top').on('error', function() {
      console.error('K logo failed to load from:', this.src);
      var currentIndex = possiblePaths.indexOf(this.src.split('/').slice(-3).join('/'));
      if (currentIndex === -1) currentIndex = 0;
      if (currentIndex + 1 < possiblePaths.length) {
        var nextPath = possiblePaths[currentIndex + 1];
        console.log('Trying next path:', nextPath);
        this.src = nextPath;
      } else {
        console.error('All logo paths failed');
        this.style.display = 'none';
      }
    });
    
    // For full logo, try same paths
    var fullLogoPaths = [
      'images/logo_transparent_background.png',
      'assets/logo_transparent_background.png',
      '../assets/logo_transparent_background.png',
      baseUrl + '/../assets/logo_transparent_background.png'
    ];
    
    var fullLogoPath = fullLogoPaths[0];
    
    // Add full logo footer (clickable, links to company website)
    var footerLogo = '<div style="text-align: center; margin-top: 20px; margin-bottom: 20px;">' +
                     '<a href="https://www.kuzmanconsulting.com" target="_blank">' +
                     '<img id="k-logo-footer" src="' + fullLogoPath + '" ' +
                     'style="width: 250px; cursor: pointer;" ' +
                     'alt="Kuzman Consulting - www.kuzmanconsulting.com" />' +
                     '</a>' +
                     '</div>';
    $('.topicsList').append(footerLogo);
    console.log("Footer logo added with path:", fullLogoPath);
    
    // Try fallback paths for footer logo
    $('#k-logo-footer').on('error', function() {
      console.error('Footer logo failed to load from:', this.src);
      var currentIndex = fullLogoPaths.indexOf(this.src.split('/').slice(-3).join('/'));
      if (currentIndex === -1) currentIndex = 0;
      if (currentIndex + 1 < fullLogoPaths.length) {
        var nextPath = fullLogoPaths[currentIndex + 1];
        console.log('Trying next footer path:', nextPath);
        this.src = nextPath;
      } else {
        console.error('All footer logo paths failed');
        this.style.display = 'none';
      }
    });
    
    // Add progress bar in bottom right corner
    var progressBar = '<div class="topics-progress">' +
                      '<div class="progress-text">Progress: <span id="progress-percent">0%</span></div>' +
                      '<div class="progress">' +
                      '<div class="progress-bar" role="progressbar" style="width: 0%" id="progress-bar"></div>' +
                      '</div>' +
                      '</div>';
    $('body').append(progressBar);
    console.log("Progress bar added");
    
    // Function to update progress
    function updateProgress() {
      var totalTopics = $('.topicsList .topic').length;
      var completedTopics = $('.topicsList .topic.current').prevAll('.topic').length;
      var currentIndex = $('.topicsList .topic.current').index('.topic');
      
      if (totalTopics > 0) {
        var progress = Math.round(((currentIndex + 1) / totalTopics) * 100);
        $('#progress-bar').css('width', progress + '%');
        $('#progress-percent').text(progress + '%');
      }
    }
    
    // Update progress initially and whenever section changes
    updateProgress();
    
    // Watch for changes in current topic
    var observer = new MutationObserver(function(mutations) {
      updateProgress();
    });
    
    // Observe the topics list for changes
    if ($('.topicsList').length > 0) {
      observer.observe($('.topicsList')[0], {
        attributes: true,
        subtree: true,
        attributeFilter: ['class']
      });
    }
    
  }, 1000);
  
});

/**
 * Download Tutorial Function
 * Captures the current state of the tutorial including user's code changes
 */
window.downloadTutorial = function() {
  try {
    console.log("Download button clicked - capturing current tutorial state");
    
    // Get filename
    var title = document.title || 'tutorial';
    title = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    var filename = title + '_' + new Date().toISOString().split('T')[0] + '.html';
    
    // Clone the page
    var clone = document.documentElement.cloneNode(true);
    
    // Helper function to convert image to base64
    function imageToBase64(img, callback) {
      if (!img || !img.src) {
        callback(null);
        return;
      }
      
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      
      var image = new Image();
      image.crossOrigin = 'anonymous';
      
      image.onload = function() {
        canvas.width = this.width;
        canvas.height = this.height;
        ctx.drawImage(this, 0, 0);
        try {
          var dataURL = canvas.toDataURL('image/png');
          callback(dataURL);
        } catch (e) {
          console.warn('Could not convert image to base64:', e);
          callback(null);
        }
      };
      
      image.onerror = function() {
        callback(null);
      };
      
      image.src = img.src;
    }
    
    // Convert all images to base64 (including logos)
    var images = document.querySelectorAll('img');
    var imagesToConvert = images.length;
    var imagesConverted = 0;
    
    if (imagesToConvert === 0) {
      // No images, proceed immediately
      finalizeDownload();
    } else {
      images.forEach(function(img, index) {
        imageToBase64(img, function(dataURL) {
          if (dataURL) {
            var cloneImgs = clone.querySelectorAll('img');
            if (cloneImgs[index]) {
              cloneImgs[index].src = dataURL;
              console.log('Converted image', index, 'to base64');
            }
          }
          imagesConverted++;
          if (imagesConverted === imagesToConvert) {
            finalizeDownload();
          }
        });
      });
    }
    
    function finalizeDownload() {
      // Remove ALL buttons and navigation
      var removeSelectors = [
        'button',
        '.topicNavigationButtons',
        '.tutorial-exercise-support',
        'a[data-type="section"]',
        '.bandNotification',
        '.topics-progress'
      ];
      
      removeSelectors.forEach(function(selector) {
        var elements = clone.querySelectorAll(selector);
        elements.forEach(function(el) {
          if (el.parentNode) el.parentNode.removeChild(el);
        });
      });
      
      // Process each exercise to capture user's code AND outputs
      var exercises = clone.querySelectorAll('.tutorial-exercise');
      exercises.forEach(function(ex, idx) {
        console.log("Processing exercise", idx);
        
        // Get the actual live exercise from the page (not clone)
        var liveExercises = document.querySelectorAll('.tutorial-exercise');
        var liveEx = liveExercises[idx];
        
        if (!liveEx) return;
        
        var codeText = '';
        
        // Try to get code from the live Ace editor
        var aceEditor = liveEx.querySelector('.ace_editor');
        if (aceEditor && aceEditor.env && aceEditor.env.editor) {
          // Ace Editor API
          codeText = aceEditor.env.editor.getValue();
          console.log("Got code from Ace API:", codeText.substring(0, 50));
        } else {
          // Fallback: try text extraction
          var aceLayer = liveEx.querySelector('.ace_text-layer');
          if (aceLayer) {
            codeText = aceLayer.textContent || aceLayer.innerText;
          }
        }
        
        if (!codeText) {
          // Try textarea
          var textarea = liveEx.querySelector('textarea');
          if (textarea) {
            codeText = textarea.value;
          }
        }
        
        // Try to find output - check multiple possible locations
        var liveOutput = null;
        var outputSelectors = [
          '.tutorial-exercise-output',
          '.tutorial-exercise-output-frame',
          '[data-label$="-output"]',
          '.shiny-bound-output',
          'pre.tutorial-exercise-code-output'
        ];
        
        for (var i = 0; i < outputSelectors.length; i++) {
          liveOutput = liveEx.querySelector(outputSelectors[i]);
          if (liveOutput && liveOutput.innerHTML && liveOutput.innerHTML.trim().length > 0) {
            console.log("Found output using selector:", outputSelectors[i]);
            break;
          }
        }
        
        // Also check AFTER the exercise container
        if (!liveOutput || !liveOutput.innerHTML || liveOutput.innerHTML.trim().length === 0) {
          var nextSibling = liveEx.nextElementSibling;
          while (nextSibling && !liveOutput) {
            if (nextSibling.classList.contains('tutorial-exercise-output') ||
                nextSibling.classList.contains('tutorial-exercise-output-frame')) {
              liveOutput = nextSibling;
              console.log("Found output as next sibling");
              break;
            }
            nextSibling = nextSibling.nextElementSibling;
            // Only check next 3 siblings
            if (!nextSibling || nextSibling !== liveEx.nextElementSibling) break;
          }
        }
        
        console.log("Live output element:", liveOutput);
        if (liveOutput) {
          console.log("Live output HTML length:", liveOutput.innerHTML.length);
          console.log("Live output preview:", liveOutput.innerHTML.substring(0, 200));
        } else {
          console.log("No output found for exercise", idx);
        }
        
        // Create visible code block and output section
        var codeSection = document.createElement('div');
        codeSection.style.marginBottom = '20px';
        codeSection.style.marginTop = '15px';
        codeSection.style.border = '2px solid #FF8A50';
        codeSection.style.borderRadius = '8px';
        codeSection.style.padding = '15px';
        codeSection.style.backgroundColor = '#fffbf7';
        
        if (codeText && codeText.trim()) {
          var codeTitle = document.createElement('h4');
          codeTitle.textContent = '💻 Your Code:';
          codeTitle.style.color = '#FF8A50';
          codeTitle.style.marginTop = '0';
          codeTitle.style.marginBottom = '10px';
          
          var pre = document.createElement('pre');
          pre.style.backgroundColor = '#f8f9fa';
          pre.style.border = '1px solid #dee2e6';
          pre.style.borderRadius = '6px';
          pre.style.padding = '15px';
          pre.style.overflow = 'auto';
          pre.style.fontFamily = 'Monaco, Consolas, monospace';
          pre.style.fontSize = '14px';
          pre.style.margin = '0 0 15px 0';
          
          var code = document.createElement('code');
          code.textContent = codeText.trim();
          code.style.color = '#212529';
          
          pre.appendChild(code);
          codeSection.appendChild(codeTitle);
          codeSection.appendChild(pre);
        }
        
        // Add output if exists
        var foundOutput = false;
        if (liveOutput) {
          var outputContent = liveOutput.innerHTML;
          // Also try cloning the entire output element
          var outputClone = liveOutput.cloneNode(true);
          
          console.log("Output content length:", outputContent.length);
          
          if (outputContent && outputContent.trim().length > 10) {
            var outputTitle = document.createElement('h4');
            outputTitle.textContent = '📊 Output:';
            outputTitle.style.color = '#6c757d';
            outputTitle.style.marginTop = '5px';
            outputTitle.style.marginBottom = '10px';
            
            var outputDiv = document.createElement('div');
            outputDiv.innerHTML = outputContent;
            outputDiv.style.border = '1px solid #dee2e6';
            outputDiv.style.borderRadius = '6px';
            outputDiv.style.padding = '10px';
            outputDiv.style.backgroundColor = '#ffffff';
            outputDiv.style.minHeight = '30px';
            outputDiv.style.fontFamily = 'Consolas, Monaco, monospace';
            outputDiv.style.fontSize = '13px';
            outputDiv.style.whiteSpace = 'pre-wrap';
            outputDiv.style.display = 'block';
            outputDiv.className = 'extracted-output'; // Mark it so we don't hide it
            
            // Force visibility of all child elements
            var outputChildren = outputDiv.querySelectorAll('*');
            outputChildren.forEach(function(child) {
              child.style.display = '';
              child.style.visibility = 'visible';
            });
            
            codeSection.appendChild(outputTitle);
            codeSection.appendChild(outputDiv);
            
            foundOutput = true;
            console.log("Added output to section");
          } else {
            console.log("Output content too short or empty:", outputContent);
          }
        }
        
        // Insert at start of exercise in clone (only if we have code or output)
        if ((codeText && codeText.trim()) || foundOutput) {
          ex.insertBefore(codeSection, ex.firstChild);
        }
        
        // Hide the Ace editor in clone
        var cloneAce = ex.querySelector('.ace_editor');
        if (cloneAce) cloneAce.style.display = 'none';
        
        // Hide ONLY original output elements (not our extracted ones) if we successfully copied the output
        if (foundOutput) {
          var cloneOutputs = ex.querySelectorAll('.tutorial-exercise-output, .tutorial-exercise-output-frame, [data-label$="-output"], .shiny-bound-output, pre.tutorial-exercise-code-output');
          cloneOutputs.forEach(function(output) {
            // Don't hide our extracted output
            if (!output.classList.contains('extracted-output')) {
              output.style.display = 'none';
            }
          });
        }
      });
      
      // Add CSS
      var style = clone.querySelector('head').appendChild(document.createElement('style'));
      style.textContent = `
        .ace_editor, .ace_content, button,
        .topicNavigationButtons, .tutorial-exercise-support,
        a[data-type="section"], .bandNotification,
        .topics-progress {
          display: none !important;
        }
        img, canvas, .shiny-plot-output {
          display: block !important;
          visibility: visible !important;
          max-width: 100% !important;
        }
        pre, code {
          display: block !important;
          visibility: visible !important;
          white-space: pre-wrap !important;
          word-wrap: break-word !important;
        }
      `;
      
      // Create downloadable HTML
      var doctype = '<!DOCTYPE html>\\n';
      var htmlContent = clone.outerHTML;
      
      var blob = new Blob([doctype + htmlContent], { type: 'text/html;charset=utf-8' });
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = filename;
      
      document.body.appendChild(a);
      a.click();
      
      setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 100);
      
      console.log('✓ Tutorial download initiated: ' + filename);
    }
    
  } catch (error) {
    console.error("Download error:", error);
    alert('❌ Download failed: ' + error.message);
  }
}
