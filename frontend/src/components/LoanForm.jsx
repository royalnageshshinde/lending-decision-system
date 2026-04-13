import { useState } from "react";
import axios from "axios";
import DecisionResult from "./DecisionResult";
import { toast } from "react-toastify";

const LoanForm = () => {
  const [form, setForm] = useState({
    ownerName: "",
    pan: "",
    businessType: "",
    monthlyRevenue: "",
    loanAmount: "",
    tenure: "",
    purpose: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validatePAN = (pan) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === "pan" ? value.toUpperCase() : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePAN(form.pan)) {
      setError("Invalid PAN format. Example: ABCDE1234F");
      toast.error("Invalid PAN format");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/loan/apply`,
        {
          ...form,
          monthlyRevenue: Number(form.monthlyRevenue),
          loanAmount: Number(form.loanAmount),
          tenure: Number(form.tenure),
        }
      );

      setResult(res.data.data || res.data);
      toast.success("Loan decision generated successfully!");
    } catch (err) {
      const message =
        err.response?.data?.message || "Something went wrong";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Top Header */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 mx-auto rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl mb-4">
            🏢
          </div>
          <h1 className="text-5xl font-bold text-slate-900">
            MSME Lending Application
          </h1>
          <p className="text-2xl text-slate-600 mt-3">
            Get instant credit decisions for your business loan
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-4xl font-bold text-slate-900 mb-2">
            Loan Application Form
          </h2>
          <p className="text-slate-500 text-xl mb-8">
            Fill in the details below to submit your loan application
          </p>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit}>
            {/* Business Profile */}
            <div className="border-l-4 border-blue-600 pl-4 mb-6">
              <h3 className="text-3xl font-semibold">Business Profile</h3>
              <p className="text-slate-500 text-lg">
                Information about your business and ownership
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block font-semibold mb-2">
                  Business Owner Name *
                </label>
                <input
                  className="w-full border rounded-xl p-4 text-lg"
                  name="ownerName"
                  placeholder="Enter full name"
                  value={form.ownerName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  PAN Number *
                </label>
                <input
                  className="w-full border rounded-xl p-4 text-lg"
                  name="pan"
                  placeholder="AAAAA9999A"
                  value={form.pan}
                  onChange={handleChange}
                  required
                />
                <p className="text-sm text-slate-500 mt-2">
                  Format: 5 letters, 4 digits, 1 letter
                </p>
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Business Type *
                </label>
                <select
                  className="w-full border rounded-xl p-4 text-lg"
                  name="businessType"
                  value={form.businessType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select business type</option>
                  <option value="Retail">Retail</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Services">Services</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Monthly Revenue (₹) *
                </label>
                <input
                  className="w-full border rounded-xl p-4 text-lg"
                  type="number"
                  name="monthlyRevenue"
                  placeholder="200000"
                  value={form.monthlyRevenue}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Loan Details */}
            <div className="border-l-4 border-green-600 pl-4 mb-6">
              <h3 className="text-3xl font-semibold">Loan Details</h3>
              <p className="text-slate-500 text-lg">
                Specify your loan requirements
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block font-semibold mb-2">
                  Requested Loan Amount (₹) *
                </label>
                <input
                  className="w-full border rounded-xl p-4 text-lg"
                  type="number"
                  name="loanAmount"
                  placeholder="1000000"
                  value={form.loanAmount}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Repayment Tenure (Months) *
                </label>
                <input
                  className="w-full border rounded-xl p-4 text-lg"
                  type="number"
                  name="tenure"
                  placeholder="24"
                  value={form.tenure}
                  onChange={handleChange}
                  required
                />
                <p className="text-sm text-slate-500 mt-2">
                  Between 1 and 120 months
                </p>
              </div>
            </div>

            <div className="mb-8">
              <label className="block font-semibold mb-2">
                Purpose of Loan *
              </label>
              <textarea
                className="w-full border rounded-xl p-4 text-lg min-h-32"
                name="purpose"
                placeholder="Describe how you plan to use this loan"
                value={form.purpose}
                onChange={handleChange}
                required
              />
            </div>

            <button
              className="w-full bg-black text-white text-2xl font-semibold py-5 rounded-xl hover:opacity-95 transition"
              type="submit"
              disabled={loading}
            >
              {loading ? "Processing..." : "Submit Application"}
            </button>
          </form>

          {result && <DecisionResult result={result} />}
        </div>
      </div>
    </div>
  );
};

export default LoanForm;