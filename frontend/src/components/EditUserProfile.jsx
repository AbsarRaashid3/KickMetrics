import React, { useState, useEffect } from "react";
import { Card, Button, Form, Alert, Spinner } from "react-bootstrap";
import { Edit, Save } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useUpdateProfileMutation, useUserProfileQuery } from "../redux/slices/usersApiSlice";

const EditUserProfile = () => {
  const { data: profile, isLoading, error } = useUserProfileQuery();
  const [updateProfile, { isLoading: loadingUpdate }] = useUpdateProfileMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);
// Add proper initial state

  // Update state when profile data is available
useEffect(() => {
  if (profile) {
    console.log('Setting Profile Data:', profile);
    setName(profile.name || "");
    setBio(profile.bio || "");
     
  }
}, [profile]);

  const saveProfile = async () => {
    try {
      await updateProfile({ name, bio }).unwrap();
      setAlertMessage({ type: "success", text: "Profile updated successfully!" });
      setIsEditing(false);
    } catch (err) {
      setAlertMessage({ type: "danger", text: err?.data?.message || "Failed to update profile" });
    }
  };

 // Add loading and error states
if (isLoading) {
  return <div className="text-center mt-5">Loading profile...</div>;
}

if (!profile) {
  return <div className="text-center mt-5">No profile data available</div>;
}
  return (
    <div className="d-flex justify-content-center align-items-center mt-4">
      <Card className="shadow-lg p-4" style={{ width: "40rem", borderRadius: "15px" }}>
        <Card.Header className="text-center bg-primary text-white" style={{ borderRadius: "10px 10px 0 0" }}>
          <h5>User Profile</h5>
        </Card.Header>

        <Card.Body>
          {alertMessage && <Alert variant={alertMessage.type}>{alertMessage.text}</Alert>}
          {error && <Alert variant="danger">{error.data?.message || "An error occurred"}</Alert>}
          
          {!profile ? (
            <Alert variant="danger">Profile data is missing</Alert>
          ) : (
            <>
              <div className="text-center mb-3">
                {isEditing ? (
                  <Form.Control
                    type="text"
                    className="text-center mb-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                  />
                ) : (
                  <h4>{profile.name || "No name available"}</h4>
                )}
              </div>

              {isEditing ? (
                <Form.Group controlId="bio">
                  <Form.Label>Bio</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself"
                  />
                </Form.Group>
              ) : (
                <Card.Text className="text-muted text-center">{profile.bio || "Add your bio"}</Card.Text>
              )}
            </>
          )}
        </Card.Body>

        <Card.Footer className="d-flex justify-content-between">
          <Button
            variant={isEditing ? "success" : "outline-primary"}
            className="w-100"
            onClick={isEditing ? saveProfile : () => setIsEditing(true)}
            disabled={loadingUpdate || !profile}
          >
            {loadingUpdate ? (
              <>
                <Spinner animation="border" size="sm" className="mr-2" /> Saving...
              </>
            ) : (
              <>
                {isEditing ? <Save className="mr-2" /> : <Edit className="mr-2" />} {isEditing ? "Save" : "Edit"}
              </>
            )}
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default EditUserProfile;
