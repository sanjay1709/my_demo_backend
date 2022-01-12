export function validateRequest(userInput, schema) {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    const { error, value } = schema.validate(userInput, options);
    if (error) {
        const ErrorArray = error.details;
        const resArray = {};
        ErrorArray.forEach((errorMsg) => {
            const field = errorMsg.path[0];
            const message = errorMsg.message;
            delete errorMsg.type;
            delete errorMsg.context;
            delete errorMsg.path;
            delete errorMsg.message,
            resArray[field] = { message: message.replace(/["]+/g, '')};
        });
        const errorMsgs = {status: false, message: resArray, name: 'validation'};
        return errorMsgs;

    } else {
       return userInput = value;
    }
}
