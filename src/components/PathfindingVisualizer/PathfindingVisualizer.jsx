import React, {Component} from 'react';
import './Node/Node.css'

export default class Node extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <div clasName="node"></div>;
    }
}