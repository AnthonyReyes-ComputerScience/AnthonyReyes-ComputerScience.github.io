import React, { useState, useEffect} from 'react';

const AllUsers = (props) => {

      // console.log(props)
      const [state, setState] = useState({
        members: [],
        addUserVisible: false,
        addUserFirstName: "",
        addUserLastName: "",
        addUserEmail: "",
      });
      // this.logChange = this.logChange.bind(this);

  // logChange(e) {
  //       this.setState({[e.target.name]: e.target.value});  
  //   }

    const showAddUserModal = () => {
      setState((prev) => ({...prev, addUserVisible: true }))
    }
    const hideAddUserModal = () => {
      setState((prev) => ({...prev, addUserVisible: false }))
    }
    const refreshUsers = () => {
      fetch('/users')
        .then(res => res.json())
        .then(members => setState((prev) => ({...prev, members: members })));
    }
    const deleteUser = (member) => {
      fetch('/deleteUser', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          member
        })
      }).then(res => console.log(res)).then(refreshUsers)
    }

    const addUserStyle = (vis) => {
      let style = vis ? "block" : "none";
      return style
    }
    const submitUser = () => {
      fetch('/addUser', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          FirstName: state.addUserFirstName,
          LastName: state.addUserLastName,
          Email: state.addUserEmail,
          id: ((state.members).length + 5),
        })
      }).then(res => console.log(res)).then(refreshUsers);
      setState((prev) => ({
        ...prev, addUserFirstName: '', addUserLastName: '', addUserEmail: ''}))
      hideAddUserModal();
    }
    
    useEffect(() => {
      refreshUsers()
    }, []);
    return (
      <div>
        <div className="Users container">
          <h1>Users</h1>
          <table className="table">
          <thead>
            <tr>
              <th>Member name</th>
              <th>Member email</th>
              <th>Action</th>
                <th><button className="addbutton" onClick={() => {showAddUserModal()}}>Add user</button></th>
            </tr>
          </thead>
          <tbody>
              {(state.members).map(member =>
                <tr key={member.id}>
                  <td>{member.name} {member.surname}</td>
                  <td>{member.email}</td>
                  <td><button className="btn btn-primary">Edit</button> <button className="btn btn-danger" onClick={()=> deleteUser(member)}>Delete</button></td>
                </tr>
              )}
          </tbody>
          </table>
        </div>
        <div style={{ display: addUserStyle(state.addUserVisible)}}>
          <section className="modal-main">
            <input placeholder="First Name" 
              value={state.addUserFirstName}
              onChange={(e) => {
                setState((prev) => ({ ...prev, addUserFirstName: e.target.value} ));  
                e.persist()
            }}/>
            <input placeholder="Last Name"
              value={state.addUserLastName}
              onChange={(e) => {
                setState((prev) => ({ ...prev, addUserLastName: e.target.value }));
                e.persist()
              }} />
            <input placeholder="Email"
              value={state.addUserEmail}
              onChange={(e) => {
                setState((prev) => ({ ...prev, addUserEmail: e.target.value }));
                e.persist()
              }} />
              <button onClick={()=>{submitUser()}}>ADD THIS USER</button>
            
            <button onClick={()=>{hideAddUserModal()}}>close</button>
          </section>
        </div>
      </div>
        
    );
}

export default AllUsers
