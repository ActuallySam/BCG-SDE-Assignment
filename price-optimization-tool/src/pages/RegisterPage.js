import React, { Component } from "react";
import { Form, Input, Button, message, Select } from "antd";

const { Option } = Select;

class RegisterPage extends Component {

    state = {
        loading: false,
        role: "buyer"
    };

    handleRegister = async (values) => {
        console.log("Form values:", values);
        this.setState({ loading: true });
        try {
            // Mock API call
            const response = await fetch("http://localhost:8000/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (response.status) {
                const data = await response.json();
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", data.role); // Save role for access control
                message.success("Login successful!");
                this.props.history.push("/login"); // Redirect to dashboard or desired page
            } else {
                const errorData = await response.json();
                message.error(errorData.detail || "Login failed!");
            }
        } catch (error) {
            message.error("Something went wrong!");
        } finally {
            this.setState({ loading: false});
        }
    };

    handleRoleChange = (value) => {
        this.setState({ role: value });
    };

    render() {
        return (
            <div style={{ maxWidth: "400px", margin: "50px auto" }}>
                <h2>Register</h2>
                <Form layout="vertical" onFinish={this.handleRegister}>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: "Please enter your username!" }]}
                    >
                        <Input placeholder="Enter username" />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Please enter your email!" },
                            { type: "email", message: "Please enter a valid email!" },
                        ]}
                    >
                        <Input placeholder="Enter email" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "Please enter your password!" }]}
                    >
                        <Input.Password placeholder="Enter password" />
                    </Form.Item>
                    <Form.Item
                        label="Role"
                        name="role"
                        rules={[{ required: true, message: "Please select user role!" }]}
                    >
                        <Select
                            onChange={this.handleRoleChange}
                        >
                            <Option value="admin" />
                            <Option value="buyer" />
                            <Option value="supplier" />
                        </Select>
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form>
            </div>
        );
    }
}

export default RegisterPage;
