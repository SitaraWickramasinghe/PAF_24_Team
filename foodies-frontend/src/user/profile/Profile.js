import React, { Component } from 'react';
import './Profile.css';
import { searchUsers, followUser } from '../../util/APIUtils';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            listUsers :[]

        };
        

        

        this.handleInputChange = this.handleInputChange.bind(this);
        this.search = this.search.bind(this);
        this.initialsearch = this.initialsearch.bind(this);
        // this.follow = this.follow.bind(user)
        console.log(props);
        this.initialsearch();
        
    }
    follow(event,user){
        event.preventDefault(); 

        const searchReq = Object.assign({}, user);
        console.log(searchReq.user.id);
       
        followUser(searchReq.user.id)
        .then(response => {
            let allUsers = this.state.listUsers;
            const updatedData = allUsers.map(obj => {
                if (obj.id === searchReq.user.id) {
                  return { ...obj, followed:true };
                }
                return obj;
              });

              this.setState({listUsers:updatedData})



        });
    }
    

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : inputValue
        });        
    }
    initialsearch() { 

        const searchReq = Object.assign({}, this.state);

        searchUsers(searchReq.name)
        .then(response => {
            response.forEach(e => {
                e.followed =false;
                if (this.props.currentUser.followers.includes(e.id)) {
                    e.followed = true;
                }
            });
            this.setState({listUsers: response  })
            // this.listUsers = response;


        });
    }

    search(event) {
        event.preventDefault();   

        const searchReq = Object.assign({}, this.state);

        searchUsers(searchReq.name)
        .then(response => {
            response.forEach(e => {
                e.followed =false;
                if (this.props.currentUser.followers.includes(e.id)) {
                    e.followed = true;
                }
            });
            this.setState({listUsers: response  })


        });
    }
    
    render() {
        return (
            <div className="profile-container">
                <div className="container profile-mid">
                    <div className="profile-info">
                        <div className="profile-avatar">
                            { 
                                this.props.currentUser.imageUrl ? (
                                    <img src={this.props.currentUser.imageUrl} alt={this.props.currentUser.name}/>
                                ) : (
                                    <div className="text-avatar">
                                        <span>{this.props.currentUser.name && this.props.currentUser.name[0]}</span>
                                    </div>
                                )
                            }
                        </div>
                        <div className="profile-name">
                           <h2>{this.props.currentUser.name}</h2>
                           <p className="profile-email">{this.props.currentUser.email}</p>
                        </div>
                    </div>
                </div>
                <div className='profile_area'>
                    <div className='search-div'>
                    <div className='input_div'> 
                    <input type="name" name="name" 
                        className="form-control" placeholder="Name"
                        value={this.state.name} onChange={this.handleInputChange} required/>

                    </div>
                    
                    <div className="btn_div">
                        <button type="submit" onClick={this.search} className="btn btn-block btn-primary">Search</button>
                    </div>

                    </div>
                    <div className='result_space'>
                        <h2 className='search_h2'>Search Results:</h2>
                        
                        <div className='result_list'>
    {this.state.listUsers.map(user => (

                                
<div className='user_div'>

<div className="profile-info_list">
<div className="profile-avatar_list">
    { 
        user.imageUrl ? (
            <img src={user.imageUrl} alt={user.name}/>
        ) : (
            <div className="text-avatar-list">
                <span className='spn'>{user.name && user.name[0]}</span>
            </div>
        )
    }
</div>
<div className="profile-name_list">
   <h2>{user.name}</h2>
   {/* <p className="profile-email">{this.props.currentUser.email}</p> */}
</div>

<div className='follow_btn_div'>
    {
        user.followed ?(
            <button type="submit" className="btn btn-block btn-success  ">Following</button>
        ):(
            <button type="submit" onClick={(e) =>{this.follow(e,{user})}} className="btn btn-block btn-primary">Follow</button>

        )
    }
    
</div>
</div>


</div>

        
      ))}

                        </div>
                    </div>
                    
                </div>    
            </div>
        );
    }
}

export default Profile