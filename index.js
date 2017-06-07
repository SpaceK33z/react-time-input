'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TimeInput = _react2.default.createClass({
    displayName: 'TimeInput',
    getInitialState: function getInitialState() {
        return {
            time: this.props.initTime || ''
        };
    },
    getDefaultProps: function getDefaultProps() {
        return {
            placeholder: ' '
        };
    },
    componentDidMount: function componentDidMount() {
        var _this = this;

        if (!this.props.disabled && this.props.mountFocus) {
            setTimeout(function () {
                _this._input.focus();
            }, 0);
        }
    },
    componentDidUpdate: function componentDidUpdate() {
        var _this2 = this;

        if (this.props.mountFocus) {
            setTimeout(function () {
                _this2._input.focus();
            }, 0);
        }
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (nextProps.initTime) {
            this.onChangeHandler(nextProps.initTime);
        }
    },
    isValid: function isValid(val) {

        var letterArr = val.split(':').join('').split(''),
            regexp = /^\d{0,2}?\:?\d{0,2}$/,
            valArr = [];

        if (!regexp.test(val)) {
            return false;
        }

        // check each letter

        if (letterArr[0] && (parseInt(letterArr[0], 10) < 0 || parseInt(letterArr[0], 10) > 2)) {
            return false;
        }

        if (letterArr[2] && (parseInt(letterArr[2], 10) < 0 || parseInt(letterArr[2], 10) > 5)) {
            return false;
        }

        if (valArr.indexOf(':')) {
            valArr = val.split(':');
        } else {
            valArr.push(val);
        }

        // check mm and HH
        if (valArr[0] && valArr[0].length && (parseInt(valArr[0], 10) < 0 || parseInt(valArr[0], 10) > 23)) {
            return false;
        }

        if (valArr[1] && valArr[1].length && (parseInt(valArr[1], 10) < 0 || parseInt(valArr[1], 10) > 59)) {
            return false;
        }

        return true;
    },


    lastVal: '',

    onChangeHandler: function onChangeHandler(val) {
        if (val == this.state.time) {
            return;
        }
        if (this.isValid(val)) {

            if (val.length === 2 && this.lastVal.length !== 3) {
                val = val + ':';
            }

            if (val.length === 2 && this.lastVal.length === 3) {
                val = val.slice(0, 1);
            }

            if (val.length > 5) {
                return false;
            }

            this.lastVal = val;

            this.setState({
                time: val
            });

            if (val.length === 5) {
                this.props.onTimeChange(val);
            }
        }
    },
    getType: function getType() {
        if (this.props.type) {
            return this.props.type;
        }
        return 'tel';
    },
    render: function render() {
        var _this3 = this;

        return _react2.default.createElement('input', {
            name: this.props.name ? this.props.name : undefined,
            className: this.props.className,
            type: this.getType(),
            disabled: this.props.disabled,
            placeholder: this.props.placeholder,
            value: this.state.time,
            onChange: function onChange(e) {
                return _this3.onChangeHandler(e.target.value);
            },
            onFocus: this.props.onFocusHandler ? function (e) {
                return _this3.props.onFocusHandler(e);
            } : undefined,
            onBlur: this.props.onBlurHandler ? function (e) {
                return _this3.props.onBlurHandler(e);
            } : undefined,
            ref: function ref(c) {
                return _this3._input = c;
            }
        });
    }
});

exports.default = TimeInput;
