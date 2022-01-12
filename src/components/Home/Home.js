import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HomeIssues from './HomeIssues';
import Pagination from './Pagination';
import IssueHead from '../IssueHead';


const Home = () => {
	const [issues, setIssues] = useState(null)
	const [searchKey, setSearchKey] = useState('')
	// const [currPage, setCurrPage] = useState(null)
	// const [lastPage, setLastPage] = useState(null)
	// const [totalPages, setTotalPages] = useState(null)

	useEffect(() => {
		axios.get('http://localhost:4000/home')
			.then(res => {
				console.log(res)
				setIssues(res.data.issues)
				// setCurrPage(res.data.currPage)
				// setLastPage(res.data.lastPage)
				// setTotalPages(res.data.totalPages)
			})
			.catch(err => console.log(err))
	}, [])

	const handleSearch = (value) => {
		console.log(value)
		axios.get('http://localhost:4000/search', {value})
		.then(res => {
			console.log(res)
		})
		.catch(err => console.log(err))
	}

	return (
		<React.Fragment>
			<IssueHead />
			<div className="col-sm-11 subDiv">
				<div>
					<input className="filterSearch" type="text" placeholder="Search" name={searchKey} onChange={(e) => handleSearch(e.target.value)} />
				</div>
				<div>
					<div>
						<Link className="p-2 btn btn-light filterBtns" to="/labels">
							<i className="fas fa-tag icons" />Labels 0
						</Link>
						<button className="p-2 btn btn-light btnMilestone">Milestones 0</button>
					</div>
				</div>
				<div>
					<Link className="btn btn-success issueBtn" to="/new-issues">
						New Issue
					</Link>
				</div>
			</div>
			<div className="col-sm-11" style={{ margin: 'auto', marginTop: '20px' }}>
				<div className="boxHead">
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<input type="checkbox" style={{ marginRight: '15px' }} />
						<i className="far fa-scrubber icons" /> Open
					</div>
					<div style={{ display: 'flex' }}>
						<div className="dropdown">
							<button
								className="btn btn-secondary dropdown-toggle"
								id="dropdownMenuButton"
								type="button"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
								style={{ background: 'none', border: 'none', color: 'grey' }}
							>
								Label
							</button>
							<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
								<a className="dropdown-item" href="#">
									Action
								</a>
								<a className="dropdown-item" href="#">
									Another action
								</a>
								<a className="dropdown-item" href="#">
									Something else here
								</a>
							</div>
						</div>
						<div className="dropdown">
							<button
								className="btn btn-secondary dropdown-toggle"
								id="dropdownMenuButton"
								type="button"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
								style={{ background: 'none', border: 'none', color: 'grey' }}
							>
								Assignee
							</button>
							<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
								<a className="dropdown-item" href="#">
									Action
								</a>
								<a className="dropdown-item" href="#">
									Another action
								</a>
								<a className="dropdown-item" href="#">
									Something else here
								</a>
							</div>
						</div>
					</div>
				</div>
				<HomeIssues issues={issues} /> 
				{/* <Pagination currPage={currPage} lastPage={lastPage} totalPages={totalPages}/> */}
			</div>
		</React.Fragment>
	);
};

export default Home;
