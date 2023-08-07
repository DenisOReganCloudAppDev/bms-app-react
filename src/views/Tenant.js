
import axios from 'axios'
import React, { useEffect, useState } from 'react';

function Tenant(){
	const[tenant_id, setTenant_Id] = useState("");
	const[requestinfo, setRequestInfo] = useState("");
	const[requestDate, setRequestDate] = useState("");
	const[completed,setCompleted] = useState(false);
	const[comment,setComment] = useState("");

	async function handleNewRequest(event){
		
    	
    	//const data =  {tenant_id,requestinfo,requestDate,completed,comment};
    	//var tenant_id = "21";
    	const data = {tenant_id, requestinfo ,requestDate,completed}
    
    	console.log(data)
    	
    	try{await axios.post("http://localhost:3000/maintenance_requests",data,
    		{headers: {Accept: "application/json" ,'Content-Type':"application/json" }} );
    	
    	}
    	catch(error){
    		console.error("error creating request", error)
    	}
    	
    	
    	
    	
    }
	return(
		<div className="container"> <strong>Create new maintenance request</strong>
			<div>
				
				<div class="mb-3">
				    <label for="firstname" class="form-label">Tenant ID</label>
				    <input  type="text" 
				    		class="form-control" 
				    		 id="tenant_id" 
				    		 onChange={((e)=>setTenant_Id(e.target.value))}
				  
				  	/>
				</div>
				<div class="mb-3">
				    <label for="firstname" class="form-label">Request Info</label>
				    <input  type="text" 
				    		class="form-control" 
				    		 id="requestinfo" 
				    		 onChange={((e)=>setRequestInfo(e.target.value))}
				  
				  	/>
				</div>
				<div class="mb-3">
				    <label for="firstname" class="form-label">Request Date</label>
				    <input  type="date" 
				    		class="form-control" 
				    		 id="requestinfo" 
				    		 onChange={((e)=>setRequestDate(e.target.value))}
				  
				  	/>
				</div>


				<button type="submit" class="btn btn-primary" onClick={handleNewRequest} >Submit</button>
			</div>


		</div>)
}

export default Tenant