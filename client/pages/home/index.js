import React from 'react';
import { connect } from 'react-redux';
import s from './styles.css';
import { Link } from 'react-router-dom'

const Home = ({ counter }) => (
  <div className={s.root}>
    <Link to={'/posts/frontend'}>frontend link</Link>
    <Link to={'/post'}>react link</Link>
  </div>
);

const stateToProps = ({ counter }) => {
  return { counter };
};

export default connect(stateToProps, null)(Home);
