import React from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'

export class FriendsList extends React.Component {
  state = {
    friends: [],
    newFriend: {
      id: new Date(),
      name: '',
      age: '',
      email: ''
    }
  }

  componentDidMount() {
    axiosWithAuth().get('/friends')
      .then(res => {
        this.setState({friends: res.data})
      })
  }

  handleChange = (e) => {
    this.setState({
      newFriend: {
        ...this.state.newFriend,
        [e.target.name]: e.target.value
      }
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    console.log(this.state.newFriend);
    axiosWithAuth().post('/friends', this.state.newFriend)
      .then(res => this.setState({friends: res.data}))
      .catch(err => {console.log(err)})
  }

  render() {
    return (
      <div>
        <h2 style={{textDecoration: 'underline', margin: '1rem'}}>Add A New Friend</h2>
        <form onSubmit={this.onSubmit}>
          <input 
            type='text'
            name='name'
            placeholder='Enter A Name'
            value={this.state.newFriend.name}
            onChange={this.handleChange}
          /><br />
          <input 
            type='number'
            name='age'
            placeholder='Enter An Age'
            value={this.state.newFriend.age}
            onChange={this.handleChange}
          /><br />
          <input 
            type='email'
            name='email'
            placeholder='Enter An Email'
            value={this.state.newFriend.email}
            onChange={this.handleChange}
          /><br />
          <button>Submit</button>
        </form>
        {this.state.friends.map(friend => {
          return (
            <div key={friend.id} 
                style={{background: 'white', 
                color: 'black', padding: '1%', 
                margin: '1rem', borderRadius: '20px'}}>
              <h2>{friend.name}</h2>
              <h3>{friend.age}</h3>
              <h4>{friend.email}</h4>
            </div>
          )
        })}
      </div>
    )
  }
}