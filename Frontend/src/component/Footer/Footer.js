import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <footer className="main-footer">
        <strong>
          Copyright © 2014-2021 <a href="#">{localStorage.getItem('Organisation Name')}</a>.
        </strong>
        All rights reserved.
      </footer>
    );
  }
}
