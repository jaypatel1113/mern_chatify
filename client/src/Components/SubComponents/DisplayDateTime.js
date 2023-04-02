import React from 'react';
import moment from 'moment';

moment.relativeTimeThreshold('ss', 60);     //60sec=1min
moment.relativeTimeThreshold('m', 60);      //60min=1hr
moment.relativeTimeThreshold('h', 24);      //24hr=1day
moment.relativeTimeThreshold('d', 30);      //30days=1month
// moment.relativeTimeThreshold('w', 4);    //4week=1month
moment.relativeTimeThreshold('M', 12);      //12month=1yr

moment.updateLocale('en', {
    relativeTime : {
        s: function (number) {
            return number + ' seconds';
        },
        m: function (number) {
            return number + ' minute';
        },
        h: function (number) {
            return number + ' hour';
        },
        d: function (number) {
            return number + ' day';
        },
        w: function (number) {
            return number + ' week';
        },
        M: function (number) {
            return number + ' month';
        },
        y: function (number) {
            return number + ' year';
        },
    }
});

const DisplayDateTime = (props) => {
    
    return (
        <>
            {
                props.fromNow ? <>{moment(props?.time).fromNow()}</> : <>{moment(props?.time).format("hh:mm A")}</>
            }
        </>
    )
}

export default DisplayDateTime;