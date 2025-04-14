import { useEffect, useState } from "react";
import { Stack, Paper, Typography, Container, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function UserLogin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ userName: "", password: "" });
    const [error, setError] = useState("");  //  Error state for failed login
    const [loading, setLoading] = useState(false); // Loading state

    useEffect(() => {
        sessionStorage.removeItem("isLoggedIn");
    },[])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLoginClick = async () => {
        setLoading(true);
        setError("");
        console.log("Form", formData);
        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const loginData = await response.json(); 
            console.log("Login Successful:", loginData);

            if (loginData.login) {
                sessionStorage.setItem("isLoggedIn", "true");
                navigate(`/todo`);  
            }else{
                throw new Error(loginData.message);
            }
            
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const isFormValid = formData.userName.trim() !== "" && formData.password.trim() !== "";

    return (
        <Container maxWidth="sm">
            <Stack spacing={3} sx={{ height: "100vh", alignItems: "center", justifyContent: "center" }}>
                <Typography variant="h4">Todo App</Typography>

                <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, width: "100%", textAlign: "center" }}>
                    <Typography variant="h5" gutterBottom>User Login</Typography>

                    <Stack spacing={2}>
                        <TextField
                            label="User Name"
                            name="userName"
                            type="text"
                            value={formData.userName}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            fullWidth
                            required
                        />

                        {error && <Typography color="error">{error}</Typography>} {/*  Show error if login fails */}

                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={handleLoginClick} 
                            disabled={!isFormValid || loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </Button>
                    </Stack>
                </Paper>
            </Stack>
        </Container>
    );
}
