/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Alert } from 'reactstrap';
import MembersAutoComplete from './MembersAutoComplete';
//import hasPermission from 'utils/permissions';

const TeamMembersPopup = React.memo(props => {
  // debugger;

  const closePopup = () => {
    props.onClose();
  };
  const [selectedUser, onSelectUser] = useState(undefined);
  const [isValidUser, onValidation] = useState(true);
  const [searchText, setSearchText] = useState('');

  const onAddUser = () => {
    if (
      selectedUser &&
      (!props.members ||
        !props.members.summaryReceivers ||
        !props.members.summaryReceivers.some(x => x._id === selectedUser._id)) &&
      props.apiCallDone
    ) {
      props.onAddUser(selectedUser, props.selectedSummaryGroupId);
      setSearchText('');
    } else {
      onValidation(false);
    }
  };
  const selectUser = user => {
    onSelectUser(user);
    onValidation(true);
  };

  useEffect(() => {
    onValidation(true);
  }, [props.open]);

  return (
    <Container fluid>
      <Modal isOpen={props.open} toggle={closePopup}>
        <ModalHeader
          toggle={closePopup}
        >{`Summary Receivers of ${props.selectedSummaryGroupName}`}</ModalHeader>
        <ModalBody style={{ textAlign: 'center' }}>
          {
            <div className="input-group-prepend" style={{ marginBottom: '10px' }}>
              <MembersAutoComplete
                userProfileData={props.usersdata}
                onAddUser={selectUser}
                searchText={searchText}
                setSearchText={setSearchText}
              />
              <Button color="primary" onClick={onAddUser}>
                Add
              </Button>
            </div>
          }
          {isValidUser === false ? (
            <Alert color="danger">Please choose a valid user.</Alert>
          ) : (
            <></>
          )}
          <div>
            <table className="table table-bordered table-responsive-sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>User Name</th>
                  {<th> </th>}
                </tr>
              </thead>
              <tbody>
                {props.members &&
                props.members.summaryReceivers &&
                props.members.summaryReceivers.length > 0 ? (
                  props.members.summaryReceivers.map((user, index) => (
                    <tr key={`team_member_${index}`}>
                      <td>{index + 1}</td>
                      <td>{`${user.fullName}`}</td>
                      {
                        <td>
                          <Button
                            color="danger"
                            onClick={() => {
                              props.onDeleteClick(`${user._id}`);
                            }}
                          >
                            Delete
                          </Button>
                        </td>
                      }
                    </tr>
                  ))
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={closePopup}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
});

export default TeamMembersPopup;