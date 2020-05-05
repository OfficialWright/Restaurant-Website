var SelectInventoryBox = React.createClass({
    getInitialState: function () {
        return { data: [] };
    },
    loadInventoryFromServer: function () {
        $.ajax({
            url: '/selectinventory',
            data: {
                'inventoryname': inventoryname.value,
                'inventoryquantity': inventoryquantity.value
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
        this.loadInventoryFromServer();
    },
    render: function () {
        return(
            <div>
                <h1>Report Inventory</h1>
                <SelectForm onInventorySubmit={this.loadInventoryFromServer} />
                <br/><br/>
                <table className="outputTable">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Inventory Quantity</th>
                        </tr>
                    </thead>
                    <InventoryList data={this.state.data} />
                </table>
            </div>
        );
    }
});

var SelectForm = React.createClass({
    getInitialState: function () {
        return {
            inventoryname: "",
            inventoryquantity: ""
        };
    },handleSubmit: function (e) {
        e.preventDefault();
        var inventoryname = this.state.inventoryname.trim();
        var inventoryquantity = this.state.inventoryquantity.trim();

        this.props.onInventorySubmit({
            inventoryname: inventoryname,
            inventoryquantity: inventoryquantity
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
                            <th>Product Name:</th>
                            <td>
                                <input type="text" name="inventoryname" id="inventoryname" value={this.state.inventoryname} onChange={this.handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Inventory Quantity:</th>
                            <td>
                                <input type="text" name="inventoryquantity" id="inventoryquantity" value={this.state.inventoryquantity} onChange={this.handleChange} />
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

var InventoryList = React.createClass({
    render: function () {
        var inventoryNodes = this.props.data.map(function (inventory) {
            //map the data to individual donations
            return (
                <Inventory
                    inventoryKey={inventory.inventoryKey}
                    inventoryName={inventory.productName}
                    inventoryPrice={inventory.inventoryQuantityLevel}
                >
                </Inventory>
            );
        });
        
        //print all the nodes in the list
        return (
            <tbody>
                {inventoryNodes}
            </tbody>
        );
    }
});

var Inventory = React.createClass({
    render: function () {
        //display an individual donation
        return (
            <tr>
                <td>
                    {this.props.inventoryName}
                </td>
                <td>
                    {this.props.inventoryPrice}
                </td>
            </tr>
        );
    }
});

ReactDOM.render(
    <SelectInventoryBox />,
    document.getElementById('content')
);