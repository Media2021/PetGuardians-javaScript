import React, { useEffect, useState } from "react";
import AdoptionRequestService from '../services/AdoptionRequestService';
import { useNavigate } from "react-router-dom";

function AdoptionList ({request,refreshRequests }) {

    const [loading, setLoading] = useState(true);
    const [requests, setRequests] = useState(null);
  

  
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await AdoptionRequestService.getAllAdoptionRequests();
          setRequests(response);
        } catch (error) {
          console.log(error);
        }
        setLoading(false);
      };
      fetchData();
    }, [refreshRequests]);


    const acceptRequest = async (id) => {
        try {
          await AdoptionRequestService.acceptAdoptionRequest(id);
         
          refreshRequests(); // Refresh the adoption requests list after accepting the request
        } catch (error) {
          console.log(error);
        }
      };
    
      const declineRequest = async (id) => {
        try {
          await AdoptionRequestService.declineAdoptionRequest(id);
        
          refreshRequests(); // Refresh the adoption requests list after declining the request
        } catch (error) {
          console.log(error);
        }
      };

     
  return (
    <div className="flex  justify-center  flex-wrap">
    {requests?.map((request) => (
      <div key={request.id} className="pet-card">
        <h3 className="text-lg font-bold">Username :  {request.user.username}</h3>
        <p>Pet name : {request.pet.name}</p>
        <p>Notes: {request.notes}</p>
        <p>Request date : {new  Date (request.requestDate).toLocaleDateString()}</p>
        <p>Status: {request.status}</p>
       
        <div className="button-container">
            {request.status !== "ACCEPTED" && (
              <button
                className="rounded text-white font-semibold bg-red-700 hover:bg-gray-500 mr-2 py-1 px-8 mt-3"
                onClick={() => acceptRequest(request.id)}
              >
                Accept
              </button>
            )}
            {request.status !== "DECLINED" && (
              <button
                onClick={() => declineRequest(request.id)}
                className="rounded text-white font-semibold bg-black hover:bg-gray-500 py-1 px-6 ml-2"
              >
                Decline
              </button>
            )}
          </div>
        </div>
      )) ?? <p>No requests found</p>}
    </div>
  );
}

export default AdoptionList