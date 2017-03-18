/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';

import {testTokenization} from './testRunner';

testTokenization('abap', [
	// Comments
	[{
	line: '* a comment',
	tokens: [
		{ startIndex: 0, type: 'comment.abap' }
	]}],

	[{
	line: ' "also a comment',
	tokens: [
		{ startIndex: 0, type: 'white.abap' },
		{ startIndex: 1, type: 'comment.partial.abap' },
	]}],

	[{
	line: 'a "also a comment',
	tokens: [
		{ startIndex: 0, type: 'identifier.abap' },
		{ startIndex: 1, type: 'white.abap' },
		{ startIndex: 2, type: 'comment.partial.abap' },
	]}],

	[{
	line: 'a ##also a comment',
	tokens: [
		{ startIndex: 0, type: 'identifier.abap' },
		{ startIndex: 1, type: 'white.abap' },
		{ startIndex: 2, type: 'comment.exceptions.abap' },
	]}],

	[{
	line: 'a = |This is a String { sy–subrc }|',
	tokens: [
		{ startIndex: 0, type: 'identifier.abap' },
		{ startIndex: 1, type: 'white.abap' },
		{ startIndex: 2, type: 'operator.abap' },
		{ startIndex: 3, type: 'white.abap' },
		{ startIndex: 4, type: 'string.abap' },
		{ startIndex: 22, type: 'operator.abap' },
		{ startIndex: 23, type: 'white.abap' },
		{ startIndex: 24, type: 'identifier.abap' },
		{ startIndex: 26, type: '' },
		{ startIndex: 27, type: 'identifier.abap' },
		{ startIndex: 32, type: 'white.abap' },
		{ startIndex: 33, type: 'operator.abap' },
		{ startIndex: 34, type: 'string.abap' }
	]}]
]);
