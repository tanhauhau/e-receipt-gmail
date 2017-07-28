import React from 'react';
import { connect } from 'react-redux'

import AuthButton from './AuthButton';
import GMailFilter from './GMailFilter';

export default class Body extends React.Component {
  render() {
    return (
      <div>
        <AuthButton />
        <GMailFilter />
      </div>
    )
  }
}
