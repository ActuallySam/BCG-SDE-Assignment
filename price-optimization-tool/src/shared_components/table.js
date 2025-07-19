import React, { Component } from 'react';
import { Table, ConfigProvider } from 'antd';
import "./style.css";

class DefaultTable extends Component {

    renderCustomEmptyLabel = () => (
        <>
            <p>No data found</p>
        </>
    )

    render() {
        return (
            <ConfigProvider renderEmpty={this.renderCustomEmptyLabel}>
                <Table className='custom-table' style={this.props.style}
                    columns={this.props.columns} dataSource={this.props.source}
                    bordered={this.props.bordered} onChange={this.props.handleTableChange}
                    title={this.props.header} footer={this.props.footer}
                    pagination={this.props.isPaginationRequired ? this.props.pagination : false}
                    scroll={this.props.scroll}
                    onRow={this.props.onRow}
                    rowKey={this.props.recordKey}
                    loading={this.props.isTableLoading}
                    size={"small"}
                    rowSelection={this.props.rowSelection}
                />
            </ConfigProvider>
        )
    }
}

DefaultTable.defaultProps = {
    isPaginationRequired: true,
    style: {
        fontFamily: 'DM Sans',
        fontWeight: 500,
        backgroundColor: "#1f1f1f",
        borderColor: "#000",
        borderRadius: "0px"
    }
};

export default DefaultTable;