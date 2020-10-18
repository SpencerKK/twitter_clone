import React, { Children } from "react";

const RecentPostBlock = (props) => {
    return (
    <div className="recent-post-block">{props.children}</div>
    )
}

export default RecentPostBlock;