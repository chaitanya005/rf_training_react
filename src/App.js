// import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Component, useEffect } from 'react';
import Navbar from './components/Navbar';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { BrowserRouter as Router, Route, Routes, useNavigate, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import NewIssue from './components/NewIssue';
import Labels from './components/Labels/Labels';
import Issues from './components/Issues/Issues';
import SignUp from './components/SignUp';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<PrivateRoute />} >
					<Route exact path='/' element={<Home/>}/>
					<Route path="/new-issues" element={<NewIssue />} />
					<Route path="/issues/:id" element={<Issues />}/>
					<Route path="/labels" element={<Labels />} />
				</Route>
				<Route path='/signup' element={<SignUp />}/>
				<Route path='/login' element={<Login />}/>
			</Routes>
		</Router>
	);
};

export default App;
