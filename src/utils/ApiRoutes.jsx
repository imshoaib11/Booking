export default {
    SIGNUP: {
        path:'/user/signup',
        auth:false
    },
    LOGIN:{
        path:'/user/login',
        auth:false
    },
    SENDLINK:{
        path:'/user/sendlink',
        auth:false
    },
    VERIFYKEY:{
        path:'/user/verify',
        auth:false
    },
    RESET:{
        path:'/user/reset',
        auth:false
    },
    ALLUSERS:{
        path:'/user/users',
        auth:true
    },
    ROOMS:{
        path:'/room/rooms',
        auth:true
    },
    NEWROOMS:{
        path:'/room/createRooms',
        auth:true
    },
    ROOMBYID:{
        path:'/room',
        auth:true
    },
    BOOKINGS:{
        path:'/booking/bookings',
        auth:true
    },
    NEWBOOKING:{
        path:'/booking/createbookings',
        auth:true
    },
    USERBOOKINGS:{
        path:'/booking/userbookings',
        auth:true
    },
    CANCELBOOKINGS:{
        path:'/booking/cancelBooking',
        auth:true
    }
}
