var React = require('react');
var ReactDom = require('react-dom');

var SearchBar = React.createClass({
    onHandleChange: function () {
        this.props.changeFilterText(this.refs.inp.value);
    },
    render: function () {
        return (
            <div>
                <input ref='inp' type="text" onChange={this.onHandleChange}/>
                <br/>
                <input type="checkbox" onClick={this.props.changeOnlyStocked}/>onlyShowStocked
            </div>
        )
    }
});

var ProductCategoryRow = React.createClass({
    render: function () {
        return(
            <tr style={{fontWeight: 900, color: '#0ff'}}>
                <td>{this.props.category}</td>
            </tr>
        )
    }
});

var ProductRow = React.createClass({
    render: function () {
        return(
            <tr style={this.props.stocked ? {} : {color: '#f00'}}>
                <td>{this.props.name}</td>
                <td>{this.props.price}</td>
            </tr>
        )
    }
});

var ProductTable = React.createClass({
    componentWillMount: function () {
        this.onHandleChange();
    },
    shouldComponentUpdate: function (nextProps, nextState) {
        this.props = nextProps; //props中onlyShowStocked在shouldComponentUpdate未更新在render时才更新
        this.onHandleChange();
        return true;
    },
    onHandleChange: function () {
        var products = this.props.products;
        var lastCategory = '';
        var rows = [];
        var _self = this;

        products.forEach(function (ele, index){
            if (lastCategory !== ele.category) {
                rows.push(
                    <ProductCategoryRow key={index} category= {ele.category}></ProductCategoryRow>
                );
                lastCategory = ele.category;
            }
            if (!_self.props.onlyShowStocked || (_self.props.onlyShowStocked && ele.stocked)){
                if (ele.name.indexOf(_self.props.filterText)!== -1) {
                    rows.push(
                        <ProductRow key={index+1000} stocked={ele.stocked} name={ele.name} price={ele.price}></ProductRow>
                    )
                }
            }
        })
        this.rows = rows;
    },
    render: function () {
        return (
            <table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>price</th>
                    </tr>
                </thead>
                <tbody>
                    {this.rows}
                </tbody>
            </table>
        )
    }
});

var App = React.createClass({
    getInitialState: function () {
        return {
            onlyShowStocked: false,
            filterText: ''
        }
    },
    changeOnlyStocked: function () {
        this.setState({
            onlyShowStocked: !this.state.onlyShowStocked
        })
    },
    changeFilterText: function (text) {
        this.setState({
            filterText: text
        })
    },
    render: function () {
        return (
            <div>
                <SearchBar changeFilterText={this.changeFilterText} changeOnlyStocked={this.changeOnlyStocked}></SearchBar>
                <ProductTable filterText={this.state.filterText} onlyShowStocked={this.state.onlyShowStocked} products={this.props.products}></ProductTable>
            </div>
        )
    }
});


var PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Baskettball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iWatch'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'iPad'},

];

ReactDom.render(
    <App products={PRODUCTS}/>,
    document.getElementById('demo')
);