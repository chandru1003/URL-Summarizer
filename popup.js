// Get the current tab's URL
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var currentTabUrl = tabs[0].url;
    var api_key = "apikey"; // from OpenAI website
    var openai_url = "https://api.openai.com/v1/engines/davinci/completions";
    var summary="";
    var data = {
        "prompt": " Please Summarize the content of " + currentTabUrl,
        "temperature": 0.8,
        "max_tokens": 300,
        
    };
  
    // Send a request to the OpenAI API to get the summary of the URL
    var xhr = new XMLHttpRequest();
    xhr.open("POST", openai_url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + api_key);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        var summary = response.choices[0].text;
       
        // Display the summary in the popup
        document.getElementById("summary").textContent = summary;
      }
    };
    xhr.send(JSON.stringify(data));
});
