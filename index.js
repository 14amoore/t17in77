chrome.runtime.onInstalled.addListener(function() {
  console.log('loaded');
});

let makeNoise = document.getElementById('noise');

const noise = new Tone.Noise('pink');

const aFilter = new Tone.AutoFilter({
  frequency: '10m',
  min: 10,
  max: 100000
}).connect(Tone.Master);

noise.connect(aFilter);
aFilter.start();

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.storage.sync.get('state', function(data) {
    if (data.state === 'on') {
      chrome.storage.sync.set({ state: 'off' });
      noise.stop();
      console.log('noise off');
    } else {
      chrome.storage.sync.set({ state: 'on' });
      noise.start();
      console.log('noise on');
    }
  });
});
