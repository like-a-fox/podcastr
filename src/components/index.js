import React from 'react';

export const DefaultPage = React.lazy(() => import('./_DefaultPage'));
export const LoginPage = React.lazy(() => import('./_LoginPage'));
export const AccountPage = React.lazy(() =>
	import('./_AccountPage/_AccountPage')
);

export const Layout = React.lazy(() => import('./_Layout'));

export { default as Loading } from './_Loading';
