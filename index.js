'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setPageProps = setPageProps;
exports.replacePageProps = replacePageProps;

var _map = require('lodash/map');

var _map2 = _interopRequireDefault(_map);

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

var _assign = require('lodash/assign');

var _assign2 = _interopRequireDefault(_assign);

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function joinPath(path) {
  return path.join('.');
}

function getChildPage(root, path) {
  var retval = root;
  (0, _map2.default)(path, function (key) {
    if (!retval.props.childPages || retval.props.childPages.length === 0) {
      throw 'No child page descriptors at path \'' + joinPath(path) + '\'.';
    }
    retval = (0, _find2.default)(retval.props.childPages, function (p) {
      return p.key === key;
    });
    if (!retval) throw 'No child page descriptor with key \'' + key + '\' at path \'' + joinPath(path) + '\'.';
  });
  return retval;
}

function _setPageProps(root, path, props, replace) {
  root = (0, _cloneDeep2.default)(root);
  var childPage = getChildPage(root, path);
  childPage.props = replace ? props : (0, _assign2.default)({}, childPage.props, props);
  return root;
}

function setPageProps(root, path, props) {
  return _setPageProps(root, path, props, false);
}

function replacePageProps(root, path, props) {
  return _setPageProps(root, path, props, true);
}
