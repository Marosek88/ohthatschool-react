import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import Select from 'react-select'
import PropTypes from 'prop-types';
import {getFormInfo} from "../../actions/course";


export class AddItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form_data: {
                title: '',
                description: '',
                categories: [],
                duration: 0,
                price: 0
            },
            visibility: false,
        };

        this.handleMultiChange = this.handleMultiChange.bind(this);
    }

    // state = {
    //     title: '',
    //     description: '',
    //     categories: [],
    //
    //     visibility: false,
    // };

    static propTypes = {
        formInfo: PropTypes.array.isRequired,
        getFormInfo: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getFormInfo()
    }

    onChange = e => this.setState({[e.target.name]: e.target.value});

    handleMultiChange(option) {
        this.setState(state => {
            return {
                categories: option
            };
        });
    }

    onSubmit = e => {
        e.preventDefault();
        let form_data = new FormData();
        form_data.append('title', this.state.title);
        form_data.append('description', this.state.description);
        form_data.append('categories', this.state.categories);
        // this.props.addProject(form_data);
        this.setState({
            title: "",
            description: "",
            categories: "",
            visibility: "",
        });
    };

    toggleVisibility = () => {
        if (this.state.visibility === true) {
            this.setState({
                visibility: false,
            });
        } else {
            this.setState({
                visibility: true,
            });
        }
    };

    render() {
        const {title, description, categories, duration, price} = this.state.form_data;
        const visibility = this.state.visibility;
        console.log(this.state);
        let categoryOptions = [];
        this.props.formInfo.map(category => {
            categoryOptions.push({value: category.id, label: category.name})
        });

        const arrow = visible => (
            <i className={visible ? "ml-3 fas fa-chevron-down" : "ml-3 fas fa-chevron-right"}/>
        );

        const project_form = (
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        className="form-control"
                        type="text"
                        name="title"
                        onChange={this.onChange}
                        value={title}
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        className="form-control"
                        name="description"
                        onChange={this.onChange}
                        value={description}/>
                </div>
                <div className="form-group">
                    <label>Categories</label>
                    <Select
                        name="categories"
                        placeholder="Category"
                        value={categories}
                        options={categoryOptions}
                        onChange={this.handleMultiChange}
                    />
                </div>
                <div className="form-group">
                    <label>Duration</label>
                    <input
                        className="form-control"
                        type="number"
                        name="duration"
                        onChange={this.onChange}
                        value={duration}
                    />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input
                        className="form-control"
                        type="number"
                        name="price"
                        onChange={this.onChange}
                        value={price}
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        );

        return (
            <div className="card card-body mt-4 mb-4">
                <h3 onClick={this.toggleVisibility} className="vns-link">Add Course {arrow(visibility)}</h3>
                {visibility ? project_form : null}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    formInfo: state.course.formInfo
});

export default connect(mapStateToProps, {getFormInfo})(AddItem);