import React, { Component } from 'react';
import Category from './componenets/Category';
import Provider from './componenets/Provider';
import axios from 'axios';
import Payment from './componenets/Payment';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      providers: [],
      currentCategory: "Test Category 1",
      currentProvider: ""
    };
  }

  componentDidMount() {
    this.getProviders();
  }

  // Creating of GetProvider
  getProviders = (categoryId = 1) => {
    let url = "http://localhost:3000/providers";

    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }

    axios.get(url)
    .then(response => {
      let provider = response.data;
      this.setState({ providers: provider });
    })
    .catch(error=>{
      console.log(error);
    });
  }

  //Change of Category Component
  getChangeCategory = (category) => {
    this.setState({ currentCategory: category.name });
    this.getProviders(category.id);
  }

  //Change of Provider Component
  getChangeProvider = (provider) => {
    this.setState({ currentProvider: provider.name });
  }


  render() {

    // Declare of Variable
    let titleOfCategory = { title: "Categories" };
    let titleOfProvider = { title: "Providers" };
    let titleOfPayment = { title: "Payments" };

    // Assignment of Object-Destructuring
    const { currentCategory, currentProvider, providers } = this.state;

    return (
      <div className="container">

        <div className="row">

          <div className="col-md-3 col-md-offset-2">
            <Category
              info={titleOfCategory}
              currentCategory={currentCategory}
              changeCategory={this.getChangeCategory}
            />
          </div>

          <div className="col-md-7">
            <Payment
              info={titleOfPayment}
              currentProvider={currentProvider}
            />
          </div>

        </div>

        <div className="row">
          <div className="col-md-3">
            <Provider
              info={titleOfProvider}
              provider={providers}
              currentProvider={currentProvider}
              changeProvider={this.getChangeProvider}
            />
          </div>
        </div>

      </div>
    );
  }
}

export default App;

