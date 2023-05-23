import React, { useEffect,useState } from 'react'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


const Followers = () => {
  useEffect(()=>{
    getFollowers();

  },[])

   
  const [followers,setFollowers] = useState([]);

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

    const getFollowers = async (event) => {
        try{
            await axios.get("http://localhost:8080/followers",
             {
                headers: {
                  
                  'Content-Type': 'application/json',
                  "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
                  
                },
                
              }

              ).then(result=>{
                // console.log("Following", result.data.user.following);
                // console.log("Followers", result.data.user.followers);
                setFollowers(result.data.user.followers)
                
                
              });
          }
          catch(err){
            console.log("Found an error", err)
          }
      };

      const handleUnFollow =async (id,fullName,email)=>{
   
        try{
          await axios.put("http://localhost:8080/removefollowers",
           
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

        getFollowers();
      }
    
      return (
        <div style={{padding:'10px'}}>
        <div>
        <br></br>
          <h3>Followers</h3>
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
            {followers.map((item, index) => {
            
              return (
                <>
                 
                    <tbody>
                      <tr key={index}>
                        <th >{index+1}</th>
                        <td>{item.email}</td>
                        
                        <td>
                        <button className="primary-btn" onClick={()=>{handleUnFollow(item._id,item.fullName,item.email); notifyWarn();}}>Remove Follower</button> 
    
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

export default Followers