import React from 'react';
import { message, Tooltip, Button } from 'antd';
import AuthenticationApi from '../services/Api/authenticationApi';

const showRange = (next, page_number, page, module_name, page_count) => (total, range) => {
    let start_range = range[0]
    let end_range = range[1]
    let temp_total = total

    if (page_number !== null) {
        total = "total"

        if (page === null || page === undefined) {

            page = 1
            start_range = page_count * (page_number[page] - 1) + 1
            end_range = page_count * page_number[page]
        }
        else {
            if (page === 1)
                start_range = page_count * (page_number[page] - 1) + 1

            start_range = page_count * (page_number[page] - 1) + 1
            end_range = page_count * page_number[page]
        }

        let compare_total = page_count * page + 1
        if (next === null) {
            if ((temp_total < compare_total && page === 1) || (temp_total < compare_total && page === 2) || (temp_total < compare_total && page === 3)) {
                end_range = start_range + range[1] - range[0]
                total = end_range
            }
        }
    }
    else {
        if (next !== null)
            total = "total"
    }

    return <span className="header">{`Showing ${start_range}-${end_range} of ${total} ${module_name}`}</span>
}

const showRangeFallback = (showing, module_name) => {
    const start_range = showing.from || 1;
    const end_range = showing.to || 0;
    const total_text = end_range ? `${start_range}-${end_range}` : "many";

    return (
        <span className="header">{`Showing ${total_text} ${module_name}`}</span>
    );
};

const invalidateUser = (e, history) => {
    e.preventDefault();
    AuthenticationApi.invalidate_user().then((response) => {
      if (response.status)
        history.push(response.pushback_to);
    }).catch(e => history.push("/"))
}

const routeToError = (history, error = { status: 500 }, msg = false, description = '') => {
    try {
        if (history !== undefined || null) {
            switch (error.status) {
                case 400: msg ? message.warning("Unable to perform requested operation") : (description ? message.info(error.data.error_desc) : message.warning(error.data)); break;
                case 403: msg ? message.info("You are not allowed to access this feature") : history.push("/error/403/"); break;
                case 500: msg ? message.error("Something went wrong") : (description ? message.info(error.data.error_desc) : history.push("/error/500/")); break;
                case 404: history.push("/error/404"); break;
                case 510: message.info(description); break;
                case "noPermissions": history.push("/error/no-permissions/"); break;
                default: history.push("/error/404");
            }
        }
    } catch (e) {
        return null;
    }
}

const itemRender = (previous_cursor, next_cursor, onCursorChange, pages = null) => (current, type, originalElement) => {
    if (type === 'prev' && (previous_cursor !== undefined && previous_cursor !== null)) {
        return (
            <Tooltip title="Skip to previous page">
                <Button shape="circle" style={{ marginRight: 10, bottom: 2.4, border: 0 }} icon="arrow-left" onClick={(e) => {
                    e.preventDefault();
                    onCursorChange(previous_cursor);
                }} />
            </Tooltip>
        )
    }
    if (type === 'next' && (next_cursor !== undefined && next_cursor !== null)) {
        return (
            <Tooltip title="Skip to next page">
                <Button shape="circle" style={{ marginLeft: 10, bottom: 2.4, border: 0 }} icon="arrow-right" onClick={(e) => {
                    e.preventDefault();
                    onCursorChange(next_cursor);
                }} />
            </Tooltip>
        )
    }
    if (type === 'page' && pages !== null)
        return <a>{pages[current]}</a>

    return originalElement;
}

export { showRange, showRangeFallback, invalidateUser, routeToError, itemRender }