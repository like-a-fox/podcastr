import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, {
	memo,
	useCallback,
	useRef,
	useEffect,
	forwardRef,
	useImperativeHandle,
} from 'react';
import { useDropzone } from 'react-dropzone';

import { useSelector, useDispatch } from 'react-redux';
import { getScreenState, handleSetFile, handleOpenFileSelect } from '../redux';
import clsx from 'clsx';

const useScreenStyles = makeStyles((theme) => ({
	root: {
		width: '-webkit-fill-available',
		height: '-webkit-fill-available',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		padding: theme.spacing(),
		position: 'relative',
		'&$displayNone': {
			display: 'none',
		},
	},
	dragContainer: {
		'&:after:not($displayNone)': {
			'&$displayNone': {
				display: 'none',
			},
			color: theme.palette.primary.main,
			height: '100vh',
			width: '-webkit-fill-available',
			display: 'flex',
			content: '" "',
			position: 'fixed',
			top: 0,
			alignItems: 'flex-start',
			flexDirection: 'column',
			bottom: 0,
			left: 0,
			right: 0,
			opacity: 0,
			'&:hover': {
				cursor: 'grab',
			},
		},
	},
	displayNone: {
		display: 'none',
	},
}));

function DropZoneComponent({ classes, active }, ref) {
	const dispatch = useDispatch();
	const onDrop = useCallback(
		(acceptedFiles) => {
			acceptedFiles.forEach((file) => {
				dispatch(handleSetFile(JSON.stringify(file)));
			});
		},
		[dispatch]
	);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
	const DraggingOverlay =
		isDragActive || active === '' ? (
			<div className={classes.dragContainer} />
		) : null;
	const { ref: filezoneRef, ...rootProps } = getRootProps();
	useImperativeHandle(ref, () => ({
		open: () => {
			filezoneRef.current.click();
		},
	}));
	return (
		<div
			className={clsx(classes.root, {
				[classes.displayNone]: active !== '',
			})}
			ref={filezoneRef}
			{...rootProps}>
			<input {...getInputProps()} />
			{DraggingOverlay}
		</div>
	);
}

// eslint-disable-next-line no-func-assign
DropZoneComponent = forwardRef(DropZoneComponent);
DropZoneComponent.propTypes = {
	classes: PropTypes.any,
	active: PropTypes.string,
};
const ScreenView = () => {
	const classes = useScreenStyles();
	const dropzoneRef = useRef();
	const dispatch = useDispatch();
	const { addFileOpen, active } = useSelector(getScreenState);

	useEffect(() => {
		if (addFileOpen) {
			dropzoneRef.current.open();
			dispatch(handleOpenFileSelect(false));
		}
	}, [addFileOpen, dropzoneRef, dispatch]);
	return (
		<DropZoneComponent active={active} classes={classes} ref={dropzoneRef} />
	);
};

export default memo(ScreenView);
