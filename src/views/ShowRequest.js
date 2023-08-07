import {useLocation} from 'react-router-dom'
import React, { useEffect, useState } from 'react';

import axios from 'axios'


function ShowRequest(){

	const[request_id, setRequestId] = useState("")
	const[requestData,setRequestData] = useState([])
	const location = useLocation();
	const id = location.state; //get id of request

	const[comment,setComment] = useState("")

	//const[id,setID] = useState("");
	const[tenant_id, setTenant_Id] = useState("");
	const[requestinfo, setRequestInfo] = useState("");
	const[requestDate, setRequestDate] = useState("");
	const[completed, setCompleted] = useState(false);
	const[previousComment,setPreviosComment] = useState("");

	useEffect(() => {
       
       getRequest() 

    }, []);
    

    async function getRequest(){

    	const response = await axios.get("http://localhost:3000/maintenance_requests/"+id,
    		{headers: {Accept: "application/json"}});

    	//set state variables to the request values, these will then be used to update the request
    	setRequestData(response.data)
    	//setID(response.date.id);
    	setTenant_Id(response.data.tenant_id);
    	setRequestInfo(response.data.requestinfo);
    	setRequestDate(response.data.requestDate);
    	setCompleted(response.data.completed);
    	setPreviosComment(response.data.comment);

    	
    }
    	
    console.log(requestData)

    //updateRequest Function is an Update function
    async function updateRequest(){
    	console.log(comment);
    	const data = {id,tenant_id, requestinfo ,requestDate,completed, comment}
    
    	console.log(data)
    	
    	try{await axios.put("http://localhost:3000/maintenance_requests/"+id,data,
    		{headers: {Accept: "application/json" ,'Content-Type':"application/json" }} );
    	
    	}
    	catch(error){
    		console.error("error creating request", error)
    	}

    }
    function handleCheckChange(event){
    	if(event.target.checked){
    		setCompleted(true);
    	}
    	else{
    		setCompleted(false);
    	}
    	
    }

	return(
		<div className="container">
		
			<div class="card">
			  <div class="card-body">
			    <h5 class="card-title">Maintenance Request</h5>
			    <h6 class="card-subtitle mb-2 text-body-secondary">Request ID {requestData.id}</h6>
			    <h6 class="card-subtitle mb-2 text-body-secondary">Tenant ID {requestData.tenant_id}</h6>
			    <h6 class="card-subtitle mb-2 text-body-secondary">Request Info: {requestData.requestinfo}</h6>
			    <h6 class="card-subtitle mb-2 text-body-secondary">Request Date: {requestData.requestDate}</h6>
			    <h6 class="card-subtitle mb-2 text-body-secondary">Completed: {completed.toString()}</h6>
			    
			    <div class="form-check">
  					<input class="form-check-input" type="checkbox" onChange={handleCheckChange}/>
  					<label class="form-check-label" for="flexCheckDefault">
    				Complete Job
  					</label>
				</div>

				<div class="input-group">
  					<span class="input-group-text">Maintenance comment</span>
  					<textarea class="form-control" aria-label="With textarea" 
  					 onChange={((e)=>setComment(e.target.value))}></textarea>
				</div>	
				<button type="submit" class="btn btn-primary" onClick={updateRequest} >Update Request</button>		   

			  </div>
			</div>

		</div>)
}
export default ShowRequest