import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import applicationService from "../../services/applicationService";
import "./ApplicationView.css";
import FormField from "./FormField";
import HowDidYouHear from "../../assets/data/how_did_you_hear.json";
import States from "../../assets/data/states.json";
import ClaimApplicationModal from "./ClaimApplicationModal";
import StatusManagement from "./StatusManagement";

const ApplicationView = ({ isAdmin = false }) => {
  
  
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplicationDetails = async () => {
      setLoading(true);

      const data = await applicationService.getApplicationById(id);
        

      if (!data.valid) {
        setError(error || "Failed to load applications.");
        console.log("Failed to fetch application details:", error);
      }

      setApplication(data);
      setLoading(false);

    };

    fetchApplicationDetails();
    // setIsEditable(isAdmin);
    setIsEditable(false);
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

  const handleStatusUpdate = (newLogEntry) => {
    console.log("Status updated:", newLogEntry); // Backend logic can go here
  };

  return (
    
    
    <div className="container mt-3 application-view">
      
      <button className="btn btn-outline-secondary mb-4" onClick={() => navigate("/applications")}>
        <i className="bi bi-arrow-left"></i> Back to Applications
      </button>


      <div className="mb-4">
        {application.claimed_by ? (
            <div>

              <div className="d-flex"> 
                <div className="ms-auto">
                  <button className="btn btn-warning" type="button" data-bs-toggle="collapse" data-bs-target="#collapseContent" aria-expanded="false" aria-controls="collapseContent">Update Status</button>
                </div>
              </div>


              <div className="collapse" id="collapseContent" >
                <StatusManagement application={application} onStatusUpdate={handleStatusUpdate} />
              </div>

              
            </div>
            
          ) : (
            <div className="d-flex"> 
              <div className="ms-auto">
                <ClaimApplicationModal guid={application.guid} onClaimSuccess={handleClaimSuccess} />
              </div>
            </div>        
          )}
      </div>


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
      

      <div className="form-section mb-4">
        <h5 className="section-title">Applicant Income, Credit, and Expenses:</h5>
        <div className="row">
          <div className="col-md-6">
            <FormField name="Monthly Income" value={application.monthly_income} iseditable={isEditable} onChange={(newValue) => setApplication({...application, monthly_income: newValue})}/>
          </div>
          <div className="col-md-6">
            <FormField name="Rent or Own" value={application.rent_own} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, rent_own: newValue })}/>
          </div>
          <div className="col-md-6">
            <FormField name="Monthly Rent/Mortgage Payment" value={application.monthly_home_payment} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, monthly_home_payment: newValue })}/>
          </div>
          <div className="col-md-6">
            <FormField name="Other Monthly Loan/Credit Expenses" value={application.other_expenses} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, other_expenses: newValue })}/>
          </div>
        
        </div>
      </div>



      <div className="form-section mb-4">
        <h5 className="section-title">Vehicle</h5>
        <div className="row">
        <div className="col-md-6">
            <FormField name="Make" value={application.make} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, make: newValue })}/>
          </div>
          <div className="col-md-6">
            <FormField name="Model" value={application.model} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, model: newValue })}/>
          </div>
          <div className="col-md-6">
            <FormField name="Year" value={application.year} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, year: newValue })}/>
          </div>
          <div className="col-md-6">
            <FormField name="Mileage" value={application.mileage} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, mileage: newValue })}/>
          </div>
          <div className="col-md-6">
            <FormField name="VIN (Vehicle Identification Number)" value={application.vin} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, vin: newValue })}/>
          </div>
        </div>
      </div>


      <div className="form-section mb-4">
        <h5 className="section-title">Current Loan</h5>
        <div className="row">
          <div className="col-md-6">
            <FormField name="Monthly Payment" value={application.current_monthly_payment} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, current_monthly_payment: newValue })}/>
          </div>
          <div className="col-md-6">
            <FormField name="Remaining loan/payoff amount" value={application.current_payoff} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, current_payoff: newValue })}/>
          </div>
          <div className="col-md-6">
            <FormField name="Remaining term" value={application.current_remaining_term} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, current_remaining_term: newValue })}/>
          </div>
          <div className="col-md-6">
            <FormField name="Lien holder" value={application.lien_holder} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, lien_holder: newValue })}/>
          </div>
          <div className="col-md-6">
            <FormField name="Next Payment Date" value={application.next_payment_date} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, next_payment_date: newValue })}/>
          </div>
          </div>
      </div>


      <div className="form-section mb-4">
        <h5 className="section-title">Employment</h5>
        <div className="row">
        <div className="col-md-6">
            <FormField name="Employment Status" value={application.employment_status} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, employment_status: newValue })}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <FormField name="Your Job Title" value={application.job_title} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, job_title: newValue })}/>
          </div>
          <div className="col-md-6">
            <FormField name="Current Employer Since" value={application.employer_since} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, employer_since: newValue })}/>
          </div>
          <div className="col-md-6">
            <FormField name="Employer's Name" value={application.employer} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, employer: newValue })}/>
          </div>
          <div className="col-md-6">
            <FormField name="Employer's Phone Number" value={application.employer_phone_1} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, employer_phone_1: newValue })}/>
          </div>
          <div className="col-md-9">
            <FormField name="Employer's Street Address" value={application.employer_address_1} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, employer_address_1: newValue })}/>
          </div>
          <div className="col-md-3">
            <FormField name="Employer's Suite/Unit #" value={application.employer_address_2} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, employer_address_2: newValue })}/>
          </div>
          <div className="col-md-4">
            <FormField name="Employer's City" value={application.employer_city} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, employer_city: newValue })}/>
          </div>
          <div className="col-md-4">
            <FormField name="Employer's State" value={application.employer_state} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, employer_state: newValue })}/>
          </div>
          <div className="col-md-4">
            <FormField name="Employer's ZIP Code" value={application.employer_zip} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, employer_zip: newValue })}/>
          </div>
          </div>
      </div>

      <div className="form-section mb-4">
        <h5 className="section-title">Co-borrower Details</h5>
        <div className="row">
          <div className="col-md-6">
            <FormField name="Relationship to Primary Borrower" value={application.co_borrower_relationship} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, co_borrower_relationship: newValue })} />
          </div>
          </div>

        <div className="row">
          <div className="col-md-6">
            <FormField name="First Name" value={application.co_borrower_first_name} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, co_borrower_first_name: newValue })} />
          </div>
          <div className="col-md-6">
            <FormField name="Last Name" value={application.co_borrower_last_name} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, co_borrower_last_name: newValue })} />
          </div>
          
          <div className="col-md-6">
            <FormField name="Phone Number" value={application.co_borrower_phone_1} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, co_borrower_phone_1: newValue })} />
          </div>
          <div className="col-md-6">
            <FormField name="Email Address" value={application.co_borrower_email} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, co_borrower_phone_1: newValue })} />
          </div>
          <div className="col-md-6">
            <FormField name="Date of Birth" value={application.co_borrower_dob} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, co_borrower_dob: newValue })} />
          </div>
          <div className="col-md-6">
            <FormField name="Marital Status" value={application.co_borrower_marital_status} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, co_borrower_marital_status: newValue })}/>
          </div>
          <div className="col-md-6">
            <FormField name="Driver's License Number" value={application.co_borrower_license_no} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, co_borrower_license_no: newValue })} />
          </div>
          <div className="col-md-6">
            <FormField name="License State" value={application.co_borrower_license_state} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, co_borrower_license_state: newValue })}/>
          </div>
          <div className="col-md-6">
            <FormField name="License Issue Date" value={application.co_borrower_drivers_license_issue_date} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, co_borrower_drivers_license_issue_date: newValue })}/>
          </div>
          <div className="col-md-6">
            <FormField name="License Expiration Date" value={application.co_borrower_drivers_license_expire_date} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, co_borrower_drivers_license_expire_date: newValue })}/>
          </div>
          <div className="col-md-6">
            <FormField name="Driver's License Type" value={application.co_borrower_drivers_license_type} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, co_borrower_drivers_license_type: newValue })} />
          </div>
          </div>
        
        <div className="row">
          <div className="col-md-6">
            <FormField name="Social Security Number" value={application.co_borrower_ssn} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, co_borrower_ssn: newValue })} />
          </div>
          

        <div className="col-md-6">
            <FormField name="Monthly Income" value={application.co_borrower_gross_income} iseditable={isEditable} onChange={(newValue) => setApplication({...application, co_borrower_gross_income: newValue})}/>
          </div>
          <div className="col-md-6">
            <FormField name="Rent or Own" value={application.co_borrower_rent_own} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, co_borrower_rent_own: newValue })}/>
          </div>
          <div className="col-md-6">
            <FormField name="Monthly Rent/Mortgage Payment" value={application.co_borrower_monthly_home_payment} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, co_borrower_monthly_home_payment: newValue })}/>
          </div>
        
          </div>
      </div>
        


      <div className="form-section mb-4">
        <h5 className="section-title">Co-borrower Home Address</h5>
        <div className="row">
          <div className="col-md-9">
            <FormField name="Street Address" value={application.co_borrower_address_1} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, co_borrower_address_1: newValue })}/>
          </div>
          <div className="col-md-3">
            <FormField name="Apt/Unit #" value={application.co_borrower_address_2} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, co_borrower_address_2: newValue })} />
          </div>
          <div className="col-md-4">
            <FormField name="City" value={application.co_borrower_city} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, co_borrower_city: newValue })} />
          </div>
          <div className="col-md-4">
            <FormField name="State" value={application.co_borrower_state} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, co_borrower_state: newValue })}/>
          </div>
          <div className="col-md-4">
            <FormField name="ZIP Code" value={application.co_borrower_zip} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, co_borrower_zip: newValue })} />
          </div>
          <div className="col-md-6">
            <FormField name="Current Address Since" value={application.co_borrower_address_since} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, co_borrower_address_since: newValue })} />
          </div>
        </div>


      </div>

      <div className="form-section mb-4">
        <h5 className="section-title">Co-borrower Employment</h5>
        <div className="row">
        <div className="col-md-6">
            <FormField name="Employment Status" value={application.co_borrower_employement_status} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, co_borrower_employement_status: newValue })}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <FormField name="Your Job Title" value={application.co_borrower_job_title} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, co_borrower_job_title: newValue })}/>
          </div>
          <div className="col-md-6">
            <FormField name="Current Employer Since" value={application.co_borrower_employer_since} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, co_borrower_employer_since: newValue })}/>
          </div>
          <div className="col-md-6">
            <FormField name="Employer's Name" value={application.co_borrower_employer} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, co_borrower_employer: newValue })}/>
          </div>
          <div className="col-md-6">
            <FormField name="Employer's Phone Number" value={application.co_borrower_employer_phone_1} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, co_borrower_employer_phone_1: newValue })}/>
          </div>
          <div className="col-md-9">
            <FormField name="Employer's Street Address" value={application.co_borrower_employer_address_1} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, co_borrower_employer_address_1: newValue })}/>
          </div>
          <div className="col-md-3">
            <FormField name="Employer's Suite/Unit #" value={application.co_borrower_employer_address_2} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, co_borrower_employer_address_2: newValue })}/>
          </div>
          <div className="col-md-4">
            <FormField name="Employer's City" value={application.co_borrower_employer_city} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, co_borrower_employer_city: newValue })}/>
          </div>
          <div className="col-md-4">
            <FormField name="Employer's State" value={application.co_borrower_employer_state} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, co_borrower_employer_state: newValue })}/>
          </div>
          <div className="col-md-4">
            <FormField name="Employer's ZIP Code" value={application.co_borrower_employer_zip} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, co_borrower_employer_zip: newValue })}/>
          </div>
          </div>
      </div>


    </div>

  );
};

export default ApplicationView;
