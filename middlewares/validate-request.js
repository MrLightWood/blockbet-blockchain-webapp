module.exports = validateRequest;

function validateRequest(req, next, schema) {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  let { error, value } = schema.validate(req.body, options);
  let { error2, value2 } = schema.validate(req.params, options);

  if (error && error2) {  
    next(`Validation error: ${error.details.map((x) => x.message).join(", ")}`);
  } else if(value){
    req.body = value;
    next();
  } else {
    req.params = value2;
    next();
  }
}
