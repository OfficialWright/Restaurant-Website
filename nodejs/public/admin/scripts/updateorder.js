var SelectOrderBox = React.createClass({
    getInitialState: function () {
        return { data: [] };
    },
    loadOrderFromServer: function () {
        $.ajax({
            url: '/selectorder',
            data: {
                'orderproduct': orderproduct.value,
                'orderquantity': orderquantity.value,
                'orderprice': orderprice.value,
                'orderemployee': orderemployee.value,
                'ordercustomer': ordercustomer.value,
                'orderdatetime': orderdatetime.value,
                'orderstatus': ordsta.value
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
    updateSingleOrderFromServer: function (order) {
        $.ajax({
            url: '/updatesingleorder',
            dataType: 'json',
            data: order,
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
        this.loadOrderFromServer();
    },
    render: function () {
        return(
            <div>
                <h1>Update Order</h1>
                <SelectForm onOrderSubmit={this.loadOrderFromServer} />
                <UpdateForm onUpdateSubmit={this.updateSingleOrderFromServer} />
                <br/><br/>
                <table className="outputTable">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Employee</th>
                            <th>Customer</th>
                            <th>Date Time</th>
                            <th>Status</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <OrderList data={this.state.data} />
                </table>
            </div>
        );
    }
});

var SelectForm = React.createClass({
    getInitialState: function () {
        return {
            orderproduct: "",
            orderquantity: "",
            orderprice: "",
            orderemployee: "",
            ordercustomer: "",
            orderdatetime: "",
            stadata: []
        };
    },handleSubmit: function (e) {
        e.preventDefault();
        var orderproduct = this.state.orderproduct.trim();
        var orderquantity = this.state.orderquantity.trim();
        var orderprice = this.state.orderprice.trim();
        var orderemployee = this.state.orderemployee.trim();
        var ordercustomer = this.state.ordercustomer.trim();
        var orderdatetime = this.state.orderdatetime.trim();
        var orderstatus = ordsta.value;

        this.props.onOrderSubmit({
            orderproduct: orderproduct,
            orderquantity: orderquantity,
            orderprice: orderprice,
            orderemployee: orderemployee,
            ordercustomer: ordercustomer,
            orderdatetime: orderdatetime,
            orderstatus: orderstatus
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
                            <th>Product:</th>
                            <td>
                                <input type="text" name="orderproduct" id="orderproduct" value={this.state.orderproduct} onChange={this.handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Quantity:</th>
                            <td>
                                <input type="text" name="orderquantity" id="orderquantity" value={this.state.orderquantity} onChange={this.handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Price:</th>
                            <td>
                                <input type="text" name="orderprice" id="orderprice" value={this.state.orderprice} onChange={this.handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Employee:</th>
                            <td>
                                <input type="text" name="orderemployee" id="orderemployee" value={this.state.orderemployee} onChange={this.handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Customer:</th>
                            <td>
                                <input type="text" name="ordercustomer" id="ordercustomer" value={this.state.ordercustomer} onChange={this.handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Date Time:</th>
                            <td>
                                <input type="text" name="orderdatetime" id="orderdatetime" value={this.state.orderdatetime} onChange={this.handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Status:</th>
                            <td>
                                <SelectStatus data={this.state.stadata} />
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

var SelectStatus = React.createClass({
    render: function () {
        return (
            <select name="ordsta" id="ordsta">
                <option
                    key="1"
                    value="1"
                >
                    Active
                </option>

                <option
                    key="0"
                    value="0"
                >
                    Inactive
                </option>
            </select>
        );
    }
});

var UpdateForm = React.createClass({
    getInitialState: function () {
        return {
            updateordkey: "",
            updateprodata: [],
            updateordquantity: "",
            updateordprice: "",
            updateempdata: [],
            updatecusdata: [],
            updateorddatetime: "",
            updatestadata: []
        };
    },
    loadProducts: function () {
        $.ajax({
            url: '/getproducts',
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ updateprodata: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    loadEmployees: function () {
        $.ajax({
            url: '/getemployees',
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ updateempdata: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    loadCustomers: function () {
        $.ajax({
            url: '/getcustomers',
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ updatecusdata: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function () {
        this.loadProducts();
        this.loadEmployees();
        this.loadCustomers();
    },
    handleUpdateSubmit: function (e) {
        e.preventDefault();
        var updateordkey = updateorderkey.value;
        var updateordproduct = updateordpro.value;
        var updateordquantity = updateorderquantity.value;
        var updateordprice = updateorderprice.value;
        var updateordemployee = updateordemp.value;
        var updateordcustomer = updateordcus.value;
        var updateorddatetime = updateorderdatetime.value;
        var updateordstatus = updateordsta.value;

        this.props.onUpdateSubmit({
            updateordkey: updateordkey,
            updateordproduct: updateordproduct,
            updateordquantity: updateordquantity,
            updateordprice: updateordprice,
            updateordemployee: updateordemployee,
            updateordcustomer: updateordcustomer,
            updateorddatetime: updateorddatetime,
            updateordstatus: updateordstatus
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
                            <th>Product:</th>
                            <td>
                                <SelectProduct data={this.state.updateprodata} />
                            </td>
                        </tr>
                        <tr>
                            <th>Quantity:</th>
                            <td>
                                <input type="text" name="updateorderquantity" id="updateorderquantity" value={this.state.updateorderquantity} onChange={this.handleUpdateChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Price:</th>
                            <td>
                                <input type="text" name="updateorderprice" id="updateorderprice" value={this.state.updateorderprice} onChange={this.handleUpdateChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Employee:</th>
                            <td>
                                <SelectEmployee data={this.state.updateempdata} />
                            </td>
                        </tr>
                        <tr>
                            <th>Customer:</th>
                            <td>
                                <SelectCustomer data={this.state.updatecusdata} />
                            </td>
                        </tr>
                        <tr>
                            <th>Date Time:</th>
                            <td>
                                <input type="text" name="updateorderdatetime" id="updateorderdatetime" value={this.state.updateorderdatetime} onChange={this.handleUpdateChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Status:</th>
                            <td>
                                <SelectUpdateStatus data={this.state.updatestadata} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <input type="hidden" name="updateorderkey" id="updateorderkey" onChange={this.handleUpdateChange} />
                <input className="button" type="submit" value="Update" />
            </form>
            </div>
        );
    }
});

var SelectProduct = React.createClass({
    render: function () {
        var optionNodes = this.props.data.map(function (updateordpro) {
            return (
                <option
                    key={updateordpro.productKey}
                    value={updateordpro.productKey}
                >
                    {updateordpro.productName}
                </option>
            );
        });
        return (
            <select name="updateordpro" id="updateordpro">
                {optionNodes}
            </select>
        );
    }
});

var SelectEmployee = React.createClass({
    render: function () {
        var optionNodes = this.props.data.map(function (updateordemp) {
            return (
                <option
                    key={updateordemp.employeeKey}
                    value={updateordemp.employeeKey}
                >
                    {updateordemp.employeeFirstName}
                </option>
            );
        });
        return (
            <select name="updateordemp" id="updateordemp">
                {optionNodes}
            </select>
        );
    }
});

var SelectCustomer = React.createClass({
    render: function () {
        var optionNodes = this.props.data.map(function (updateordcus) {
            return (
                <option
                    key={updateordcus.customerKey}
                    value={updateordcus.customerKey}
                >
                    {updateordcus.customerFirstName}
                </option>
            );
        });
        return (
            <select name="updateordcus" id="updateordcus">
                {optionNodes}
            </select>
        );
    }
});

var SelectUpdateStatus = React.createClass({
    render: function () {
        return (
            <select name="updateordsta" id="updateordsta">
                <option
                    key="1"
                    value="1"
                >
                    Active
                </option>

                <option
                    key="0"
                    value="0"
                >
                    Inactive
                </option>
            </select>
        );
    }
});

var OrderList = React.createClass({
    render: function () {
        var orderNodes = this.props.data.map(function (order) {
            if (order.customerOrderStatus==1) {
                var theStatus="Active"
            } else {
                var theStatus="Inactive"
            }
            //map the data to individual donations
            return (
                <Order
                    orderkey={order.orderDetailKey}
                    orderproduct={order.productName}
                    orderquantity={order.orderDetailQuantity}
                    orderprice={order.orderDetailUnitPrice}
                    orderemployee={order.employeeFirstName}
                    ordercustomer={order.customerFirstName}
                    orderdatetime={order.customerOrderDateTime}
                    orderstatus={theStatus}
                >
                </Order>
            );
        });
        
        //print all the nodes in the list
        return (
            <tbody>
                {orderNodes}
            </tbody>
        );
    }
});

var Order = React.createClass({
    getInitialState: function () {
        return {
            updateorderkey: "",
            singledata: []
        };
    },
    updateRecord: function (e) {
        e.preventDefault();
        var theupdateorderkey = this.props.orderkey;
        
        this.loadSingleOrder(theupdateorderkey);
    },
    deleteRecord: function (e) {
        e.preventDefault();
        var theupdateorderkey = this.props.orderkey;
        
        this.deleteSingleOrder(theupdateorderkey);
    },
    loadSingleOrder: function (theupdateorderkey) {
        $.ajax({
            url: '/getsingleorder',
            data: {
                'updateorderkey': theupdateorderkey
            },
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ singledata: data });
                console.log(this.state.singledata);
                var populateOrder = this.state.singledata.map(function (order) {
                    updateorderkey.value = order.orderDetailKey;
                    updateordpro.value = order.productKey;
                    updateorderquantity.value = order.orderDetailQuantity;
                    updateorderprice.value = order.orderDetailUnitPrice;
                    updateordemp.value = order.employeeKey;
                    updateordcus.value = order.customerKey;
                    updateorderdatetime.value = order.customerOrderDateTime;
                    updateordsta.value = order.customerOrderStatus;
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    deleteSingleOrder: function (theupdateorderkey) {
        if (confirm("Delete this record?")) {
            $.ajax({
                url: '/deletesingleorder',
                data: {
                    'updateorderkey': theupdateorderkey
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
                    {this.props.orderproduct}
                </td>
                <td>
                    {this.props.orderquantity}
                </td>
                <td>
                    {this.props.orderprice}
                </td>
                <td>
                    {this.props.orderemployee}
                </td>
                <td>
                    {this.props.ordercustomer}
                </td>
                <td>
                    {this.props.orderdatetime}
                </td>
                <td>
                    {this.props.orderstatus}
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
    <SelectOrderBox />,
    document.getElementById('content')
);