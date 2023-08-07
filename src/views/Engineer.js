import axios from 'axios'
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'

function Engineer(){
	const[requests, setRequests] = useState([])
	

	useEffect(() => {
       getData() 
    }, []);

    async function getData(){
    	const response = await axios.get("http://localhost:3000/maintenance_requests",
    		{headers: {Accept: "application/json"}});
    	setRequests(response.data)
    
    }
    console.log(requests)
	return(
			<div className="container">
				<div className="row"><strong>Maintenance Requests</strong>
				  <table className=" table table-hover">
				  <thead>
				    <tr>
				      <th scope="col">Request ID</th>
				      <th scope="col">Tenant ID</th>
				      <th scope="col">Request Info</th>
				      <th scope="col">Request date</th>
				      <th scope="col">Completed</th>
				      <th scope="col">Comment</th>
				  
				    </tr>
				  </thead>
				  <tbody className=" table table-hover">
				  {requests.map((request,index)=>(

				  	<tr>
				      <th scope="row">{request.id}</th>
				      <td>{request.tenant_id}</td>
				      <td>{request.requestinfo}</td>
				      <td>{request.requestDate}</td>
				      <td>{request.completed.toString()}</td>
				      <td>{request.comment}</td>
				      
				      <button type="button" class="btn btn-primary"  value={request.id}><Link to="/showRequest" state={request.id} >Edit Request</Link></button>
				      
				    </tr>

				  ))}			    
				  </tbody>
				</table>


			</div>


			</div>)
}
export default Engineer