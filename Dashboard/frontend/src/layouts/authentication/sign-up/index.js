import React, { useState, useEffect } from "react";
// import BasicLayout from "layouts/authentication/components/BasicLayout";
// import Webcam from "react-webcam";
import Table from "react-bootstrap/Table";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Axios from "axios";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { MultiSelect } from "react-multi-select-component";
import Modal from "react-bootstrap/Modal";
// import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@mui/icons-material";
const statusOpt = [
  { value: "9-10", label: "9-10" },
  { value: "10-11", label: "10-11" },
  { value: "11-12", label: "11-12" },
  { value: "12-1", label: "12-1" },
  { value: "1-2", label: "2-3" },
  
];
const today = new Date();
export default function WebcamCapture() {
 
  const [file, setFile] = useState("");
  const [appdata,setAppdata]=useState([]);
  const [custName,setCustName]=useState("")
  const [car_num,setCarNum]=useState("");
  const [cust_num,setCustNum]=useState("");
  const [mydate,setMydate]=useState("");
  const [slot,setSlot]=useState("");

  
  let navigate = useNavigate();

  const [bundle, setBundle] = useState([]);

  // useEffect(() => {}, []);
  useEffect(async () => {
    const result = await Axios("http://localhost:3001/displayapp");
    const x = result.data;
    // alert(result.data)
    setAppdata(x);
  }, [bundle]);
  const bookitnowfun=()=>{
   
    console.log(custName) 
   
       console.log(cust_num)
       console.log(car_num)
       console.log(mydate)
       console.log(slot)
       setBundle([
        ...bundle,
        {
          cust_name:custName,
          car_num: car_num,
          cust_num: cust_num,
          mydate: mydate,
          cust_slot: slot.value,
        },
      ]);
      setCustName("")
      setCustNum("")
      setCarNum("")
      setMydate("")
      setSlot("")
      Axios.post("http://192.168.18.148:3001/mobileappointment", {
        cust_name:custName,
        car_num: car_num,
        cust_num: cust_num,
        mydate: mydate,
        cust_slot: slot.value,
       type:"walkin"
      })
      .then((response) => {
       
       

        setCustName("")
        setCustNum("")
        setCarNum("")
        setMydate("")
        setSlot("")
    
        
    
    
      })
        .catch(function (error) {
          console.log("Problem with posting mobile appointment " + error.message);
        });
    
    }
    
// console.log(bundle)
  const uploadImage = (e) => {
    const f = e.target.files[0];
    console.log(e.target.files[0], "file");
    setFile(f);
  };
  const getNumber = async () => {
    
    // const form = document.getElementById("form");
    const formData = new FormData();
    console.log(file, "fileeee");
    formData.set("imageFile", file, file.name);
    formData.set("hello", "world");
    // formData.append("imageFile", file, file.name);
    console.log(formData, "formData");
    console.log(formData.get("imageFile"), "ooooo");
    const result = await fetch("http://localhost:5000/", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    const x = result.data;

    setCurr(x);
  };
// console.log(appdata)
  return (
    <DashboardLayout>
      {/* <BasicLayout> */}
      <form onSubmit={(e) => e.preventDefault()} id="form">
        <input placeholder="Upload Photo" type="file" onChange={uploadImage} />
        <button onClick={getNumber} className="btn btn-primary" type="submit">
          Add Car
        </button>
      </form>

      <Table striped bordered hover variant="grey">
          <thead>
            <tr>
              <th>Name</th>
              <th>Number plate</th>
              <th>Date</th>
              <th>Time</th>
              <th>Phone number</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Form.Control
                  value={custName}
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  onChange={(e) => setCustName(e.target.value)}
                />
              </td>
              <td>
              <Form.Control
                value={car_num}
                type="text"
                placeholder="Enter Number plate"
                name="car num"
                onChange={(e) => setCarNum(e.target.value)}
              />
            </td>
              <td>
              <Form.Control
              value={mydate}
              type="date"
              placeholder="Enter Date"
              name="date"
              onChange={(e) => setMydate(e.target.value)}
              // disabledDays={{ before: today }}
            />
              </td>
              <td>
              <Select
              value={slot}
              onChange={setSlot}
              options={statusOpt}
            />

              </td>
              <td>
              <Form.Control
                value={cust_num}
                type="text"
                placeholder="Enter Phone number"
                name="phone"
                onChange={(e) => setCustNum(e.target.value)}
              />
            </td>
              <td>
                <Button
                  style={{
                    background: "#0e7a57",
                    borderRadius: "5",
                    border: "0",
                    marginLeft: "1px",
                  }}
                  onClick={bookitnowfun}
                >
                  Add
                </Button>

             
              </td>
            </tr>
          </tbody>
        </Table>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
       
            <th>Name</th>
            <th>Number plate</th>
            <th>Date</th>
            <th>Time</th>
            <th>Phone Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {appdata.map((val, key) => {
          // alert(val.cust_car)
          return (
            <>
              <tr key={val.idbooking}>
                <td>{val.idbooking}</td>
                <td>{val.cust_name}</td>
                <td>{val.car_num}</td>
                <td>{val.book_date}</td>
                <td>{val.book_slot}</td>
                <td>{val.cust_num}</td>
                <td>{val.type}</td>
                <td>
                <Button
                  style={{
                    background: "#0e7a57",
                    borderRadius: "5",
                    border: "0",
                    marginLeft: "1px",
                  }}
                  onClick={()=> navigate("/tables ")}
                >
                  Go to record
                </Button>
                </td>
              </tr>
            </>
          );
        })}
      </tbody>
        
      
      </Table>
      {/* </BasicLayout> */}

      {/* <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      <button type="submit" onClick={capture}>
        Capture photo
      </button> 
      {/* {imgSrc && <img src={imgSrc} alt="cam" />} 
  <button type="submit">Save image</button>  */}
    </DashboardLayout>
  );
}

// https://www.npmjs.com/package/react-webcam