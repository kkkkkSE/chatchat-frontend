/* eslint-disable new-cap */
Feature('welcome');

Scenario('test something', ({I}) => {
	I.amOnPage('/');
	I.see('type');
});
