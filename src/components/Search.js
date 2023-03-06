import React from 'react';


const Search = () => {
  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder='Find a user'/>
      </div>
      <div className="userChat">
        <img src="https://funylife.in/wp-content/uploads/2022/11/20221105_164643-1024x1024.jpg" alt=""/>
        <div className="userChatInfo">
          <span>Satyam Arya</span>
        </div>
      </div>
    </div>
  )
}

export default Search;