import { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { addTitle } from '../../../actions/title';
import AssignProjectField from './AssignProjectField';
import AssignTeamField from './AssignTeamField';

function AddNewTitleModal({ isOpen, setIsOpen, refreshModalTitles, teamsData, projectsData, setWarningMessage, setShowMessage }) {
  const [titleData, setTitleData] = useState({
    titleName: '',
    mediaFolder: '',
    teamCode: '',
    projectAssigned: '',
    // teamAssiged: {},
  });
  let existTeamCodes = new Set();
  if (teamsData?.allTeamCode) {
    const codes = teamsData.allTeamCode.map(team => team.teamCode);
    existTeamCodes = new Set(codes);
  }
  

  // useEffect(() => {
  //   debugger;
  //   if (teamsData?.allTeamCode) {
  //     const codes = teamsData.allTeamCode.map(team => team.teamCode);
  //     setExistTeamCodes(new Set(codes));
  //   }
  // }, [teamsData]);

  const [selectedTeam, onSelectTeam] = useState(undefined);
  const [selectedProject, onSelectProject] = useState(undefined);
  const [isValidProject, onValidation] = useState(false);
  const [searchText, setSearchText] = useState(''); // For addTeamAutoComplete

  const selectProject = project => {
    onSelectProject(project);
    setTitleData(prev => ({
      ...prev,
      projectAssigned: {
        projectName: project.projectName,
        _id: project._id,
        category: project.category,
      },
    }));
    onValidation(true);
  };

  const cleanProjectAssign = () => {
    setTitleData(prev => ({
      ...prev,
      projectAssigned: "",
    }));
  };

  const selectTeam = team => {
    onSelectTeam(team);
    setTitleData(prev => ({
      ...prev,
      teamAssiged: {
        teamName: team.teamName,
        _id: team._id,
      },
    }));
    onValidation(true);
  };

  const cleanTeamAssigned = () => {
    // if clean all input field -> no team selected
    const updatedTitleData = { ...titleData };
    delete updatedTitleData.teamAssiged;
    setTitleData(updatedTitleData);
  };

  const undoTeamAssigned = () => {
    setTitleData(prev => ({
      ...prev,
      teamAssiged: {
        teamName: searchText,
        _id: "N/A",
      },
    }));
  };


  // confirm and save
  const confirmOnClick = () => {
    addTitle(titleData)
      .then((resp) => {
        if (resp.status !== 200) {
          setWarningMessage({ title: "Error", content: resp.message });
          setShowMessage(true);
        } else {
          setIsOpen(false);
          refreshModalTitles();
        };
      })
      .catch(e => {
        console.log(e);
      });
  };

  const onTeamCodeValidation = (teamCode) => {
    const format1 = /^[A-Za-z]-[A-Za-z]{3}$/;
    const format2 = /^[A-Z]{5}$/;
    // Check if the input value matches either of the formats
    const isValidFormat = format1.test(teamCode) || format2.test(teamCode);
    if (!isValidFormat) {
      setWarningMessage({ title: "Error", content: "Invalid Team Code Format" });
      setShowMessage(true);
      setTitleData(prev => ({ ...prev, teamCode: '' }));
      return;
    } 
    if(!existTeamCodes.has(teamCode)) {
      setWarningMessage({ title: "Error", content: "Team Code Not Exists" });
      setShowMessage(true);
      setTitleData(prev => ({ ...prev, teamCode: '' }));
      return;
    }
    setShowMessage(false);


  }



  return (
    <Modal isOpen={isOpen} toggle={() => setIsOpen(false)}>
      <ModalHeader toggle={() => setIsOpen(false)}>Add A New Title</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label>Title Name<span className='qsm-modal-required'>*</span>: </Label>
            <Input
              type="text"
              name="text"
              id="mediafolder"
              onChange={e => {
                e.persist();
                setTitleData(prev => ({ ...prev, titleName: e.target.value }));
              }}
            />

            <Label>Media Folder<span className='qsm-modal-required'>*</span>: </Label>
            <Input
              type="text"
              name="text"
              id="mediafolder"
              onChange={e => {
                e.persist();
                setTitleData(prev => ({ ...prev, mediaFolder: e.target.value }));
              }}
            />
            <Label>Team Code<span className='qsm-modal-required'>*</span>:</Label>
            <Input
              type="text"
              placeholder="X-XXX OR XXXXX"
              onChange={e => {
                e.persist();
                setTitleData(prev => ({ ...prev, teamCode: e.target.value }));
              }}
              onBlur={(e) => onTeamCodeValidation(e.target.value)}
            />
            <Label>Project Assignment<span className='qsm-modal-required'>*</span>:</Label>
            <AssignProjectField
              projectsData={projectsData}
              onDropDownSelect={selectProject}
              selectedProject={selectedProject}
              cleanProjectAssign={cleanProjectAssign}
              onSelectProject={onSelectProject}
            />
            <Label>Team Assignment:</Label>
            <AssignTeamField
              teamsData={teamsData}
              onDropDownSelect={selectTeam}
              selectedTeam={selectedTeam}
              setSearchText={setSearchText}
              searchText={searchText}
              cleanTeamAssigned={cleanTeamAssigned}
              onSelectTeam={onSelectTeam}
              undoTeamAssigned={undoTeamAssigned}
            />
          </FormGroup>
        </Form>
      </ModalBody>

      <ModalFooter>
        <Button color="primary" onClick={() => confirmOnClick()}>
          Confirm
        </Button>
        <Button color="secondary" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default AddNewTitleModal;
