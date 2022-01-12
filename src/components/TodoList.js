import React, { Component } from 'react';

class TodoList extends Component{

	handleDelete(item) {
		this.props.deleteTodo(item)
	}

	render(){
		return (
			<div className="mt-5">
				<ul className="list-group">
					{this.props.items && this.props.items.map((item) =>
						<div key={item.comment}>
							<li  className="list-group-item" style={{display: 'flex', justifyContent: "space-between"}}>
								{item.comment}
								<button className='btn btn-danger' onClick={this.handleDelete.bind(this, item)}>Delete</button>
							</li>
						</div>
					)} 
				</ul>
			</div>
		);
	}
};

export default TodoList;
