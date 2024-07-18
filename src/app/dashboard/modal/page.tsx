import Modal from "../../../../components/dashboard/modal/Modal";
import { DashboardContextProvider } from "../../../../components/dashboard/DashboardContext";

export default function Modalpage() {
  return (
    <>
      <DashboardContextProvider>
        <Modal />
      </DashboardContextProvider>
    </>
  );
}