import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import clsx from 'clsx';

function LoginRegisterButtonGroup(props) {
	const { newUser, onToggleNewUser, classes } = props;
	return (
		<ButtonGroup
			className={classes.buttonGroup}
			size='large'
			color='primary'
			fullWidth
			variant={'contained'}>
			<Button
				onClick={onToggleNewUser}
				disableElevation
				color={newUser ? 'primary' : 'secondary'}
				className={clsx(classes.buttonGroupButton, {
					[classes.activeButton]: !!newUser,
				})}>
				Register
			</Button>
			<Button
				onClick={onToggleNewUser}
				disableElevation
				color={!newUser ? 'primary' : 'secondary'}
				className={clsx(classes.buttonGroupButton, {
					[classes.activeButton]: !newUser,
				})}>
				Login
			</Button>
		</ButtonGroup>
	);
}

LoginRegisterButtonGroup.propTypes = {
	classes: PropTypes.shape({
		activeButton: PropTypes.any,
		buttonGroupButton: PropTypes.any,
		buttonGroup: PropTypes.any,
	}),
	newUser: PropTypes.bool,
	onToggleNewUser: PropTypes.func,
};

export default memo(LoginRegisterButtonGroup);
