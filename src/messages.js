'use strict';

module.exports = {
	required: `:attribute is required`,
	required_if: `:attribute is required if :if is :value`,
	required_unless: `:attribute is required unless :unless is :value`,
	required_with: `:attribute is required with :with`,
	required_without: `:attribute is required without :without`,
	required_with_all: `:attribute is required with all :with_all`,
	required_without_all: `:attribute is required without all :without_all`,
	less_than: ':number must be greater than :number',
	greater_than: ':attribute must be greater than :number',
	lte: ':attribute must be less than or equal to :number',
	gte: ':attribute must be less than or equal to :number',
	date: ':attribute must be a date',
	after: ':attribute must be after :after date',
	after_or_equal: ':attribute must be after or equal to :after date',
	before: ':attribute must be before :before date',
	before_or_equal: ':attribute must be before or equal to :before date',
	date_equals: ':attribute must be the same date as :date',
	boolean: ':attribute must be a boolean',
	number: ':attribute must be a number',
	numeric: ':attribute must be numeric',
	accepted: `:attribute is not accepted`,
	same: ':attribute must be the same as :same',
	different: ':attribute must be different than :different',
	confirmed: ':attribute must have the same value as :attribute confirmation field',
	min: `:attribute isn't allowed to be less than :min characters`,
	max: `:attribute isn't allowed to be greater than :max characters`,
	within: `:attribute does not exist in :within`,
	not_within: ':attribute should not be value within :not_within',
	email: `:attribute must be an email`,
	phone: `:attribute must be a phone number`,
	regex: `:attribute does not match proper pattern`,
	not_regex: `:attribute should not match the given pattern pattern`,
	url: ':attribute is not a valid url',
	alpha: ':attribute must be entirely alphabetic characters',
	alpha_dash: ':attribute must be alpha-numeric characters with dashes and underscores',
	alpha_num: ':attribute must be entirely alpha numeric characters',
	array: ':attribute must be an array',
	string: ':attribute must be a string',
	between: ':attribute must be between :between',
	json: ':attribute must be a valid json string',
	digits: ':attribute must be numeric and must be :digits numbers long',
	digits_between: ':attribute must be numeric and have length between :lower and :upper',
	distinct: ':attribute must have distinct set of values, there should be no duplicates',
	integer: ':attribute must be an integer',
	ends_with: ':attribute must end with :ends_with or any other defined options',
	starts_with: ':attribute must start with :starts_with or any other of the defined options',
	ip: ':attribute is not a valid ip4 or ip6 address',
	ipv4: ':attribute is not a valid ip4 address',
	ipv6: ':attribute is not a valid ip6 address',
};
