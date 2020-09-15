import React, { memo } from 'react';
import { Paper, makeStyles, fade } from '@material-ui/core';
import { default as LoginRegisterInputs } from './_LoginRegisterInputs';
import { default as LoginRegisterButtonGroup } from './_LoginRegisterButtonGroup';
import { default as LoginFormActions } from './_LoginFormActions';
import { useLoginRegisterForm } from '../../redux';

const useFormStyles = makeStyles((theme) => ({
	paperRoot: {
		paddingTop: theme.spacing(8),
		display: 'flex',
		position: 'relative',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-start',
		padding: theme.spacing(1.5),
		width: '-webkit-fill-available',
		overflow: 'hidden',
	},
	formInput: {
		fontSize: theme.typography.pxToRem(16),
		'& .MuiFilledInput-underline:before': {
			borderBottom: `1px solid ${theme.palette.primary.main}`,
		},
		'&:hover, &:focus-within': {
			'& input': {
				backgroundColor: fade(theme.palette.secondary.light, 0.9),
			},
			'&:nth-child(odd) input': {
				backgroundColor: fade(theme.palette.secondary.main, 0.9),
			},
			'& label': {
				color: theme.palette.primary.main,
			},
		},
		'& input': {
			backgroundColor: fade(theme.palette.secondary.light, 0.4),
			color: theme.palette.primary.main,
			overflow: 'hidden',
		},
		'&:nth-of-type(odd) input': {
			backgroundColor: fade(theme.palette.secondary.light, 0.1),
		},
		'& label': {
			color: theme.palette.primary.main,
		},
	},
	buttonGroup: {
		boxShadow: 'none',
		minHeight: 50,
		marginBottom: theme.spacing(),
		position: 'absolute',
		top: 0,
		left: 0,
	},
	buttonGroupButton: {
		filter: 'grayscale(40%)',
		backgroundColor: theme.palette.secondary.dark,
		color: theme.palette.text.disabled,
		width: 'fit-content',
		'&$activeButton': {
			width: '-webkit-fill-available',
			backgroundColor: theme.palette.primary.main,
			color: theme.palette.common.white,
			fontWeight: 400,
		},
	},
	activeButton: {},
	submitButton: {
		minHeight: 50,
		marginTop: theme.spacing(),
		filter: 'grayscale(40%)',
	},
}));

function RegisterForm() {
	const classes = useFormStyles();
	const {
		onToggleNewUser,
		onResetForm,
		newUser,
		...formProps
	} = useLoginRegisterForm();
	return (
		<>
			<Paper classes={{ root: classes.paperRoot }}>
				<LoginRegisterButtonGroup
					classes={classes}
					onToggleNewUser={onToggleNewUser}
					newUser={newUser}
				/>
				<LoginRegisterInputs
					classes={classes}
					newUser={newUser}
					{...formProps}
				/>
			</Paper>
			<LoginFormActions
				formProps={formProps}
				classes={classes}
				newUser={newUser}
				onResetForm={onResetForm}
			/>
		</>
	);
}

export default memo(RegisterForm);
