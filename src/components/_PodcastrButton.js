import { Fab, makeStyles } from '@material-ui/core';
import { default as Add } from '@material-ui/icons/Add';
import React, { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { handleOpenFileSelect } from '../redux';

const usePodcastrButtonStyles = makeStyles((theme) => ({
	fab: {
		padding: 0,
		position: 'fixed',
		bottom: 35,
		left: 'calc(50% - 28px)',
		zIndex: '1001',
		'&:hover': {
			backgroundColor: theme.palette.secondary.main,
		},
	},
	icon: {
		width: '-webkit-fill-available',
		height: '-webkit-fill-available',
		color: theme.palette.secondary.main,
	},
}));

const PodCastrButton = () => {
	const classes = usePodcastrButtonStyles();
	const dispatch = useDispatch();
	const handleClick = useCallback(() => dispatch(handleOpenFileSelect(true)), [
		dispatch,
	]);
	return (
		<Fab color={'primary'} onClick={handleClick} className={classes.fab}>
			<Add />
		</Fab>
	);
};

export default memo(PodCastrButton);
