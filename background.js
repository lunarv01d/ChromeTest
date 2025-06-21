function collectSystemInfo() {
  // Get CPU information
  chrome.system.cpu.getInfo((cpuInfo) => {
    // Get Memory information
    chrome.system.memory.getInfo((memoryInfo) => {
      // Get Storage information
      chrome.system.storage.getInfo((storageInfo) => {
        // Create a data object with all system info
        const systemInfo = {
          cpu: cpuInfo,
          memory: memoryInfo,
          storage: storageInfo
        };

        // Convert the data object to a JSON string
        const jsonString = JSON.stringify(systemInfo, null, 2);

        // Save the JSON string to a file
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        // Trigger the download of the file
        chrome.downloads.download({
          url: url,
          filename: 'system-info.json',
          saveAs: true
        });
      });
    });
  });
}

chrome.action.onClicked.addListener(collectSystemInfo);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'collectSystemInfo') {
    collectSystemInfo();
  }
});
  
