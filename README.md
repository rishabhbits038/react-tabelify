# Tabelify 
Tabelify is the one of the best data grid libraries for react. The sole reason to build this that there was no other library which was generic enough to cater our needs.
So, we decided to build a library which is generic, highly customisable and easy to use.

[Live Demo](http://rishabhbits038.github.io/react-tabelify/)

Tabelify is an uncontrolled component. That means any change in the grid is propogated to the parent via an onChangeGrid function. The The function can be caught and required changes can then be stored in state(by setState method), which will then rerender Tabeliify with new props.
Thus, data manipulation happens only at one place.

#STEPS:
npm install 
npm install webpack -g 
npm start webpack --progress --colors 
goto http://localhost:3000/ to see the the page

#Note: 
In case you are importing react-tabelify, do not forget the link the css file along with it.

#For details on Tanbelify, Have a look at the blog : 
https://medium.com/@rishabh.bits038/the-simplest-way-to-create-a-data-grid-in-react-ccdd4368ee7a#.r7h57mfnj

#Working example:

```
export default class Page extends React.Component {
    constructor(){
        super();
        this.onChangeGrid = this.onChangeGrid.bind(this);
        this.state={
        tableConfig: {
                columnMetadata: [
                    {
                        "columnName": "cgpa",
                        "displayName": "CGPA",
                    },
                    {
                        "columnName": "name",
                        "displayName": "Name"
                    },
                ],
                currentPage: 1,
                showCheckbox:true,
                data:
                [
                    {
                        "cgpa":5.2,
                        "name": "Rishabh",
                    }
                ],
                onChangeGrid: this.onChangeGrid,
                selectedRows: {},
                onRowClick: this.onRowClick,
                resultsPerPage: 10,
                // CustomRow: require('./CustomRow.js')
                // CustomHeader: require('./CustomHeader')
                // showHeader:false,
                // showFooter: false
                localSearch: true,
                // fixedHeight:100,
                // width: '1000px'
            }
    }
    }

    onChangeGrid(event, data) {
        var tableConfig = this.state.tableConfig;
        _.extend(tableConfig, data);
        this.setState({
            tableConfig: tableConfig
        });
    }

	render(){
		return <div>
			<Tabelify style={{margin:'30px'}} {...this.state.tableConfig}/>
		</div>
	}
}
```
