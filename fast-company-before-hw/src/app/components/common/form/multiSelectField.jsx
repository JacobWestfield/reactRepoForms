import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.values(options)
            : options;

    const handleChange = (value) => {
        onChange({ name: name, value: value });
    };
    return (
        <div className="mb-4">
            <label>{label}</label>
            <Select
                closeMenuOnSelect={false}
                name={name}
                isMulti
                defaultValue={defaultValue}
                options={optionsArray}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
            />
        </div>
    );
};

MultiSelectField.propTypes = {
    name: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.oneOfType(PropTypes.object | PropTypes.array),
    label: PropTypes.string,
    defaultValue: PropTypes.array
};

export default MultiSelectField;
