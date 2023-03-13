import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import UserInfoCard from "./userInfoCard";
import UserQualitiesCard from "./userQualitiesCard";
import UserMeetingsCard from "./userMeetingsCard";
import CommentsList from "./commentsList";
import NewComment from "./newComment";

const UserPage = ({ userId }) => {
    const formRef = useRef();
    const [data, setData] = useState({
        nameUser: "",
        commentName: ""
    });
    const [user, setUser] = useState();
    const [comments, setComments] = useState();
    const [users, setUsers] = useState();
    const [render, setRender] = useState(true);

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);
    // я не знал как еще сделать перерендер комментариев после добавления нового, пришлось сделать через хук
    useEffect(() => {
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
    }, [render]);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validate = () => {
        if (!data.commentName || !data.nameUser) return true;
        return false;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        api.comments.add({
            userId: data.nameUser,
            pageId: userId,
            content: data.commentName
        });
        formRef.current.reset();
        setRender(!render);
    };

    const handleCommentDelete = (commentId) => {
        api.comments.remove(commentId).then((data) => console.log(data));
        setRender(!render);
    };

    if (user) {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            <UserInfoCard data={user} />
                            <UserQualitiesCard data={user.qualities} />
                            <UserMeetingsCard data={user.completedMeetings} />
                        </div>

                        <div className="col-8">
                            <NewComment
                                formRef={formRef}
                                defaultOption="Choose user..."
                                data={users}
                                onChange={handleChange}
                                onSubmit={handleSubmit}
                                nameUser="nameUser"
                                nameComment="commentName"
                                nameUserValue={data.user}
                                nameCommentValue={data.comment}
                                valid={validate()}
                            />
                            <CommentsList
                                data={comments}
                                onDelete={handleCommentDelete}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
