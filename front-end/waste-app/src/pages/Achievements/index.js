import React from "react";
import {FacebookShareCount} from 'react-share'

const Achievements =() => {
    return(
        <div>Achievements page
            <FacebookShareCount url={shareUrl} />
        </div>
    )
}
export default Achievements;