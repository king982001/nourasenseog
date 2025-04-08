export const StatisticCard = ({ name, icon, text, numbers }) => {
  return (
    <div
      className={
        "border-2 w-[350px] md:[250px] lg:[350px] h-fit p-3 border-gray-200 rounded"
      }
    >
      <div className={"flex items-center space-x-2 "}>
        <p className={"font-Ledger text-xl font-medium "}>{name}</p>
        <img className={"size-7"} src={icon} alt="icon" />
      </div>
      <div className={"flex mt-8 flex-col gap-y-4 w-[70%] h-[120px]"}>
        {/* Adjust the height as needed */}
        <p className={"font-Inter text-lg md:text-sm lg:text-lg"}>
          {text}
        </p>{" "}
        {/* Limit to 2 lines */}
        <p className={"font-Ledger text-4xl"}>{numbers}</p>
      </div>
    </div>
  );
};
