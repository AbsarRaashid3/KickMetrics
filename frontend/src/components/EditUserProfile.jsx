import React, { useState, useEffect } from "react";
import { Card, Button, Form, Alert, Spinner, Container, Row, Col, Image, Badge } from "react-bootstrap";
import { Edit, Save, Camera, MapPin, Phone, Calendar, Globe } from "lucide-react";
import { useUpdateProfileMutation, useUserProfileQuery } from "../redux/slices/usersApiSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import Loader from "./Loader";

const EditUserProfile = () => {
  const { data: profile, isLoading, error } = useUserProfileQuery();
  const [updateProfile, { isLoading: loadingUpdate }] = useUpdateProfileMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setBio(profile.bio || "");
      setAge(profile.age || "");
      setCountry(profile.country || "United States");
      setAddress(profile.address || "123 Maple Street Springfield, IL 62704, USA");
      setContact(profile.contact || "+1234567890");
      setPreviewImage(profile.image || "https://img.icons8.com/bubbles/100/000000/user.png");
      setEmail(profile.email || "user@example.com");
    }
  }, [profile]);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const saveProfile = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('bio', bio);
      formData.append('age', age);
      formData.append('country', country);
      formData.append('address', address);
      formData.append('contact', contact);
      if (image) {
        formData.append('image', image);
      }

      await updateProfile(formData).unwrap();
      setAlertVariant("success");
      setAlertMessage("Profile updated successfully!");
      setShowAlert(true);
      setIsEditing(false);
      setImage(null);
    } catch (err) {
      setAlertVariant("danger");
      setAlertMessage(err?.data?.message || "Failed to update profile");
      setShowAlert(true);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return (
    <Alert variant="danger">
      {error?.data?.message || error.error}
    </Alert>
  );

  return (
    <Container fluid className="px-md-5 justify-content-center" style={{ 
      minHeight: "100vh",      
    }}>
      {/* Floating Alert */}
      <Alert 
        variant={alertVariant} 
        show={showAlert} 
        className="position-fixed top-0 start-50 translate-middle-x mt-4 shadow-lg"
        style={{ 
          zIndex: 9999,
          minWidth: "300px",
          animation: "fadeIn 0.5s"
        }}
      >
        {alertMessage}
      </Alert>

      <Container className="mb-5" >
        <Card className="overflow-hidden shadow-lg" style={{ borderRadius: "16px",border: "3px solid rgba(139, 17, 17, 0.82)" }}>
          {/* Header Section with Gradient Background */}
          <div 
            className="position-relative" 
            style={{ 
              height: "200px",
              background: "linear-gradient(135deg, rgb(16, 46, 107), rgba(181, 135, 135, 0.88), #670d0d)",
              overflow: "hidden",
              borderBottom: "3px solid rgba(211, 13, 13, 0.82)",
            }}
          >
            {/* Pattern Overlay */}
            <div className="position-absolute w-100 h-100" style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              opacity: 0.6 
            }}></div>
            
          </div>

          {/* Profile Image (Positioned to overlap header and content) */}
          <div className="d-flex justify-content-center " style={{ marginTop: "-80px" }}>
            
            <div className="position-relative">
              
              <Image
                src={previewImage}
                alt="Profile"
                roundedCircle
                className=" border-4 shadow"
                style={{ 
                  width: "150px", 
                  height: "150px", 
                  objectFit: "cover",
                  backgroundColor: "#fff",
                  border: "3px solid rgba(211, 13, 13, 0.82)"
                }}
              />
              {isEditing && (
                <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center ">
                  <Form.Label className="mb-0 d-flex justify-content-center align-items-center rounded-circle bg-dark bg-opacity-50 text-white" style={{ 
                    width: "150px", 
                    height: "150px",
                    cursor: "pointer",
                    opacity: 0,
                    ":hover": { opacity: 1 }
                  }}
                  onMouseOver={(e) => e.currentTarget.style.opacity = 1}
                  onMouseOut={(e) => e.currentTarget.style.opacity = 0}
                  >
                    <Camera size={40} />
                    <Form.Control 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageChange} 
                      style={{ display: "none" }} 
                    />
                  </Form.Label>
                </div>
              )}
            </div>
          </div>

          <Card.Body className="px-4 pt-2 pb-5"    >
            {/* Name and Title Section */}
            <div className="text-center mb-4">
              {isEditing ? (
                <Form.Group className="mb-2">
                  <Form.Control
                    rows={10}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control-lg text-center border-0 border-bottom rounded-0  fw-bold"
                    style={{ fontSize: "2rem" }}
                  />
                </Form.Group>
              ) : (
                <h1 className="fw-bold mb-1" style={{ fontSize: "2rem" }}>{name || "Your Name"}</h1>
              )}
              <Badge  className="px-3 py-2 bg-danger" >{email || "Add Your Bio there..."}</Badge>
            </div>

            <Row className="g-4" >
              {/* Bio Section */}
              <Col lg={8}>
                <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: "12px",background: "linear-gradient(135deg, rgb(16, 46, 107), rgba(181, 135, 135, 0.88), #670d0d)"  }}>
                  <Card.Body   style={{ fontSize: "1.1rem" }}
                  >
                    <div className="d-flex align-items-center mb-3">
                      <h3 className="h5 mb-0 fw-bold text-white">About Me</h3>
                    </div>
                    {isEditing ? (
                      <Form.Group>
                        <Form.Control
                          as="textarea"
                          rows={8}
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          className="border-0 bg-light"
                          style={{ borderRadius: "8px" }}
                        />
                      </Form.Group>
                    ) : (
                      <Card.Text style={{ lineHeight: "1.8", color:"white"}}>
                        {bio || "No bio information available. Click Edit to add your bio."}
                      </Card.Text>
                    )}
                  </Card.Body>
                </Card>
              </Col>

              {/* Personal Details Section */}
              <Col lg={4}>
                <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: "12px",color:"white",background: "linear-gradient(135deg, rgb(16, 46, 107), rgba(181, 135, 135, 0.88), #670d0d)"  }}>
                  <Card.Body>
                    <div className="d-flex align-items-center mb-3">
                      <h3 className="h5 mb-0 fw-bold text-white">Personal Details</h3>
                    </div>

                    <div className="d-flex mb-3 align-items-center">
                      <div className="d-flex justify-content-center align-items-center bg-light rounded-circle me-3" style={{ width: "40px", height: "40px" }}>
                        <Calendar size={20} className="text-primary" />
                      </div>
                      <div className="flex-grow-1">
                        <div className="medium fw-bold">Age</div>
                        {isEditing ? (
                          <Form.Control
                            type="Number"
                             min="10"
                            max="100"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="border-0 p-1 shadow-none"
                            style={{ width: "200px",fontSize:"15px",height:"30px"}} // Adjust width as needed

                          />
                        ) : (
                          <div>{age || "Not specified"}</div>
                        )}
                      </div>
                    </div>

                    <div className="d-flex mb-3 align-items-center">
                      <div className="d-flex justify-content-center align-items-center bg-light rounded-circle me-3" style={{ width: "40px", height: "40px" }}>
                        <Globe size={20} className="text-primary" />
                      </div>
                      <div className="flex-grow-1">
                        <div className="medium fw-bold">Country</div>
                        {isEditing ? (
                          <Form.Control
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="border-0 p-1 shadow-none"
                            style={{ width: "200px",fontSize:"15px",height:"30px"}} // Adjust width as needed

                          />
                        ) : (
                          <div>{country || "Not specified"}</div>
                        )}
                      </div>
                    </div>

                    <div className="d-flex mb-3 align-items-center">
                      <div className="d-flex justify-content-center align-items-center bg-light rounded-circle me-3" style={{ width: "50px", height: "40px" }}>
                        <MapPin size={20} className="text-primary" />
                      </div>
                      <div className="flex-grow-1">
                        <div className="fw-bold medium">Address</div>
                        {isEditing ? (
                          <Form.Control
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="border-0 p-1 shadow-none"
                            style={{ width: "200px",fontSize:"15px",height:"30px"}} // Adjust width as needed

                          />
                        ) : (
                          <div>{address || "Not specified"}</div>
                        )}
                      </div>
                    </div>

                    <div className="d-flex align-items-center">
                      <div className="d-flex justify-content-center align-items-center bg-light rounded-circle me-3" style={{ width: "40px", height: "40px" }}>
                        <Phone size={20} className="text-primary" />
                      </div>
                      <div className="flex-grow-1">
                        <div className="fw-bold medium">Contact</div>
                        {isEditing ? (
                          <Form.Control
                            type="tel"
                           
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            className="border-0 p-1 shadow-none"
                            style={{ width: "200px",fontSize:"15px",height:"30px"}} // Adjust width as needed

                          />
                        ) : (
                          <div>{contact || "Not specified"}</div>
                        )}
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card.Body>

          {/* Footer with Action Button */}
          <Card.Footer className="bg-white border-0 text-center ">
            <Button
              onClick={isEditing ? saveProfile : () => setIsEditing(true)}
              className="px-4 py-2 mb-4"
              style={{ 
                borderRadius: "50px", 
                minWidth: "160px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                transition: "transform 0.2s",
                backgroundColor: isEditing ? "danger" : "rgb(104, 6, 6)"
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              disabled={loadingUpdate}
            >
              {loadingUpdate ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" /> Saving...
                </>
              ) : (
                <>
                  {isEditing ? <Save className="me-2" /> : <Edit className="me-2" />}
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </>
              )}
            </Button>
          </Card.Footer>
        </Card>
      </Container>

      {/* CSS Animation for Alert */}
      <style type="text/css">
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translate(-50%, -20px); }
            to { opacity: 1; transform: translate(-50%, 0); }
          }
        `}
      </style>
    </Container>
  );
};

export default EditUserProfile;