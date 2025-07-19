import React, { Component } from "react";
import { pricing_optimization_columns } from "../shared_components/fields";
import InitialLayout from "../shared_components/layout";

class PricingDashboard extends Component {

    render() {
        return (
            <>
                <InitialLayout
                    module="pricing"
                    columns={pricing_optimization_columns}
                    history={this.props.history}
                />
            </>
        );
    }
}

export default PricingDashboard;