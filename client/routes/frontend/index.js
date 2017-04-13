import React, { Component } from 'react'
import { connect } from 'react-redux'

import { actions } from './actions'

class Frontend extends Component {
  componentDidMount() {
    this.props.getPosts()
  }

  render() {
    return (
      <div>frontend route</div>
    )
  }
}

export default connect(null, { getPosts: actions.getPosts })(Frontend)
