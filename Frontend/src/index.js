import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import '../semantic/dist/semantic.min.css';

let root = document.createElement("DIV");
document.body.appendChild(root);
ReactDOM.render(
    <h1>Hello, world!</h1>,
    root
);