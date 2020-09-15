import { createSlice, createSelector } from '@reduxjs/toolkit';
import { handleEmailValidation } from '../utils';
import { useDispatch, useSelector } from 'react-redux';

const initalLoginState = {
	newUser: true,
	firstName: '',
	lastName: '',
	emailAddress: '',
	password: '',
	formErrors: {
		firstName: null,
		lastName: null,
		emailAddress: null,
		password: null,
	},
};

const LoginFormSlice = createSlice({
	name: 'login_form',
	initialState: {
		...initalLoginState,
	},
	reducers: {
		handleToggleNewUser: (state) => {
			state.newUser = !state.newUser;
		},
		handleChangeGeneric: (state, action) => {
			const { name, value } = action.payload;
			if (name && state[name] !== value) {
				state[name] = value;
			}
		},
		handleEmailChange: (state, action) => {
			if (state.emailAddress !== action.payload) {
				const emailValidation = handleEmailValidation(action.payload);
				state.formErrors.emailAddress = emailValidation.error
					? emailValidation.message
					: null;
				state.emailAddress = action.payload;
			}
		},
		handleBlurGeneric: (state, action) => {
			const { name, value } = action.payload;
			if (value === null || value === undefined || value === '') {
				state.formErrors[name] = 'Field is required';
				state[name] = value;
			}
		},
		handleReset: () => ({
			...initalLoginState,
		}),
	},
});

export const {
	handleChangeGeneric,
	handleEmailChange,
	handleToggleNewUser,
	handleBlurGeneric,
	handleReset,
} = LoginFormSlice.actions;

const getFormState = createSelector(
	[(state) => state.login_form, (state) => state.screen.active],
	(form, auth, active) => {
		return {
			active,
			newUser: form.newUser,
			...form,
			...auth,
		};
	}
);

export const useLoginRegisterForm = () => {
	const { isLoaded, isEmpty, newUser, active, ...formProps } = useSelector(
		getFormState
	);
	const dispatch = useDispatch();
	return {
		...formProps,
		newUser,
		onLoginFormChange: (event) =>
			dispatch(
				handleChangeGeneric({
					name: event.target.name,
					value: event.target.value,
				})
			),
		onLoginFormBlur: (event) =>
			dispatch(
				handleBlurGeneric({
					name: event.target.name,
					value: event.target.value,
				})
			),
		onEmailChange: (event) => dispatch(handleEmailChange(event.target.value)),
		onLoginFormCancel: () => dispatch(handleReset()),
		onToggleNewUser: () => dispatch(handleToggleNewUser()),
		onResetForm: () => dispatch(handleReset()),
	};
};

export default { [LoginFormSlice.name]: LoginFormSlice.reducer };
