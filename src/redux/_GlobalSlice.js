import { createSlice, createSelector } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';

const LoadingSlice = createSlice({
	name: 'loading',
	initialState: 'false',
	reducers: {
		setLoading: (state, action) => {
			let loadingState = action.payload;
			if (state !== loadingState) {
				return loadingState;
			}
		},
	},
});
const getLoading = createSelector(
	[(state) => state.loading],
	(loading) => loading
);
export const useLoading = () => {
	const dispatch = useDispatch();
	const loading = useSelector(getLoading);
	const handleLoading = useCallback(
		(_loading) =>
			dispatch(LoadingSlice.actions.setLoading(_loading.toString())),
		[dispatch]
	);

	return {
		loading: loading === 'true',
		handleLoading,
	};
};

export const { reducer: LoadingReducer } = LoadingSlice;
