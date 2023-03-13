import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
const Comment = ({ data, onDelete }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(data.userId).then((data) => setUser(data));
    }, []);
    const dateConstructed = () => {
        const date = new Date(Number(data.created_at));
        const currentDate = new Date(Date.now());
        const month = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        if (currentDate - date < 60000) return " - 1 минуту назад";
        if (currentDate - date < 300000) return " - 5 минут назад";
        if (currentDate - date < 600000) return " - 10 минут назад";
        if (currentDate - date < 1800000) return " - 30 минут назад";
        if (currentDate - date > 1800000 && currentDate - date < 86400000) {
            return ` - ${date.getHours()}:${date.getMinutes()}`;
        }
        if (currentDate - date > 86400000 && currentDate - date < 2592000000) {
            return ` - ${date.getDate()} ${month[date.getUTCMonth()]}`;
        }
        // пришлось как-то тупо в лоб прописать месяца, потому что не нашлось метода для извлечения месяца в виде строки из объекта Date
        return ` - ${date.getUTCDate()} ${
            month[date.getUTCMonth()]
        } ${date.getFullYear()}`;
    };
    return (
        <div className="bg-light card-body  mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start ">
                        <img
                            src="https://avatars.dicebear.com/api/avataaars/qwerty.svg"
                            className="rounded-circle shadow-1-strong me-3"
                            alt="avatar"
                            width="65"
                            height="65"
                        />
                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1 ">
                                        {user && user.name}
                                        <span className="small">
                                            {user && dateConstructed()}
                                        </span>
                                    </p>
                                    <button
                                        onClick={() => onDelete(data._id)}
                                        className="btn btn-sm text-primary d-flex align-items-center"
                                    >
                                        <i className="bi bi-x-lg"></i>
                                    </button>
                                </div>
                                <p className="small mb-0">{data.content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Comment.propTypes = {
    data: PropTypes.object,
    onDelete: PropTypes.func
};

export default Comment;
