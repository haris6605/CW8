import React, { Component } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import List from './List';

class FilteredList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            type: "all" // Default to showing all items
        };
    }

    onSearch = (event) => {
        this.setState({ search: event.target.value.trim().toLowerCase() });
    }

    onFilterType = (eventKey) => {
        this.setState({ type: eventKey });
    }

    filterItem = (item) => {
        const nameMatches = item.name.toLowerCase().includes(this.state.search);
        const typeMatches = this.state.type === "all" || item.type.toLowerCase() === this.state.type;
        
        return nameMatches && typeMatches;
    }

    render() {
        return (
            <div className="filter-list">
                <h1>Produce Search</h1>
                <DropdownButton id="typeDropdown" title="Type">
                    <Dropdown.Item eventKey="all" onSelect={this.onFilterType}>All</Dropdown.Item>
                    <Dropdown.Item eventKey="fruit" onSelect={this.onFilterType}>Fruit</Dropdown.Item>
                    <Dropdown.Item eventKey="vegetable" onSelect={this.onFilterType}>Vegetables</Dropdown.Item>
                </DropdownButton>
                <input type="text" placeholder="Search" onChange={this.onSearch} />
                <List items={this.props.items.filter(this.filterItem)} />
            </div>
        );
    }
}

export default FilteredList;
