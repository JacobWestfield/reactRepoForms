import React from "react";
import PropTypes from "prop-types";

const UserQualitiesCard = ({ data }) => {
    return (
        <div className="card mb-3">
            <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                    <span>Qualities</span>
                </h5>
                <div className="d-flex">
                    {data.map((qual) => (
                        <p className="card-text" key={qual._id}>
                            <span className={"badge m-1 bg-" + qual.color}>
                                {qual.name}
                            </span>
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};

UserQualitiesCard.propTypes = {
    data: PropTypes.array
};

export default UserQualitiesCard;
