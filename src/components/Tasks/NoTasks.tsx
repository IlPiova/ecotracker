import NTIllustatin from "../../assets/no-taasks-illustration.svg";

export default function NoTasks() {
  return (
    <div className="flex flex-col gap-4 justify-around items-start">
      <p className="text-gray-500 ">Nessuna task per oggi!</p>
      <img
        src={NTIllustatin}
        alt="Illustrazione Nessuna task"
        className="w-[60%] h-auto max-w-sm mt-6"
      />
    </div>
  );
}
