import React, { Component } from 'react'

class Frontend extends Component {
  componentDidMount() {
    fetch('/api/post')
      .then(res => res.json())
      .then(console.log)
  }

  render() {
    return (
      <div>react route</div>
    )
  }
}

export default Frontend
