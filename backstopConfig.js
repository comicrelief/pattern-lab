const pages = require('./testUrls.json').urls;

// Do not modify the below

// Use environment variables to pass in our base and ref URLs
// const baseUrl = process.env.BACKSTOP_BASE_URL;
// const refUrl = process.env.BACKSTOP_BASE_REF_URL;

const baseUrl = "dist/";
const refUrl = "http://cr-pattern-lab.netlify.com/";

let scenarios = [];

pages.forEach(function(page) {
  scenarios.push({
    "label": page,
    "url": baseUrl + page,
    "referenceUrl": refUrl + page,
    "removeSelectors": [],
    "selectorExpansion": true,
    "selectors": [
      ".kss-main .kss-modifier__example"
    ],
    "readyEvent": null,
    "delay": 2000,
    "misMatchThreshold" : 0.1,
    "requireSameDimensions" : true
  });
});

module.exports = {
  "id": "visual",
  "viewports": [
    // {
    //   "name": "mobile",
    //   "width": 320,
    //   "height": 480
    // },
    // {
    //   "name": "tablet",
    //   "width": 768,
    //   "height": 1024
    // },
    {
      "name": "desktop",
      "width": 1280,
      "height": 768
    }
  ],
  "scenarios": scenarios,
  "paths": {
    "bitmaps_reference": "tests/visual/reference",
    "bitmaps_test": "tests/visual/result",
    "casper_scripts": "tests/visual/casper_scripts",
    "html_report": "tests/visual/html_report",
    "ci_report": "tests/visual/ci_report"
  },
  "casperFlags": [],
  "engine": "phantomjs",
  "report": ["browser"],
  "debug": false
}
