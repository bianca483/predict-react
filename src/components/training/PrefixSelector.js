import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TextField} from 'react-md/lib/TextFields/index';
import {SelectionControlGroup} from 'react-md/lib/SelectionControls/index';
import {
    NN,
    ONLY_THIS,
    paddingControls,
    prefixTypeControls,
    prefixLengthTypeControls,
    TIME_SERIES_PREDICTION,
    ZERO_PADDING
} from '../../reference';
import {encodingPropType} from '../../propTypes';
import {Slider} from 'react-md';

const groupStyle = {height: 'auto'};
const methodConfig = 'encoding';

/* eslint-disable camelcase */
class PrefixSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {error: false,
                        p_len_type: 'int'};
    }

    onPrefixChange(prefix_length) {
        this.errorCheck(prefix_length);
        this.props.onChange({methodConfig, key: 'prefix_length', isFloat: true}, prefix_length);
    }

    errorCheck(prefix_length) {
        if (prefix_length === '') {
            return;
        }
        const pref = parseFloat(prefix_length);
        if (pref > this.props.maxEventsInLog) {
            this.setState({error: true});
        } else {
            this.setState({error: false});
        }
    }

    changePrefixType(value) {
        this.setState({p_len_type: value});
    }

    render() {
        const classes = this.props.isLabelForm ? 'md-grid' : 'md-cell md-cell--4';
        const cl = this.props.isLabelForm ? 'md-cell md-cell--3' : '';
        const prefixLengthText =
            this.props.predictionMethod === TIME_SERIES_PREDICTION ? 'Samples length' : 'Prefix length';
        let p_len;

        if (this.state.p_len_type === 'int') {
            p_len = (<TextField
                id="prefixLength"
                label={`${prefixLengthText} (maximum ${this.props.maxEventsInLog})`}
                type="number"
                value={this.props.encoding.prefix_length}
                onChange={this.onPrefixChange.bind(this)}
                max={this.props.maxEventsInLog}
                min={2}
                required
                className={cl}
                error={this.state.error}
                errorText={`Can't be greater than log maximum prefix length
                ${this.props.maxEventsInLog} and smaller then 2`}/>);
        } else {
            p_len = (<Slider
                id="prefixLengthSlider"
                label="Prefix length percentage. Default 0.2.  Min = 0, Max = 1, Step = 0.05"
                min={0}
                max={1}
                step={0.05}
                value={this.props.encoding.prefix_length}
                valuePrecision={2}
                discrete
                onChange={this.onPrefixChange.bind(this)}
            />);
        }


        const filteredPaddingControls = paddingControls.filter(obj =>
            (((this.props.predictionMethod === TIME_SERIES_PREDICTION && [ZERO_PADDING].includes(obj.value)) ||
                (this.props.predictionMethod !== TIME_SERIES_PREDICTION)) &&
                ((this.props.classification.includes(NN) && [ZERO_PADDING].includes(obj.value)) ||
                    (!this.props.classification.includes(NN))) &&
                ((this.props.regression.includes(NN) && [ZERO_PADDING].includes(obj.value)) ||
                    (!this.props.regression.includes(NN))))
        );

        const filteredPrefixTypeControls = prefixTypeControls.filter(obj =>
            ((this.props.predictionMethod === TIME_SERIES_PREDICTION && [ONLY_THIS].includes(obj.value)) ||
                (this.props.predictionMethod !== TIME_SERIES_PREDICTION) &&
                ((this.props.classification.includes(NN) && [ONLY_THIS].includes(obj.value)) ||
                    (!this.props.classification.includes(NN))) &&
                ((this.props.regression.includes(NN) && [ONLY_THIS].includes(obj.value)) ||
                    (!this.props.regression.includes(NN))))
        );


        return <div className={classes}>
            <SelectionControlGroup type="radio" name="padding" id="padding" label="Encoded log padding" inline
                                   onChange={this.props.onChange.bind(this, {methodConfig, key: 'padding'})}
                                   className={cl} controls={filteredPaddingControls} value={this.props.encoding.padding}
                                   controlStyle={groupStyle}/>
            <SelectionControlGroup type="radio" name="generation_type" id="generation_type" label="Task generation type"
                                   onChange={this.props.onChange.bind(this, {methodConfig, key: 'generation_type'})}
                                   controls={filteredPrefixTypeControls} inline className={cl}
                                   value={this.props.encoding.generation_type} controlStyle={groupStyle}/>

            <SelectionControlGroup type="radio" name="prefix_length" id="prefix_length" label="Prefix Length"
                                   onChange={this.changePrefixType.bind(this)}
                                   controls={prefixLengthTypeControls} inline className={cl}
                                   value={this.state.p_len_type} controlStyle={groupStyle}/>

            {p_len}

        </div>;
    }
}

PrefixSelector.propTypes = {
    encoding: PropTypes.shape(encodingPropType).isRequired,
    maxEventsInLog: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    isLabelForm: PropTypes.bool,
    predictionMethod: PropTypes.string.isRequired,
    classification: PropTypes.arrayOf(PropTypes.string).isRequired,
    regression: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default PrefixSelector;
