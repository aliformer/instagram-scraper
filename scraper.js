const puppeteer = require("puppeteer");

const BASE_URL = "https://instagram.com";
const accountName = "srotagila"
let listURL = null;
const instaScrape = {
  browser : null,
  page : null,
  getPostLink : async function(){
    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: null
    });
    const page = await browser.newPage();
    await page.goto(`${BASE_URL}/${accountName}`, {waitUntil: "networkidle2"});
    let result= await page.$$eval("main article a", element => element.map(i => i.getAttribute('href')));
    console.log(result);
    browser.close();
    return listURL = result;
  },
  getPostLike : async function(){
    let likeResults = []
    for(let i = 0; i < listURL.length; i++){
      const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null
      });
      const page = await browser.newPage();
      await page.goto(`${BASE_URL}${listURL[i]}`, {waitUntil: "networkidle2"});
      let result= await page.$eval("main article section:nth-child(2) span", el => el.innerText);
      console.log(result)
      likeResults.push(result);
      browser.close();
      }
      console.log(likeResults)
    }
  }

function runScrape(){
  instaScrape.getPostLink().
  then(instaScrape.getPostLike).
  catch(error => console.log(error))
}


runScrape();





