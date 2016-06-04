var React = require('react');
var DefaultFooter = require('./DefaultFooter.js');

var GridFooter = React.createClass({
    onChangeGrid: function (event, data) {
        var newData = data;
        newData.selectedRows = {};
        this.props.onChangeGrid(event, newData);
    },
    getInitialState: function () {
        var totalPages = Math.ceil(this.props.numberOfEntries / this.props.resultsPerPage);
        return ({
            totalPages: totalPages
        })
    },
    handleFooterClick: function (data, event) {
        this.props.onFooterClick && this.props.onFooterClick(data, event);
    },
    render: function () {
        var optionsArray = [];
        for (var i = 1; i <= this.state.totalPages; i++) {
            optionsArray.push(
                <option >{i}</option>
            )
        }
        var Footer = this.props.showFooter ? this.props.CustomFooter ? this.props.CustomFooter : DefaultFooter : null;

        return (
            <div>
                {Footer ? <Footer {...this.props}
                                  onChangeGrid={this.onChangeGrid}
                                  onFooterClick={this.handleFooterClick}/> : null}
            </div>
        )
    }
});

module.exports = GridFooter;