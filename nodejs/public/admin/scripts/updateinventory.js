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
    updateSingleInventoryFromServer: function (inventory) {
        $.ajax({
            url: '/updatesingleinventory',
            dataType: 'json',
            data: inventory,
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
        this.loadInventoryFromServer();
    },
    render: function () {
        return(
            <div>
                <h1>Update Inventory</h1>
                <SelectForm onInventorySubmit={this.loadInventoryFromServer} />
                <UpdateForm onUpdateSubmit={this.updateSingleInventoryFromServer} />
                <br/><br/>
                <table className="outputTable">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Inventory Quantity</th>
                            <th>Update</th>
                            <th>Delete</th>
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
            inventorykey: "",
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
            <form className="left" onSubmit={this.handleSubmit}>
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
                <input className="button" type="submit" value="Search" />
            </form>
            </div>
        );
    }
});

var UpdateForm = React.createClass({
    getInitialState: function () {
        return {
            updateinvkey: "",
            updateinvname: "",
            updateinvquantity: ""
        };
    },handleUpdateSubmit: function (e) {
        e.preventDefault();
        var updateinvkey = updateinventorykey.value;
        var updateinvname = updateinventoryname.value;
        var updateinvquantity = updateinventoryquantity.value;

        this.props.onUpdateSubmit({
            updateinvkey: updateinvkey,
            updateinvname: updateinvname,
            updateinvquantity: updateinvquantity
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
                            <th>Product Name:</th>
                            <td>
                                <input type="text" name="updateinventoryname" id="updateinventoryname" value={this.state.updateinventoryname} onChange={this.handleUpdateChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Inventory Quantity:</th>
                            <td>
                                <input type="text" name="updateinventoryquantity" id="updateinventoryquantity" value={this.state.updateinventoryquantity} onChange={this.handleUpdateChange} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <input type="hidden" name="updateinventorykey" id="updateinventorykey" onChange={this.handleUpdateChange} />
                <input className="button" type="submit" value="Update" />
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
    getInitialState: function () {
        return {
            updateinventorykey: "",
            singledata: []
        };
    },
    updateRecord: function (e) {
        e.preventDefault();
        var theupdateinventorykey = this.props.inventoryKey;
        
        this.loadSingleInventory(theupdateinventorykey);
    },
    deleteRecord: function (e) {
        e.preventDefault();
        var theupdateinventorykey = this.props.inventoryKey;
        
        this.deleteSingleInventory(theupdateinventorykey);
    },
    loadSingleInventory: function (theupdateinventorykey) {
        $.ajax({
            url: '/getsingleinventory',
            data: {
                'updateinventorykey': theupdateinventorykey
            },
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ singledata: data });
                console.log(this.state.singledata);
                var populateInventory = this.state.singledata.map(function (inventory) {
                    updateinventorykey.value = inventory.inventoryKey;
                    updateinventoryname.value = inventory.productName;
                    updateinventoryquantity.value = inventory.inventoryQuantityLevel;
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    deleteSingleInventory: function (theupdateinventorykey) {
        if (confirm("Delete this record?")) {
            $.ajax({
                url: '/deletesingleinventory',
                data: {
                    'updateinventorykey': theupdateinventorykey
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
                    {this.props.inventoryName}
                </td>
                <td>
                    {this.props.inventoryPrice}
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
    <SelectInventoryBox />,
    document.getElementById('content')
);