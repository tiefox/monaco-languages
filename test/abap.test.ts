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
	line: 'declare @x int = " a simple comment',
	tokens: [
		{ startIndex: 0, type: 'keyword.abap' },
		{ startIndex: 7, type: 'white.abap' },
		{ startIndex: 8, type: 'identifier.abap' },
		{ startIndex: 10, type: 'white.abap' },
		{ startIndex: 11, type: 'keyword.abap' },
		{ startIndex: 14, type: 'white.abap' },
		{ startIndex: 15, type: 'operator.abap' },
		{ startIndex: 16, type: 'white.abap' },
		{ startIndex: 17, type: 'comment.quote.abap' },
		{ startIndex: 19, type: 'comment.abap' },
		{ startIndex: 37, type: 'comment.quote.abap' },
		{ startIndex: 39, type: 'white.abap' },
		{ startIndex: 40, type: 'number.abap' },
		{ startIndex: 41, type: 'delimiter.abap' }
	]}],

	// Not supporting nested comments, as nested comments seem to not be standard?
	// i.e. http://stackoverflow.com/questions/728172/are-there-multiline-comment-delimiters-in-sql-that-are-vendor-agnostic
	[{
	line: '@x=/* a /* nested comment  1*/;',
	tokens: [
		{ startIndex: 0, type: 'identifier.abap' },
		{ startIndex: 2, type: 'operator.abap' },
		{ startIndex: 3, type: 'comment.quote.abap' },
		{ startIndex: 5, type: 'comment.abap' },
		{ startIndex: 28, type: 'comment.quote.abap' },
		{ startIndex: 30, type: 'delimiter.abap' }
	]}],

	[{
	line: '@x=/* another comment */ 1*/;',
	tokens: [
		{ startIndex: 0, type: 'identifier.abap' },
		{ startIndex: 2, type: 'operator.abap' },
		{ startIndex: 3, type: 'comment.quote.abap' },
		{ startIndex: 5, type: 'comment.abap' },
		{ startIndex: 22, type: 'comment.quote.abap' },
		{ startIndex: 24, type: 'white.abap' },
		{ startIndex: 25, type: 'number.abap' },
		{ startIndex: 26, type: 'operator.abap' },
		{ startIndex: 28, type: 'delimiter.abap' }
	]}],

	[{
	line: '@x=/*/;',
	tokens: [
		{ startIndex: 0, type: 'identifier.abap' },
		{ startIndex: 2, type: 'operator.abap' },
		{ startIndex: 3, type: 'comment.quote.abap' },
		{ startIndex: 5, type: 'comment.abap' }
	]}],

	// Numbers
	[{
	line: '123',
	tokens: [
		{ startIndex: 0, type: 'number.abap' }
	]}],

	[{
	line: '-123',
	tokens: [
		{ startIndex: 0, type: 'operator.abap' },
		{ startIndex: 1, type: 'number.abap' }
	]}],

	[{
	line: '0xaBc123',
	tokens: [
		{ startIndex: 0, type: 'number.abap' }
	]}],

	[{
	line: '0XaBc123',
	tokens: [
		{ startIndex: 0, type: 'number.abap' }
	]}],

	[{
	line: '0x',
	tokens: [
		{ startIndex: 0, type: 'number.abap' }
	]}],

	[{
	line: '0x0',
	tokens: [
		{ startIndex: 0, type: 'number.abap' }
	]}],

	[{
	line: '0xAB_CD',
	tokens: [
		{ startIndex: 0, type: 'number.abap' },
		{ startIndex: 4, type: 'identifier.abap' }
	]}],

	[{
	line: '$',
	tokens: [
		{ startIndex: 0, type: 'number.abap' }
	]}],

	[{
	line: '$-123',
	tokens: [
		{ startIndex: 0, type: 'number.abap' }
	]}],

	[{
	line: '$-+-123',
	tokens: [
		{ startIndex: 0, type: 'number.abap' }
	]}],

	[{
	line: '$123.5678',
	tokens: [
		{ startIndex: 0, type: 'number.abap' }
	]}],

	[{
	line: '$0.99',
	tokens: [
		{ startIndex: 0, type: 'number.abap' }
	]}],

	[{
	line: '$.99',
	tokens: [
		{ startIndex: 0, type: 'number.abap' }
	]}],

	[{
	line: '$99.',
	tokens: [
		{ startIndex: 0, type: 'number.abap' }
	]}],

	[{
	line: '$0.',
	tokens: [
		{ startIndex: 0, type: 'number.abap' }
	]}],

	[{
	line: '$.0',
	tokens: [
		{ startIndex: 0, type: 'number.abap' }
	]}],

	[{
	line: '.',
	tokens: [
		{ startIndex: 0, type: 'delimiter.abap' }
	]}],

	[{
	line: '123',
	tokens: [
		{ startIndex: 0, type: 'number.abap' }
	]}],

	[{
	line: '123.5678',
	tokens: [
		{ startIndex: 0, type: 'number.abap' }
	]}],

	[{
	line: '0.99',
	tokens: [
		{ startIndex: 0, type: 'number.abap' }
	]}],

	[{
	line: '.99',
	tokens: [
		{ startIndex: 0, type: 'number.abap' }
	]}],

	[{
	line: '99.',
	tokens: [
		{ startIndex: 0, type: 'number.abap' }
	]}],

	[{
	line: '0.',
	tokens: [
		{ startIndex: 0, type: 'number.abap' }
	]}],

	[{
	line: '.0',
	tokens: [
		{ startIndex: 0, type: 'number.abap' }
	]}],

	[{
	line: '1E-2',
	tokens: [
		{ startIndex: 0, type: 'number.abap' }
	]}],

	[{
	line: '1E+2',
	tokens: [
		{ startIndex: 0, type: 'number.abap' }
	]}],

	[{
	line: '1E2',
	tokens: [
		{ startIndex: 0, type: 'number.abap' }
	]}],

	[{
	line: '0.1E2',
	tokens: [
		{ startIndex: 0, type: 'number.abap' }
	]}],

	[{
	line: '1.E2',
	tokens: [
		{ startIndex: 0, type: 'number.abap' }
	]}],

	[{
	line: '.1E2',
	tokens: [
		{ startIndex: 0, type: 'number.abap' }
	]}],

	// Identifiers
	[{
	line: '_abc$01',
	tokens: [
		{ startIndex: 0, type: 'identifier.abap' }
	]}],

	[{
	line: '#abc$01',
	tokens: [
		{ startIndex: 0, type: 'identifier.abap' }
	]}],

	[{
	line: '##abc$01',
	tokens: [
		{ startIndex: 0, type: 'identifier.abap' }
	]}],

	[{
	line: '@abc$01',
	tokens: [
		{ startIndex: 0, type: 'identifier.abap' }
	]}],

	[{
	line: '@@abc$01',
	tokens: [
		{ startIndex: 0, type: 'identifier.abap' }
	]}],

	[{
	line: '$abc',
	tokens: [
		{ startIndex: 0, type: 'identifier.abap' }
	]}],

	[{
	line: '$action',
	tokens: [
		{ startIndex: 0, type: 'predefined.abap' }
	]}],

	[{
	line: '$nonexistent',
	tokens: [
		{ startIndex: 0, type: 'identifier.abap' }
	]}],

	[{
	line: '@@DBTS',
	tokens: [
		{ startIndex: 0, type: 'predefined.abap' }
	]}],

	[{
	line: '@@nonexistent',
	tokens: [
		{ startIndex: 0, type: 'identifier.abap' }
	]}],

	[{
	line: 'declare [abc 321];',
	tokens: [
		{ startIndex: 0, type: 'keyword.abap' },
		{ startIndex: 7, type: 'white.abap' },
		{ startIndex: 8, type: 'identifier.quote.abap' },
		{ startIndex: 9, type: 'identifier.abap' },
		{ startIndex: 16, type: 'identifier.quote.abap' },
		{ startIndex: 17, type: 'delimiter.abap' }
	]}],

	[{
	line: '[abc[[ 321 ]] xyz]',
	tokens: [
		{ startIndex: 0, type: 'identifier.quote.abap' },
		{ startIndex: 1, type: 'identifier.abap' },
		{ startIndex: 17, type: 'identifier.quote.abap' }
	]}],

	[{
	line: '[abc',
	tokens: [
		{ startIndex: 0, type: 'identifier.quote.abap' },
		{ startIndex: 1, type: 'identifier.abap' }
	]}],

	[{
	line: 'declare "abc 321";',
	tokens: [
		{ startIndex: 0, type: 'keyword.abap' },
		{ startIndex: 7, type: 'white.abap' },
		{ startIndex: 8, type: 'identifier.quote.abap' },
		{ startIndex: 9, type: 'identifier.abap' },
		{ startIndex: 16, type: 'identifier.quote.abap' },
		{ startIndex: 17, type: 'delimiter.abap' }
	]}],

	[{
	line: '"abc"" 321 "" xyz"',
	tokens: [
		{ startIndex: 0, type: 'identifier.quote.abap' },
		{ startIndex: 1, type: 'identifier.abap' },
		{ startIndex: 17, type: 'identifier.quote.abap' }
	]}],

	[{
	line: '"abc',
	tokens: [
		{ startIndex: 0, type: 'identifier.quote.abap' },
		{ startIndex: 1, type: 'identifier.abap' }
	]}],

	[{
	line: 'int',
	tokens: [
		{ startIndex: 0, type: 'keyword.abap' }
	]}],

	[{
	line: '[int]',
	tokens: [
		{ startIndex: 0, type: 'identifier.quote.abap' },
		{ startIndex: 1, type: 'identifier.abap' },
		{ startIndex: 4, type: 'identifier.quote.abap' }
	]}],

	// Strings
	[{
	line: 'declare @x=\'a string\';',
	tokens: [
		{ startIndex: 0, type: 'keyword.abap' },
		{ startIndex: 7, type: 'white.abap' },
		{ startIndex: 8, type: 'identifier.abap' },
		{ startIndex: 10, type: 'operator.abap' },
		{ startIndex: 11, type: 'string.abap' },
		{ startIndex: 21, type: 'delimiter.abap' }
	]}],

	[{
	line: '\'a \'\' string with quotes\'',
	tokens: [
		{ startIndex: 0, type: 'string.abap' },
	]}],

	[{
	line: '\'a " string with quotes\'',
	tokens: [
		{ startIndex: 0, type: 'string.abap' },
	]}],

	[{
	line: '\'a -- string with comment\'',
	tokens: [
		{ startIndex: 0, type: 'string.abap' },
	]}],

	[{
	line: 'N\'a unicode string\'',
	tokens: [
		{ startIndex: 0, type: 'string.abap' },
	]}],

	[{
	line: '\'a endless string',
	tokens: [
		{ startIndex: 0, type: 'string.abap' },
	]}],

	// Operators
	[{
	line: 'SET @x=@x+1',
	tokens: [
		{ startIndex: 0, type: 'keyword.abap' },
		{ startIndex: 3, type: 'white.abap' },
		{ startIndex: 4, type: 'identifier.abap' },
		{ startIndex: 6, type: 'operator.abap' },
		{ startIndex: 7, type: 'identifier.abap' },
		{ startIndex: 9, type: 'operator.abap' },
		{ startIndex: 10, type: 'number.abap' }
	]}],

	[{
	line: '@x^=@x',
	tokens: [
		{ startIndex: 0, type: 'identifier.abap' },
		{ startIndex: 2, type: 'operator.abap' },
		{ startIndex: 4, type: 'identifier.abap' }
	]}],

	[{
	line: 'WHERE x IS NOT NULL',
	tokens: [
		{ startIndex: 0, type: 'keyword.abap' },
		{ startIndex: 5, type: 'white.abap' },
		{ startIndex: 6, type: 'identifier.abap' },
		{ startIndex: 7, type: 'white.abap' },
		{ startIndex: 8, type: 'operator.abap' },
		{ startIndex: 10, type: 'white.abap' },
		{ startIndex: 11, type: 'operator.abap' },
		{ startIndex: 14, type: 'white.abap' },
		{ startIndex: 15, type: 'operator.abap' }
	]}],

	[{
	line: 'SELECT * FROM dbo.MyTable WHERE MyColumn IN (1,2)',
	tokens: [
		{ startIndex: 0, type: 'keyword.abap' },
		{ startIndex: 6, type: 'white.abap' },
		{ startIndex: 7, type: 'operator.abap' },
		{ startIndex: 8, type: 'white.abap' },
		{ startIndex: 9, type: 'keyword.abap' },
		{ startIndex: 13, type: 'white.abap' },
		{ startIndex: 14, type: 'identifier.abap' },
		{ startIndex: 17, type: 'delimiter.abap' },
		{ startIndex: 18, type: 'identifier.abap' },
		{ startIndex: 25, type: 'white.abap' },
		{ startIndex: 26, type: 'keyword.abap' },
		{ startIndex: 31, type: 'white.abap' },
		{ startIndex: 32, type: 'identifier.abap' },
		{ startIndex: 40, type: 'white.abap' },
		{ startIndex: 41, type: 'operator.abap' },
		{ startIndex: 43, type: 'white.abap' },
		{ startIndex: 44, type: 'delimiter.parenthesis.abap' },
		{ startIndex: 45, type: 'number.abap' },
		{ startIndex: 46, type: 'delimiter.abap' },
		{ startIndex: 47, type: 'number.abap' },
		{ startIndex: 48, type: 'delimiter.parenthesis.abap' }
	]}],

	// Scopes
	[{
	line: 'WHILE() BEGIN END',
	tokens: [
		{ startIndex: 0, type: 'keyword.abap' },
		{ startIndex: 5, type: 'delimiter.parenthesis.abap' },
		{ startIndex: 7, type: 'white.abap' },
		{ startIndex: 8, type: 'keyword.block.abap' },
		{ startIndex: 13, type: 'white.abap' },
		{ startIndex: 14, type: 'keyword.block.abap' }
	]}],

	[{
	line: 'BEGIN TRAN BEGIN TRY SELECT $ COMMIT END TRY BEGIN CATCH ROLLBACK END CATCH',
	tokens: [
		{ startIndex: 0, type: 'keyword.abap' },
		{ startIndex: 10, type: 'white.abap' },
		{ startIndex: 11, type: 'keyword.try.abap' },
		{ startIndex: 20, type: 'white.abap' },
		{ startIndex: 21, type: 'keyword.abap' },
		{ startIndex: 27, type: 'white.abap' },
		{ startIndex: 28, type: 'number.abap' },
		{ startIndex: 29, type: 'white.abap' },
		{ startIndex: 30, type: 'keyword.abap' },
		{ startIndex: 36, type: 'white.abap' },
		{ startIndex: 37, type: 'keyword.try.abap' },
		{ startIndex: 44, type: 'white.abap' },
		{ startIndex: 45, type: 'keyword.catch.abap' },
		{ startIndex: 56, type: 'white.abap' },
		{ startIndex: 57, type: 'keyword.abap' },
		{ startIndex: 65, type: 'white.abap' },
		{ startIndex: 66, type: 'keyword.catch.abap' }
	]}],

	[{
	line: 'SELECT CASE $ WHEN 3 THEN 4 ELSE 5 END',
	tokens: [
		{ startIndex: 0, type: 'keyword.abap' },
		{ startIndex: 6, type: 'white.abap' },
		{ startIndex: 7, type: 'keyword.block.abap' },
		{ startIndex: 11, type: 'white.abap' },
		{ startIndex: 12, type: 'number.abap' },
		{ startIndex: 13, type: 'white.abap' },
		{ startIndex: 14, type: 'keyword.choice.abap' },
		{ startIndex: 18, type: 'white.abap' },
		{ startIndex: 19, type: 'number.abap' },
		{ startIndex: 20, type: 'white.abap' },
		{ startIndex: 21, type: 'keyword.choice.abap' },
		{ startIndex: 25, type: 'white.abap' },
		{ startIndex: 26, type: 'number.abap' },
		{ startIndex: 27, type: 'white.abap' },
		{ startIndex: 28, type: 'keyword.abap' },
		{ startIndex: 32, type: 'white.abap' },
		{ startIndex: 33, type: 'number.abap' },
		{ startIndex: 34, type: 'white.abap' },
		{ startIndex: 35, type: 'keyword.block.abap' }
	]}]
]);
