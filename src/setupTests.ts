// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import Schema from "async-validator";

Schema.warning = function () {};

global.matchMedia =
	global.matchMedia ||
	function () {
		return {
			addListener: jest.fn(),
			removeListener: jest.fn(),
		};
	};