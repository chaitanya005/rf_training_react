import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactQuill, { Quill } from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; 
import axios from 'axios';
import IssueHead from './IssueHead';
import Editor from './Editor';
import Select from 'react-select';



const NewIssue = () => {
	let user = JSON.parse(localStorage.getItem("user"))
	const navigate = useNavigate()

	const [input, setInput] = useState('')
	const [newIssue, setNewIssue] = useState({
		title: '',
		label: '0',
		assignee: '0'
	})
	const [labels, setLabels] = useState(null)
	const [users, setUsers] = useState(null)
	const [optionUsers, setOptionUsers] = useState([])
	const [optionLabels, setOptionLabels] = useState([])
	
	const handleSubmit = () => {
		axios.post('http://localhost:4000/create-issue', {
			input, newIssue, userName: user.username
		})
		.then(res => {
			// console.log(res)
			navigate('/')
		})
		.catch(err => console.log(err))
	}

	useEffect(() => {
		axios.get('http://localhost:4000/new-issues')
			.then(res => {
				// console.log(res)
				setLabels(res.data.labels)
				setUsers(res.data.users)
			})
			.catch(err => console.log(err))
	}, [])


	useEffect(() => {
		// console.log(users, labels)
		users && users.map(user => (
			setOptionUsers(prev => [...prev, {value: user.id, label: user.username}])
		))
		labels && labels.map(label => (
			setOptionLabels(prev => [...prev, {value: label.id, label: label.name}])
		))
	}, [users])	
	

	const colourStyles = {
		control: styles => ({ ...styles, all: 'unset',  fontWeight: "800", fontSize: "14px", padding: 0 }),
		placeholder: styles => ({...styles, color: "#57606a",}),
		ValueContainer: styles => ({ ...styles, padding: 0 })
	}

	return (
		<div>
			<IssueHead />

            <div>
                <div style={{ display: 'flex' }}>
                    <div className="col-sm-1"> </div>
                    <div className="col-sm-9 newIssue">
                        <input className="issueTitle" type="text" placeholder="  Title" name="title"  value={newIssue.title} onChange={(e) => setNewIssue({...newIssue, title: e.target.value})}/>
						<Editor input={input} setInput={setInput}/>
						<button className='btn btn-success btnSubmit' onClick={handleSubmit}>Submit new issue</button> 
                    </div>
                    <div className='col-sm-2'>
						{/* <select className="form-select" aria-label="Default select example" style={{all: "unset", color: "#57606a", fontWeight: "600", fontSize: "14px"}} name="label"
						onChange={(e) => setNewIssue({...newIssue, label: e.target.value})}>
							<option value={0}>Labels</option>
							{labels && labels.map(label => (
								<option value={label.id} key={label.id}>{label.name}</option>
							))}
						</select>
						<hr />
						<select className="form-select" id="label" aria-label="Default select example" style={{all: "unset", color: "#57606a", fontWeight: "600", fontSize: "14px"}} name="assignee"
						onChange={(e) => setNewIssue({...newIssue, assignee: e.target.value})}>
							<option value={0}>Assignees</option>
							{users && users.map(user => (
								<option value={user.id} key={user.id}>{user.username}</option>
							))}
						</select> */}
						{/* <hr /> */}
						<Select
							value={optionLabels.value}
							onChange={(selected) => setNewIssue({...newIssue, label: selected.value})}
							options={optionLabels}
							placeholder='Labels'
							styles={colourStyles}
						/>
						<hr />
						<Select
							value={optionUsers.value}
							onChange={(selected) => setNewIssue({...newIssue, assignee: selected.value})}
							options={optionUsers}
							placeholder='Assignee'
							styles={colourStyles}
						/>
                    </div>
                </div> 
            </div>
			<style>{`
				.ql-toolbar {
					border-radius: 5px 5px 0 0;
				}

				.ql-container {
					height: 300px;
					border-radius: 0 0 5px 5px;
					background-color: #f6f8fa;
					font-size: 1rem;
				}
				.css-1hb7zxy-IndicatorsContainer {
					display: none;
				}
			`}
			</style>
		</div>
	);
};

export default NewIssue;
