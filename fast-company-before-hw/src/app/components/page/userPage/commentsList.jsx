import React from "react";
import PropTypes from "prop-types";
import Comment from "./comment";

const CommentsList = ({ data, onDelete }) => {
    return (
        <>
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>Comments</h2>
                    <hr />
                    {data.map((comment) => {
                        return (
                            <Comment
                                id={comment._id}
                                key={comment._id}
                                data={comment}
                                onDelete={onDelete}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
};

CommentsList.propTypes = {
    data: PropTypes.array,
    onDelete: PropTypes.func
};

export default CommentsList;
