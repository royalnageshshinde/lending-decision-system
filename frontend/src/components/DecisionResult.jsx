const DecisionResult = ({ result }) => {
  if (!result) return null;

  return (
    <div className="mt-8 p-6 border rounded-xl bg-gray-50">
      <h2 className="text-2xl font-bold">
        Decision: {result.decision}
      </h2>
      <p className="mt-2 text-lg">
        Credit Score: {result.creditScore}
      </p>
      <p className="mt-2">
        Reasons: {result.reasons?.length ? result.reasons.join(", ") : "None"}
      </p>
    </div>
  );
};

export default DecisionResult;