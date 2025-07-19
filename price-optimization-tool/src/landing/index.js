import React, { Component } from "react";
import BCGLogo from "../assets/logo.png";
import DashboardLogo from "../assets/dashboard.png";
import PricingLogo from "../assets/pricing.png";
import { Card, Row, Col, Typography } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

class Landing extends Component {
    state = {
        isLoggedIn: !!localStorage.getItem("token"), // Check if the user is logged in
    };

    Header = () => (
        <div style={{ marginTop: "3rem", marginBottom: "2rem" }}>
            <img
                src={BCGLogo}
                alt="BCG X Logo"
                style={{ width: "200px", marginBottom: "1rem" }}
            />
            <Title level={8} style={{ color: "white" }}>
                Price Optimization Tool
            </Title>
            <Text style={{ color: "gray" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
        </div>
    );

    RenderChoiceCards = (props) => (
        <Col xs={24} sm={12} lg={8}>
            <Card
                hoverable
                style={{ borderRadius: "12px" }}
                onClick={() => this.props.history.push(props.path)}
            >
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", gap: "1rem" }}>
                        <img
                            src={props.img}
                            alt={`${props.header} Icon`}
                            style={{ width: "145px", height: "145px" }}
                        />
                        <h1>{props.header}</h1>
                    </div>
                    <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Text>
                    <ArrowRightOutlined style={{ marginTop: "20px", fontWeight: "bolder", fontSize: "28px" }} />
                </div>
            </Card>
        </Col>
    );

    render() {
        return (
            <div style={{ textAlign: "center" }}>
                {/* Logo and Heading */}
                <this.Header />

                <Row gutter={24} justify="center">
                    <this.RenderChoiceCards
                        img={DashboardLogo}
                        header="Create and Manage Product"
                        path="dashboard"
                    />
                    <this.RenderChoiceCards
                        img={PricingLogo}
                        header="Pricing Optimization"
                        path="pricing-optimization"
                    />
                </Row>
            </div>
        );
    }
}

export default Landing;
