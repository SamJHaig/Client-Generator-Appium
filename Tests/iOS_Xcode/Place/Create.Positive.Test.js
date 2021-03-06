'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	user = require(`${global.projRoot}/Config/data_config.js`).user,
	tempPlace = require(`${global.projRoot}/Config/data_config.js`).tempPlace;

describe('Place Create - Positive', () => {
	before(() => {
		return driver
			.elementById('Users')
			.click()
			.elementById('Login User')
			.click()
			.elementByXPath('//XCUIElementTypeTextField[@value="Username"]')
			.sendKeys(user.username)
			.elementByXPath('//XCUIElementTypeSecureTextField[@value="Password"]')
			.sendKeys(user.password)
			.elementByXPath('//XCUIElementTypeButton[@name="Login"]')
			.click()
			.waitForElementById('OK', webdriver.asserters.isDisplayed, 10000)
			.click()
			.elementById('Axway')
			.click()
			.elementById('Places')
			.click()
			.waitForElementById('Create Place', webdriver.asserters.isDisplayed, 10000)
			.click()
			.waitForElementByXPath('//XCUIElementTypeTextField[@value="Name"]', webdriver.asserters.isDisplayed, 10000);
	});

	after(() => {
		return driver.resetApp();
	});

	it('Enter the Place Name', () => {
		return driver
			.elementByXPath('//XCUIElementTypeTextField[@value="Name"]')
			.sendKeys(tempPlace.name)
			.elementByXPath(`//XCUIElementTypeTextField[@value="${tempPlace.name}"]`)
			.isDisplayed().should.become(true);
	});

	it('Enter the Place Address', () => {
		return driver
			.elementByXPath('//XCUIElementTypeTextField[@value="Adress"]') // Currently spelt incorrectly in the app
			.sendKeys(tempPlace.address)
			.elementByXPath(`//XCUIElementTypeTextField[@value="${tempPlace.address}"]`)
			.isDisplayed().should.become(true);
	});

	it('Enter the Place City', () => {
		return driver
			.elementByXPath('//XCUIElementTypeTextField[@value="City"]')
			.sendKeys(tempPlace.city)
			.elementByXPath(`//XCUIElementTypeTextField[@value="${tempPlace.city}"]`)
			.isDisplayed().should.become(true);
	});

	it('Enter the Place State', () => {
		return driver
			.elementByXPath('//XCUIElementTypeTextField[@value="State"]')
			.sendKeys(tempPlace.state)
			.elementByXPath(`//XCUIElementTypeTextField[@value="${tempPlace.state}"]`)
			.isDisplayed().should.become(true);
	});

	it('Enter the Place Postal Code', () => {
		return driver
			.elementByXPath('//XCUIElementTypeTextField[@value="Postal code"]')
			.sendKeys(tempPlace.postcode)
			.elementByXPath(`//XCUIElementTypeTextField[@value="${tempPlace.postcode}"]`)
			.isDisplayed().should.become(true);
	});

	it('Enter the Place Country', () => {
		return driver
			.elementByXPath('//XCUIElementTypeTextField[@value="Country"]')
			.sendKeys(tempPlace.country)
			.elementByXPath(`//XCUIElementTypeTextField[@value="${tempPlace.country}"]`)
			.isDisplayed().should.become(true);
	});

	it('Enter the Place Latitiude', () => {
		return driver
			.elementByXPath('//XCUIElementTypeTextField[@value="Latitude"]')
			.sendKeys(tempPlace.latitude)
			.elementByXPath(`//XCUIElementTypeTextField[@value="${tempPlace.latitude}"]`)
			.isDisplayed().should.become(true);
	});

	it('Enter the Place Longitude', () => {
		return driver
			.elementByXPath('//XCUIElementTypeTextField[@value="Longitude"]')
			.sendKeys(tempPlace.longitude)
			.elementByXPath(`//XCUIElementTypeTextField[@value="${tempPlace.longitude}"]`)
			.isDisplayed().should.become(true);
	});

	it('Create the Place', () => {
		return driver
			.elementById('Done')
			.click()
			.elementById('Create Place')
			.click()
			.waitForElementByXPath('//XCUIElementTypeStaticText[2]', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('name')
			.then(text => {
				text.should.include('code = 200');
				text.should.include('"method_name" = createPlace');
				text.should.include(`name = "${tempPlace.name}"`);
				text.should.include(`address = ${tempPlace.address}`);
				text.should.include(`city = ${tempPlace.city}`);
				text.should.include(`state = "${tempPlace.state}"`);
				text.should.include(`"postal_code" = "${tempPlace.postcode}"`);
				text.should.include(`country = ${tempPlace.country}`);
				text.should.include(`latitude = "${tempPlace.latitude}"`);
				text.should.include(`longitude = "${tempPlace.longitude}"`);
			});
	});
});