"use strict";

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function ParseRule(validator, field, rules) {
  return pipe(field, validator, rules).into(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 5),
        attribute = _ref2[0],
        value = _ref2[1],
        parameters = _ref2[2],
        rule = _ref2[3],
        name = _ref2[4];

    return {
      attribute: attribute,
      value: value,
      parameters: parameters,
      rule: rule,
      name: name,
      message: function message() {
        return resolveMessage({
          name: name,
          attribute: attribute,
          parameters: parameters,
          validator: validator
        });
      },
      validator: validator
    };
  });
};

var resolveMessage = function resolveMessage(_ref3) {
  var attribute = _ref3.attribute,
      name = _ref3.name,
      validator = _ref3.validator,
      parameters = _ref3.parameters;
  var custom = validator.customMessages,
      global = validator.messages;
  console.log({
    attribute: attribute,
    name: name,
    parameters: parameters
  });
  var message = custom["".concat(attribute, ".").concat(name)] ? custom["".concat(attribute, ".").concat(name)].replace(/:attribute/gi, attribute) : global[name].replace(/:attribute/gi, attribute);
  return parameters[0] ? message.replace(":".concat(name), parameters[0]) : message;
};

var pipe = function pipe(field, validator, rules) {
  var array = Array.isArray(rules) ? rules : rules.split('|');
  return {
    into: function into(shape) {
      return array.map(function (item) {
        return item.split(':');
      }).map(function (_ref4) {
        var _ref5 = _toArray(_ref4),
            rule = _ref5[0],
            args = _ref5.slice(1);

        return [field, validator.data[field], args, validator.rules[rule], rule];
      }).map(shape);
    }
  };
};