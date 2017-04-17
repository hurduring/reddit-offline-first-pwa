import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { actions } from './actions'
import { selectPosts } from './selectors'

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts({ subreddit: this.props.subreddit })
  }

  render() {
    return (
      <div>
        <p><Link to={'/'}>to home</Link></p>
        {this.props.posts.map(p => (
          <p key={p.id}>{p.title}</p>
        ))}
      </div>
    )
  }
}

const mstp = (state, ownProps) => ({
  posts: selectPosts(state),
  subreddit: ownProps.params.subreddit,
})

Posts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  getPosts: PropTypes.func,
  subreddit: PropTypes.string,
}

Posts.defaultProps = {
  posts: [],
  getPosts: () => {},
  subreddit: '',
}

export default connect(mstp, { getPosts: actions.getPosts })(Posts)
