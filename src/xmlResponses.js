const getSuccessXML = (request, response) => {
  const responseXML = `
    <response>
      <message>This is a successful response</message>
    </response>
  `;

  response.writeHead(200, { 'Content-Type': 'text/xml' });
  response.write(responseXML);
  response.end();
};

const getBadRequestXML = (request, response) => {
  let responseXML = '';
  let status = 200;

  if (!request.query || request.query.valid !== 'true') {
    status = 400;
    responseXML = `
      <response>
        <message>Sorry, this request does not have valid parameters</message>
        <id>BadRequest</id>
      </response>
    `;
  } else {
    responseXML = `
      <response>
        <message>This request has the required parameters</message>
      </response>
    `;
  }

  response.writeHead(status, { 'Content-Type': 'text/xml' });
  response.write(responseXML);
  response.end();
};

const getUnauthorizedXML = (request, response) => {
  let responseXML = '';
  let status = 200;

  if (!request.query || request.query.loggedIn !== 'yes') {
    status = 401;
    responseXML = `
      <response>
        <message>You are not logged in</message>
        <id>Unauthorized</id>
      </response>
    `;
  } else {
    responseXML = `
      <response>
        <message>You have successfully logged in</message>
      </response>
    `;
  }

  response.writeHead(status, { 'Content-Type': 'text/xml' });
  response.write(responseXML);
  response.end();
};

const getForbiddenXML = (request, response) => {
  const responseXML = `
    <response>
      <message>You do not have access to this content</message>
      <id>Forbidden</id>
    </response>
  `;
  response.writeHead(403, { 'Content-Type': 'text/xml' });
  response.write(responseXML);
  response.end();
};

const getInternalXML = (request, response) => {
  const responseXML = `
    <response>
      <message>Internal server error occured</message>
      <id>Internal</id>
    </response>
  `;
  response.writeHead(500, { 'Content-Type': 'text/xml' });
  response.write(responseXML);
  response.end();
};

const getNotImplementedXML = (request, response) => {
  const responseXML = `
    <response>
      <message>This feature has not been implemented yet</message>
      <id>NotImplemented</id>
    </response>
  `;
  response.writeHead(501, { 'Content-Type': 'text/xml' });
  response.write(responseXML);
  response.end();
};

const getNotFoundXML = (request, response) => {
  const responseXML = `
    <response>
      <message>The page you are looking for was not found</message>
      <id>NotFound</id>
    </response>
  `;
  response.writeHead(404, { 'Content-Type': 'text/xml' });
  response.write(responseXML);
  response.end();
};


module.exports.getSuccessXML = getSuccessXML;
module.exports.getBadRequestXML = getBadRequestXML;
module.exports.getUnauthorizedXML = getUnauthorizedXML;
module.exports.getForbiddenXML = getForbiddenXML;
module.exports.getInternalXML = getInternalXML;
module.exports.getNotImplementedXML = getNotImplementedXML;
module.exports.getNotFoundXML = getNotFoundXML;