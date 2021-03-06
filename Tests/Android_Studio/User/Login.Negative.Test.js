'use strict';

const
	driver = global.driver,
	webdriver = global.webdriver,
	user = require(`${global.projRoot}/Config/data_config.js`).user;

describe('User Login - Negative', () => {
	before(() => {
		return driver
			.elementById('com.example.axway.mbaas:id/btn_login')
			.click()
			.elementByAndroidUIAutomator('new UiSelector().text("Users")')
			.click()
			.elementByAndroidUIAutomator('new UiSelector().text("Login User")')
			.click();
	});

	after(() => {
		return driver.resetApp();
	});

	it('Enter Username', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/users_login_username_field')
			.sendKeys(user.username)
			.elementById('com.example.axway.mbaas:id/users_login_username_field')
			.text().should.become(user.username);
	});

	it('Enter Password', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/users_login_password_field')
			.sendKeys('IncorrectPassword')
			.sleep(2000) // Wait for all of the password to be dotted out
			.elementById('com.example.axway.mbaas:id/users_login_password_field')
			.text().should.become('•••••••••••••••••');
	});

	it('Should get an Invalid User Warning', () => {
		return driver
			.elementById('com.example.axway.mbaas:id/users_login_button1')
			.click()
			.waitForElementById('android:id/message', webdriver.asserters.isDisplayed, 10000)
			.getAttribute('text')
			.then(text => {
				text = JSON.parse('{' + text.split('{').slice(1).join('{'));
				text.meta.code.should.equal(401);
				text.meta.status.should.equal('fail');
				text.meta.message.should.equal('Invalid email/username or password.');
			});
	});
});