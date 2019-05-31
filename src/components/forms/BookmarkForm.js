import React, { Component } from "react";
import { connect } from "react-redux";
import { createBookmark } from "./../../actions";
import { reduxForm, Field } from "redux-form";

const Input = ({input, meta, type}) => {
    return <span>
                <input {...input} type={type} autoComplete="off"/>
                <span>{meta.touched && meta.error}</span>
            </span>
}

class BookmarkForm extends Component {

    onFormSubmit = async (formValues) => {
        const { title, url } = formValues
        const { createBookmark, reset } = this.props;

        createBookmark({ title, url });
        reset();
    }

    render(){
        const { handleSubmit } = this.props;

        return(
            <form onSubmit={handleSubmit(this.onFormSubmit)}>
                <p>
                    <label htmlFor="title">Title</label>
                    <Field 
                        type="text"
                        name="title"
                        component={Input}
                    />
                </p>
                <p>
                    <label htmlFor="url">url</label>
                    <Field 
                        type="text"
                        name="url"
                        component={Input}
                    />
                </p>
                <p>
                    <input type="submit" value="Create new bookmark" />
                </p>
            </form>
        );
    }
}

const WrappedBookmarkForm = reduxForm({
    form: "bookmark",
    validate: (formValues) => {
        const errors = {};

            if (!formValues.title) {
                errors.title = "Title is required"
            }

            if (!formValues.url) {
                errors.url = "Url is required"
            }
        return errors;
    }
})(BookmarkForm);

export default connect(null, { createBookmark })(WrappedBookmarkForm);