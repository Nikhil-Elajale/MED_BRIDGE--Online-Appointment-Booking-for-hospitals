import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Image,
  Card,
} from "react-bootstrap";
import { BsTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../Navbar/NavigationBar";

const ViewDoctorToAdmin = () => {
  const [allDoctor, setAllDoctor] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllDoctor = async () => {
      const allDoctor = await retrieveAllDoctor();
      if (allDoctor) {
        setAllDoctor(allDoctor);
      }
    };

    getAllDoctor();
  }, []);

  const retrieveAllDoctor = async () => {
    const token = sessionStorage.getItem("token");
    const response = await axios.get("http://localhost:8080/api/doctor/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const token = sessionStorage.getItem("token");

  const deleteDoctor = (doctorId) => {
    fetch(`http://localhost:8080/api/admin/delete/id?userId=${doctorId}`, {
      method: "DELETE",

      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((result) =>
      result.json().then((res) => {
        alert(res.responseMessage);
        window.location.reload(true);
      })
    );
  };

  return (
    <>
      <Container className="mt-4">
        <Card className="shadow">
          <Card.Header className="text-center bg-primary text-white">
            <h3>All Doctors</h3>
          </Card.Header>
          <Card.Body style={{ overflowX: "auto" }}>
            <div className="mb-3 text-start">
              <Button
                variant="outline-secondary"
                onClick={() => navigate("/admin/dashboard")}
              >
                ← Back to Dashboard
              </Button>
            </div>

            <Table
              responsive
              hover
              bordered
              className="text-center align-middle"
            >
              <thead className="table-primary">
                <tr>
                  <th>Doctor</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Specialist</th>
                  <th>Experience</th>
                  <th>Age</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allDoctor.map((doctor, index) => (
                  <tr key={index}>
                    <td>
                      <Image
                        src={`http://localhost:8080/api/admin/${doctor.doctorImage}`}
                        roundedCircle
                        width={60}
                        height={60}
                        alt="doctor"
                        style={{
                          objectFit: "cover",
                          border: "2px solid #007bff",
                        }}
                      />
                    </td>
                    <td>{doctor.firstName}</td>
                    <td>{doctor.lastName}</td>
                    <td>{doctor.emailId}</td>
                    <td>{doctor.doctor?.specialist}</td>
                    <td>{doctor.doctor?.experience} yrs</td>
                    <td>{doctor.age}</td>
                    <td>{doctor.contact}</td>
                    <td>{`${doctor.street}, ${doctor.city}, ${doctor.pincode}`}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => deleteDoctor(doctor.id)}
                      >
                        <BsTrashFill /> Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default ViewDoctorToAdmin;
