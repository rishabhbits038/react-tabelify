var React = require('react');
var DefaultRow = require('./DefaultRow.js');

var GridRow = React.createClass({
    handleOnChange: function (event) {
        var selectedRows = this.props.selectedRows;
        if (selectedRows[this.props.rowId]) {
            delete selectedRows[this.props.rowId];
        }
        else {
            selectedRows[this.props.rowId] = {
                rowId: this.props.rowId,
                data: this.props.data
            };
        }
        this.props.onChangeGrid(event, {
            selectedRows: selectedRows
        })
    },
    render: function () {
        var checked = this.props.selectedRows[this.props.rowId] ? true : false;
        var Row = this.props.CustomRow ? this.props.CustomRow : DefaultRow;
        return (
            <div className={'checkbox-wrapper ' + this.props.className + (checked ? ' checked' : '')}>
                 {this.props.showCheckbox &&
                 <input type='checkbox' className='checkboxContainer' checked={checked} onChange={this.handleOnChange}/>}
                     <Row {...this.props}
                         className=''
                          style={{}}
                          checked={checked}
                     />
            </div>
        );
    }
});

module.exports = GridRow;
