import React from "react";
import PropTypes from "prop-types";

const SarchField = ({ searchData, onSearch }) => {
    return (
        <div className="input-group mb-3">
            <input
                value={searchData}
                type="text"
                className="form-control"
                placeholder="Search..."
                aria-label="Search..."
                aria-describedby="basic-addon1"
                onChange={(e) => onSearch(e)}
            />
        </div>
    );
};

SarchField.propTypes = {
    searchData: PropTypes.string,
    onSearch: PropTypes.func
};

export default SarchField;
