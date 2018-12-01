import React from 'react';
import ReactSelect from 'react-select';

class Select extends React.Component {
    // state = {
    //     selectedOption: null,
    // }
    // { value: 'chocolate', label: 'Chocolate' },
    handleChange = (selectedOption) => {
        this.props.onChange({
            target: {
                value: selectedOption,
                name: this.props.name,
            },
        });
    }
    render() {
        const { value, options } = this.props;
        return (
            <ReactSelect
                value={value}
                onChange={this.handleChange}
                options={options}
            />
        );
    }
}

export default Select;