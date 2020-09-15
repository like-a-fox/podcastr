import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialUploadsState = {
	items: [],
	totalCount: 0,
	active: false,
};

const UploadsSlice = createSlice({
	name: 'uploads',
	initialState: {
		...initialUploadsState,
	},
	reducers: {
		handleChangeToUploads: (state, action) => {
			let { menuId, count } = action.payload;
			let itemIndex = state.items.findIndex(({ menuId: id }) => menuId === id);
			let newCount = (state.totalCount += count);
			if (newCount !== 0) {
				state.active = true;
				if (itemIndex === -1) {
					state.items = [...state.items, { menuId, count }];
				} else {
					let currentItem = state.items[itemIndex];
					let newItemCount = currentItem.count + count;
					if (newItemCount < 1) {
						state.items = state.items.filter((_, index) => index !== itemIndex);
					} else {
						state.items[itemIndex].count += count;
					}
				}
			} else {
				state.active = false;
				state.items = [];
				state.totalCount = 0;
			}
		},
		handleResetUploads: () => ({
			...initialUploadsState,
		}),
	},
});

export const {
	handleChangeToUploads,
	handleResetUploads,
} = UploadsSlice.actions;

export const getUploadsState = createSelector(
	[(state) => state.uploads],
	(uploads) => {
		const { totalCount, active } = uploads;
		return {
			totalCount,
			active,
		};
	}
);

export default { [UploadsSlice.name]: UploadsSlice.reducer };
