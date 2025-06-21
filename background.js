function collectSystemInfo() {
  chrome.system.cpu.getInfo((cpuInfo) => {
    chrome.system.memory.getInfo((memoryInfo) => {
      chrome.system.storage.getInfo((storageInfo) => {
        const systemInfo = {
          cpu: cpuInfo,
          memory: memoryInfo,
          storage: storageInfo,
        };

        const jsonString = JSON.stringify(systemInfo, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        chrome.downloads.download({
          url,
          filename: 'system-info.json',
          saveAs: true,
        });
      });
    });
  });
}

chrome.action.onClicked.addListener(collectSystemInfo);

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === 'collectSystemInfo') {
    collectSystemInfo();
  }
});
