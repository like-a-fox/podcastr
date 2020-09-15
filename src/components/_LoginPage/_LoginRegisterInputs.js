import PropTypes from 'prop-types';
import React, { memo, useState } from 'react';
import { TextField } from '@material-ui/core';

function LoginRegisterInputs(props) {
	const {
		newUser,
		onLoginFormChange,
		onLoginFormBlur,
		onEmailChange,
		classes,
		...formProps
	} = props;
	const { firstName, lastName, emailAddress, password, formErrors } = formProps;
	const [confirmations, setConfirmation] = useState(() => ({
		emailAddress: {
			value: '',
			error: null,
		},
		password: {
			value: '',
			error: null,
		},
	}));
	let hasError = (field) =>
		formErrors && formErrors[field] ? !!formErrors[field].length : false;
	let helperText = (field) => hasError(field) && formErrors[field];
	const inputProps = {
		onBlur: onLoginFormChange,
		required: true,
		color: 'primary',
		fullWidth: true,
		variant: 'filled',
		InputLabelProps: {
			shrink: true,
		},
	};

	const handleBlurConfirmation = (event) => {
		const { name, value } = event.target;
		setConfirmation((confirmations) => ({
			...confirmations,
			[name]: {
				value,
				error:
					value !== props[name]
						? `${
								name.substring(0, 1).toUpperCase() + name.substring(1)
						  } Field Does not match`
						: null,
			},
		}));
	};

	const NewUserInputs = newUser ? (
		<>
			<TextField
				error={hasError(firstName)}
				helperText={helperText(firstName)}
				defaultValue={firstName}
				label={'First Name'}
				name={'firstName'}
				className={classes.formInput}
				{...inputProps}
			/>
			<TextField
				error={hasError(lastName)}
				helperText={helperText(lastName)}
				defaultValue={lastName}
				label={'Last Name'}
				name={'lastName'}
				className={classes.formInput}
				{...inputProps}
			/>
		</>
	) : null;
	const hasErrorConfirm = (field) =>
		confirmations[field] && !!confirmations[field].error;
	const helperTextConfirm = (field) =>
		hasErrorConfirm(field) && confirmations[field].error;
	const PasswordConfirmation = newUser ? (
		<TextField
			error={hasErrorConfirm(password)}
			helperText={helperTextConfirm(password)}
			defaultValue={confirmations.password.value}
			type={'password'}
			label={'Confirm Password'}
			name={'password'}
			required
			fullWidth
			onBlur={handleBlurConfirmation}
			variant={'filled'}
			color={'primary'}
			className={classes.formInput}
			InputLabelProps={{
				shrink: true,
			}}
		/>
	) : null;

	const EmailAddressConfirmation = newUser ? (
		<TextField
			error={hasErrorConfirm(emailAddress)}
			helperText={helperTextConfirm(emailAddress)}
			defaultValue={confirmations.emailAddress.value}
			type={'emailAddress'}
			label={'Confirm E-Mail Address'}
			name={'emailAddress'}
			required
			variant={'filled'}
			fullWidth
			color={'primary'}
			onBlur={handleBlurConfirmation}
			className={classes.formInput}
			InputLabelProps={{
				shrink: true,
			}}
		/>
	) : null;
	return (
		<>
			{NewUserInputs}
			<TextField
				error={hasError(emailAddress)}
				helperText={helperText(emailAddress)}
				defaultValue={emailAddress}
				type={'emailAddress'}
				label={'E-Mail Address'}
				name={'emailAddress'}
				required
				fullWidth
				variant={'filled'}
				color={'primary'}
				onBlur={onEmailChange}
				className={classes.formInput}
				InputLabelProps={{
					shrink: true,
				}}
			/>
			{EmailAddressConfirmation}
			<TextField
				error={hasError(password)}
				helperText={helperText(password)}
				defaultValue={password}
				label={'Password'}
				type={'password'}
				name={'password'}
				className={classes.formInput}
				{...inputProps}
			/>
			{PasswordConfirmation}
		</>
	);
}

LoginRegisterInputs.propTypes = {
	classes: PropTypes.shape({
		formInput: PropTypes.any,
	}),
	newUser: PropTypes.bool,
	onEmailChange: PropTypes.func,
	onLoginFormBlur: PropTypes.func,
	onLoginFormChange: PropTypes.func,
};

LoginRegisterInputs.defaultProps = {
	newUser: true,
};
export default memo(LoginRegisterInputs);
