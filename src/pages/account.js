/* eslint-disable filenames/match-regex */

import React from 'react';
import { Layout, AccountPage, Loading } from '../components';

const Account = () => {
	const isSSR = typeof window === 'undefined';
	return (
		<>
			{!isSSR && (
				<React.Suspense fallback={<Loading />}>
					<Layout
						authRequired
						title={'Accounts Page'}
						Component={AccountPage}
					/>
				</React.Suspense>
			)}
		</>
	);
};
export default Account;
