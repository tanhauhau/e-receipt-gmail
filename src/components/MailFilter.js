import React from 'react'
import DatePicker from 'material-ui/DatePicker';
import Chip from 'material-ui/Chip';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import filterOptions from '../utils/filterOptions';

export default class MailFilter extends React.Component {
  constructor(props) {
    super(props);

    const fromDate = new Date();
    const toDate = new Date();
    fromDate.setHours(0, 0, 0, 0);
    toDate.setHours(0, 0, 0, 0);

    this.state = {
      fromDate,
      toDate,
      selectedFilter: []
    };
  }

  render () {
    const { fromDate, toDate, selectedFilter } = this.state;
    const { onSearchFilter } = this.props;
    return (
      <div>
        <div>
          <DatePicker
            autoOk
            floatingLabelText="From Date"
            value={fromDate}
            maxDate={toDate}
            onChange={(event, fromDate) => this.setState({ fromDate })} />
          <DatePicker
            autoOk
            floatingLabelText="To Date"
            value={toDate}
            minDate={fromDate}
            onChange={(event, toDate) => this.setState({ toDate })} />
        </div>
        <div>
          <p>Selected: </p>
          {
            _.map(selectedFilter, (filter) => (
              <Chip key={filter.name} style={{margin: 4}}>
                {filter.name}
              </Chip>
            ))
          }
          <SelectField
            multiple={true}
            hintText="Select a filter"
            value={this.state.selectedFilter}
            onChange={(event, index, values) => this.setState({ selectedFilter: values })}
            selectionRenderer={(values) => (values.length === 0) ? '' : `${values.length} selected`}>
            {
              _.map(filterOptions, (filter) => (
                <MenuItem
                  key={filter.name}
                  insetChildren={true}
                  checked={_.findIndex(this.state.selectedFilter, (f) => f.value === filter.value) > -1}
                  value={filter}
                  primaryText={filter.name}
                />
              ))
            }
          </SelectField>
        </div>
        <div>
          <RaisedButton
            primary
            label='Search'
            onTouchTap={() => onSearchFilter({ fromDate, toDate, selectedFilter })}/>
        </div>
      </div>
    );
  }
};
