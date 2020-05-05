var SelectScheduleBox = React.createClass({
    getInitialState: function () {
        return { data: [] };
    },
    loadScheduleFromServer: function () {
        $.ajax({
            url: '/selectschedule',
            data: {
                'scheduleday': scheduleday.value,
                'schedulestart': schedulestart.value,
                'scheduleend': scheduleend.value
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
    updateSingleScheduleFromServer: function (schedule) {
        $.ajax({
            url: '/updatesingleschedule',
            dataType: 'json',
            data: schedule,
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
        this.loadScheduleFromServer();
    },
    render: function () {
        return(
            <div>
                <h1>Update Schedule</h1>
                <SelectForm onScheduleSubmit={this.loadScheduleFromServer} />
                <UpdateForm onUpdateSubmit={this.updateSingleScheduleFromServer} />
                <br/><br/>
                <div>
                    <div>
                        <table className="outputTable">
                            <thead>
                                <tr>
                                    <th>Day</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th>Update</th>
                                </tr>
                            </thead>
                            <ScheduleList data={this.state.data} />
                        </table>
                    </div>
                </div>
            </div>
        );
    }
});

var SelectForm = React.createClass({
    getInitialState: function () {
        return {
            schedulekey: "",
            scheduleday: "",
            schedulestart: "",
            scheduleend: ""
        };
    },handleSubmit: function (e) {
        e.preventDefault();
        var scheduleday = this.state.scheduleday.trim();
        var schedulestart = this.state.schedulestart.trim();
        var scheduleend = this.state.scheduleend.trim();

        this.props.onScheduleSubmit({
            scheduleday: scheduleday,
            schedulestart: schedulestart,
            scheduleend: scheduleend
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
                            <th>Day:</th>
                            <td>
                                <input type="text" name="scheduleday" id="scheduleday" value={this.state.scheduleday} onChange={this.handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Start Time:</th>
                            <td>
                                <input type="text" name="schedulestart" id="schedulestart" value={this.state.schedulestart} onChange={this.handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>End Time:</th>
                            <td>
                                <input type="text" name="scheduleend" id="scheduleend" value={this.state.scheduleend} onChange={this.handleChange} />
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
            updateschkey: "",
            updateschday: "",
            updateschstart: "",
            updateschend: ""
        };
    },handleUpdateSubmit: function (e) {
        e.preventDefault();
        var updateschkey = updateschedulekey.value;
        var updateschday = updatescheduleday.value;
        var updateschstart = updateschedulestart.value;
        var updateschend = updatescheduleend.value;

        this.props.onUpdateSubmit({
            updateschkey: updateschkey,
            updateschday: updateschday,
            updateschstart: updateschstart,
            updateschend: updateschend
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
                            <th>Day:</th>
                            <td>
                                <input type="text" name="updatescheduleday" id="updatescheduleday" value={this.state.updatescheduleday} onChange={this.handleUpdateChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>Start Time:</th>
                            <td>
                                <input type="text" name="updateschedulestart" id="updateschedulestart" value={this.state.updateschedulestart} onChange={this.handleUpdateChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>End Time:</th>
                            <td>
                                <input type="text" name="updatescheduleend" id="updatescheduleend" value={this.state.updatescheduleend} onChange={this.handleUpdateChange} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <input type="hidden" name="updateschedulekey" id="updateschedulekey" onChange={this.handleUpdateChange} />
                <input className="button" type="submit" value="Update" />
            </form>
            </div>
        );
    }
});

var ScheduleList = React.createClass({
    render: function () {
        var scheduleNodes = this.props.data.map(function (schedule) {
            //map the data to individual donations
            return (
                <Schedule
                    scheduleKey={schedule.scheduleKey}
                    scheduleDay={schedule.scheduleDay}
                    scheduleStartTime={schedule.scheduleStartTime}
                    scheduleEndTime={schedule.scheduleEndTime}
                >
                </Schedule>
            );
        });
        
        //print all the nodes in the list
        return (
            <tbody>
                {scheduleNodes}
            </tbody>
        );
    }
});

var Schedule = React.createClass({
    getInitialState: function () {
        return {
            updateschedulekey: "",
            singledata: []
        };
    },
    updateRecord: function (e) {
        e.preventDefault();
        var theupdateschedulekey = this.props.scheduleKey;
        
        this.loadSingleSchedule(theupdateschedulekey);
    },
    loadSingleSchedule: function (theupdateschedulekey) {
        $.ajax({
            url: '/getsingleschedule',
            data: {
                'updateschedulekey': theupdateschedulekey
            },
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ singledata: data });
                console.log(this.state.singledata);
                var populateSchedule = this.state.singledata.map(function (schedule) {
                    updateschedulekey.value = schedule.scheduleKey;
                    updatescheduleday.value = schedule.scheduleDay;
                    updateschedulestart.value = schedule.scheduleStartTime;
                    updatescheduleend.value = schedule.scheduleEndTime;
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function () {
        //display an individual donation
        return (
            <tr>
                <td>
                    {this.props.scheduleDay}
                </td>
                <td>
                    {this.props.scheduleStartTime}
                </td>
                <td>
                    {this.props.scheduleEndTime}
                </td>
                <td>
                    <form onSubmit={this.updateRecord}>
                        <input type="submit" value="Update Record" />
                    </form>
                </td>
            </tr>
        );
    }
});

ReactDOM.render(
    <SelectScheduleBox />,
    document.getElementById('content')
);