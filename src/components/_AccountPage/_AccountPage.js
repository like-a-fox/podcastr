import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Paper, Button, MenuList, Toolbar } from '@material-ui/core';
import { useAccountPage } from './_useAccountPage';

/**
 * @component
 * @type {import('react').FunctionComponent}
 */

const AccountPage = (props) => {
	const { handleLoading } = props;
	const { classes, onLogout, ListItems } = useAccountPage(handleLoading);
	return (
		<>
			<Toolbar className={classes.accountToolbar}>Account Data</Toolbar>
			<Paper className={classes.paperList}>
				<MenuList className={classes.mapList}>{ListItems}</MenuList>
			</Paper>
			<Paper className={classes.paperButton}>
				<Button
					disableElevation
					variant={'contained'}
					className={classes.logoutButton}
					fullWidth
					size={'large'}
					onClick={onLogout}>
					Logout Of Account
				</Button>
			</Paper>
		</>
	);
};

AccountPage.propTypes = {
	handleLoading: PropTypes.func,
};

export default memo(AccountPage);
