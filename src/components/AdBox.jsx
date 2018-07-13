import React, { Component } from 'react';

class AdBox extends Component {
  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render() {
    return (
      <div
        style={Object.assign(
          {},
          {
            padding: '.5em',
            boxSizing: 'border-box',
          },
          this.props.containerStyle
        )}
      >
        <ins
          className="adsbygoogle"
          style={Object.assign(
            {
              display: 'block'
            },
            this.props.style
          )}
          data-ad-client="ca-pub-7323207940463794"
          data-ad-slot={8124675877}
          data-ad-format="auto"
        />
      </div>
    );
  }
}

export default AdBox;
