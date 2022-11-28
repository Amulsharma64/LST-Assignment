import Navbar from './components/navbar/Navbar';
import './index.css';
import { useEffect, useState } from 'react';
function App() {
  const retrievedIteams = JSON.parse(localStorage.getItem('items'));
//   const [edit, setEdit] = useState(null);
const [count,setCount] = useState(3);
  const [items, setItems] = useState(retrievedIteams);
//   const [toggleButton, settoggleButton] = useState(true);

  const [state, setState] = useState({
    Name: "",
    Gender: "",
    Age:Number,
    Designation:"",
    Department:"",
    joiningDate:Date,
  })

   function Available() {
        
   }
  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  }
  
  function saveData() {
    const allInputData = { id: new Date().getTime().toString(), ...state };
    setItems([...items, allInputData], setState({
      Name: "",
      Gender: "",
      Age:Number,
      Designation:"",
      Department:"",
      joiningDate:"",
    }));
    items.push(allInputData);
    localStorage.setItem('items', JSON.stringify(items));
  }

  const deleteItem = (id) => {
    console.log(id);
    for (let i = 0; i < items.length; i++) {
        if (items[i].id===id) {
            items.splice(i, 1);
        }        
    }
    localStorage.setItem('items', JSON.stringify(items));
    setState(items);
    console.log(items);
  };
  const editItem = (id) => {
    console.log(id);
    setItems(
        items.map((ele) => {
          if (ele.id === id) {
            return { ...ele, name: state };
          }
          return ele;
        })
      );
    
  };
  useEffect(()=>{
  },[state])
  return (
    <>
      {/* <!-- navbar --> */}
      <Navbar/>
	{/* <!-- navbar --> */}

        {/* <Main/> */}

        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="question-dashboard">
                {/* {<Card/>} */}
                <div className="card mt-4 mb-3 mb-md-4">
                  <div className="card-body p-3">
                    <h5 className="text-secondary mb-2">Available: 
                          <span className="font-weight-bold ml-1 text-dark">{count}</span></h5>
                    <h5 className="text-secondary">Total: 
                          <span className="font-weight-bold ml-1 text-dark">{items.length}</span></h5>
                    <button className="btn btn-primary mt-4" data-toggle="modal" data-target="#addEmployeeModal">
                      <i className="fa fa-plus"></i>&nbsp; Add Employee</button>
                  </div>
                </div>
                {/* {<Table/>} */}
                <div className="table-responsive mt-3 mt-md-4 mb-2">
                  <table className="table table-bordered">
                      <thead>
                          <tr>
                              <th>Name</th>
                              <th>Department</th>
                              <th>Available</th>
                              <th>View Details</th>
                          </tr>
                      </thead>
                      <tbody>
                          {
                            items.map((ele)=>{
                                return (
                                    <tr key={ele.id}>
                                        <td>{ele.Name}</td>
                                        <td>{ele.Department}</td>
                                        <td>
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" defaultChecked="checked" className="custom-control-input" id={`${ele.id}`}
                                                />
                                                <label className="custom-control-label" htmlFor={`${ele.id}`} onChange={Available}></label>
                                            </div>
                                        </td>
                                        <td>
                                            <button 
                                            onClick={() => {
                                                editItem(ele.id);
                                            }}
                                            type="button" 
                                            className="btn btn-outline-info btn-sm" 
                                            data-toggle="modal" 
                                            data-target="#addEmployeeModal">
                                            <i className="fa fa-edit"></i>&nbsp; 
                                            Edit
                                            </button>
                                            <button 
                                            onClick={() => {
                                                deleteItem(ele.id);
                                            }}
                                            type="button" 
                                            className="btn btn-outline-danger btn-sm">
                                            <i className="fa fa-trash"></i>&nbsp; Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }) 
                          }                   
                    </tbody>
              </table>
          </div>
              </div>
            </div>
          </div> 
        </div>
	{/* <!-- Add Employee Modal --> */}
    {/* <Employee/> */}
    <div className="modal fade" id="addEmployeeModal" tabIndex="-1" role="dialog" aria-labelledby="addEmployeeModal"
      aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
              <div className="modal-header pt-3 pb-2">
                  <h5 className="modal-title" id="exampleModalCenterTitle">Add Employee</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div className="modal-body">
                  <form>
                      <div className="form-row ">
                          <div className="form-group col-md-6">
                              <label htmlFor='Name' className="mb-1">Name</label>
                              <input
                              type="text" 
                              required
                              className="form-control" 
                              id="" 
                              placeholder="Enter"
                              name='Name'
                              value={`${state.Name}`}
                              onChange={handleChange}
                              />
                          </div>
                          <div className="form-group col-md-6">
                              <label htmlFor='Gender' className="mb-1">Gender</label>
                              <select 
                              className="form-control" 
                              id="exampleFormControlSelect1"
                              name='Gender'
                              required
                              value={`${state.Gender}`}
                              onChange={handleChange}>
                                  <option value={"Select"}>Select</option>
                                  <option value="Male">Male</option>
                                  <option value='Female'>Female</option>
                              </select>
                          </div>
                          <div className="form-group col-md-6">
                              <label htmlFor='Age' className="mb-1">Age</label>
                              <input 
                              required
                              type="number" 
                              className="form-control" 
                              id="" placeholder="Enter"
                              name='Age'
                              value={`${state.Age}`}
                              onChange={handleChange}
                              />
                          </div>
                          <div className="form-group col-md-6">
                              <label htmlFor='Designation' className="mb-1">Designation</label>
                              <input 
                              required
                              type="text" 
                              className="form-control" 
                              id="" placeholder="Enter"
                              name='Designation'
                              value={`${state.Designation}`}
                              onChange={handleChange}
                              />
                          </div>
                          <div className="form-group col-md-6">
                              <label htmlFor='Department' className="mb-1">Department</label>
                              <input 
                              type="text" 
                              className="form-control" 
                              id="" placeholder="Enter"
                              required
                              name='Department'
                              value={state.Department}
                              onChange={handleChange} 
                              />
                          </div>
                          <div className="form-group col-md-6">
                              <label htmlFor='joiningDate' className="mb-1">Joining Date</label>
                              <input 
                              type="date" 
                              required
                              className="form-control" id="" 
                              name='joiningDate'
                              value={`${state.joiningDate}`}
                              onChange={handleChange}  
                              />
                          </div>
                      </div>
                  </form>
              </div>
              <div className="modal-footer">
                  <button type="button" className="btn btn-outline-danger btn-sm" data-dismiss="modal">Cancel</button>
                  <button type="submit" onClick={saveData} className="btn btn-success btn-sm" data-dismiss="modal">Save</button>
              </div>
          </div>
      </div>
  </div> 
    </>
  );
}

export default App;
