import AddMember from "@/components/forms/AddMember";
import AddMedication from "@/components/forms/AddMedication";
import Header from "../components/header/Header";
import MedicineInformation from "@/components/information/MedicineInformation";

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex flex-col gap-10 ps-10 pe-10 ">
        <MedicineInformation />
        <AddMember />
        <AddMedication />
      </div>
    </>
  );
}
