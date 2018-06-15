import React from 'react';
import PropTypes from 'prop-types';

let style = {
    content: {
        textAlign: 'center',
        fontSize: '35px'
    }
}

class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text
        }
    }

    componentDidMount() {
        // refresh ui with new loading frame every indicated refresh rate
        let finalLoadingFrame = this.props.text + "...";
        this.interval = window.setInterval(function() {
            if (this.state.text === finalLoadingFrame) {
                this.setState(function() {
                    return {
                        text: this.props.text
                    }
                });
            } else {
                this.setState(function(prevState) {
                    let newText = prevState.text + ".";
                    return {
                        text: newText
                    }
                });
            };
        }.bind(this), this.props.refreshRate);
    }

    componentWillUnmount() {
        window.clearInterval(this.interval);
    }

    render() {
        return (
            <p style={style.content}>
                {this.state.text}
            </p>
        )
    }
}

Loading.propTypes = {
    text: PropTypes.string.isRequired,
    refreshRate: PropTypes.number.isRequired
}

Loading.defaultProps = {
    text: "Downloading",
    refreshRate: 300
}



export default Loading;