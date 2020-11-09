import React, { Component } from 'react'
import axios from 'axios';
import swal from 'sweetalert';

export default class Payment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            amount: "",
            currency: "AZN",
            cardNumber: "",
            expireMonth: "",
            expireYear: "",
            cvv: ""
        };
    }
    
    // Change Event of Form Fields
    changeHandler = (e) => {
        // console.log(e.target.value);
        // console.log(e.target.name);
        this.setState({ [e.target.name]: e.target.value })
    }

    // Clear of Input Fields After Response
    emptyFields(){
        document.querySelector("#clearAmount").value="";
        document.querySelector("#defaultOptionVal").value="AZN";
        document.querySelector("#clearCardNum").value="";
        document.querySelector("#exp_Month").value="";
        document.querySelector("#exp_Year").value="";
        document.querySelector("#cvv").value="";
    }

    // Form Submit Event
    submitHandler=(e)=>{
        e.preventDefault();

        let url ="http://localhost:3000/payments";

        axios.post(url,this.state)
        .then(response=>{
            console.log(response);
            swal({
                title: "Good job!",
                text: "Success Payment Proccess",
                icon: "success",
                button: "Close!",
              });
        })
        .catch(error=>{
            console.log(error);
        })

        this.emptyFields();
        
    }

    render() {

        // Assignment of Object-Destructuring
        const { currentProvider, info } = this.props;
        const { amount, currency, cardNumber, expireMonth, expireYear, cvv } = this.state;

        return (
            <div>
                {
                    currentProvider ?
                        <div className="mt-5 ml-5">

                            <span className="badge badge-info">{info.title}</span>

                            <br />

                            <label htmlFor="ProviderName" className="mt-2">
                                Provider Name:
                                <span className="badge badge-danger ml-2">
                                    {currentProvider}
                                </span>
                            </label>

                            <form action="#" className="form-inline mt-3" onSubmit={this.submitHandler} name="paymentForm">

                                <div className="row">

                                    <div className="col-md-6 form-inline">
                                        <div className="form-group">
                                            <label htmlFor="Amount">Amount: </label>
                                            <input id="clearAmount" type="text" className="form-control ml-4" name="amount" value={amount} onChange={this.changeHandler} placeholder="Enter Amount" required />
                                        </div>
                                    </div>

                                    <div className="col-md-6 form-inline">
                                        <div className="form-group ml-5">
                                            <label htmlFor="Currency">Currency:</label>
                                            <select id="defaultOptionVal" className="form-control ml-4" name="currency" onChange={this.changeHandler} defaultValue={currency}>
                                                <option>AZN</option>
                                                <option>USD</option>
                                                <option>EURO</option>
                                            </select>
                                        </div>
                                    </div>

                                </div>

                                <div className="row mt-3">

                                    <div className="col-md-6 form-inline">
                                        <div className="form-group">
                                            <label htmlFor="CardNumber">Card Number:</label>
                                            <input id="clearCardNum" type="text" className="form-control ml-2" name="cardNumber" value={cardNumber} onChange={this.changeHandler} placeholder="Enter Card Number" maxLength="16" minLength="16" required />
                                        </div>
                                    </div>

                                    <div className="col-md-6 form-inline">

                                        <div className="form-group ml-4">
                                            <label htmlFor="ExpireMonth">Exp_Month:</label>
                                            <input id="exp_Month" type="text" className="form-control ml-3" name="expireMonth" value={expireMonth} onChange={this.changeHandler} placeholder="Enter Expire Month" maxLength="2" minLength="2" required />
                                        </div>
                                    </div>

                                </div>

                                <div className="row mt-3">

                                    <div className="col-md-6 form-inline">
                                        <div className="form-group">
                                            <label htmlFor="ExpireYear">Exp_Year:</label>
                                            <input id="exp_Year" type="text" className="form-control ml-4" name="expireYear" value={expireYear} onChange={this.changeHandler} placeholder="Enter Expire Year" maxLength="2" minLength="2" required />
                                        </div>
                                    </div>

                                    <div className="col-md-6 form-inline">
                                        <div className="form-group ml-4">
                                            <label htmlFor="CVV">Cvv:</label>
                                            <input id="cvv" type="text" className="form-control ml-4" name="cvv" value={cvv} onChange={this.changeHandler} placeholder="Enter Cvv" maxLength="3" minLength="3" required />
                                        </div>
                                    </div>

                                </div>

                                <button type="submit" className="btn btn-primary mt-4">Checkout</button>

                            </form>
                        </div>
                        : null
                }

            </div>
        )
    }
}
