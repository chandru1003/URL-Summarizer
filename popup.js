// Get the current tab's URL
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var currentTabUrl = tabs[0].url;
    var api_key = "82A11696E4"; // from SMMRY website
    var smmry_url = "https://api.smmry.com?SM_API_KEY=" + api_key + "&SM_LENGTH=5&SM_URL=" + encodeURIComponent(currentTabUrl);
    var summary = "";
  
    // Send a request to the SMMRY API to get the summary of the URL
    var xhr = new XMLHttpRequest();
    xhr.open("GET", smmry_url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        summary = response.sm_api_content;
        // Limit the summary to 300 to 500 characters
        summary = summary.substring(0, Math.min(summary.length, 500));
        summary = summary.substring(0, Math.max(summary.lastIndexOf("."), 300));
        // Display the summary in the popup
        document.getElementById("summary").textContent = summary;
      }
    };
    xhr.send();
  });
  