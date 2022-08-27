import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <footer className="main-footer">
        <strong>
          Copyright © 2022-2023 <a href="#">{localStorage.getItem('Organisation Name')}</a>.
        </strong>
        All rights reserved.
      </footer>
    );
  }
}
