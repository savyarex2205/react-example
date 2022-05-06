import { Button, message, Table } from 'antd';
import axios from 'axios';
import 'antd/dist/antd.css';
import React, { useState, useEffect } from 'react'

export default function Post() {

  const [formaData, setFormData] = useState({});
  const [row, setRow] = useState([]);
  const [change, setChange] = useState(0);


  const changeHandler = (e) => {
    // console.log(formaData);
    setFormData({ ...formaData, [e.target.name]: e.target.value })
  }

  // Filling the column of the ANT-TABLE
  const column = [
    {

      title: 'First Name',
      dataIndex: 'first_Name',

    }, {

      title: 'Last Name',
      dataIndex: 'last_Name',

    }, {

      title: 'Email',
      dataIndex: 'user',

    }, {

      title: 'Address',
      dataIndex: 'address',

    }, {

      title: 'Phone',
      dataIndex: 'phone',
      render:((text)=>(
<h5 style={{color:"red"}}>{text}</h5>
      ))

    },
    {
      title: 'Action',
      dataIndex: 'id',
      render: (text, record) => (
        <Button type="primary" onClick={() => {
          // console.log(record);
          setFormData(record);
        }}> update</Button>
      ),
    },
    {
      title:'Delete',
      dataIndex:"id",
      render: (text, record) =>(
        <Button onClick={() => {
          userDelete(record.id)
        }}>DELETE</Button>
      ),
  },
  ]

  // Axios Fucntion to SAVE DATA
   const saveData = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/student/', formaData)
    .then((response) =>
      {
        if(response.status ==200) {
          message.info("Form Submitted");
          console.log(formaData)
          setFormData({});
          e.target.reset();
        }
        else{
          message.error("Something went wrong")
        }
      })
      .catch((error) => {
        message.error("Something went wrong")
      });

      setChange(change+1)
  }

  // Axios Fucntion to GET all DATA
  const getData = (e) => {
    axios.get('http://127.0.0.1:8000/student/')
      .then((res) => {
        setRow(res.data)
      }
      )
      console.log(row)
  }

  // Axios Function to Update DATA
  const updateData = (e) => {
  axios.put('http://127.0.0.1:8000/student/'+formaData.id+'/', formaData)
  .then((response) => {
  if(response.status === 200) {
    // var obj;
    var i;
    var arr=[...row]
    // row.forEach((element,index) => {
    //   if (element.id === formaData.id) {
    //     obj = formaData;
    //     console.log(index);
    //     i = index
    //   }
    //   // console.log(element);
    // });
    // arr[i]=obj
    // setRow(arr)
    // console.log(row)

    i = arr.findIndex(x => x.id === formaData.id);
    console.log(i);
    arr[i] = formaData
    setRow(arr)
    console.log(row)
  }
  }
  )
  .catch(error => console.log(error));
  // setChange(change+1);
  setFormData({});
  e.target.reset();
  }


// Axios Function to Delete DATA
  const userDelete = (id) => {
    axios.delete('http://127.0.0.1:8000/student/'+id+'/').
    then((response) => {
     
      if (response.status == 200){

        var i;
        console.log(id)
        var arr = [...row];
        console.log(arr);
        i = arr.findIndex(element => element.id == id);
        console.log(i)
        // arr[i] = null;
        arr.splice(i,1)
        setRow(arr);


      }
    }).
    catch(error => console.log(error))
  }

  // This useEffect is to get All the DATA from backend on every reload of page
  useEffect(()=>{
    getData();  
    message.info("user fetched")        //componentDidMount
  },[])

  useEffect(()=>{
    message.info("added to cart")
    getData();              //componentDidUpdate
  }, [change])



const increment=()=>{
  setChange(change+1)
}
  return (
    <div>
      <h4> User Data Entry Form </h4>

      <div className='form-container'>

        <form onSubmit={saveData}>
          <div className='fname'>
            <label>First Name: </label>
            <input type="text" name="first_Name" onChange={changeHandler} value={formaData.first_Name} defaultValue="" />
          </div>
          <br />
          <br />

          <div className='lname'>
            <label>Last Name: </label>
            <input type="text" name="last_Name" onChange={changeHandler} value={formaData.last_Name} defaultValue="" />
          </div>
          <br />
          <br />

          <div className='phone'>
            <label>Phone: </label>
            <input type="tel" name='phone' onChange={changeHandler} value={formaData.phone} defaultValue="" />
          </div>
          <br />
          <br />

          <div className='address'>
            <label>Address: </label>
            <input type="text" name='address' onChange={changeHandler} value={formaData.address} defaultValue="" />
          </div>
          <br />
          <br />

          <div className='username'>
            <label>User: </label>
            <input type="text" name="user" onChange={changeHandler} defaultValue={formaData.user}  />
          </div>
          <br />
          <br />

          <div className='password'>
            <label>Password: </label>
            <input type="password" name='password' onChange={changeHandler} defaultValue={formaData.password} />
          </div>
          <br />
          <br />

          <input type='submit' value='Submit' />
          <br />
          <br />
          <input type="button"  value="Update" onClick={updateData} />
          <br />
          <br />
        </form>

        <button onClick={getData}>GET</button>
        <button onClick={increment}>Add</button>


      </div>


      <Table columns={column} dataSource={row} />

      <div style={{position:"fixed",right:"20%",top:"50%"}}>{change}</div>
      {/* <Table columns={newColumn} dataSource={newRow} /> */}
    </div>
  )
}
