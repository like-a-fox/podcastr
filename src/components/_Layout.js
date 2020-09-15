import PropTypes from 'prop-types';
import React, { memo, useEffect } from 'react';
import styled from 'styled-components';
import { default as Navigation } from './_Navigation';
import { default as SEO } from './_SEO';
import { default as Loading } from './_Loading';
import { useLoading } from '../redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'gatsby-plugin-firebase';
import { navigate } from 'gatsby';

const Screen = styled.div`
	${tw`absolute flex flex-row flex-wrap overflow-auto w-full items-center p-2 justify-center`}
	top: 0;

	@media screen and (max-width: 600px) {
		bottom: 80px;
		flex-direction: column;
		justify-content: flex-start;
	}
`;

/**
 * @component
 * @type {import('react').FunctionComponent}
 * @param {object} props
 * @param {any} props.Component
 * @param {boolean} props.authRequired
 * @param {any} props.title
 * @param {boolean} props.redirect
 */
const Layout = (props) => {
	const { Component, title, authRequired, redirect } = props;
	const { loading, handleLoading } = useLoading();
	const auth = firebase.auth();
	const [user] = useAuthState(auth);
	useEffect(() => {
		if (authRequired && !user) {
			navigate('/login/');
		}
	}, [user, authRequired]);

	useEffect(() => {
		if (redirect && !authRequired && user) {
			navigate('/account/');
		}
	}, [redirect, user, authRequired]);
	if (loading) {
		return <Loading />;
	}
	return (
		<Screen>
			<SEO title={title} />
			<Component handleLoading={handleLoading} />
			<Navigation />
		</Screen>
	);
};

Layout.propTypes = {
	Component: PropTypes.any,
	authRequired: PropTypes.bool,
	title: PropTypes.any,
	redirect: PropTypes.bool,
};

Layout.defaultProps = {
	authRequired: false,
	redirect: false,
};

export default memo(Layout);
