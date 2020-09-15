import {
	BottomNavigation,
	BottomNavigationAction,
	fade,
	makeStyles,
	useMediaQuery,
	Badge,
} from '@material-ui/core';
import { default as Account } from '@material-ui/icons/AccountCircle';
import { default as Save } from '@material-ui/icons/GetApp';
import { default as Master } from '@material-ui/icons/GraphicEq';
import { default as InactiveSongs } from '@material-ui/icons/AlbumOutlined';
import { default as ActiveSongs } from '@material-ui/icons/Album';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getScreenState, handleChangeScreen, getUploadsState } from '../redux';
import { default as PodcastrButton } from './_PodcastrButton';
import { navigate } from 'gatsby';

const UploadsIcon = memo(function BasketIcon(props) {
	const { active, totalCount } = useSelector(getUploadsState);
	if (active) {
		return (
			<Badge badgeContent={totalCount} color={'primary'}>
				<ActiveSongs {...props} />
			</Badge>
		);
	}
	return <InactiveSongs {...props} />;
});

const useNavStyles = makeStyles((theme) => ({
	bottomNav: {
		zIndex: '1000',
		color: theme.palette.primary.light,
		height: 64,
		alignItems: 'center',
		justifyContent: 'center',
		bottom: 0,
		left: 0,
		right: 0,
		position: 'fixed',
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
	bottomNavigationButton: {
		...theme.typography.caption,
		paddingTop: 0,
		paddingBottom: theme.spacing(),
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		color: theme.palette.primary.dark,
		height: '100%',
		'&$selected': {
			'&:before': {
				bottom: 0,
				left: 0,
				right: 0,
				top: 0,
				content: "' '",
				borderTop: `3px solid ${fade(theme.palette.primary.main, 0.9)}`,
			},
			color: theme.palette.primary.light,
		},
	},

	icon: {
		color: fade(theme.palette.primary.main, 0.7),
		'&$selected': {
			color: theme.palette.primary.main,
		},
	},
	selected: {
		color: theme.palette.primary.light,
	},
}));

/**
 * @component
 * @type {import('react').FunctionComponent}
 * @param {object} props
 * @param {object} props.classes
 * @param {any} props.Icon
 * @param {string} props.view
 * @param {string} props.value
 * @param {function} props.onClick
 */
const NavigationActionButtons = (props) => {
	let { classes, value, view, Icon, ...extraProps } = props;
	return (
		<BottomNavigationAction
			classes={{
				root: classes.bottomNavigationButton,
				selected: classes.selected,
				iconOnly: classes.bottomNavigationButton,
			}}
			icon={
				<Icon
					className={clsx(classes.icon, {
						[classes.selected]: view === value,
					})}
				/>
			}
			value={value}
			{...extraProps}
		/>
	);
};

NavigationActionButtons.propTypes = {
	classes: PropTypes.object.isRequired,
	Icon: PropTypes.any,
	view: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
};

const buttons = [
	{
		label: 'Account',
		value: 'login',
		Icon: Account,
	},
	{
		label: 'Save',
		value: 'save',
		Icon: Save,
	},
	{
		label: 'Master',
		value: 'master',
		Icon: Master,
	},
	{
		label: 'Uploads',
		value: 'uploads',
		Icon: UploadsIcon,
	},
];
const Navigation = () => {
	const classes = useNavStyles();
	const mobile = useMediaQuery('(max-width:500px)');
	const { active } = useSelector(getScreenState);
	const dispatch = useDispatch();
	const handleChange = useCallback(
		(_, newValue) => {
			dispatch(handleChangeScreen(newValue));
			navigate(newValue);
		},
		[dispatch]
	);
	if (!mobile) {
		return null;
	}
	const BottomActions = buttons.map((actionProps) => (
		<NavigationActionButtons
			key={actionProps.value}
			view={active}
			showLabel={false}
			classes={classes}
			{...actionProps}
		/>
	));
	return (
		<>
			<BottomNavigation
				value={active}
				onChange={handleChange}
				className={classes.bottomNav}>
				{BottomActions}
			</BottomNavigation>
			<PodcastrButton />
		</>
	);
};

export default memo(Navigation);
