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
    componentDidMount: function () {
        this.loadOrderFromServer();
    },
    render: function () {
        return(
            <div>
                <h1>Select Order</h1>
                <SelectForm onOrderSubmit={this.loadOrderFromServer} />
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
            <form onSubmit={this.handleSubmit}>
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
                <input className="button" type="submit" value="Enter" />
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
            </tr>
        );
    }
});

ReactDOM.render(
    <SelectOrderBox />,
    document.getElementById('content')
);