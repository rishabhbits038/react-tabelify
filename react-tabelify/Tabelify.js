var React = require('react');

var GridHeader = require('./GridHeader.js');
var GridFooter = require('./GridFooter.js');
var GridRows = require('./GridRows.js');
import _ from "underscore";

var SmartGrid = React.createClass({
    getOrderedColumns: function (columnMetadata) {
        return columnMetadata;

    },
    onChangeGrid: function (event, data) {
        data = data || {};
        this.props.onChangeGrid && this.props.onChangeGrid(event, data, this.props.elementId);
    },
    getDefaultProps: function () {
        return ({
            className: '',
            data: null,
            resultsPerPage: 10,
            currentPage: 1,
            sortColumn: '',
            sortDirection: '',
            forceRender: false,
            loading: false,
            layout: 'row',
            actionList: [],
            onActionClick: ()=> {
            },
            onHeaderClick: null,
            onFooterClick: null,
            showHeader: true,
            showFooter: true,
            selectedRows: {},
            elementId: null,
            transform: function (response, elementId) {
                return response.body.data;
            }
        })
    },
    sortDataOnColumn: function (data) {

        if (this.props.sortColumn === '')
            return data;
        data.map((item, index)=>{
            item['_index']=index;
        })
        data.sort((a, b)=> {
            if (this.props.sortDirection === 'ASC') {
                let num = a[this.props.sortColumn].toString().localeCompare(b[this.props.sortColumn].toString());
                if(num>0)
                    return 1;
                if(num <0)
                    return -1;
                if(a['_index']>b['_index'] )
                    return 1;
                else
                    return -1
            }
            else {
                let num =  b[this.props.sortColumn].toString().localeCompare(a[this.props.sortColumn].toString());
                if(num>0)
                    return 1;
                if(num <0)
                    return -1;
                console.log(a);
                console.log(b);
                console.log();
                if(a['_index']>b['_index'] )
                    return 1;
                else
                    return -1
            }
        })
        return data;
    },
    getResponseData: function () {
        var startIndex = (this.props.currentPage - 1) * this.props.resultsPerPage;
        var endIndex = startIndex + this.props.resultsPerPage;
        var data = this.sortDataOnColumn(this.props.data);
        data = this.patternMatch(this.state.search,data);
        data = data.slice(startIndex, endIndex);
        return data;
    },
    patternMatch: function(text,data){
        if(!text){return data}
        var that = this;
        var columnMetadata = this.props.columnMetadata;

        var filteredData = [];
        data.map( row=>{
            var rowMatched = false;
            let columns = Object.keys(row);
            for(let i=0;i<columns.length;i++){
                if(columns[i]==='_index')
                    continue;
                let columnValue = row[columns[i]];
                let formattedValue = columnMetadata[i].formatter?columnMetadata[i].formatter(columnValue).toString():columnValue.toString();
                if(typeof formattedValue === 'string' && formattedValue.toLowerCase().indexOf(text.trim().toLowerCase())!=-1){
                    rowMatched = true;
                    break;
                }
            }
            if(rowMatched===true)
                filteredData.push(row);
        })
        return filteredData;
    },
    searchHandler: function(event) {
        this.setState({
            search: event.target.value
        })
    },
    getInitialState: function(){
        return {};
    },
    render: function () {
        var data = this.props.data ? this.getResponseData() : null;
        if(this.props.data.length<this.props.resultsPerPage && this.props.currentPage>1){
            this.props.onChangeGrid(null, {
                currentPage:1
            });
        }
        var resultsOnPage = data && data.length <= this.props.resultsPerPage ? data.length : this.props.resultsPerPage;
        return (
            <div className={'gridParent'} style={this.props.style}>
            {
                    this.props.localSearch?
                        <input type="SmartInput" placeholder="search" value={this.state.search} className="grid-search" onChange={this.searchHandler}/>
                    :null
                }
                <div className="smartGridScroll">
                    <div className={'smartGrid '+ this.props.layout}
                         style={{width:this.props.width}}>

                        <GridHeader {...this.props}
                            className=''
                            style={{}}
                            onChangeGrid={this.onChangeGrid}
                            resultsOnPage={resultsOnPage}
                            data={data}
                        />
                        <GridRows {...this.props}
                            className=''
                            style={{}}
                            onChangeGrid={this.onChangeGrid}
                            resultsOnPage={resultsOnPage}
                            data={data}
                        />
                    </div>
                </div>
                <GridFooter {...this.props}
                    className=''
                    style={{}}
                    currentPage={parseInt(this.props.currentPage)}
                    totalCount={this.props.data.length}
                    onChangeGrid={this.onChangeGrid}
                    resultsOnPage={resultsOnPage}/>
            </div>
        );

    }
});

module.exports = SmartGrid;
