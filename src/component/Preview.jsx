import React, { Component } from 'react';

class Preview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showCard: true,
        };
    }

    handlerMouseEnter = () => {
        this.setState({
            showCard: true,
        });
    }

    handlerMouseLeave = () => {
        this.setState({
            showCard: false,
        });
    }

    render() {
        const { showCard } = this.state;
        return (
            <div
                className="ananda-preview"
                onMouseEnter={this.handlerMouseEnter}
                onMouseLeave={this.handlerMouseLeave}
            >
                HOLA
                <div style={{
                    display: (showCard ? 'block' : 'none'),
                }} className="ananda-preview-card">
                    MI CARD
                </div>
            </div>
        );
    }
}

export default Preview;