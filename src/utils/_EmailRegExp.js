const ValidEmailRegExp = /^(([^<>()_[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default (email) => {
	if (email === null || email === undefined || email === '') {
		return {
			error: true,
			message: 'Email Field Is Required',
		};
	}
	let valid = ValidEmailRegExp.test(email);
	return {
		error: !valid,
		message: !valid ? 'Email Has Invalid Syntax' : null,
	};
};
