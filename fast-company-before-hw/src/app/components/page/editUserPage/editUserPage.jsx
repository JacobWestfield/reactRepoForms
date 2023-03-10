import React, { useEffect, useState } from "react";
import TextField from "../../common/form/textField";
import api from "../../../api";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const EditUserPage = ({ userId }) => {
    const history = useHistory();
    const [data, setData] = useState({
        email: "",
        name: "",
        profession: "",
        sex: "male",
        qualities: []
    });
    const [professions, setProfessions] = useState();
    const [qualities, setQualities] = useState([]);

    useEffect(() => {
        api.users.getById(userId).then((user) => {
            setData(() => {
                return {
                    email: user.email,
                    name: user.name,
                    profession: user.profession._id,
                    sex: user.sex,
                    qualities: user.qualities.map((qual) => ({
                        label: qual.name,
                        value: qual._id,
                        color: qual.color
                    }))
                };
            });
        });
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfessions(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { profession, qualities } = data;
        const object = {
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        };
        setData(object);
        console.log("Log from submit");
        console.log(object);
        api.users.update(userId, object).then((user) => {
            console.log(user);
            history.push(`/users/${userId}`);
        });
    };
    const handleBackward = () => {
        history.push(`/users/${userId}`);
    };
    if (qualities && professions) {
        return (
            <div className="container mt-5">
                <button
                    onClick={handleBackward}
                    className="btn btn-primary d-flex align-items-center"
                >
                    <i className="bi bi-arrow-left"></i>
                    Back
                </button>
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="??????"
                                type="name"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                            />{" "}
                            <TextField
                                label="?????????????????????? ??????????"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                            />
                            <SelectField
                                name="profession"
                                onChange={handleChange}
                                options={professions}
                                defaultOption="Choose..."
                                value={data}
                                label="???????????????? ???????? ??????????????????"
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="???????????????? ?????? ??????"
                            />
                            <MultiSelectField
                                options={qualities}
                                onChange={handleChange}
                                name="qualities"
                                label="???????????????? ???????? ????????????????"
                                defaultValue={data.qualities}
                            />
                            <button
                                className="btn btn-primary w-100 mx-auto"
                                type="submit"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
    return <h1>Loading data...</h1>;
};

EditUserPage.propTypes = {
    userId: PropTypes.string
};

export default EditUserPage;
