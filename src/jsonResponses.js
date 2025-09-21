const getSuccessJSON = (request, response) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

  const responseString = JSON.stringify(responseJSON);

  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.write(responseString);
  response.end();
};

const getBadRequestJSON = (request, response) => {
  let responseJSON = {};
  let status = 200;

  //check if the query parameter is missing or not equal to true
  if (!request.query || request.query.valid !== 'true') {
    status = 400;
    responseJSON = {
      message: 'Sorry, this request does not have valid parameters',
      id: 'BadRequest',
    };
  } else {
    responseJSON = {
      message: 'This request has the required parameters',
    };
  }

  const responseString = JSON.stringify(responseJSON);

  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(responseString);
  response.end();
};

const getUnauthorizedJSON = (request, response) => {
  let responseJSON = {};
  let status = 200;

  if (!request.query || request.query.loggedIn !== 'yes') {
    status = 401;
    responseJSON = {
      message: 'You are not logged in',
      id: 'Unauthorized',
    };
  } else {
    responseJSON = {
      message: 'You have successfully logged in',
    };
  }

  const responseString = JSON.stringify(responseJSON);

  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(responseString);
  response.end();
};

const getForbiddenJSON = (request, response) => {
  const responseJSON = {
    message: 'You do not have access to this content',
    id: 'Forbidden',
  };

  const responseString = JSON.stringify(responseJSON);

  response.writeHead(403, { 'Content-Type': 'application/json' });
  response.write(responseString);
  response.end();
};

const getInternalJSON = (request, response) => {
  const responseJSON = {
    message: 'Internal server error occured',
    id: 'Internal',
  };

  const responseString = JSON.stringify(responseJSON);

  response.writeHead(500, { 'Content-Type': 'application/json' });
  response.write(responseString);
  response.end();
};

const getNotImplementedJSON = (request, response) => {
  const responseJSON = {
    message: 'This feature has not been implemented yet',
    id: 'NotImplemented',
  };

  const responseString = JSON.stringify(responseJSON);

  response.writeHead(501, { 'Content-Type': 'application/json' });
  response.write(responseString);
  response.end();
};

const getNotFoundJSON = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found',
    id: 'NotFound',
  };

  const responseString = JSON.stringify(responseJSON);

  response.writeHead(404, { 'Content-Type': 'application/json' });
  response.write(responseString);
  response.end();
};



module.exports.getSuccessJSON = getSuccessJSON;
module.exports.getBadRequestJSON = getBadRequestJSON;
module.exports.getUnauthorizedJSON = getUnauthorizedJSON;
module.exports.getForbiddenJSON = getForbiddenJSON;
module.exports.getInternalJSON = getInternalJSON;
module.exports.getNotImplementedJSON = getNotImplementedJSON;
module.exports.getNotFoundJSON = getNotFoundJSON;