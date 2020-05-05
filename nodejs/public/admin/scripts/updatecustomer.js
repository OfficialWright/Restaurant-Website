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
    updateSingleCustomerFromServer: function (customer) {
        $.ajax({
            url: '/updatesinglecustomer',
            dataType: 'json',
            data: customer,
            type: 'POST',
            cache: false,
            success: function (updatesingledata) {
                this.setState({ updatesingledata: updatesingledata });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
        window.location.reload(true);
    },
    componentDidMount: function () {
        this.loadCustomerFromServer();
    },
    render: function () {
        return(
            <div>
                <h1>Update Customer</h1>
                <SelectForm onCustomerSubmit={this.loadCustomerFromServer} />
                <UpdateForm onUpdateSubmit={this.updateSingleCustomerFromServer} />
                <br/><br/>
                <table className="outputTable">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone Number</th>
                            <th>E-mail</th>
                            <th>Room Number</th>
                            <th>Update</th>
                            <th>Delete</th>
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
            customerkey: "",
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
            <form className="left" onSubmit={this.handleSubmit}>
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
                <input className="button" type="submit" value="Search" />
            </form>
            </div>
        );
    }
});

var UpdateForm = React.createClass({
    getInitialState: function () {
        return {
            updatecuskey: "",
            updatecusfirstname: "",
            updatecuslastname: "",
            updatecusphone: "",
            updatecusemail: "",
            updatecusroom: ""
        };
    },handleUpdateSubmit: function (e) {
        e.preventDefault();
        var updatecuskey = updatecustomerkey.value;
        var updatecusfirstname = updatecustomerfirstname.value;
        var updatecuslastname = updatecustomerlastname.value;
        var updatecusphone = updatecustomerphone.value;
        var updatecusemail = updatecustomeremail.value;
        var updatecusroom = updatecustomerroom.value;

        this.props.onUpdateSubmit({
            updatecuskey: updatecuskey,
            updatecusfirstname: updatecusfirstname,
            updatecuslastname: updatecuslastname,
            updatecusphone: updatecusphone,
            updatecusemail: updatecusemail,
            updatecusroom: updatecusroom
        });
    },
    handleUpdateChange: function (event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    },
    render: function () {
        return (
            <div>
            <form className="right" onSubmit={this.handleUpdateSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <th>First Name:</th>
                            <td>
                                <input type="text" name="updatecustomerfirstname" id="updatecustomerfirstname" value={this.state.updatecustomerfirstname} onChange={this.handleUpdateChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Last Name:</th>
                            <td>
                                <input type="text" name="updatecustomerlastname" id="updatecustomerlastname" value={this.state.updatecustomerlastname} onChange={this.handleUpdateChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Phone Number:</th>
                            <td>
                                <input type="text" name="updatecustomerphone" id="updatecustomerphone" value={this.state.updatecustomerphone} onChange={this.handleUpdateChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>E-mail:</th>
                            <td>
                                <input type="text" name="updatecustomeremail" id="updatecustomeremail" value={this.state.updatecustomeremail} onChange={this.handleUpdateChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Room Number:</th>
                            <td>
                                <input type="text" name="updatecustomerroom" id="updatecustomerroom" value={this.state.updatecustomerroom} onChange={this.handleUpdateChange} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <input type="hidden" name="updatecustomerkey" id="updatecustomerkey" onChange={this.handleUpdateChange} />
                <input className="button" type="submit" value="Update" />
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
    getInitialState: function () {
        return {
            updatecustomerkey: "",
            singledata: []
        };
    },
    updateRecord: function (e) {
        e.preventDefault();
        var theupdatecustomerkey = this.props.customerKey;
        
        this.loadSingleCustomer(theupdatecustomerkey);
    },
    deleteRecord: function (e) {
        e.preventDefault();
        var theupdatecustomerkey = this.props.customerKey;
        
        this.deleteSingleCustomer(theupdatecustomerkey);
    },
    loadSingleCustomer: function (theupdatecustomerkey) {
        $.ajax({
            url: '/getsinglecustomer',
            data: {
                'updatecustomerkey': theupdatecustomerkey
            },
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ singledata: data });
                console.log(this.state.singledata);
                var populateCustomer = this.state.singledata.map(function (customer) {
                    updatecustomerkey.value = customer.customerKey;
                    updatecustomerfirstname.value = customer.customerFirstName;
                    updatecustomerlastname.value = customer.customerLastName;
                    updatecustomerphone.value = customer.customerPhone;
                    updatecustomeremail.value = customer.customerEmail;
                    updatecustomerroom.value = customer.customerRoom;
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    deleteSingleCustomer: function (theupdatecustomerkey) {
        if (confirm("Delete this record?")) {
            $.ajax({
                url: '/deletesinglecustomer',
                data: {
                    'updatecustomerkey': theupdatecustomerkey
                },
                dataType: 'json',
                cache: false,
                success: function (data) {
                    this.setState({ singledata: data });
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
            window.location.reload(true);
        }
    },
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
                <td>
                    <form onSubmit={this.updateRecord}>
                        <input type="submit" value="Update Record" />
                    </form>
                </td>
                <td>
                    <form onSubmit={this.deleteRecord}>
                        <input type="submit" value="Delete Record" />
                    </form>
                </td>
            </tr>
        );
    }
});

ReactDOM.render(
    <SelectCustomerBox />,
    document.getElementById('content')
);