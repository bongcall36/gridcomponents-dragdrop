import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import GridComponents from './gridcomponents';
import {componentList} from './sampledata/componentlist'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
	 	<GridComponents componentList={componentList}/>
	</React.StrictMode>
);
