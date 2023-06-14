Feature('welcome');

Scenario('test something', ({I}) => {
	I.amOnPage('/');

	I.see('CHATCHAT');
});
