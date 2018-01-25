import puppeteer from 'puppeteer'
import uuid from 'uuid'

/**
 * Utility function for block the main thread
 * @param time int: time in ms to wait
 * @returns {Promise}
 */
function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time))
}

//import exec from node framework
let exec = require('child_process').exec

let browser, page

beforeAll(async () => {
    //creates a child process and executes given commands
    //moves to backend dir, activate virtualenv, if present remove old db, apply migration to reacreate db, start server
    exec(`cd ../Backend;
    . virtualenv/bin/activate;
    if [ -f db.sqlite3 ] ; then rm db.sqlite3; fi;
    python manage.py migrate;
    python manage.py runserver;`, (error, stdout, stderr) => {
        //this function is a callback if the server eventualy exit early and throws error
        console.log(`stdout: ${stdout}`)
        console.log(`stderr: ${stderr}`)
    })
    //launch headless browser
    browser = await puppeteer.launch()
    //open new page in browser
    page = await browser.newPage()
    //sleep for 2 seconds because exec is async and server need time to startup
    await sleep(2000)
}, 5500)

async function registerUser(username, password) {
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
    const email = username + "@gmail.com";
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
    //TODO logout
}

//register random user
test('Registration test', () => registerUser(uuid.v4(), uuid.v4()), 10000)

afterAll(async () => {
    await browser.close();
})