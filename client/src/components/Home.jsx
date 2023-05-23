import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


const Home = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [loading,setLoading] = useState(true);
  const [search,setSearch] = useState("");
  // const [isFollowing,setIsFollowing] = useState(false);
  // const [btnFollowUnfollow,setBtnFollowUnfollow] = useState(false);

  const userDataLocal = localStorage.getItem("userdata")
    
  // console.log("Cookies data " + localStorage.getItem('userdata') ? JSON.parse(localStorage.getItem("userdata"))
  // : null);

  const notify = () => {
    toast.success(' Following...!', {
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
 

  // console.log(localStorage.getItem("accessToken"));
var sendData = localStorage.getItem("accessToken");
  useEffect(() => {
    userList();

    setTimeout(()=>{
        setLoading(false)
    
    },1000)
   
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
    
  }, []);





const searchUser=()=>{
 
    if(search===""){

      alert("Enter name to search ...")
    }
}


  const userList = async (event) => {
    try {
      await axios.post("http://localhost:8080/userdetails",{
        email:localStorage.getItem("currentuser"),
      }).then((res) => {
        // if()
        setUserData(res.data.data);

      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleFollow =async (id,fullName,email)=>{
   
    try{
      await axios.put("http://localhost:8080/follow",
       
          {
            followId:id,
          email: email,
          fullName:fullName,
          data:sendData,
         
        },{
          headers: {
            
            'Content-Type': 'application/json',
            "Authorization":`Bearer ${localStorage.getItem('accessToken')}`
            
          },
          
        }
       
        
        ).then(result=>{
          console.log("Follow hit", result.data);
          // setIsFollowing(true)
         
          
        });
    }
    catch(err){
      console.log("Found an error", err)
    }
    userList();

  }

  const handleUnFollow =async (id,fullName,email)=>{
   
    try{
      await axios.put("http://localhost:8080/unfollow",
       
          {
            followId:id,
          email: email,
          fullName:fullName,
          data:sendData,
         
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
    userList();

  }

 
  return (
    <div style={{padding:'10px'}}>
      {/* <br></br>
    <h3>Home</h3> */}
    <br></br>

      <input type="text" placeholder="Search user" onChange={(e)=>setSearch(e.target.value)} />
      <button onClick={searchUser} className="btn-search">Search</button>
      <br />
    <br />
    {/* <button onClick={userList}>Get Data</button> */}
   {loading?
      <p>Loading</p> 
      :
      <div>
      <ul>
      <table className="table">
          <thead>
            <tr>
              <th scope="col">Count</th>
              <th scope="col">Email</th>
              <th scope="col">Full Name</th>
              <th scope="col">Action</th>
              {/* <th scope="col">Following</th> */}


            </tr>
          </thead>
        {userData.filter(name=>name[`fullName`].includes(search)).map((item, index) => {
        
          return (
            <>
             
                <tbody key={index}>
                  <tr key={index}>
                    <th >{index+1}</th>
                    <td>{item.email}</td>
                    <td>{item.fullName}</td>
                   

                    {/* <td>{item.following}</td> */}

                    <td>
                     { item.followers.includes(userDataLocal)?
                      <button className="primary-btn" onClick={()=>{handleUnFollow(item._id,item.fullName,item.email); notifyWarn();}}>Unfollow</button> 
                      :
                      <button onClick={()=>{handleFollow(item._id,item.fullName,item.email); notify();}} className="primary-btn">
                     Follow
                      </button>

                    }
                      {/* <button onClick={()=>{handleFollow(item._id,item.fullName,item.email); notify();}} className="primary-btn">
                     Follow
                      </button> */}
                      </td>
                  </tr>
                
                </tbody>
            </>
          );
      
        })}
          {/* <ToastContainer /> */}
          </table>

      </ul>
        <ToastContainer />
    </div>
  }
  </div>
    // <div>
    //   <h1>Home</h1>
    //     <input type="text" placeholder="Search user" onChange={(e)=>setSearch(e.target.value)} />
    //     <button onClick={searchUser}>Search</button>
    //   <br />
    //   {/* <button onClick={userList}>Get Data</button> */}
    //  {loading?
    //     <p>Loading</p> 
    //     :
    //     <div>
    //     <ul>
    //     <table className="table">
    //         <thead>
    //           <tr>
    //             <th scope="col">ID</th>
    //             <th scope="col">Full Name</th>
    //             <th scope="col">Email</th>
    //             <th scope="col">Role</th>
    //             <th scope="col">Follow</th>

    //           </tr>
    //         </thead>
           
    //       {userData.map((item, index) => {
          
    //         return (
    //           <>
               
    //               <tbody>
    //                 <tr key={index}>
    //                   <th >{index}</th>
    //                   <td>{item.fullName}</td>
    //                   <td>{item.email}</td>
    //                   <td>{item.role}</td>
    //                   <td><button>Follow</button></td>
    //                 </tr>
                  
    //               </tbody>
    //           </>
    //         );
        
    //       })}
    //         </table>

    //     </ul>
    //   </div>
    // }
    // </div>
  );
};

export default Home;
