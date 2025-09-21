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
      message: 'Missing valid query parameter set to true',
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
      message: 'Missing loggedIn query parameter set to yes',
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
    message: 'Internal server error. Something went wrong.',
    id: 'Internal',
  };

  const responseString = JSON.stringify(responseJSON);

  response.writeHead(500, { 'Content-Type': 'application/json' });
  response.write(responseString);
  response.end();
};

const getNotImplementedJSON = (request, response) => {
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
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