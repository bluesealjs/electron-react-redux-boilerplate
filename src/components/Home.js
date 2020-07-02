import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

class Home extends Component {
  render() {
    const { count } = this.props;

    return (
      <div>
        <div>Counter: {count}</div>
        <button
          onClick={() => {
            this.props.setCount(1 + count);
          }}
        >
          Increase Count
        </button>

        <button
          onClick={() => {
            this.props.history.push("/lol");
          }}
        >
          Go to "/lol"
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    count: state.route.count,
  };
};

export default connect(mapStateToProps, actions)(Home);
