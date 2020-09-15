import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Button } from '@material-ui/core';
import { useLoginPage } from './_useLoginPage';
function LoginFormActions(props) {
	const { formProps, newUser, classes } = props;
	const { onLogin, onRegister } = useLoginPage(formProps);
	return (
		<Button
			onClick={newUser ? onRegister : onLogin}
			disableElevation
			size={'large'}
			variant={'contained'}
			className={classes.submitButton}
			fullWidth
			color={'primary'}>
			Submit
		</Button>
	);
}

LoginFormActions.propTypes = {
	classes: PropTypes.any,
	formProps: PropTypes.shape({
		emailAddress: PropTypes.any,
		password: PropTypes.any,
	}),
	newUser: PropTypes.any,
	onResetForm: PropTypes.func,
};

export default memo(LoginFormActions);
