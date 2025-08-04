const Introduction = () => {
  const account = JSON.parse(localStorage.getItem("DoctorAccount")) || "";
  const doctorName = account?.name?.trim() || "";
  const surName = account?.surname?.trim() || "";

  return (
    <div className="px-4 py-3 lg:px-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-0">
      <div className="flex flex-col gap-2 text-center lg:text-left">
        <h1 className="font-serif text-xl lg:text-2xl">
          Hello{" "}
          <span className="text-primary-blue">
            Dr.{" "}
            <span>
              {doctorName} {surName}
            </span>
          </span>
        </h1>
        <p className="text-sm lg:text-base">
          Here is your dashboard starting with a list of all your patients
        </p>
      </div>

      <div className="flex flex-col w-full md:w-fit gap-1 items-center justify-center">
        <h1 className="font-serif text-base lg:text-lg">
          {new Date().toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </h1>
      </div>
    </div>
  );
};

export default Introduction;
