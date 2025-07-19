import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleLogin = async (values) => {
        setLoading(true);

        try {
            // Mock API call
            const response = await fetch("http://localhost:8000/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", data.role); // Save role for access control
                localStorage.setItem("username", data.username);
                message.success("Login successful!");
                history.push("/"); // Redirect to dashboard or desired page
            } else {
                const errorData = await response.json();
                message.error(errorData.detail || "Login failed!");
            }
        } catch (error) {
            message.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Form
                layout="vertical"
                onFinish={handleLogin}
                style={{ width: 300, background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)" }}
            >
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: "Please enter your username!" }]}
                >
                    <Input placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: "Please enter your password!" }]}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block>
                    Login
                </Button>
            </Form>
        </div>
    );
};

export default LoginPage;
