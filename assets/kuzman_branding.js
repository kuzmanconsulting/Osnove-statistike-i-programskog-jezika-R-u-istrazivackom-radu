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
    
    // Add fixed K logo to top right corner (stays visible when scrolling)
    var kLogo = '<img src="images/k_logo.png" ' +
                'style="position: fixed; right: 20px; top: 10px; height: 60px; z-index: 9999;" ' +
                'alt="Kuzman Consulting" />';
    $('body').append(kLogo);
    console.log("K logo added");
    
    // Add full logo footer (clickable, links to company website)
    var footerLogo = '<div style="text-align: center; margin-top: 20px; margin-bottom: 20px;">' +
                     '<a href="https://www.kuzmanconsulting.com" target="_blank">' +
                     '<img src="images/logo_transparent_background.png" ' +
                     'style="width: 250px; cursor: pointer;" ' +
                     'alt="Kuzman Consulting - www.kuzmanconsulting.com" />' +
                     '</a>' +
                     '</div>';
    $('.topicsList').append(footerLogo);
    console.log("Footer logo added");
    
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
