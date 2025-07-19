import { Typography } from "antd";
const { Text } = Typography;

const dashboard_columns = [
    {
        title: 'Product Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Cost Price',
        dataIndex: 'cost_price',
        key: 'cost_price',
        render: (text) => `$ ${text}`,
    },
    {
        title: 'Selling Price',
        dataIndex: 'selling_price',
        key: 'selling_price',
        render: (text) => `$ ${text}`,
    },
    {
        title: 'Stock Available',
        dataIndex: 'stock_available',
        key: 'stock_available',
    },
    {
        title: 'Units Sold',
        dataIndex: 'units_sold',
        key: 'units_sold',
    },
    {
        title: 'Calculated Demand Forecast',
        dataIndex: 'demand_forecast',
        key: 'demand_forecast',
        render: (text) => <Text style={{ color: "#66DCB9" }}>{text === undefined ? "----" : `${text}`}</Text>
    },
];

const pricing_optimization_columns = [
    {
        title: 'Product Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Product Category',
        dataIndex: 'category',
        key: 'category',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Cost Price',
        dataIndex: 'cost_price',
        key: 'cost_price',
        render: (text) => `$ ${text}`,
    },
    {
        title: 'Selling Price',
        dataIndex: 'selling_price',
        key: 'selling_price',
        render: (text) => `$ ${text}`,
    },
    {
        title: 'Optimized Price',
        dataIndex: 'optimized_price',
        key: 'optimized_price',
        render: (text) => <Text style={{ color: "#66DCB9" }}>{text === null ? "----" : `$ ${text}`}</Text>,
    },
];

const demand_forecast_columns = [
    {
        title: "Product Name",
        dataIndex: "name"
    },
    {
        title: "Product Category",
        dataIndex: "category"
    },
    {
        title: "Cost Price",
        dataIndex: "cost_price"
    },
    {
        title: "Selling Price",
        dataIndex: "selling_price"
    },
    {
        title: "Available Stock",
        dataIndex: "stock_available"
    },
    {
        title: "Units Sold",
        dataIndex: "units_sold"
    },
    {
        title: "Calculated Demand Forecast",
        dataIndex: "demand_forecast",
        className: "demand-forecast-column"
    },
]

export { dashboard_columns, pricing_optimization_columns, demand_forecast_columns };