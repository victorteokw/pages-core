import map from 'lodash/map';
import find from 'lodash/find';
import assign from 'lodash/assign';
import cloneDeep from 'lodash/cloneDeep';

function joinPath(path) {
  return path.join('.');
}

function getPage(root, path) {
  let retval = root;
  map(path, (key) => {
    if (!retval.props.children || (retval.props.children.length === 0)) {
      throw `No child page descriptors at path '${joinPath(path)}'.`;
    }
    retval = find(retval.props.children, (p) => p.key === key);
    if (!retval) throw `No child page descriptor with key '${key}' at path '${joinPath(path)}'.`;
  });
  return retval;
}

export function getPageProps(root, path) {
  return getPage(root, path).props;
}

function _setPageProps(root, path, props, replace) {
  root = cloneDeep(root);
  let childPage = getPage(root, path);
  childPage.props = replace ? props : assign({}, childPage.props, props);
  return root;
}

export function setPageProps(root, path, props) {
  return _setPageProps(root, path, props, false);
}

export function replacePageProps(root, path, props) {
  return _setPageProps(root, path, props, true);
}

export function transformPageProps(root, path, transformer) {
  return replacePageProps(root, path, transformer(getPageProps(root, path)));
}
