import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialScreenState = {
	active: '',
	addFileOpen: false,
	loading: false,
	files: [],
};

const ScreenSlice = createSlice({
	name: 'screen',
	initialState: {
		...initialScreenState,
	},
	reducers: {
		handleChangeScreen: (state, action) => {
			if (state.active !== action.payload) {
				state.active = action.payload;
			}
		},
		handleOpenFileSelect: (state, action) => {
			state.addFileOpen = action.payload;
		},
		handleSetFile: (state, action) => {
			state.files.push(action.payload);
		},
	},
});

export const {
	handleChangeScreen,
	handleSetFile,
	handleOpenFileSelect,
} = ScreenSlice.actions;

export const getScreenState = createSelector(
	[(state) => state.screen],
	(screen) => {
		return {
			...screen,
		};
	}
);

export const getAddFileOpen = createSelector([getScreenState], (screen) => {
	const { addFileOpen } = screen;
	return {
		addFileOpen: !!addFileOpen,
	};
});

export default { [ScreenSlice.name]: ScreenSlice.reducer };
