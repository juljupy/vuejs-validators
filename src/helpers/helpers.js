
const { Collection } = require('collect.js');
const { Arr } = require('../support/Arr.js');
const { explode, trim } = require('locutus/php/strings');
const { function_exists } = require('locutus/php/funchand');
const { is_null, is_object, isset, is_array } = require('locutus/php/var');
const { array_shift, in_array } = require('locutus/php/array');
// object_get
// value
// _with
// data_set
// data_get
if (! function_exists('object_get')) {
	/**
	 * Get an item from an object using "dot" notation.
	 *
	 * @param  object
	 * @param  key
	 * @param  original
	 * @return mixed
	 */
	function object_get(object, key, original = null)
	{
		if (is_null(key) || trim(key) == '') {
			return object;
		}

		let resolved = false;
		let segments = explode('.', key);

		segments.forEach((segment) => {
			if (resolved === false) {
				if (!is_object(object) || !isset(object[segment])) {
					resolved = value(original);
				}

				object = object[segment];
			}
		});

		if (resolved !== false) return resolved;

		return object;
	}
}

if (! function_exists('value')) {
	/**
	 * Return the default value of the given value.
	 *
	 * {mixed} value
	 * {mixed} mixed
	 */
	function value(value)
	{
		return typeof value === 'function' ? value() : value;
	}
}


if (! function_exists('with')) {
	/**
	 * Return the given value, optionally passed through the given callback.
	 *
	 * {mixed}  value
	 * {callable|null}  callback
	 * @return mixed
	 */
	function _with(value, callback = null)
	{
		return is_null(callback) ? value : callback(value);
	}
}

if (! function_exists('data_set')) {
	/**
	 * Set an item on an array or object using dot notation.
	 *
	 * @param  target
	 * @param  key
	 * @param  value
	 * @param  overwrite
	 * @return mixed
	 */
	function data_set(target, key, value, overwrite = true) {
		key = Array.isArray(key) ? key : key.split('.');

		if (!key.includes('*')) {

			let build = key.reduce((build, path, index, original) => {
				return build[path]
			}, target);

			console.log(build);
		}
		else if (key.includes('*')) {
			key.reduce((segments, segment, index, all_segments) => {
				if (segment !== '*') {
					return [...segments, segment]
				}

				if (segment === '*') {
					let wildcard = all_segments[index];
					let base_path = segments.slice(0, wildcard.length);
					let relative_path = segments.slice(wildcard.length, all_segments.length);

					let inner = data_get(target, base_path);

					if (Array.isArray(target)) {

						let innerConfig = inner.forEach((item, index) => data_set(item[index], relative_path, value, overwrite));
						console.log(innerConfig);
					}
				}
			}, []);
		}

		return target;
	}
}

if (! function_exists('data_get')) {
	/**
	 * Get an item from an array or object using "dot" notation.
	 *
	 * @param  target
	 * @param  key
	 * @param  fallback
	 * @return mixed
	 */
	function data_get(target, key, fallback = null) {
		if (is_null(key)) {
			return target;
		}

		key = is_array(key) ? key : explode('.', key);

		let wildCardAhead = false;

		key.forEach((segment, i) => {
			delete segment[i];

			if (wildCardAhead) {
				wildCardAhead = false;

				return target;
			}

			if (is_null(segment)) {
				return target;
			}

			if (segment === '*') {
				let result = [];

				if (Array.isArray(target) && target[0] && typeof target[0] === 'object') {

					let next = false;
					let nextSegment;
					let iteration = 0;

					key.forEach((seg, index) => {
						if (next === true) {
							nextSegment = seg;

							iteration = index;

							next = false;
						}


						if (seg === segment) {
							next = true;
						}
					});

					wildCardAhead = true;

					let loop = 0;
					result, target = target.reduce((build, item) => {
						let resolve = [
							...build,
							item[nextSegment] ? item[nextSegment] : item
						];

						loop++;

						return resolve;
					}, []).filter(value => typeof value !== 'undefined');


					if (typeof key[iteration + 1] !== 'undefined') {
						return data_get(result, key.slice(iteration + 1).join('.'));
					} else {
						return result;
					}
				}
				else if (target instanceof Collection) {
					target = target.all();
				} else if (!Array.isArray(target) && typeof target !== 'object') {
					return value(fallback);
				}

				else if (typeof target === 'object' && Array.isArray(target) === false) {
					Array.from(target).forEach(([key, item]) => {
						result.push(data_get(target, key));
					});
				}

				else if (is_array(target)) {
					if (target[0] && typeof target[0] === 'object' && Array.isArray(target[0]) === false) {
						Object.keys(target[0]).reduce((results, key) => [
							result.push(
								result.reduce((list, item) => [
									item[key],
									...list,
								], [])
							)
						], result);
					}
					else {
						target.forEach((item) => {
							result.push(data_get(item, key));
						});
					}
				}

				return in_array('*', key) ? Arr.collapse(result) : result;
			}

			if (Arr.accessible(target) && Arr.exists(target, segment)) {
				target = target[segment];
			} else if (is_object(target) && isset(target[segment])) {
				target = target[segment];
			} else {
				return value(fallback);
			}
		});

		return target;
	}
}

module.exports = {
	value,
	data_set,
	data_get,
	object_get,
};