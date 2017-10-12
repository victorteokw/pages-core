import {setPageProps, replacePageProps} from './src';
import assert from 'assert';
import cloneDeep from 'lodash/cloneDeep';
import find from 'lodash/find';

suite('pages-core', function() {
  let root = {
    key: 'column',
    page: 'ColumnPage',
    props: {
      children: [
        {
          key: 'camera',
          page: 'CameraPage',
          props: {
            flash: true,
            HDR: false,
            aperture: 1.8,
            shutterSpeed: 0.01,
            ISO: 200
          }
        },
        {
          key: 'photos',
          page: 'PhotosListPage',
          props: {
            showVideos: true,
            showPhotos: true,
            showEditButton: false,
            children: [
              {
                key: 'preview0026',
                page: 'PhotoPreviewPage',
                props: {
                  fileName: 'image0026.jpg',
                  scale: 1.7,
                  offset: {
                    x: 0.2,
                    y: 0.5
                  }
                }
              },
              {
                key: 'editing0028',
                page: 'PhotoEditorPage',
                props: {
                  children: [
                    {
                      key: 'editingTools0028',
                      page: 'EditingToolsPage',
                      props: {
                        disabledTools: ['eraser']
                      }
                    },
                    {
                      key: 'historyTracking',
                      page: 'HistoryTrackingPage',
                      props: {}
                    }
                  ]
                }
              }
            ]
          }
        },
        {
          key: 'printService',
          page: 'PrintServicePage',
          props: {
            userId: 12605,
            userCity: 'Los Angeles',
            available: true
          }
        }
      ]
    }
  };
  test('Throw error if no page descriptor with the key at the path for setPageProps', function() {
    assert.throws(() => {
      setPageProps(root, ['photos', 'preview0029'], {scale: 1.5});
    }, /No child page descriptor with key 'preview0029' at path 'photos\.preview0029'\./);
  });
  test('Throw error if no page descriptor with the key at the path for replacePageProps', function() {
    assert.throws(() => {
      replacePageProps(root, ['photos', 'preview0029'], {scale: 1.5});
    }, /No child page descriptor with key 'preview0029' at path 'photos\.preview0029'\./);
  });
  test('Throw error if no page descriptors at the path for setPageProps', function() {
    assert.throws(() => {
      setPageProps(root, ['photos', 'preview0026', 'editing'], {notTrue: true});
    }, /No child page descriptors at path 'photos\.preview0026\.editing'\./);
  });
  test('Throw error if no page descriptors at the path for replacePageProps', function() {
    assert.throws(() => {
      replacePageProps(root, ['photos', 'preview0026', 'editing'], {notTrue: true});
    }, /No child page descriptors at path 'photos\.preview0026\.editing'\./);
  });
  test('setPageProps sets page props at root path', function() {
    let wantedResult = cloneDeep(root);
    wantedResult.props.expandColumn = true;
    assert.deepEqual(setPageProps(root, [], {expandColumn: true}), wantedResult);
  });
  test('setPageProps sets page props at deep path', function() {
    let wantedResult = cloneDeep(root);
    find(find(find(wantedResult.props.children, (c) => c.key === 'photos').props.children, (c) => c.key === 'editing0028').props.children, c => c.key === 'editingTools0028').props.block = true;
    assert.deepEqual(setPageProps(root, ['photos', 'editing0028', 'editingTools0028'], {block: true}), wantedResult);
  });
  test('replacePageProps replaces page props at root path', function() {
    let wantedResult = cloneDeep(root);
    wantedResult.props = {
      expandColumn: false,
      children: [
        {
          key: 'welcome',
          page: 'WelcomePage',
          props: {}
        }
      ]
    };
    assert.deepEqual(setPageProps(root, [], wantedResult.props), wantedResult);
  });
  test('replacePageProps replaces page props at deep path', function() {
    let wantedResult = cloneDeep(root);
    find(find(find(wantedResult.props.children, (c) => c.key === 'photos').props.children, (c) => c.key === 'editing0028').props.children, (c) => c.key === 'editingTools0028').props = {block: true};
    assert.deepEqual(replacePageProps(root, ['photos', 'editing0028', 'editingTools0028'], {block: true}), wantedResult);
  });
});
