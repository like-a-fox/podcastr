import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { default as store } from '../redux';
import Podcastr from '../images/icon.png';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { createGlobalStyle } from 'styled-components';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import 'typeface-cantata-one';
const theme = createMuiTheme({
	'@global': {
		'*::-webkit-scrollbar': {
			width: '0.8em',
		},
		'*::-webkit-scrollbar-track': {
			'-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
		},
		'*::-webkit-scrollbar-thumb': {
			backgroundColor: 'rgba(0,0,0,.1)',
			outline: '1px solid slategrey',
		},
		'*, *:before, *:after': 'none',
		border: 'none',
	},
	palette: {
		primary: {
			main: '#30475e',
		},
		secondary: {
			main: '#b9d3ff',
		},
	},
	overrides: {
		MuiFilledInput: {
			root: {
				backgroundColor: 'rgba(212, 220, 234, .5)',
			},
			input: {
				font: '300 1rem monospace',
			},
		},
		MuiBottomNavigation: {
			root: {
				position: 'fixed',
				bottom: 0,
				left: 0,
				right: 0,
			},
		},
		MuiFab: {
			primary: {
				position: 'fixed',
				bottom: 50,
			},
		},
	},
	typography: {
		fontFamily: [
			'monospace',
			'Monaco',
			'Consolas',
			'Liberation Mono',
			'Courier New',
		].join(','),
	},
});

const GlobalStyle = createGlobalStyle`
	* {
		${tw`mono`}
	}
  html {
	text-rendering: optimizeLegibility;
	overflow-x: hidden;
	box-sizing: border-box;
	-ms-overflow-style: scrollbar;
	-webkit-tap-highlight-color: none;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
  }
  html, body {
	background-color:rgba(212, 220, 234, .7);
	margin: 0;
	padding: 0;
	position: relative;
  }

  body {
	${tw`relative pin-0 w-screen h-screen`}
	 &:before {
		  ${tw`absolute pin-0`}
		  content: ' ';
			background-size: 300px 300px;
			background-image: url(${Podcastr});
			background-repeat: no-repeat;
			background-position: center;
			opacity: .3;
			filter: grayscale(80%);
			top:0;
			left: 0;
			right: 0;
			bottom: 0;
	   }
  }
`;

function Providers({ children }) {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<SnackbarProvider
					autoHideDuration={1250}
					anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
					maxSnack={3}>
					<GlobalStyle />
					{children}
				</SnackbarProvider>
			</ThemeProvider>
		</Provider>
	);
}

Providers.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.element,
		PropTypes.func,
	]),
};

export default memo(Providers);
