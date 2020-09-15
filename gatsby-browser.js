/* eslint-disable filenames/match-regex */
/* eslint-disable react/prop-types */
import React from 'react';
import 'firebase/auth';
import 'firebase/database';
import { default as Providers } from './src/components/_Providers';

export const wrapRootElement = ({ element }) =>
	typeof window !== 'undefined' ? <Providers>{element}</Providers> : element;
