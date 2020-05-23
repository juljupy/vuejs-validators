
'use strict';

module.exports = (it, expect, { validator }) => {
	let succeed = (data, checks) => it(
		`should pass  \n ------------------------------- \n  FORM: ${JSON.stringify(data)} \n RULES: ${JSON.stringify(checks)}`,
		() => { expect(validator(data, checks).validate().errors().any()).to.eql(false) }
	);

	let failure = (data, checks) => it(
		`Should Fail \n ------------------------------- \n FORM: ${JSON.stringify(data)} \n RULES: ${JSON.stringify(checks)}`,
		() => { expect(validator(data, checks).validate().errors().any()).to.eql(true) }
	);

	succeed({ id: 1, email: 'example@gmail.com' }, { id: 'required', email: 'required_with:id,name' });
	succeed({ name: 'sam', email: 'example@gmail.com' }, { name: 'required', email: 'required_with:name' });
	succeed({ id: 1, name: 'samuel', email: 'example@gmail.com' }, { id: 'required', name: 'required', email: 'required_with:id,name' });

	failure({ name: 'sam', email: '' }, { name: 'required', email: 'required_with:name' });
	failure({ name: '', email: 'example@gmail.com' }, { email: 'required_with:name' });
	failure({ email: 'example@gmail.com' }, { email: 'required_with:name' });
	failure({ id: null, name: 'example', email: 'example@gmail.com '}, { email: 'required_with:name,id' });
	failure({ name: 'example', email: 'example@gmail.com' },{ email: 'required_with:name,id' });
};
