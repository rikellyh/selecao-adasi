import { useState } from "react";

import { Button, Container } from "react-bootstrap";

import { Activity } from "../../types/activities";
import { useQueryGetActivities } from "../../hooks/useActivities/useQueryGetActivities";
import { formatDate, formatDateStartAndEnd } from "../../utils/format";

import AccordionActivity from "./components/AccordionActivity";
import ModalCreateActivity from "./components/ModalCreateActivity";
import ModalEditActivity from "./components/ModalEditActivity";

import "./styles.css";

export interface SelectedOption {
  readonly value: string;
  readonly label: string;
}

const Activities = () => {
  const [modalShowCreateActivity, setModalShowCreateActivity] = useState(false);
  const [modalShowEditActivity, setModalShowEditActivity] = useState(false);

  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { data } = useQueryGetActivities();

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const handleMultiOptionsChange = (
    selectedOptions: { value: string; label: string }[]
  ) => {
    setSelectedOptions(selectedOptions);
  };

  const handleCloseCreateActivityModal = () =>
    setModalShowCreateActivity(false);
  const handleOpenCreateActivityModal = () => setModalShowCreateActivity(true);

  const handleCloseEditActivityModal = () => setModalShowEditActivity(false);
  const handleOpenEditActivityModal = (activityData: Activity) => {
    setModalShowEditActivity(true);
    setSelectedActivity(activityData);
  };

  return (
    <Container>
      <ModalCreateActivity
        startDate={startDate}
        endDate={endDate}
        selectedOptions={selectedOptions}
        show={modalShowCreateActivity}
        onHide={handleCloseCreateActivityModal}
        handleStartDateChange={handleStartDateChange}
        handleEndDateChange={handleEndDateChange}
        handleMultiOptionsChange={handleMultiOptionsChange}
      />
      <ModalEditActivity
        startDate={startDate}
        endDate={endDate}
        selectedOptions={selectedOptions}
        selectedActivity={selectedActivity}
        show={modalShowEditActivity}
        onHide={handleCloseEditActivityModal}
        handleStartDateChange={handleStartDateChange}
        handleEndDateChange={handleEndDateChange}
        handleMultiOptionsChange={handleMultiOptionsChange}
      />
      <Button className="btn__center" onClick={handleOpenCreateActivityModal}>
        Adicionar atividade
      </Button>
      <main className="container--wrapper">
        {data && data.length ? (
          <>
            {data.map((activity, index) => (
              <AccordionActivity
                key={activity.id}
                index={activity.id}
                activityNumber={String(index + 1)}
                createDate={formatDate(activity?.date)}
                studentName={activity.student.name}
                initialDate={formatDateStartAndEnd(activity?.scheduledStart)}
                endDate={formatDateStartAndEnd(activity?.scheduledEnd)}
                taskName={activity.tasks}
                handleEditActivity={() => handleOpenEditActivityModal(activity)}
                handleDelete={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            ))}
          </>
        ) : (
          <>
            <h1>Sem Atividades cadastradas ainda!</h1>
          </>
        )}
      </main>
    </Container>
  );
};

export default Activities;
