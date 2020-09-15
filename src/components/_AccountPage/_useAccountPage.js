import { makeStyles, ListItem, fade } from '@material-ui/core';
import React, { useMemo } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'gatsby-plugin-firebase';
import { navigate } from 'gatsby';
import { useSnackbar } from 'notistack';

const useLogoutButtonStyles = makeStyles((theme) => ({
	paperButton: {
		position: 'relative',
		padding: theme.spacing(),
		maxHeight: '-webkit-fill-available',
		display: 'flex',
		width: '-webkit-fill-available',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-end',
		marginBottom: theme.spacing(),
	},
	paperList: {
		position: 'relative',
		padding: theme.spacing(),
		maxHeight: '-webkit-fill-available',
		minHeight: 400,
		display: 'flex',
		width: '-webkit-fill-available',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-end',
		marginBottom: theme.spacing(),
	},
	accountToolbar: {
		...theme.typography.body1,
		...theme.shape,
		boxShadow: theme.shadows['1'],
		color: theme.palette.secondary.light,
		fontWeight: 600,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: theme.palette.primary.main,
		textTransform: 'uppercase',
		position: 'relative',
		marginBottom: theme.spacing(),
		marginTop: theme.spacing(),
		minWidth: '-webkit-fill-available',
		minHeight: 48,
	},
	mapList: {
		maxHeight: '-webkit-fill-available',
		overflow: 'scroll',
		position: 'relative',
		width: '-webkit-fill-available',
		height: 400,
	},
	listItem: {
		...theme.typography.body1,
		backgroundColor: theme.palette.background.default,
		display: 'inline-flex',
		justifyContent: 'center',
		alignItems: 'center',
		textTransform: 'uppercase',
		flexWrap: 'wrap',
		maxWidth: '-webkit-fill-available',
		'&:nth-child(odd)': {
			backgroundColor: theme.palette.secondary.light,
		},
	},
	logoutButton: {
		backgroundColor: theme.palette.error.light,
		fontWeight: 600,
		color: fade(theme.palette.common.white, 0.8),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.8),
			color: theme.palette.error.light,
		},
	},
}));

export const useAccountPage = (handleLoading) => {
	const { enqueueSnackbar } = useSnackbar();
	const classes = useLogoutButtonStyles();
	const auth = firebase.auth();
	const [user] = useAuthState(auth);
	const onLogout = () => {
		handleLoading(true);
		auth.signOut().then(() => {
			navigate('/login/');
			enqueueSnackbar('Logout Successful', {
				variant: 'success',
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'center',
				},
			});
			handleLoading(false);
		});
	};

	let ListItems = useMemo(() => {
		if (!user) {
			return null;
		}
		const {
			email,
			metadata: { creationTime, lastSignInTime },
			providerData,
			uid,
		} = user;
		return [
			`Email: ${email}`,
			`Creation Time`,
			creationTime,
			`Last Login`,
			lastSignInTime,
			...providerData
				.map((user) =>
					Object.keys(user).map(
						(userKey) =>
							`${userKey.substring(0, 1).toUpperCase()}${userKey.substring(
								1
							)}: ${user[userKey]}`
					)
				)
				.flat(),
			`UID KEY: ${uid}`,
		].map((item, index) => (
			<ListItem key={`${item}-${index}`} className={classes.listItem}>
				{item}
			</ListItem>
		));
	}, [user, classes.listItem]);

	return {
		ListItems,
		onLogout,
		classes,
	};
};
