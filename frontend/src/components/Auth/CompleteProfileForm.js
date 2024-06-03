import { Button, Form } from "react-bootstrap"
import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../store/auth-context";


const CompleteProfileForm = (props) => {
    const authCtx = useContext(AuthContext);

    const [name, setName] = useState('');
    const [url, setUrl] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        const body = {
            fullName: name,
            url: url
        }
        const response = await axios.post("http://localhost:3000/complete-profile", body, { headers: { "Authorization": authCtx.token } });
        if (response.status === 201) {
            // console.log(response);
            alert("Profile Updated Successfully");
            props.onHide();
            authCtx.completeProfile();
        }
        else {
            console.log('not ok', response.status);
        }
    }

    return (
        <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control type="url" placeholder="Enter your photo url" value={url} onChange={(e) => setUrl(e.target.value)} />
            </Form.Group>
            <Button type="submit">Update Profile</Button>
        </Form>
    )
}

export default CompleteProfileForm;