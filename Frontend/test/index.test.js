import puppeteer from 'puppeteer'
import uuid from 'uuid'

test('Application test', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    //used timeout because default is set to load event
    //load event is fired only when all laureates images are loaded
    //laurate images are heavy for now so I set domContentLoaded
    //TODO remove fixed timeout when laureate images will be lightened
    await page.goto('http://127.0.0.1:8000/', {waitUntil: 'domcontentloaded'});
    //Register a new user
    await page.click("[href='/signup']");
    await page.waitForSelector("input[name='username']");
    //create a random name and password
    await page.click("input[name='username']");
    const username = uuid.v4();
    const email = username + "@gmail.com";
    const password = uuid.v4();
    await page.keyboard.type(username);
    await page.click("input[name='email']");
    await page.keyboard.type(email);
    await page.click("input[name='password1']");
    await page.keyboard.type(password);
    await page.click("input[name='password2']");
    await page.keyboard.type(password);
    await page.click("#signupButton");
    //wait for redirect
    await page.waitForSelector("#laureateGrid");

    await browser.close();
}, 25000);