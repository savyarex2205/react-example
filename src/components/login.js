import React, { useState } from 'react';
import './login.css';

export default function Login() {

  const [formData, setFormData] = useState({

  })


  const changeHandler = (e) => {
    var name = e.target.name
    // console.log(name.value);
    // console.log(formData)
    setFormData({ ...formData,[name]: e.target.value, })
    console.log(formData)

  }



  const submit = (e) => {
    e.preventDefault();
    alert(formData);
    // console.log(formData);

    // const obj = {
    //   apple: "red",
    //   banana: "green",
    // }
    // console.log(obj);
    // const newobj = {...obj}
    // console.log(newobj);
  }

  return (
    <div className='container'>
      <h2>Login / SignUp</h2>
      <div className='form'>

        <form onSubmit={submit}>
          <div className="input-container">
            <label>Username: </label>
            <input type="text" name="email" placeholder='Enter Email' onChange={changeHandler} />
            <br />
            <br />
          </div>

          <div className="password-container">
            <label>Password: </label>
            <input type="password" name="password" placeholder='Enter Password' onChange={changeHandler} />
            <br />
            <br />
          </div>

          <div>
            {/* <input type='submit' value="Submit" /> */}
            <button type=''>submit</button>

          </div>
        </form>


      </div>


    </div>
  )
}
