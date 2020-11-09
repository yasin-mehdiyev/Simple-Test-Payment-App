import React, { Component } from 'react'
import axios from 'axios';

class Category extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };
    }

    componentDidMount() {
        this.getCategories();
    }

    getCategories = () => {
        let url = "http://localhost:3000/categories";

        axios.get(url)
            .then(response => {
                let category = response.data;
                this.setState({ categories: category });
            })

    }


    render() {

        // Assignment of Object-Destructuring
        const { currentCategory, info, changeCategory } = this.props;
        const { categories } = this.state;

        return (
            <div>
                <div className="mt-5">
                    <span className="badge badge-primary">{info.title}</span>

                    <ul className="list-group mt-2">
                        {
                            categories.map(category => (
                                <li
                                    key={category.id}
                                    className={category.name === currentCategory ? "list-group-item active" : "list-group-item"}
                                    onClick={() => changeCategory(category)}
                                >
                                    {category.name}
                                </li>
                            ))
                        }
                    </ul>

                </div>
            </div>
        )
    }
}

export default Category;
