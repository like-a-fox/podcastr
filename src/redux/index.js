import { default as ScreenReducer } from './_ScreenSlice';
import { default as UploadsReducer } from './_UploadsSlice';
import { default as LoginForm } from './_LoginFormSlice';
import { LoadingReducer } from './_GlobalSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

export {
	handleChangeScreen,
	handleOpenFileSelect,
	handleSetFile,
	getAddFileOpen,
	getScreenState,
} from './_ScreenSlice';
export {
	getUploadsState,
	handleChangeToUploads,
	handleResetUploads,
} from './_UploadsSlice';

export { useLoginRegisterForm } from './_LoginFormSlice';
export { useLoading } from './_GlobalSlice';
const rootReducer = combineReducers({
	loading: LoadingReducer,
	...ScreenReducer,
	...UploadsReducer,
	...LoginForm,
});

export default configureStore({ reducer: rootReducer });
