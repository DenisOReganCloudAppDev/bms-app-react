import axios from 'axios'
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'

import Tenants from '../components/Tenants'




function BuildingManager(){

	//initialise state variables
	const[tenants, setTenants] = useState([])
	const[tenantId, setTenantId] = useState("")

	//state variables for creating new tenant
	const[first_name ,setFirst_Name] = useState("")
	const[last_name, setLast_Name] = useState("")
	const[apartment_no, setApartment_no] = useState("")
	const[phone, setPhone] = useState("")
	const[email, setEmail] = useState("")
	const[building_id, setBuilding_id] = useState("")
	const[newTenantData, setNewTenantData] = useState([])

	useEffect(() => {
       getData() 
    }, []);


	//get tenants from rails backend application
    async function getData(){
    	const response = await axios.get("http://localhost:3000/tenants",
    		{headers: {Accept: "application/json"}});
    	setTenants(response.data)
    }
    console.log(tenants)

    //create a new tenant
    async function handleNewTenant(event){
    	
    	const data =  {first_name,last_name,apartment_no,phone,email,building_id};
    
    	console.log( data)

    	try{await axios.post("http://localhost:3000/tenants",data,
    		{headers: {Accept: "application/json" ,'Content-Type':"application/json" }} );
    		//re-render tenants table for user
    		getData();
    	}
    	catch(error){
    		console.error("error vreating tenant", error)
    	}
    	
    	
    }

    //function to show info on 1 tenant
    function handleShowTenant(event){
    	console.log("show tenant")
    	console.log(event.target.value)
    	setTenantId(event.target.value)

    }
    	
    	//function to delete tenant
    	async function handleDeleteTenant(event){
    	const tenantId = event.target.value
    	console.log(tenantId)
    	console.log("delete tenant")

    	const deleteRequest = "http://localhost:3000/tenants/"+ tenantId
    	console.log("delete request:  " + deleteRequest)

    	try{
    		await axios.delete(deleteRequest,
    		{headers: {Accept: "application/json" ,'Content-Type':"application/json" }} );
    		getData();
    	}
    	catch(error){
    		console.error("error deleting tenant", error)
    	}
    }

    

	return(
		<div className="container">
			<br></br>

		
			<div className="col-3 submit-form">
				 Add New Tenant
				<form className="">

				  <div class="mb-3">
				    <label for="firstname" class="form-label">First Name</label>
				    <input  type="text" 
				    		class="form-control" 
				    		 id="firstname" 
				    		 onChange={((e)=>setFirst_Name(e.target.value))}
				    		 required
				  
				  	/>

				  </div>
				  <div class="mb-3">
				    <label for="lastname" class="form-label">Last Name</label>
				    <input type="text" class="form-control" id="lastname" 
				     onChange={((e)=>setLast_Name(e.target.value))}
				     required
				    />
				  </div>
				  <div class="mb-3">
				    <label for="apartno" class="form-label">Apartment number</label>
				    <input type="text" class="form-control" id="apartno"
				     onChange= {((e)=>setApartment_no(e.target.value))}
				     required
				     />
				  </div>
				  <div class="mb-3">
				    <label for="phone" class="form-label">Phone number</label>
				    <input type="text" class="form-control" id="phone"
				     onChange= {((e)=>setPhone(e.target.value))}
				     required
				     />
				  </div>
				  <div class="mb-3">
				    <label for="email" class="form-label">Email</label>
				    <input type="text" class="form-control" id="email" 
				     onChange= {((e)=>setEmail(e.target.value))}
				     required
				    />
				  </div>
				  <div class="mb-3">
				    <label for="building" class="form-label">Building</label>
				    <input type="text" class="form-control" id="building"
				     onChange= {((e)=>setBuilding_id(e.target.value))}
				     required
				     />
				  </div>
				</form>
				<button type="submit" class="btn btn-primary" onClick={handleNewTenant} >Submit</button>
			</div>
			<br></br>


			<div className="row">TENANTS
				  <table className=" table table-hover">
				  <thead>
				    <tr>
				      <th scope="col">ID</th>
				      <th scope="col">First Name</th>
				      <th scope="col">Last Name</th>
				      <th scope="col">apartment no.</th>
				      <th scope="col">phone</th>
				      <th scope="col">email</th>
				      <th scope="col">building</th>
				    </tr>
				  </thead>
				  <tbody table-hover>
				  {tenants.map((tenant,index)=>(

				  	<tr>
				      <th scope="row">{tenant.id}</th>
				      <td>{tenant.first_name}</td>
				      <td>{tenant.last_name}</td>
				      <td>{tenant.apartment_no}</td>
				      <td>{tenant.phone}</td>
				      <td>{tenant.email}</td>
				      <td>{tenant.building_id}</td>
				      <button type="button" class="btn btn-primary"  value={tenant.id}><Link to="/showTenant" state={tenant.id} > show tenant</Link></button>
				     
				      <button type="button" class="btn btn-primary" onClick={handleDeleteTenant} value={tenant.id}>Delete tenant</button>
				    </tr>

				  ))}			    
				  </tbody>
				</table>


			</div>
			
		</div>
		)
}
export default BuildingManager