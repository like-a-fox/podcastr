import firebase from 'gatsby-plugin-firebase';
import { useLoading } from '../../redux';
import { navigate } from 'gatsby';
import { useSnackbar } from 'notistack';

export const useLoginPage = (formProps) => {
	const { enqueueSnackbar } = useSnackbar();
	let auth = firebase.auth();
	let db = firebase.database();
	const { handleLoading } = useLoading();
	const onRegister = () => {
		handleLoading(true);
		auth
			.createUserWithEmailAndPassword(
				formProps.emailAddress,
				formProps.password
			)
			.then((user) => {
				db.ref('/users')
					.push(JSON.parse(JSON.stringify({ ...user, formProps })))
					.then(() => handleLoading(false));
			});
	};
	const onLogin = () => {
		handleLoading(true);
		auth
			.signInWithEmailAndPassword(formProps.emailAddress, formProps.password)
			.then(() => {
				navigate('/account');
				handleLoading(false);
			})
			.catch((err) => {
				handleLoading(false);
				enqueueSnackbar(`Login Failed: ${err.message}`, {
					variant: 'error',
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'center',
					},
				});
			});
	};
	return {
		onLogin,
		onRegister,
	};
};
