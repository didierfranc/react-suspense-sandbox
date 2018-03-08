import React, { Component } from "react";
import { createFetcher, Fetcher } from "./future";

const upperCase = createFetcher(text =>
  fetch(`https://fake-api-tv6zg6sgh58c.runkit.sh/${text}`).then(r => r.text())
);

class App extends Component {
  state = {
    text: null
  };
  handleClick = () => {
    const { value: text } = this.el;
    this.setState({ text });
  };
  render() {
    const { text } = this.state;
    return (
      <div>
        <input ref={el => (this.el = el)} />
        <button onClick={this.handleClick}>load</button>
        <div>
          {text && (
            <Fetcher fetcher={upperCase(text)} delay={100}>
              {(data, loading, error) => (data ? data : error ? "💥" : "⏳")}
            </Fetcher>
          )}
        </div>
      </div>
    );
  }
}

export default App;
