import React, { Component } from "react";
import { Skeleton, Spin, message, Flex, Button, Select, Switch, Input, Form, Modal, Typography, Divider, InputNumber, Tooltip, Space, Popconfirm } from "antd";
import DefaultTable from "../shared_components/table";
import DashboardAPI from '../services/Api/dashboardApi';
import { demand_forecast_columns } from "./fields"; 
import { routeToError, itemRender, showRange } from '../shared_components/utility';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartTooltip, Legend } from "recharts";
import { FilterFilled, SearchOutlined, PlusCircleOutlined, LineChartOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./style.css";

const { Option } = Select;
const { Text } = Typography;

class InitialLayout extends Component {

    _isMounted = false;
    columns = [];
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isModalOpen: false,
            isForecastModalOpen: false,
            isForecastSwitchEnabled: true,
            currentProduct: null,
            pagination: {
                current: 1,
                next: 0,
                previous: 0,
                total: 0,
                pageSize: 20,
                defaultPageSize: 20,
                defaultCurrent: 1,
                page_number: {}
            },
            category: "Stationery",
            searchTerm: "",
            selectedRowKeys: [],
            products: [],
            categories: [],
        }
    }

    componentDidMount() {
        this.generateCols();
        this.getProducts()
    }

    generateCols = () => {
        this.columns = [...this.props.columns];
        if (this.props.module === "products") {
            this.columns.push({
                title: "Action",
                render: (_, record) => (
                    <Space>
                        <Tooltip title="View">
                            <Button type="text" icon={<EyeOutlined />} />
                        </Tooltip>
                        <Tooltip title="Edit">
                            <Button
                                type="text"
                                icon={<EditOutlined />}
                                onClick={() => this.handleEdit(record.id)}
                            />
                        </Tooltip>
                        <Tooltip title="Delete">
                            <Popconfirm
                                title="Delete the product"
                                description="Are you sure to delete this product?"
                                onConfirm={() => this.deleteProduct(record.id)}
                                onCancel={() => message.error("Operation cancelled")}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button
                                    type="text"
                                    icon={<DeleteOutlined />}
                                    danger
                                />
                            </Popconfirm>
                        </Tooltip>
                    </Space>
                ),
            })
        }
        return this.columns
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleEdit = (record_id) => {
        const product = this.state.products.find(item => item.id === record_id);
        this.setState({
            isModalOpen: true,
            currentProduct: product,
        });
    }

    handleSearchChange = (e) => {
        this.setState({ searchTerm: e.target.value });
    };

    handleCategoryChange = (value) => {
        this.setState({ category: value });
    };

    handleSwitchChange = (checked) => {
        this.setState({ isForecastSwitchEnabled: checked });
    };

    openModal = () => {
        this.setState({ isModalOpen: true });
    };

    closeModal = () => {
        this.setState({ isModalOpen: false, currentProduct: null });
    };

    openForecastModal = () => {
        this.setState({ isForecastModalOpen: true });
    };
    
    closeForecastModal = () => {
        this.setState({ isForecastModalOpen: false });
    };

    onSelectChange = (newSelectedRowKeys) => {
        this.setState({ selectedRowKeys: newSelectedRowKeys });
    };

    handleChange = (page) => {
        this.setState((prevState) => ({
            pagination: {
                ...prevState.pagination,
                current: page,
                showTotal: showRange(this.state.pagination.next, this.state.pagination.page_number, page, this.state.module_name, this.state.pagination.pageSize)
            }
        }))
    }

    getProducts = (date = null, page = this.state.pagination.current) => {
        let queryData = {
            page: page,
            page_size: this.state.pagination.pageSize,
            category: this.state.category,
            search: this.state.searchTerm,
        }
        DashboardAPI.get_all_products(queryData).then((response) => {
            if (response.status) {
                this.setState((prevState) => ({
                    products: response.products,
                    categories: response.distinct_categories,
                    isLoading: false,
                }));
            }
            else if (response.status === "400" || response.status === "500") {
                this.setState({
                    isLoading: false,
                })
                message.error("Ooops! Something went wrong...")
            }
        }).catch((e) => {
            this.setState({ isLoading: false }, () => {
                routeToError(this.props.history, e, false, "Something went wrong");
            });
        });
    }

    handleAddProduct = (values) => {
        DashboardAPI.create_product(values).then((response) => {
            if (response.status) {
                message.success("Product created successfully");
                this.getProducts();
            }
        }).catch((e) => {
            this.setState({ isLoading: false }, () => {
                routeToError(this.props.history, e, false, "Something went wrong");
            });
        });
        this.closeModal();
    }

    handleEditProduct = (editedValues) => {
        console.log(editedValues, this.state.currentProduct)
        let queryData = {
            ...editedValues,
            "product_id": this.state.currentProduct.id,
        }
        DashboardAPI.update_product(queryData).then((response) => {
            if (response.status) {
                this.setState({
                    currentProduct: null,
                })
                message.success(response.message);
                this.getProducts();
            }
        }).catch((e) => {
            this.setState({ isLoading: false }, () => {
                routeToError(this.props.history, e, false, "Something went wrong");
            });
        });
        this.closeModal();
    }

    deleteProduct = (record_id) => {
        let queryData = {
            product_id: record_id,
        }
        DashboardAPI.delete_product(queryData).then((response) => {
            if (response.status)
                message.success(response.message);
            else message.error(response.error);
            this.getProducts();
        }).catch((e) => {
            this.setState({ isLoading: false }, () => {
                routeToError(this.props.history, e, false, "Something went wrong");
            });
        });
    }

    RenderProductsTable = () => {
        const { selectedRowKeys, isLoading, products, pagination } = this.state;
        const rowSelection = this.props.module === "products" ? {
            selectedRowKeys,
            onChange: this.onSelectChange,
        } : false;
        return (
            <div style={{ padding: "0px 20px", }}>
                <Flex gap="middle" vertical>
                    <Spin spinning={isLoading} size="large" tip="Loading products">
                        <Skeleton active loading={isLoading} paragraph={{ rows: 10 }} >
                            <DefaultTable
                                // component={this.props.location.pathname}
                                recordKey={record => record.id}
                                columns={this.columns}
                                source={products}
                                pagination={pagination}
                                rowSelection={rowSelection}
                                bordered={true}
                            />
                        </Skeleton>
                    </Spin>
                </Flex>
            </div>
        )
    }

    RenderAddNewProduct = () => (
        <Modal
            className="custom-modal"
            title={<><h3 style={{ color: "#66DCB9" }}>{this.state.currentProduct ? "Edit" : "Add New"} Product</h3><Divider style={{ color: "white", fontWeight: "bolder" }} /></>}
            open={this.state.isModalOpen}
            cancelText="Cancel"
            okText="Add"
            onCancel={this.closeModal}
            footer={null}
            style={{ backgroundColor: "#00000" }}
        >
            <Form
                layout="vertical"
                onFinish={this.state.currentProduct ? this.handleEditProduct : this.handleAddProduct}
                initialValues={this.state.currentProduct || {}}
            >
                <Form.Item
                    label="Product Name"
                    name="name"
                    rules={[{ required: true, message: "Please enter the product name!" }]}
                >
                    <Input defaultValue={this.state.currentProduct?.name} placeholder="Enter Product Name" />
                </Form.Item>
                <Form.Item
                    label="Product Category"
                    name="category"
                    rules={[{ required: true, message: "Please select a category!" }]}
                >
                    <Input
                        defaultValue={this.state.currentProduct?.category}
                        placeholder="Enter Product Category"
                    />
                </Form.Item>
                <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "row", }}>
                    <Form.Item
                        label="Cost Price"
                        name="cost_price"
                        rules={[{ required: true, message: "Please enter Cost Price of the Product!" }]}
                    >
                        <InputNumber
                            defaultValue={this.state.currentProduct?.cost_price}
                            style={{ width: "200px" }}
                            placeholder="xx,xxx.xx"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Selling Price"
                        name="selling_price"
                        rules={[{ required: true, message: "Please enter Selling Price of the Product!" }]}
                    >
                        <InputNumber
                            defaultValue={this.state.currentProduct?.selling_price}
                            style={{ width: "200px" }}
                            placeholder="xx,xxx.xx"
                        />
                    </Form.Item>
                </div>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: "Please enter relevant description of the Product!" }]}
                >
                    <Input.TextArea
                        defaultValue={this.state.currentProduct?.description}
                        placeholder="Enter Description"
                        rows={3}
                    />
                </Form.Item>
                <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "row", }}>
                    <Form.Item
                        label="Available Stock"
                        name="stock_available"
                        rules={[{ required: true, message: "Please enter Available Stock units of the Product!" }]}
                    >
                        <InputNumber
                            defaultValue={this.state.currentProduct?.stock_available}
                            style={{ width: "200px" }}
                            placeholder="xx,xxx.xx"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Units Sold"
                        name="units_sold"
                        rules={[{ required: true, message: "Please enter Units of the Product sold!" }]}
                    >
                        <InputNumber
                            defaultValue={this.state.currentProduct?.units_sold}
                            style={{ width: "200px" }}
                            placeholder="xx,xxx.xx"
                        />
                    </Form.Item>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button style={{ marginRight: "10px", backgroundColor: "transparent", color: "white", borderColor: "#66DCB9" }} onClick={this.closeModal}>
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit" style={{ backgroundColor: "#66DCB9" }}>
                        Add
                    </Button>
                </div>
            </Form>
        </Modal>
    )

    RenderDemandForecast = () => {
        let selectedProducts = this.state.products.filter(product => this.state.selectedRowKeys.includes(product.id))
        return (
            <Modal
                className="custom-modal"
                title="Demand Forecast"
                open={this.state.isForecastModalOpen}
                onCancel={this.closeForecastModal}
                footer={null}
                width={1000}
                style={{ backgroundColor: "#111", color: "#fff" }}
            >
                {selectedProducts.length > 0 ? (
                    <LineChart
                        width={900}
                        height={400}
                        data={selectedProducts}
                        margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="selling_price"
                            label={{
                                value: "Selling Price",
                                position: "insideBottom",
                                dy: 10,
                                fill: "#fff",
                            }}
                            tick={{ fill: "#fff" }}
                        />
                        <YAxis
                            label={{
                            value: "Demand",
                            angle: -90,
                            position: "insideLeft",
                            dx: -10,
                            fill: "#fff",
                            }}
                            tick={{ fill: "#fff" }}
                        />
                        <Tooltip contentStyle={{ backgroundColor: "#313131", color: "#fff" }} />
                        <Legend verticalAlign="top" align="right" wrapperStyle={{ color: "#fff" }} />
                        <Line type="monotone" dataKey="selling_price" stroke="#82ca9d" name="Selling Price" strokeWidth={2} />
                        <Line type="monotone" dataKey="demand_forecast" stroke="#8884d8" name="Demand Forecast" strokeWidth={2} />
                    </LineChart>
                ) : (
                    <p style={{ color: "white" }}>No data available for plotting.</p>
                )}
                <DefaultTable
                    columns={demand_forecast_columns}
                    source={selectedProducts}
                    pagination={false}
                    style={{ marginTop: "20px", backgroundColor: "#fff", color: "#000" }}
                />
            </Modal>
        )
    }

    RenderHeader = () => (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#2D2D2D", padding: "0px 40px" }}>
            <h2 style={{ color: "#00FFB9" }}>Price Optimization Tool</h2>
            <span>Welcome, <Text strong={6} style={{ color: "#00E0B5" }}>{localStorage.getItem("username")}</Text></span>
        </div>
    )

    RenderOperations = () => (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", marginBottom: "20px", padding: "0px 30px", backgroundColor: "#000" }}>
            <Button type="text" style={{ color: "#00E0B5" }} onClick={() => this.props.history.push("/")}>
                &lt;&lt; Back
            </Button>
            <Divider type="vertical" style={{ backgroundColor: "white" }} />
            <h4>Create and Manage Product</h4>
            <span>
                <Switch
                    checked={this.state.isForecastSwitchEnabled}
                    onChange={this.handleSwitchChange}
                    style={{ marginLeft: "20px", marginRight: "5px", border: `0.5px solid ${this.state.isForecastSwitchEnabled ? 'white': "#66DCB9"}` }}
                /> With Demand Forecast
            </span>
            <Divider type="vertical" style={{ backgroundColor: "white" }} />
            <Input
                placeholder="Search"
                prefix={<SearchOutlined style={{ color: "#00E0B5" }} />}
                style={{ width: "300px", backgroundColor: "transparent", borderColor: "#00E0B5", color: "white" }}
                value={this.state.searchTerm}
                onChange={this.handleSearchChange}
            />
            <div>
                Category: <Select
                    defaultValue={this.state.category}
                    style={{ width: "200px", marginRight: "10px", backgroundColor: "#172D29", borderColor: "#00E0B5" }}
                    onChange={this.handleCategoryChange}
                >
                    {Object.entries(this.state.categories).map(([key, option]) => {
                        return(
                            <Option key={key} value={option}>
                                {option}
                            </Option>
                            ) 
                        }
                    )}
                </Select>
                <Button
                    type="primary"
                    onClick={() => this.getProducts()}
                    style={{ marginRight: "10px", borderColor: "#00E0B5", backgroundColor: "transparent" }}
                >
                    <FilterFilled /> Filter
                </Button>
                {this.props.operarionsRequired && 
                    <>
                        <Button
                            type="default"
                            onClick={this.openModal}
                            style={{ marginRight: "10px", borderColor: "transparent", borderRadius: "0px", backgroundColor: "#00E0B5", fontWeight: "bold" }}
                        >
                            <PlusCircleOutlined /> Add New Products
                        </Button>
                        <Button
                            disabled={!this.state.isForecastSwitchEnabled}
                            type="primary"
                            onClick={this.openForecastModal}
                            style={{ borderRadius: "0px", backgroundColor: "#00E0B5", fontWeight: "bold", color: "black" }}
                        >
                            <LineChartOutlined /> Demand Forecast
                        </Button>
                    </>
                }
            </div>
        </div>
    )

    render() {
        return (
            <>
                <this.RenderHeader />
                <this.RenderOperations />
                <this.RenderProductsTable />
                <this.RenderAddNewProduct />
                <this.RenderDemandForecast />
            </>
        );
    }
}

InitialLayout.defaultProps = {
    operarionsRequired: false,
    columns: []
};

export default InitialLayout;