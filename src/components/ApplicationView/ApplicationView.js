import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import applicationService from "../../services/applicationService";
import "./ApplicationView.css";
import FormField from "./FormField";
import HowDidYouHear from "../../assets/data/how_did_you_hear.json";
import States from "../../assets/data/states.json";
import ClaimApplicationModal from "./ClaimApplicationModal";
import StatusLogTable from "./StatusLogTable";
import StatusForm from "./StatusForm";
import HomeEquityFormView from "./Forms/HomeEquityFormView";
import SalrefiFormView from "./Forms/SalrefiFormView";
import DcfcuFormView from "./Forms/DcfcuFormView";
import FormView from "./Forms/FormView";

const ApplicationView = ({ isAdmin = false }) => {
  
  
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [application, updateApplication] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [logs, setLogs] = useState([]);

  const view = searchParams.get("view");

  const setApplication = async (app) => {
    // console.log(app);
    updateApplication({...app});
    // console.log(application)

  };

  const fetchStatuses = async () => {
    
    setError("");
    try {
      const result = await applicationService.getStatuses(id);
      if (result.valid) {
        setLogs(result.data); // Update logs state with data
      } else {
        alert(result.error || "Failed to fetch statuses.");
      }
    } catch (err) {
      alert("An unexpected error occurred while fetching statuses.");
    } 
  };

  useEffect(() => {

    const fetchApplicationDetails = async () => {
      setLoading(true);
      try {
        const result = await applicationService.getApplicationById(id, view);
        if (result.valid) {
          
          setApplication(result);
        } else {
          setError("Failed to load application details.");
        }
      } catch (err) {
        setError("An unexpected error occurred.");
      }
      setLoading(false);
    };
    

    fetchApplicationDetails();
    // setIsEditable(isAdmin);
    setIsEditable(false);
    if(view != 'incomplete')fetchStatuses();
  }, [id, isAdmin]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert"> {error} </div>
      </div>
    );
  }

  const handleClaimSuccess = () => {
    setApplication({ ...application, claimed_by: true });
  };

  const handleDownloadCSV = () => {
    if (!application) {
      alert("No application data available for download.");
      return;
    }
  
    // Function to flatten nested objects
    const flattenObject = (obj, parentKey = "", result = {}) => {
      for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
          const newKey = parentKey ? `${parentKey}.${key}` : key;
          if (typeof obj[key] === "object" && obj[key] !== null) {
            flattenObject(obj[key], newKey, result);
          } else {
            // Assign value or null if undefined
            result[newKey] = obj[key] !== undefined ? obj[key] : null;
          }
        }
      }
      return result;
    };
  
    // Flatten the application object to handle nested structures
    const flattenedApplication = flattenObject(application);
  
    // Prepare headers and values
    const headers = Object.keys(flattenedApplication);
    const values = Object.values(flattenedApplication).map(value =>
      value !== null ? value : "null"
    ); // Represent null values explicitly as "null"
  
    // Create CSV content
    const csvData = [headers, values];
    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvData.map((row) => row.map((val) => `"${val}"`).join(",")).join("\n");
  
    // Create a downloadable link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "application_data.csv");
  
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  
  if (!application || !application.domain) {
    return <div>Loading or no application domain found...</div>;
  }
  
  const renderDomainSpecificForm = () => {
    switch (application.domain) {
      case "autorefi.dcfcu.org":
        return <DcfcuFormView application={application} onChange={setApplication} isAdmin={isAdmin}/>;
      case "homeequity.belco.org":
        return <HomeEquityFormView application={application} onChange={setApplication} />;
      case "apply.salrefi.com":
        return <SalrefiFormView application={application} onChange={setApplication} />;
      default:
        return <FormView application={application} setApplication={setApplication} isAdmin={isAdmin}/>;
    }
  };
    
    return (
    <div className="container application-view">
      
      <button className="btn btn-outline-secondary mb-4" onClick={() => navigate("/applications")}>
        <i className="bi bi-arrow-left"></i> Back to Applications
      </button>

      <div className="mb-4">
      
      {view !== "incomplete" && (
        <div>
          {application.claimed_by ? (
            <div>
              <div className="d-flex">
                <div className="ms-auto">
                  <button className="btn btn-warning" type="button" data-bs-toggle="collapse" data-bs-target="#collapseContent" aria-expanded="false" aria-controls="collapseContent" >
                    Update Status
                  </button>
                </div>
              </div>

              <div className="collapse" id="collapseContent">
                <StatusForm guid={id} onUpdate={fetchStatuses} />
              </div>

              <StatusLogTable logs={logs} />
            </div>
          ) : (
            <div className="d-flex">
              <div className="ms-auto">
                <ClaimApplicationModal guid={application.guid} onClaimSuccess={handleClaimSuccess} />
              </div>
            </div>
          )}
        </div>
      )}


          {/* CSV Export Button */}
          <div className="mt-3 d-flex justify-content-end">
            <button className="btn btn-success"  onClick={handleDownloadCSV}> <i className="bi bi-download"></i></button>
          </div>
        </div>

      <div>
        <div className="form-section mb-4"> 
          
          <h4 className="section-title">Application</h4>

          <div className="row">
            <div className="col-12">
              <FormField name="Loan Type" value={application.fi_or_refi} type="select" options={{
                fi: "Finance (buying vehicle)",
                refi: "Refinance (existing vehicle)",
                home_equity: "Home Equity"
              }} iseditable={isEditable} />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <FormField name="Application Owner" value={application.claimed_by}  />
            </div>
            <div className="col-md-6">
              <FormField name="Application Claimed At" value={application.claimed_at_formatted}  />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <FormField name="Assigned Domain" value={application.domain}  />
            </div>
            <div className="col-md-6">
              <FormField name="Source Domain" value={application.source_domain}  />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <FormField name="Application ID" value={application.guid}  />
            </div>
            <div className="col-md-6">
              <FormField name="Language" value={application.lang} type="select" options={{en: "English", es: "Spanish"}} />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <FormField name="Submitted At" value={application.ts_formatted}  />
            </div>
            <div className="col-md-6">
              <FormField name="Submitted From IP" value={application.ip}  />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <FormField name="Third-Party Source/Target" value={application.third_party_source} />
            </div>
            <div className="col-md-6">
              <FormField name="Third-Party Application ID" value={application.third_party_app_id}  />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <FormField name="How Did You Hear About Us?" value={application.how_did_you_hear} type="select" iseditable={isEditable} options={HowDidYouHear}/>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <FormField name="Is there any additional information you think we may need to help finance your loan?" value={application.comments}/>
            </div>
          </div>

        </div>
      </div>

        {/* Applicant Details */}
             <div className="form-section mb-4">
                
                <h4 className="section-title">Applicant Details</h4> 
                
                <div className="row">
                  <div className="col-md-6">
                    <FormField name="Promo Code" value={application.promo_code} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, promo_code: newValue })} />
                  </div>
                  <div className="col-md-6">
                    <FormField name="Suffix (senior,junior, etc.)" value={application.suffix_for_name} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, suffix_for_name: newValue })} />
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-md-4">
                    <FormField name="First Name" value={application.first_name} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, first_name: newValue })} />
                  </div>
                  <div className="col-md-4">
                    <FormField name="Middle Name" value={application.middle_name_initial} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, middle_name_initial: newValue })} />
                  </div>
                  <div className="col-md-4">
                    <FormField name="Last Name" value={application.last_name} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, last_name: newValue })} />
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-md-6">
                    <FormField name="Phone Number" value={application.phone_1} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, phone_1: newValue })} />
                  </div>
                  <div className="col-md-6">
                    <FormField name="Email Address" value={application.email} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, email: newValue })} />
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-md-6">
                    <FormField name="Date of Birth" value={application.dob} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, dob: newValue })} />
                  </div>
                  <div className="col-md-6">
                    <FormField name="Marital Status" value={application.marital_status} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, marital_status: newValue })}/>
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-md-6">
                    <FormField name="Driver's License Number" value={application.license_no} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, license_no: newValue })} />
                  </div>
                  <div className="col-md-6">
                    <FormField name="License State" value={application.license_state} iseditable={isEditable} type="select" options={States} onChange={(newValue) => setApplication({ ...application, license_state: newValue })}/>
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-md-6">
                    <FormField name="License Issue Date" type="date" value={application.drivers_license_issue_date} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, drivers_license_issue_date: newValue })}/>
                  </div>
                  <div className="col-md-6">
                    <FormField name="License Expiration Date" type="date" value={application.drivers_license_expire_date} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, drivers_license_expire_date: newValue })}/>
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-md-6">
                    <FormField name="Driver's License Type" value={application.drivers_license_type} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, drivers_license_type: newValue })} />
                  </div>
                  <div className="col-md-6">
                    <FormField name="Social Security Number" value={application.ssn} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, ssn: newValue })} />
                  </div>
                </div>
                
                </div>
                
                {/* home address */}
                <div className="form-section mb-4">
                <h5 className="section-title">Applicant Home Address</h5>
                
                <div className="row">
                  <div className="col-md-9">
                    <FormField name="Street Address" value={application.address_1} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, address_1: newValue })}/>
                  </div>
                  <div className="col-md-3">
                    <FormField name="Apt/Unit #" value={application.address_2} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, address_2: newValue })} />
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-md-4">
                    <FormField name="City" value={application.city} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, city: newValue })} />
                  </div>
                  <div className="col-md-4">
                    <FormField name="State" value={application.state} iseditable={isEditable} type="select" options={States} onChange={(newValue) => setApplication({ ...application, state: newValue })}/>
                  </div>
                  <div className="col-md-4">
                    <FormField name="ZIP Code" value={application.zip} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, zip: newValue })} />
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-md-6">
                    <FormField name="Current Address Since" value={application.address_since} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, address_since: newValue })} />
                  </div>
                </div>
                
                </div>

             
      {renderDomainSpecificForm()}
    </div>

    
  );
};
    


export default ApplicationView;
