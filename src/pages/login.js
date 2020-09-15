/* eslint-disable filenames/match-regex */

import React from 'react';
import { Layout, LoginPage, Loading } from '../components';

const Login = () => {
	const isSSR = typeof window === 'undefined';
	return (
		<>
			{!isSSR && (
				<React.Suspense fallback={<Loading />}>
					<Layout title={'Login To Podcastr'} Component={LoginPage} redirect />
				</React.Suspense>
			)}
		</>
	);
};
export default Login;
