import React, { useState, useEffect } from "react";
import { Card, Button, Form, Alert, Spinner, Container} from "react-bootstrap";
import { Edit, Save } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useUpdateProfileMutation, useUserProfileQuery } from "../redux/slices/usersApiSlice";

import Loader from "./Loader";
import Message from "./Message";
const EditUserProfile = () => {
  const { data: profile, isLoading, error } = useUserProfileQuery();


  const [updateProfile, { isLoading: loadingUpdate }] = useUpdateProfileMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setBio(profile.bio || "");
      setPreviewImage(profile.image || "https://img.icons8.com/bubbles/100/000000/user.png");
    }
  }, [profile]);

  // Auto-dismiss alert after 3 seconds
  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

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
      if (image) {
        formData.append('image', image);
      }

      await updateProfile(formData).unwrap();


      setAlertMessage({ type: "success", text: "Profile updated successfully!" });
      setIsEditing(false);
      setImage(null);
    } catch (err) {
      setAlertMessage({ type: "danger", text: err?.data?.message || "Failed to update profile" });
    }
  };

  if (isLoading) return (<Loader />);
  if (error) return <Message variant='danger'> {error?.data?.message || error.error} </Message>;

  return (
    <Container>
      <Card className="shadow-lg p-4"   >
        <Card.Body>
          {alertMessage && <Alert variant={alertMessage.type}>{alertMessage.text}</Alert>}
          {error && <Alert variant="danger">{error.data?.message || "An error occurred"}</Alert>}

          <div className="d-flex">
            {/* Left Side - Image */}
            <div className="me-4 d-flex flex-column align-items-center bg-dark rounded" style={{ width: '200px' }}>
              <div className="text-center" >
                <img
                  src={previewImage}
                  alt="Profile"
                  roundedCircle
                  className="mb-3 mt-3"
                  style={{
                    width: '150px', height: '150px', objectFit: 'cover'
                  }}
                />
                {isEditing && (
                  <div className="text-center mt-2">
                    <Form.Group>
                      <Form.Label className="btn btn-light btn-md">
                        Edit Image
                        <Form.Control
                          type="file"
                          accept="image/*"
                          placeholder="Upload Image"
                          onChange={handleImageChange}
                          style={{ display: 'none' }}
                        />
                      </Form.Label>
                    </Form.Group>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Info */}
            <div className="flex-grow-1 bg-dark text-white p-4 rounded">
              {isEditing ? (
                <Form.Control
                  type="text"
                  className="mb-3"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              ) : (
                <h3 className="fw-bold mb-3">{name}</h3>
              )}

              <div className="mb-3 text-center">{profile.email}</div>

              {isEditing ? (
                <Form.Group controlId="bio">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself"
                  />
                </Form.Group>
              ) : (
                <>
                  <h5>
                    <br></br>
                    About :
                  </h5>
                  <h6>{bio}</h6>

                </>
              )}
            </div>
          </div>
        </Card.Body>

        <Card.Footer className="d-flex justify-content-end">
          <Button
            variant={isEditing ? "success" : "outline-primary"}
            className="w-10 items-center"
            onClick={isEditing ? saveProfile : () => setIsEditing(true)}
            disabled={loadingUpdate || !profile}
          >
            {loadingUpdate ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" /> Saving...
              </>
            ) : (
              <>
                {isEditing ? <Save className="me-2" /> : <Edit className="me-2" />} {isEditing ? "Save" : "Edit"}
              </>
            )}
          </Button>
        </Card.Footer>
      </Card>

    </Container>
  );
};

export default EditUserProfile;