import React, { Component } from "react";
import { dashboard_columns } from "../shared_components/fields";
import InitialLayout from "../shared_components/layout";

class ProductDashboard extends Component {

    render() {
        return (
            <>
                <InitialLayout
                    module="products"
                    operarionsRequired={true}
                    columns={dashboard_columns}
                    history={this.props.history}
                />
            </>
        );
    }
}

export default ProductDashboard;