exports.internalServerErrorResponse = (res, msg, data) => {
    return res.status(500).json({
        status:501,
        msg: msg,
        data: data
    })
}
exports.internalServerErrorResponseInApi = (res, msg, data) => {
    return res.status(400).json({
        status: 400,
        msg: msg,
        data: data
    })
}
exports.createdSuccessfully = (res, msg,data,token) => {
    return res.status(201).json({
        status: 201,
        msg: msg,
        data:{
            name: data.userName,
            email: data.email,
            accesstoken: token
        },
        
    })
}
exports.errorResponse = (res, msg) => {
    return res.status(400).json({
        status: 400,
        msg: msg
    })
}
exports.errorResponseWithData = (res, msg, data) => {
    return res.status(400).json({
        status: 400,
        msg: msg,
        data: data
    })
}

exports.updatedSuccessfully = (res, msg, data, pageStatus) => {
    return res.status(200).json({
        status: 200,
        msg: msg,
        data: data,
        pageStatus: pageStatus
    })
}

exports.emailSentSuccessfully = (res, msg) => {
    return res.status(200).json({
        status: 200,
        msg: msg
    })
}

exports.userDetails = (res, msg, data) => {
    return res.status(200).json({
        status: 200,
        msg: msg,
        data: data
    })
}
