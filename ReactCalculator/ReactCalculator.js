import React, { Component } from 'react';
import { 
    View,
    Text
} from 'react-native';
import Style from './Style';
import RNJavaCalculator from './java-calculator';
import InputButton from './InputButton';

const inputButtons = [
    [1, 2, 3, 'CE', 'C'],
    [4, 5, 6, '/', '+'],
    [7, 8, 9, '*', '-'],
    ['', 0, '',  '.', '=']
];

/**
 * For more details see {@link https://kylewbanks.com/blog/react-native-tutorial-part-1-hello-react ReactCalculator} turtorial.
 * You can find the complete code on my {@link https://github.com/KerberosMorphy/RN-Calculator GitHub}.
 */
export default class ReactCalculator extends Component {

    constructor(props) {
        super(props);

        this.initialState = {
            previousInputValue: 0,
            inputValue: 0,
            selectedSymbol: null,
            numberState: true,
            decimalState: 0
        }

        this.state = this.initialState;
    }

    render() {
        return (
            <View style={Style.rootContainer}>
                <View style={Style.displayContainer}>
                    <Text style={Style.displayText}>{this.state.inputValue}</Text>
                </View>
                <View style={Style.inputContainer}>
                    {this._renderInputButtons()}
                </View>
            </View>
        )
    }

    _renderInputButtons() {

        let views = inputButtons.map((row, idx) => {
            let inputRow = row.map((buttonVal, columnIdx) => {
                return<InputButton
                        value={buttonVal}
                        highlight={this.state.selectedSymbol === buttonVal}
                        onPress={this._onInputButtonPressed.bind(this, buttonVal)}
                        key={'butt-' + columnIdx} />;
            });

            return <View style={Style.inputRow} key={'row-' + idx}>{inputRow}</View>
        });

        return views;
    }

    _onInputButtonPressed(input) {
        switch (typeof input) {
            case 'number':
                return this._handleNumberInput(input)
            default:
                return this._handleStringInput(input)
        }
    }

    _handleNumberInput(num) {
        let inputValue = num;
        if (this.state.numberState) {
            let decimalTemp = this.state.decimalState;
            let iV = this.state.inputValue;
            RNJavaCalculator.numberImputHandler(num, this.state.inputValue, this.state.decimalState, (result, decimal) => {
                this.resultHandler(result, decimal)
            });
        } else {
            this.setState({
                inputValue: inputValue,
                numberState: true
            });
        }
    }

    _handleStringInput(str) {
        switch (str) {
            case '/':
            case '*':
            case '+':
            case '-':
            case '=':
                let tmpNum = this.state.inputValue;
                RNJavaCalculator.calculator(tmpNum, str, (result) => {
                    this.resultHandler(result)
                });
                break;
            case '.':
                this.setState({
                    decimalState: 1,
                    numberState: true
                });
                break;
            case 'CE':
                this.setState(this.initialState);
                break;
            case 'C':
                if (this.state.resultState) {
                    this.setState(this.initialState);
                }
                this.setState({
                    inputValue: 0,
                    decimalState: 0
                });
                break;
        }
    }
    
    resultHandler(result, decimal) {
        this.setState({ 
            inputValue: result,
            decimalState: decimal,
            numberState: true
        });
    }
}