import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../../redux/actions';

const Home = ({ counter, increment, decrement}) => (
  <div>
    HOME123fdas
    <p>
      {counter}
    </p>
    <button onClick={() => increment()}>increment</button>
    <button onClick={() => decrement()}>decrement</button>
  </div>
);

const stateToProps = ({ counter }) => {
  return { counter };
};

export default connect(stateToProps, actions)(Home);