import React, { Component } from 'react';
import './Profile.css';
import { searchUsers } from '../../util/APIUtils';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: ''
        };

        this.listUsers = [];

        this.handleInputChange = this.handleInputChange.bind(this);
        this.search = this.search.bind(this);
        this.initialsearch = this.initialsearch.bind(this);
        console.log(props);
        this.initialsearch();
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
            console.log(response);
            this.listUsers = response;


        });
    }

    search(event) {
        event.preventDefault();   

        const searchReq = Object.assign({}, this.state);

        searchUsers(searchReq.name)
        .then(response => {
            console.log(response);
            this.listUsers = response;


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

                        <div className='user_div'>

<div className="profile-info_list">
<div className="profile-avatar_list">
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
<div className="profile-name_list">
   <h2>{this.props.currentUser.name}</h2>
   {/* <p className="profile-email">{this.props.currentUser.email}</p> */}
</div>
</div>


</div>


<div className='user_div'>

<div className="profile-info_list">
<div className="profile-avatar_list">
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
<div className="profile-name_list">
   <h2>{this.props.currentUser.name}</h2>
   {/* <p className="profile-email">{this.props.currentUser.email}</p> */}
</div>
</div>


</div>
<div className='user_div'>

<div className="profile-info_list">
<div className="profile-avatar_list">
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
<div className="profile-name_list">
   <h2>{this.props.currentUser.name}</h2>
   {/* <p className="profile-email">{this.props.currentUser.email}</p> */}
</div>
</div>


</div>


<div className='user_div'>

<div className="profile-info_list">
<div className="profile-avatar_list">
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
<div className="profile-name_list">
   <h2>{this.props.currentUser.name}</h2>
   {/* <p className="profile-email">{this.props.currentUser.email}</p> */}
</div>
</div>


</div>
                        </div>
                    </div>
                    
                </div>    
            </div>
        );
    }
}

export default Profile