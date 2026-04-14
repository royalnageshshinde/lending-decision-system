const DecisionResult = ({ result }) => {
  if (!result) return null;

  const isApproved = result.decision === "Approved";

  return (
    <div className="mt-8 rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
      <h2 className="text-3xl font-bold mb-4 text-slate-900">
        Loan Decision Result
      </h2>

      <div
        className={`inline-block px-4 py-2 rounded-full text-lg font-semibold ${
          isApproved
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {result.decision || "Pending"}
      </div>

      <div className="mt-5 space-y-3">
        <p className="text-xl">
          <span className="font-semibold">Credit Score:</span>{" "}
          {result.creditScore ?? "N/A"}
        </p>

        <p className="text-lg">
          <span className="font-semibold">Reasons:</span>{" "}
          {result.reasons?.length
            ? result.reasons.join(", ")
            : "No risk flags detected"}
        </p>
      </div>
    </div>
  );
};

export default DecisionResult;