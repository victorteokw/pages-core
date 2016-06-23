import map from 'lodash/map';
import find from 'lodash/find';
import assign from 'lodash/assign';
import cloneDeep from 'lodash/cloneDeep';

function joinPath(path) {
  return path.join('.');
}

function getChildPage(root, path) {
  let retval = root;
  map(path, (key) => {
    if (!retval.props.childPages || (retval.props.childPages.length === 0)) {
      throw `No child page descriptors at path '${joinPath(path)}'.`;
    }
    retval = find(retval.props.childPages, (p) => p.key === key);
    if (!retval) throw `No child page descriptor with key '${key}' at path '${joinPath(path)}'.`;
  });
  return retval;
}

function _setPageProps(root, path, props, replace) {
  root = cloneDeep(root);
  let childPage = getChildPage(root, path);
  childPage.props = replace ? props : assign({}, childPage.props, props);
  return root;
}

export function setPageProps(root, path, props) {
  return _setPageProps(root, path, props, false);
}

export function replacePageProps(root, path, props) {
  return _setPageProps(root, path, props, true);
}