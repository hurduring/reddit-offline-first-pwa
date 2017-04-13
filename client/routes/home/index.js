import React from 'react';
import { connect } from 'react-redux';
import s from './styles.css';
import { Link } from 'react-router'

const Home = ({ counter }) => (
  <div className={s.root}>
    <Link to={'/frontend'}>frontend link</Link>
    <Link to={'/react'}>react link</Link>
  </div>
);

const stateToProps = ({ counter }) => {
  return { counter };
};

export default connect(stateToProps, null)(Home);
