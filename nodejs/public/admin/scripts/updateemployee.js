var SelectEmployeeBox = React.createClass({
    getInitialState: function () {
        return { data: [] };
    },
    loadEmployeeFromServer: function () {
        $.ajax({
            url: '/selectemployee',
            data: {
                'employeefirstname': employeefirstname.value,
                'employeelastname': employeelastname.value,
                'employeephone': employeephone.value,
                'employeeemail': employeeemail.value
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
    updateSingleEmployeeFromServer: function (employee) {
        $.ajax({
            url: '/updatesingleemployee',
            dataType: 'json',
            data: employee,
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
        this.loadEmployeeFromServer();
    },
    render: function () {
        return(
            <div>
                <h1>Update Employee</h1>
                <SelectForm onEmployeeSubmit={this.loadEmployeeFromServer} />
                <UpdateForm onUpdateSubmit={this.updateSingleEmployeeFromServer} />
                <br/><br/>
                <table className="outputTable">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone Number</th>
                            <th>E-mail</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <EmployeeList data={this.state.data} />
                </table>
            </div>
        );
    }
});

var SelectForm = React.createClass({
    getInitialState: function () {
        return {
            employeekey: "",
            employeefirstname: "",
            employeelastname: "",
            employeephone: "",
            employeeemail: ""
        };
    },handleSubmit: function (e) {
        e.preventDefault();
        var employeefirstname = this.state.employeefirstname.trim();
        var employeelastname = this.state.employeelastname.trim();
        var employeephone = this.state.employeephone.trim();
        var employeeemail = this.state.employeeemail.trim();

        this.props.onEmployeeSubmit({
            employeefirstname: employeefirstname,
            employeelastname: employeelastname,
            employeephone: employeephone,
            employeeemail: employeeemail
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
                                <input type="text" name="employeefirstname" id="employeefirstname" value={this.state.employeefirstname} onChange={this.handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Last Name:</th>
                            <td>
                                <input type="text" name="employeelastname" id="employeelastname" value={this.state.employeelastname} onChange={this.handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Phone Number:</th>
                            <td>
                                <input type="text" name="employeephone" id="employeephone" value={this.state.employeephone} onChange={this.handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>E-mail:</th>
                            <td>
                                <input type="text" name="employeeemail" id="employeeemail" value={this.state.employeeemail} onChange={this.handleChange} />
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
            updateempkey: "",
            updateempfirstname: "",
            updateemplastname: "",
            updateempphone: "",
            updateempemail: ""
        };
    },handleUpdateSubmit: function (e) {
        e.preventDefault();
        var updateempkey = updateemployeekey.value;
        var updateempfirstname = updateemployeefirstname.value;
        var updateemplastname = updateemployeelastname.value;
        var updateempphone = updateemployeephone.value;
        var updateempemail = updateemployeeemail.value;

        this.props.onUpdateSubmit({
            updateempkey: updateempkey,
            updateempfirstname: updateempfirstname,
            updateemplastname: updateemplastname,
            updateempphone: updateempphone,
            updateempemail: updateempemail
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
                                <input type="text" name="updateemployeefirstname" id="updateemployeefirstname" value={this.state.updateemployeefirstname} onChange={this.handleUpdateChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Last Name:</th>
                            <td>
                                <input type="text" name="updateemployeelastname" id="updateemployeelastname" value={this.state.updateemployeelastname} onChange={this.handleUpdateChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Phone Number:</th>
                            <td>
                                <input type="text" name="updateemployeephone" id="updateemployeephone" value={this.state.updateemployeephone} onChange={this.handleUpdateChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>E-mail:</th>
                            <td>
                                <input type="text" name="updateemployeeemail" id="updateemployeeemail" value={this.state.updateemployeeemail} onChange={this.handleUpdateChange} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <input type="hidden" name="updateemployeekey" id="updateemployeekey" onChange={this.handleUpdateChange} />
                <input className="button" type="submit" value="Update" />
            </form>
            </div>
        );
    }
});

var EmployeeList = React.createClass({
    render: function () {
        var employeeNodes = this.props.data.map(function (employee) {
            //map the data to individual donations
            return (
                <Employee
                    employeeKey={employee.employeeKey}
                    employeeFirstName={employee.employeeFirstName}
                    employeeLastName={employee.employeeLastName}
                    employeePhone={employee.employeePhone}
                    employeeEmail={employee.employeeEmail}
                >
                </Employee>
            );
        });
        
        //print all the nodes in the list
        return (
            <tbody>
                {employeeNodes}
            </tbody>
        );
    }
});

var Employee = React.createClass({
    getInitialState: function () {
        return {
            updateemployeekey: "",
            singledata: []
        };
    },
    updateRecord: function (e) {
        e.preventDefault();
        var theupdateemployeekey = this.props.employeeKey;
        
        this.loadSingleEmployee(theupdateemployeekey);
    },
    deleteRecord: function (e) {
        e.preventDefault();
        var theupdateemployeekey = this.props.employeeKey;
        
        this.deleteSingleEmployee(theupdateemployeekey);
    },
    loadSingleEmployee: function (theupdateemployeekey) {
        $.ajax({
            url: '/getsingleemployee',
            data: {
                'updateemployeekey': theupdateemployeekey
            },
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ singledata: data });
                console.log(this.state.singledata);
                var populateEmployee = this.state.singledata.map(function (employee) {
                    updateemployeekey.value = employee.employeeKey;
                    updateemployeefirstname.value = employee.employeeFirstName;
                    updateemployeelastname.value = employee.employeeLastName;
                    updateemployeephone.value = employee.employeePhone;
                    updateemployeeemail.value = employee.employeeEmail;
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    deleteSingleEmployee: function (theupdateemployeekey) {
        if (confirm("Delete this record?")) {
            $.ajax({
                url: '/deletesingleemployee',
                data: {
                    'updateemployeekey': theupdateemployeekey
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
                    {this.props.employeeFirstName}
                </td>
                <td>
                    {this.props.employeeLastName}
                </td>
                <td>
                    {this.props.employeePhone}
                </td>
                <td>
                    {this.props.employeeEmail}
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
    <SelectEmployeeBox />,
    document.getElementById('content')
);