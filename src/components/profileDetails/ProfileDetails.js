import React, { useRef, useState } from "react";

import "./ProfileDetails.css";
import ShowModal from "../UI/showModal";

const ProfileDetails = (props) => {
  const fullNameRef = useRef();
  const profilePhotoRef = useRef();
  const [isSending, setIsSending] = useState(false);

  const handleUpdateClick = async () => {
    try {
      setIsSending(true);
      const fullName = fullNameRef.current.value;
      const profilePhotoUrl = profilePhotoRef.current.value;
      const idToken = localStorage.getItem("token");
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC8IykqejjI79ePKYsCrYciX6Vs8G6nySI`,
        {
          method: "POST",
          body: JSON.stringify({
            idToken,
            displayName: fullName,
            photoUrl: profilePhotoUrl,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error(`Profile update failed`);
      }
      alert(`Successfully updated Your Profile`);
      const data = await res.json();
      // console.log('successfully updated profile data', data);
      props.sendProfiledata(data.displayName, data.photoUrl);
      props.closeModal();
    } catch (err) {
      alert(err.message);
      console.log(err);
    }
    setIsSending(false);
  };

  return (
    <ShowModal onClose={props.closeModal}>
      <div className="modal-header">
        <span className="close" onClick={props.closeModal}>
          Cancel
        </span>
        <h2>Profile Details</h2>
      </div>
      <div className="modal-body">
        <div>
          <label>Full Name:</label>
          <input type="text" ref={fullNameRef} />
        </div>
        <div>
          <label>Profile Photo Url:</label>
          <input type="url" ref={profilePhotoRef} />
        </div>
      </div>
      <div className="modal-footer">
        {isSending ? (
          <p>Updating.....</p>
        ) : (
          [
            <button onClick={handleUpdateClick}>Update</button>,
            <button onClick={props.closeModal}>Cancel</button>,
          ]
        )}
      </div>
    </ShowModal>
  );
};

export default ProfileDetails;
