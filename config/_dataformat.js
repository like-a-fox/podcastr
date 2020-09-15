const config = require('./_website');

const realPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix;
const homeURL = `${config.siteUrl}${realPrefix}`;
const image = `${homeURL}${config.siteLogo}`;

// schema.org in JSONLD format
// https://developers.google.com/search/docs/guides/intro-structured-data
// You can fill out the 'author', 'creator' with more data or another type (e.g. 'Organization')
module.exports = {
	googleAnalyticsId: config.googleAnalyticsId,
	manifest: {
		name: config.siteTitle,
		short_name: config.siteTitleShort,
		description: config.siteDescription,
		start_url: config.pathPrefix,
		display: `standalone`,
		icon: `src/images/icon.png`,
	},
	schemaOrgWebPage: {
		'@context': 'http://schema.org',
		'@type': 'WebPage',
		url: homeURL,
		title: config.siteTitle,
		headline: config.siteHeadline,
		inLanguage: 'en',
		mainEntityOfPage: homeURL,
		description: config.siteDescription,
		name: config.siteTitle,
		ogs: {
			siteName: config.siteTitleShort,
			language: 'en',
		},
		favIcons: config.favIcons,
		author: {
			'@type': 'Person',
			name: config.author,
		},
		copyrightHolder: {
			'@type': 'Person',
			name: config.author,
		},
		copyrightYear: '2020',
		creator: {
			'@type': 'Person',
			name: config.author,
		},
		publisher: {
			'@type': 'Person',
			name: config.author,
		},
		image: {
			'@type': 'ImageObject',
			url: image,
		},
	},
	themeMeta: {
		...config.theme,
		primaryColor: config.themeColor,
		backgroundColor: config.backgroundColor,
	},
	breadcrumb: {
		'@context': 'http://schema.org',
		'@type': 'BreadcrumbList',
		description: 'Breadcrumbs list',
		name: 'Breadcrumbs',
		itemListElement: [
			{
				'@type': 'ListItem',
				item: {
					'@id': homeURL,
					name: 'Homepage',
				},
				position: 1,
			},
		],
	},
};
