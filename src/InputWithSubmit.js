import React from 'react';
import PropTypes from 'prop-types';

const InputWithSubmit = ({className, handleSubmit, value, onChange, error, errorText, btnText}) => (   
    <div className={className}>
        <input type="text" value={value} onChange={onChange}/>
        <button onClick={handleSubmit}>{btnText}</button>
        {error && <span style={{color: 'red'}}>{errorText}</span>}
    </div>
)

InputWithSubmit.propTypes = {
    className: PropTypes.string, 
    handleSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    error: PropTypes.bool,
    errorText: PropTypes.string,
    btnText: PropTypes.string,
}

InputWithSubmit.defaultProps = {
    value: "",
    error: false,
    errorText: "Invalid Input",
    btnText: 'submit',
}

export default InputWithSubmit