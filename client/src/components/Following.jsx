import React, { useEffect,useState } from 'react'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Following = () => {

    const [following,setFollowing] = useState([]);
    const notifyWarn = () => {
      toast.warn(' Unfollowed successfully...!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    };
    useEffect(()=>{
      getFollowing();

    },[])

    const getFollowing = async (event) => {
        try{
            await axios.get("http://localhost:8080/following",
             {
                headers: {
                  
                  'Content-Type': 'application/json',
                  "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
                },
              }
              ).then(result=>{
                setFollowing(result.data.user.following);
                // console.log(result.data.user.followers);

                
              });
          }
          catch(err){
            console.log("Found an error", err)
          }
      };

      
  const handleUnFollow =async (id,fullName,email)=>{
   
    try{
      await axios.put("http://localhost:8080/unfollow",
          {
            followId:id,
          email: email,
          fullName:fullName,
        },{
          headers: {
            'Content-Type': 'application/json',
            "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
          },
        }
        ).then(result=>{
          console.log("UnFollow hit", result.data);
        });
    }
    catch(err){
      console.log("Found an error", err)
    }
    getFollowing();

  }


  return (
    <div style={{padding:'10px'}}>
    <div>
    <br></br>
      <h3>Following</h3>
      <br></br>
      
    </div>
    <ul>
    <table className="table">
          <thead>
            <tr>
              <th scope="col">Count</th>
              <th scope="col">Email</th>
              <th scope="col">Actions</th>

            </tr>
          </thead>
        {following.map((item, index) => {
        
          return (
            <>
             
                <tbody key={item.id}>
                  <tr key={index}>
                    <th >{index+1}</th>
                    <td>{item.email}</td>
                    
                    <td>
                    <button className="primary-btn" onClick={()=>{handleUnFollow(item._id,item.fullName,item.email); notifyWarn();}}>Unfollow</button> 

                    </td>
                  </tr>
                
                </tbody>
            </>
          );
      
        })}
          </table>

    </ul>
    <ToastContainer />

    </div>
  )
}

export default Following;