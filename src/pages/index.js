import React from 'react';
import { Layout, DefaultPage, Loading } from '../components';

const IndexPage = () => {
	const isSSR = typeof window === 'undefined';
	return (
		<>
			{!isSSR && (
				<React.Suspense fallback={<Loading />}>
					<Layout Component={DefaultPage} />
				</React.Suspense>
			)}
		</>
	);
};
export default IndexPage;
