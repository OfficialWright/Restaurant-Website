var SelectCustomerBox = React.createClass({
    getInitialState: function () {
        return { data: [] };
    },
    loadCustomerFromServer: function () {
        $.ajax({
            url: '/selectcustomer',
            data: {
                'customerfirstname': customerfirstname.value,
                'customerlastname': customerlastname.value,
                'customerphone': customerphone.value,
                'customeremail': customeremail.value,
                'customerroom': customerroom.value
            },
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function () {
        this.loadCustomerFromServer();
    },
    render: function () {
        return(
            <div>
                <h1>Select Customer</h1>
                <SelectForm onCustomerSubmit={this.loadCustomerFromServer} />
                <br/><br/>
                <table className="outputTable">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone Number</th>
                            <th>E-mail</th>
                            <th>Room Number</th>
                        </tr>
                    </thead>
                    <CustomerList data={this.state.data} />
                </table>
            </div>
        );
    }
});

var SelectForm = React.createClass({
    getInitialState: function () {
        return {
            customerfirstname: "",
            customerlastname: "",
            customerphone: "",
            customeremail: "",
            customerroom: ""
        };
    },handleSubmit: function (e) {
        e.preventDefault();
        var customerfirstname = this.state.customerfirstname.trim();
        var customerlastname = this.state.customerlastname.trim();
        var customerphone = this.state.customerphone.trim();
        var customeremail = this.state.customeremail.trim();
        var customerroom = this.state.customerroom.trim();

        this.props.onCustomerSubmit({
            customerfirstname: customerfirstname,
            customerlastname: customerlastname,
            customerphone: customerphone,
            customeremail: customeremail,
            customerroom: customerroom
        });
    },
    handleChange: function (event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    },
    render: function () {
        return (
            <div>
            <form onSubmit={this.handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <th>First Name:</th>
                            <td>
                                <input type="text" name="customerfirstname" id="customerfirstname" value={this.state.customerfirstname} onChange={this.handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Last Name:</th>
                            <td>
                                <input type="text" name="customerlastname" id="customerlastname" value={this.state.customerlastname} onChange={this.handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Phone Number:</th>
                            <td>
                                <input type="text" name="customerphone" id="customerphone" value={this.state.customerphone} onChange={this.handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>E-mail:</th>
                            <td>
                                <input type="text" name="customeremail" id="customeremail" value={this.state.customeremail} onChange={this.handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Room Number:</th>
                            <td>
                                <input type="text" name="customerroom" id="customerroom" value={this.state.customerroom} onChange={this.handleChange} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <input className="button" type="submit" value="Enter" />
            </form>
            </div>
        );
    }
});

var CustomerList = React.createClass({
    render: function () {
        var customerNodes = this.props.data.map(function (customer) {
            //map the data to individual donations
            return (
                <Customer
                    customerKey={customer.customerKey}
                    customerFirstName={customer.customerFirstName}
                    customerLastName={customer.customerLastName}
                    customerPhone={customer.customerPhone}
                    customerEmail={customer.customerEmail}
                    customerRoom={customer.customerRoom}
                >
                </Customer>
            );
        });
        
        //print all the nodes in the list
        return (
            <tbody>
                {customerNodes}
            </tbody>
        );
    }
});

var Customer = React.createClass({
    render: function () {
        //display an individual donation
        return (
            <tr>
                <td>
                    {this.props.customerFirstName}
                </td>
                <td>
                    {this.props.customerLastName}
                </td>
                <td>
                    {this.props.customerPhone}
                </td>
                <td>
                    {this.props.customerEmail}
                </td>
                <td>
                    {this.props.customerRoom}
                </td>
            </tr>
        );
    }
});

ReactDOM.render(
    <SelectCustomerBox />,
    document.getElementById('content')
);