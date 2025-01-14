/*********************************************************************************
 * Component: MEMBER
 * Author: Henry Ng - 08/01/20
 * Display member of the members list
 ********************************************************************************/
import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import ModalDelete from './../../../common/Modal';
import { deleteWbs } from './../../../../actions/wbs';
import { getPopupById } from './../../../../actions/popupEditorAction';
import { WBS_DELETE_POPUP_ID } from './../../../../constants/popupId';
import hasPermission from 'utils/permissions';
import { boxStyle } from 'styles';
import { Link } from 'react-router-dom';


const WBSItem = props => {
  const darkMode = useSelector(state => state.theme.darkMode)
  const [showModalDelete, setShowModalDelete] = useState(false);

  const canDeleteWBS = props.hasPermission('deleteWbs');

  const confirmDelete = () => {
    props.deleteWbs(props.wbsId);
    setShowModalDelete(false);
  };

  return (
    <React.Fragment>
      <tr>
        <th scope="row">
          <div>{props.index}</div>
        </th>
        <td className="members__name">
          <a href={`/wbs/tasks/${props.wbsId}/${props.projectId}/${props.name}`} className={darkMode ? 'text-azure' : ''}>{props.name}</a>
        </td>
        {canDeleteWBS ? (
          <td className="members__assign">
            <button
              className="btn btn-outline-danger btn-sm"
              type="button"
              onClick={e => {
                setShowModalDelete(true);
                props.getPopupById(WBS_DELETE_POPUP_ID);
              }}
              style={darkMode ? {} : boxStyle}
            >
              <i className="fa fa-minus" aria-hidden="true"></i>
            </button>
          </td>
        ) : null}
      </tr>

      <ModalDelete
        isOpen={showModalDelete}
        closeModal={() => setShowModalDelete(false)}
        confirmModal={() => confirmDelete()}
        modalMessage={props.popupEditor.currPopup.popupContent || ''}
        modalTitle="Confirm Deletion"
        darkMode={darkMode}
      />
    </React.Fragment>
  );
};
const mapStateToProps = (state) => state;
export default connect(mapStateToProps, {
  deleteWbs,
  getPopupById,
  hasPermission,
})(WBSItem);
