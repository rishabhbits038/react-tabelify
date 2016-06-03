var React = require('react');

var DefaultRow = React.createClass({
    getInitialState: function () {
        return {
            expand:false
        }
    },

    getDefaultProps: function(){
        return({
            data: {},
            columnMetadata: [],
            className:'',
            onExpand:()=>{},
            onRowClick:()=>{}
        })
    },

    handleOnClick: function(event){
        this.props.onRowClick(this.props.data, event);
        event.isExpanded=!this.state.expand;
        this.setState({ expand:!this.state.expand});
        this.props.onExpand(this.props.data,event);
    },
    render: function(){

        var expandIcon = (this.state.expand || this.props.expandAll)? <i className="fa fa-angle-up"/>:<i className="fa fa-angle-down"/> ;
        return (
            <div style={{display:'inline-flex', justify:'space-between'}}>
                <div style={{width:'600px', backgroundColor:'lightblue'}}>
                    {this.props.data.name}
                </div>
                <div style={{width:'450px', backgroundColor:'grey'}}>
                    {this.props.data.cgpa}
                </div>
            </div>
        )
    }
});

module.exports = DefaultRow;
