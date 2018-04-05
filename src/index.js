import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyC2og301S_3Xys9Ca7042pnrbe3HgDIYZo",
  authDomain: "unipro-u.firebaseapp.com",
  databaseURL: "https://unipro-u.firebaseio.com",
  projectId: "unipro-u",
  storageBucket: "unipro-u.appspot.com",
  messagingSenderId: "235366353258"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
