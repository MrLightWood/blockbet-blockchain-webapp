module.exports = successHandler;

function successHandler(res, msg, data) {
    if(data === undefined) {
        return res.status(200).json({ status: "Success", message: msg});
    }
    return res.status(200).json({ status: "Success", message: msg, data: data});
}
