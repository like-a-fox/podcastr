/* eslint-disable filenames/match-regex */
require('dotenv').config();
module.exports = {
	siteMetadata: require('./config'),
	/* Plugins */
	plugins: [
		`gatsby-plugin-tailwindcss`,
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-styled-components`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/src/images/`,
				name: `images`,
			},
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		`gatsby-plugin-react-svg`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Podcastr`,
				short_name: `Podcastr`,
				description: `Audio Mastering With Audio Scientist Sound with only Audio enthusiast knowledge`,
				lang: `en`,
				display: `standalone`,
				icon: `src/images/icon.png`,
				start_url: `/`,
				background_color: `#fafafa`,
				theme_color: `#ff5851`,
			},
		},
		`gatsby-plugin-smoothscroll`,
		{
			resolve: `gatsby-plugin-purgecss`,
			options: {
				printRejected: true,
				develop: true,
				tailwind: true,
			},
		},
		{
			resolve: 'gatsby-plugin-firebase',
			options: {
				credentials: require('./config/env').FIREBASE_CONFIG,
			},
		},
		/* Must be placed at the end */
		// `gatsby-plugin-offline`,
	],
};
