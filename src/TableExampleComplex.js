import React, { Component } from 'react';
import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
    propContainer: {
        width: 200,
        overflow: 'hidden',
        margin: '20px auto 0',
    },
    propToggleHeader: {
        margin: '20px auto 10px',
    },
};

/**
 * A more complex example, allowing the table height to be set, and key boolean properties to be toggled.
 */
export default class TableExampleComplex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fixedHeader: true,
            fixedFooter: false,
            stripedRows: false,
            showRowHover: false,
            selectable: true,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            showCheckboxes: false,
            height: '300px',
            open: false,

            name: '',
            cheap: 0,
            address: '',
            url: '',
        };
        this.RaisedButtonComponent = this.RaisedButtonComponent.bind(this);
    }

    componentWillMount() {
        //console.log('子-componentWillMount')
    }

    shouldComponentUpdate(nextProps, nextState) {
        //console.log('子-shouldComponentUpdate');
        if (nextProps.cafeList.length == 0) {
            return false;
        }

        return true;
    }

    handleOpen = (event) => {
        this.setState({
            open: true,
            name: event.name,
            cheap: event.cheap,
            address: event.address,
            url: event.url,
        });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleToggle = (event, toggled) => {
        this.setState({
            [event.target.name]: toggled,
        });
    };

    handleChange = (event) => {
        this.setState({ height: event.target.value });
    };


    RaisedButtonComponent(item) {
        return (
            <RaisedButton
                label="明細"
                onClick={() => this.handleOpen(item)}
            />
        )
    }

    render() {
        //console.log('子元件render');
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />
        ];

        return (
            <div>
                <Table
                    height={this.state.height}
                    fixedHeader={this.state.fixedHeader}
                    fixedFooter={this.state.fixedFooter}
                    selectable={this.state.selectable}
                    multiSelectable={this.state.multiSelectable}
                >
                    <TableHeader
                        displaySelectAll={this.state.showCheckboxes}
                        adjustForCheckbox={this.state.showCheckboxes}
                        enableSelectAll={this.state.enableSelectAll}
                    >
                        <TableRow>
                            <TableHeaderColumn colSpan="3" tooltip="Super Header" style={{ textAlign: 'center' }}>
                                咖啡店列表
                            </TableHeaderColumn>
                        </TableRow>
                        <TableRow>
                            <TableHeaderColumn tooltip="The ID">明細</TableHeaderColumn>
                            <TableHeaderColumn tooltip="咖啡廳名稱">名稱</TableHeaderColumn>
                            <TableHeaderColumn tooltip="咖啡店地址">地址</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={this.state.showCheckboxes}
                        deselectOnClickaway={this.state.deselectOnClickaway}
                        showRowHover={this.state.showRowHover}
                        stripedRows={this.state.stripedRows}
                    >
                        {this.props.cafeList.map((row, index) => (
                            <TableRow key={index}>
                                <TableRowColumn>
                                    {
                                        this.RaisedButtonComponent(row)
                                    }
                                </TableRowColumn>
                                <TableRowColumn>{row.name}</TableRowColumn>
                                <TableRowColumn>{row.address}</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter
                        adjustForCheckbox={this.state.showCheckboxes}
                    >
                        <TableRow>
                            <TableRowColumn>ID</TableRowColumn>
                            <TableRowColumn>Name</TableRowColumn>
                            <TableRowColumn>Status</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn colSpan="3" style={{ textAlign: 'center' }}>
                                Super Footer
                            </TableRowColumn>
                        </TableRow>
                    </TableFooter>
                </Table>
                <Dialog
                    title="咖啡店明細"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    名稱：{this.state.name}<br />
                    評價：{this.state.cheap}<br />
                    地址：{this.state.address}<br />
                    網址：<a href={this.state.url}>點我</a>

                </Dialog>
            </div>
        );
    }
}