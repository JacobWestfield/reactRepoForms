import React from "react";
import PropTypes from "prop-types";
// у меня тут ваще беда с названиями пропсов. Наверное стоило разделить селект и поле на два отдельных компонента
const NewComment = ({
    data,
    onChange,
    onSubmit,
    nameUser,
    nameUserValue,
    nameComment,
    nameCommentValue,
    defaultOption,
    valid,
    formRef
}) => {
    const optionsArray =
        !Array.isArray(data) && typeof data === "object"
            ? Object.values(data)
            : data;
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    return (
        <>
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>New Comment</h2>
                    <hr />
                    <form onSubmit={onSubmit} ref={formRef}>
                        <select
                            className="form-select mb-4"
                            name={nameUser}
                            value={nameUserValue}
                            onChange={handleChange}
                        >
                            <option disabled value="">
                                {defaultOption}
                            </option>
                            {optionsArray &&
                                optionsArray.length > 0 &&
                                optionsArray.map((option) => (
                                    <option value={option._id} key={option._id}>
                                        {option.name}
                                    </option>
                                ))}
                        </select>
                        <textarea
                            placeholder="Input your comment here..."
                            className="form-control mb-4"
                            rows="3"
                            type="text"
                            name={nameComment}
                            value={nameCommentValue}
                            onChange={handleChange}
                        />
                        <button
                            className="btn btn-primary w-100 mx-auto"
                            type="submit"
                            disabled={valid}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

NewComment.propTypes = {
    data: PropTypes.array,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    nameUser: PropTypes.string,
    nameUserValue: PropTypes.string,
    nameComment: PropTypes.string,
    nameCommentValue: PropTypes.string,
    defaultOption: PropTypes.string,
    valid: PropTypes.bool,
    formRef: PropTypes.any
};

export default NewComment;
