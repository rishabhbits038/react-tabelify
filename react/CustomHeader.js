var React = require('react');

var DefaultHeader = React.createClass({
    handleOnClick: function(event){
        var sortColumn = event.currentTarget.getAttribute('data-column');
        var sortDirection = null;
        if(sortColumn === this.props.sortColumn){
            if (this.props.sortDirection ==='ASC')
                sortDirection = 'DESC';
            else
                sortDirection = 'ASC';
        }
        else{
            sortDirection = 'ASC';
        }
        this.props.onChangeGrid(event,{
            sortColumn: event.currentTarget.getAttribute('data-column'),
            sortDirection: sortDirection
        });
    },
    render: function(){
        var HeaderCells = this.props.columnMetadata.map((columnMeta,columnIndex)=>{
            var displayName = columnMeta.displayName;

            var sortIcon =  null;


            if(columnMeta.columnName ===this.props.sortColumn){
                if(this.props.sortDirection === 'ASC')
                    sortIcon =  "▲";
                else if(this.props.sortDirection === 'DESC')
                    sortIcon = "▼";
            }

            var style = (columnMeta.flexBasis !== undefined) ? {flexBasis:columnMeta.flexBasis,flexGrow:0,flexShrink:0} : {};
            if (columnMeta.flexGrow !== undefined) {
              style.flexGrow = columnMeta.flexGrow;
            }

            style = Object.assign(style,columnMeta.style,columnMeta.headerStyle);

            return (
              <div data-column = {columnMeta.columnName} title={columnMeta.toolTip||displayName} className={'defaultCell column-'+columnIndex+' column-'+columnMeta.columnName+' header-cell'} style={style} onClick = {this.handleOnClick} key={columnIndex}>
                  {displayName}<span style={{position:'relative'}}>{sortIcon}</span>
              </div>);
        });

        return (
          <div className = 'defaultRow header'>
            {HeaderCells}
          </div>);
    }
});

module.exports = DefaultHeader;
