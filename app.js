const puppeteer = require('puppeteer');
const config = require('./config.json');

(async () => {
  // initialize browser
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  // login to SFC-SFS
  await page.goto('https://vu.sfc.keio.ac.jp/sfc-sfs/');
  await page.type('input[name="u_login"]', config.account);
  await page.type('input[name="u_pass"]', config.password);
  await page.click('input[type="submit"]'),
  await page.waitFor(2000); // TODO : use waitForNavigation

  // show classes
  await page.click('#navigation > div:nth-child(2) > a');
  await page.waitFor(2000); // TODO : use waitForNavigation

  // log data
  await page.screenshot({path: 'classes.png'});
  const classes = await page.evaluate(() => {
    return document.querySelector("body > table:nth-child(3) > tbody > tr > td:nth-child(3) > table > tbody > tr > td:nth-child(2) > table:nth-child(4) > tbody > tr:nth-child(1) > td:nth-child(1)").textContent;
  });
  console.log(classes);
  browser.close();
})();
