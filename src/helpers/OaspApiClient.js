import superagent from 'superagent';

const methods = ['get', 'post', 'put', 'patch', 'del'];
// const OASP_REST_BASE_URL = 'http://localhost:8081/oasp4j-sample-server/services/rest';
const OASP_REST_BASE_URL = 'http://oasp-ci.cloudapp.net/oasp4j-sample/services/rest';

function baseOaspUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  return OASP_REST_BASE_URL + adjustedPath;
}

/*
 * This silly underscore is here to avoid a mysterious "ReferenceError: ApiClient is not defined" error.
 * See Issue #14. https://github.com/erikras/react-redux-universal-hot-example/issues/14
 *
 * Remove it at your own risk.
 */
class _OaspApiClient {
  constructor(req) {
    methods.forEach((method) =>
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](baseOaspUrl(path));

        if (params) {
          request.query(params);
        }

        if (__SERVER__ && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }

        if (data) {
          request.send(data);
        }

        request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body));
      }));
  }
}

const OaspApiClient = _OaspApiClient;

export default OaspApiClient;
