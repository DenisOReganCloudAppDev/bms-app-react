import {useLocation} from 'react-router-dom'
import React, { useEffect, useState } from 'react';

import axios from 'axios'


function ShowTenant(){
	const[tenantId, setTenantId] = useState("12")
	const[tenantData,setTenantData] = useState([])
	const location = useLocation();
	const id = location.state;//get id of tenant

	useEffect(() => {
       
       getData() 

    }, []);
    
	//get data of 1 tenant
    async function getData(){

    	const response = await axios.get("http://localhost:3000/tenants/"+id,
    		{headers: {Accept: "application/json"}});
    	setTenantData(response.data)
    }
    console.log(tenantData)
	
	

	return(
		<div className="container">
			
			<div class="card">
			  <div class="card-body">
			    <h5 class="card-title">{tenantData.first_name} {tenantData.last_name}</h5>
			    <h6 class="card-subtitle mb-2 text-body-secondary">Apartment: {tenantData.apartment_no}</h6>
			    <h6 class="card-subtitle mb-2 text-body-secondary">Phone: {tenantData.phone}</h6>
			    <h6 class="card-subtitle mb-2 text-body-secondary">Email: {tenantData.email}</h6>
			    <h6 class="card-subtitle mb-2 text-body-secondary">Building: {tenantData.building_id}</h6>
			   
			  </div>
</div>
		</div>)
}
export default ShowTenant