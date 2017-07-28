import React from 'react';
import MailFilter from './MailFilter';
import _ from 'lodash';

import { listMessages, getMessage, getCurrentUserId } from '../utils/gmailApi';

class GMailFilter extends React.Component {
  search ({ selectedFilter, fromDate, toDate }) {
    const q = selectedFilter.length > 0 ?
      `(${(_(selectedFilter)
        .map(f => `(${f.value})`)
        .join(' OR '))}) AND ` : ''
    const query = `${q} (before:${this.format(fromDate)} AND after: ${this.format(toDate)})`;
    const userId = getCurrentUserId();
    listMessages(userId, query)
      .then(messages => {
        return Promise.all(
          _(messages)
            .filter()
            .map(messages, message => getMessage(userId, message.id))
            .value()
        );
      })
      .then(messages => {
        _(messages)
          .map(({ snippet }) => ({
            snippet
          }))
          .forEach(console.log)
      });
  }

  format (date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const pad = _.partial(_.padStart, _, 2, '0');
    return `${year}/${pad(month)}/${pad(day)}`;
  }

  render () {
    return <MailFilter onSearchFilter={(filter) => this.search(filter)} />
  }
}
export default GMailFilter;
