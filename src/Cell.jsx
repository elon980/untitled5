import React, { Component } from 'react';

class Cell extends Component {
    render() {
        const { cellValue, playerColors, onClick } = this.props;
        return (
            <div
                className="cell"
                style={{
                    backgroundColor:
                        cellValue === 1
                            ? playerColors[1]
                            : cellValue === 2
                                ? playerColors[2]
                                : 'white',
                }}
                onClick={onClick}
            ></div>
        );
    }
}

export default Cell;
