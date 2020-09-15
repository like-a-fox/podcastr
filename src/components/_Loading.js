import {
	CircularProgress,
	LinearProgress,
	makeStyles,
	useMediaQuery,
	useTheme,
} from '@material-ui/core';
import React, { memo } from 'react';

const useLoadingStyles = makeStyles((theme) => ({
	root: {
		width: '-webkit-fill-available',
		height: '-webkit-fill-available',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	progressBar: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		height: theme.spacing(),
	},
	progressCircular: {
		position: 'absolute',
		bottom: theme.spacing(),
		right: theme.spacing(),
		opacity: 0.7,
	},
}));

/**
 * @component
 * @type {import('react').FunctionComponent}
 */
const Loading = () => {
	const classes = useLoadingStyles();
	const theme = useTheme();
	const mobile = useMediaQuery(theme.breakpoints.down('sm'));

	let LoadingSpinner = mobile ? (
		<div className={classes.root}>
			<LinearProgress className={classes.progressBar} />
		</div>
	) : (
		<div className={classes.root}>
			<CircularProgress className={classes.progressCircular} />
		</div>
	);
	return LoadingSpinner;
};

export default memo(Loading);
