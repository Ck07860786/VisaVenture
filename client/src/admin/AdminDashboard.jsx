import React, { useEffect, useState } from "react";
import Navbar from "@/components/ui/shared/Navbar";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import { BASE_URL } from "@/helper/Port";
import { useUserAuth } from "@/context/userAuth";
import { Link } from "react-router-dom";
import Loading from "@/components/ui/shared/Loading";
import backgroundImage from '../assets/Images/Herobgi.png'

function AdminDashboard() {
  const [kycData, setKycData] = useState([]);
  const [userAuth, setUserAuth] = useUserAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusLoading, setStatusLoading] = useState({});

  // Fetch KYC data
  const fetchKycData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/kyc/agent/all-kyc`, {
        headers: {
          Authorization: `Bearer ${userAuth.token}`, // Pass the token for authorization
        },
      });
      setKycData(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching KYC data:", err);
      setError("Failed to fetch KYC data");
      setLoading(false);
      
    }
  };

  useEffect(() => {
    if (userAuth.token) fetchKycData(); // Fetch KYC data when the component mounts
  }, [userAuth.token]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Loading /></div>; // Show loading while data is being fetched
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>; // Show error if any
  }

  const handleChange = async (kycId, value) => {
    setStatusLoading((prev) => ({ ...prev, [kycId]: true })); // Set loader for the specific KYC being updated
    try {
      await axios.put(
        `${BASE_URL}/api/kyc/agent/update-kyc-status`,
        {
          kycId,
          status: value,
        },
        {
          headers: {
            Authorization: `Bearer ${userAuth.token}`,
          },
        }
      );

      // Update local kycData to reflect the change
      setKycData((prevData) =>
        prevData.map((kyc) =>
          kyc._id === kycId ? { ...kyc, kycStatus: value } : kyc
        )
      );
    } catch (error) {
      console.log("Error updating KYC status:", error);
    } finally {
      setStatusLoading((prev) => ({ ...prev, [kycId]: false }));
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen w-full bg-cover bg-center bg-fixed flex flex-col justify-center  p-4"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
      <AdminMenu />
    
      <section className="relative mt-14  px-6 ml-80 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-semibold text-gray-900">Welcome to the Admin Dashboard</h1>
          <h2 className="mt-10 text-2xl font-semibold text-gray-800">KYC Submissions</h2>

          {kycData.length === 0 ? (
            <p className="mt-4 text-gray-500">No KYC submissions available</p>
          ) : (
            <div className="overflow-x-auto mt-6">
              <table className="min-w-full  border border-gray-300 shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border-b text-left">Agent ID</th>
                    <th className="px-4 py-2 border-b text-left">Agent Name</th>
                    <th className="px-4 py-2 border-b text-left">Email</th>
                    <th className="px-4 py-2 border-b text-left">Country</th>
                    <th className="px-4 py-2 border-b text-left">Personal Details</th>
                    <th className="px-4 py-2 border-b text-left">Business Details</th>
                    <th className="px-4 py-2 border-b text-left">KYC Status</th>
                  </tr>
                </thead>
                <tbody>
                  {kycData.map((kyc) => (
                    <tr key={kyc._id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border-b">{kyc.agentId}</td>
                      <td className="px-4 py-2 border-b">{kyc.name}</td>
                      <td className="px-4 py-2 border-b">{kyc.email}</td>
                      <td className="px-4 py-2 border-b">{kyc.country}</td>
                      <td className="px-4 py-2 border-b">
                        {kyc.personalDocuments?.personalDetailsSubmitted ? (
                          <Link
                            to={kyc.personalDocuments.identityProof.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:underline"
                          >
                            View Document
                          </Link>
                        ) : (
                          "Not Submitted"
                        )}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {kyc.businessDocuments?.businessDetailsSubmitted ? (
                          <>
                            <Link
                              to={kyc.businessDocuments.iataCertificate.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-600 hover:underline"
                            >
                              IATA
                            </Link>{" "}
                            |{" "}
                            <Link
                              to={kyc.businessDocuments.policeClearanceCertificate.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-600 hover:underline"
                            >
                              Police Clearance
                            </Link>{" "}
                            |{" "}
                            <Link
                              to={kyc.businessDocuments.businessRegistrationCertificate.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-600 hover:underline"
                            >
                              Business Registration
                            </Link>{" "}
                            |{" "}
                            <Link
                              to={kyc.businessDocuments.previousRecords.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-600 hover:underline"
                            >
                              Previous Records
                            </Link>
                          </>
                        ) : (
                          "Not Submitted"
                        )}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {statusLoading[kyc._id] ? (
                          <Loading />
                        ) : (
                          <select
                            value={kyc.kycStatus}
                            onChange={(e) => handleChange(kyc._id, e.target.value)}
                            className="border border-gray-300 rounded-md p-1"
                          >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
      </div>
      
    </>
  );
}

export default AdminDashboard;
