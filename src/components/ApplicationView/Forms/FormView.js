import React, { useState, useEffect } from "react";
import applicationService from "../../../services/applicationService";
import { useParams } from "react-router-dom";
import "../ApplicationView.css";
import FormField from "../FormField";

const FormView = ({ isAdmin = false }) => {
    const { id } = useParams();
    const [application, setApplication] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    if (!id) {
      setError("Application ID is missing.");
      return;
    }
    const fetchApplicationDetails = async () => {
      setLoading(true);
      try {
        const data = await applicationService.getApplicationById(id);
        if (!data.valid) {
          throw new Error("Invalid application data.");
        }
        setApplication(data);
        setIsEditable(isAdmin);
      } catch (err) {
        setError(err.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };
    fetchApplicationDetails();
  }, [id, isAdmin]);
  
  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">  <span className="visually-hidden">Loading...</span>     </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">  {error}  </div>
      </div>
    );
  }

  return (
    <>
             
          {/* income details */}
          <div className="form-section mb-4">
          <h5 className="section-title">Applicant Income, Credit, and Expenses:</h5>
          
            <div className="row">
              <div className="col-md-6">
                <FormField name="Monthly Income" value={application.monthly_income} iseditable={isEditable} onChange={(newValue) => setApplication({...application, monthly_income: newValue})}/>
              </div>
              <div className="col-md-6">
                <FormField name="Rent or Own" value={application.rent_own} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, rent_own: newValue })}/>
              </div>
            </div>
          
            <div className="row">    
              <div className="col-md-6">
                <FormField name="Monthly Rent/Mortgage Payment" value={application.monthly_home_payment} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, monthly_home_payment: newValue })}/>
              </div>
              <div className="col-md-6">
                <FormField name="Other Monthly Loan/Credit Expenses" value={application.other_expenses} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, other_expenses: newValue })}/>
              </div>
            </div>
          
          </div>
          
          {/* Vehicle */}
          <div className="form-section mb-4">
          <h5 className="section-title">Vehicle</h5>
          <div className="row">
              <div className="col-md-6">
                <FormField name="VIN (Vehicle Identification Number)" value={application.vin} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, vin: newValue })}/>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <FormField name="Make" value={application.make} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, make: newValue })}/>
              </div>
              <div className="col-md-6">
                <FormField name="Model" value={application.model_year} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, model_year: newValue })}/>
              </div>
            </div>
          
            <div className="row">
              <div className="col-md-6">
                <FormField name="Year" value={application.year} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, year: newValue })}/>
              </div>
              <div className="col-md-6">
                <FormField name="Mileage" value={application.mileage} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, mileage: newValue })}/>
              </div>
            </div>      
          </div>
          
          {/* current loan */}
          <div className="form-section mb-4">
            <h5 className="section-title">Current Loan</h5>
          
            <div className="row">
              <div className="col-md-6">
                <FormField name="Monthly Payment" value={application.current_monthly_payment} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, current_monthly_payment: newValue })}/>
              </div>
              <div className="col-md-6">
                <FormField name="Remaining loan/payoff amount" value={application.current_payoff} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, current_payoff: newValue })}/>
              </div>
            </div>
          
            <div className="row">
              <div className="col-md-6">
                <FormField name="Remaining term" value={application.current_remaining_term} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, current_remaining_term: newValue })}/>
              </div>
              <div className="col-md-6">
                <FormField name="Lien holder" value={application.lien_holder} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, lien_holder: newValue })}/>
              </div>
            </div>
          
            <div className="row">
              <div className="col-md-6">
                <FormField name="Next Payment Date" value={application.next_payment_date} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, next_payment_date: newValue })}/>
              </div>
              </div>
          </div>
          
          {/* Vehicle - 2
          <div className="form-section mb-4">
          <h5 className="section-title">Vehicle - 2</h5>
          <div className="row">
              <div className="col-md-6">
                <FormField name="VIN (Vehicle Identification Number)" value={application.vin_number_2} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, vin_number_2: newValue })}/>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <FormField name="Make" value={application.make_2} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, make_2: newValue })}/>
              </div>
              <div className="col-md-6">
                <FormField name="Model" value={application.model_22} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, model_2: newValue })}/>
              </div>
            </div>
          
            <div className="row">
              <div className="col-md-6">
                <FormField name="Year" value={application.year_2} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, year_2: newValue })}/>
              </div>
              <div className="col-md-6">
                <FormField name="Mileage" value={application.mileage_2} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, mileage_2: newValue })}/>
              </div>
            </div>   
          </div> */}
          
          {/* current loan
          <div className="form-section mb-4">
            <h5 className="section-title">Current Loan - 2</h5>
          
            <div className="row">
              <div className="col-md-6">
                <FormField name="Monthly Payment" value={application.current_monthly_payment_2} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, current_monthly_payment_2: newValue })}/>
              </div>
              <div className="col-md-6">
                <FormField name="Remaining loan/payoff amount" value={application.current_payoff_2} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, current_payoff_2: newValue })}/>
              </div>
            </div>
          
            <div className="row">
              <div className="col-md-6">
                <FormField name="Remaining term" value={application.current_remaining_term_2} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, current_remaining_term_2: newValue })}/>
              </div>
              <div className="col-md-6">
                <FormField name="Lien holder" value={application.lien_holder_2} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, lien_holder_2: newValue })}/>
              </div>
            </div>
          
            <div className="row">
              <div className="col-md-6">
                <FormField name="Next Payment Date" value={application.next_payment_date_2} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, next_payment_date_2: newValue })}/>
              </div>
              </div>
          </div> */}


          
            
          {/* co-borrower details */}
          <div className="form-section mb-4">
          {application.co_borrower_relationship == null && application.co_borrower_first_name == null  && application.co_borrower_last_name == null && (
          <>
          <h5 className="section-title">Co-Borrower Details are not available</h5>
          </>
          )}

          
          {/* Conditional rendering based on co-borrower's first and last name */}
          {application.co_borrower_relationship && application.co_borrower_first_name && application.co_borrower_last_name && (
          <>
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
            </div>
          
            <div className="row">  
              <div className="col-md-6">
                <FormField name="Phone Number" value={application.co_borrower_phone_1} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, co_borrower_phone_1: newValue })} />
              </div>
              <div className="col-md-6">
                <FormField name="Email Address" value={application.co_borrower_email} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, co_borrower_phone_1: newValue })} />
              </div>
            </div>
          
            <div className="row">
              <div className="col-md-6">
                <FormField name="Date of Birth" value={application.co_borrower_dob} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, co_borrower_dob: newValue })} />
              </div>
              <div className="col-md-6">
                <FormField name="Marital Status" value={application.co_borrower_marital_status} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, co_borrower_marital_status: newValue })}/>
              </div>
            </div>
          
            <div className="row">
              <div className="col-md-6">
                <FormField name="Driver's License Number" value={application.co_borrower_license_no} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, co_borrower_license_no: newValue })} />
              </div>
              <div className="col-md-6">
                <FormField name="License State" value={application.co_borrower_license_state} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, co_borrower_license_state: newValue })}/>
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-6">
                <FormField name="License Issue Date" value={application.co_borrower_drivers_license_issue_date} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, co_borrower_drivers_license_issue_date: newValue })}/>
              </div>
              <div className="col-md-6">
                <FormField name="License Expiration Date" value={application.co_borrower_drivers_license_expire_date} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, co_borrower_drivers_license_expire_date: newValue })}/>
              </div>
            </div>
          
            <div className="row">
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
            </div>
          
            <div className="row">
              <div className="col-md-6">
                <FormField name="Rent or Own" value={application.co_borrower_rent_own} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, co_borrower_rent_own: newValue })}/>
              </div>
              <div className="col-md-6">
                <FormField name="Monthly Rent/Mortgage Payment" value={application.co_borrower_monthly_home_payment} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, co_borrower_monthly_home_payment: newValue })}/>
              </div>
            </div>
            
          
           {/* co-borrower address */}
          
            <h5 className="section-title">Co-borrower Home Address</h5>
          
            <div className="row">
                <div className="col-md-9">
                  <FormField name="Street Address" value={application.co_borrower_address_1} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, co_borrower_address_1: newValue })}/>
                </div>
                <div className="col-md-3">
                  <FormField name="Apt/Unit #" value={application.co_borrower_address_2} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, co_borrower_address_2: newValue })} />
                </div>
            </div>
          
            <div className="row">
                <div className="col-md-4">
                  <FormField name="City" value={application.co_borrower_city} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, co_borrower_city: newValue })} />
                </div>
                <div className="col-md-4">
                  <FormField name="State" value={application.co_borrower_state} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, co_borrower_state: newValue })}/>
                </div>
                <div className="col-md-4">
                  <FormField name="ZIP Code" value={application.co_borrower_zip} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, co_borrower_zip: newValue })} />
                </div>
            </div>
          
            <div className="row">
                  <div className="col-md-6">
                    <FormField name="Current Address Since" value={application.co_borrower_address_since} iseditable={isEditable} onChange={(newValue) => setApplication({ ...application, co_borrower_address_since: newValue })} />
                  </div>
            </div>
          
          
           {/* co-borrower employment */}
          
            <h5 className="section-title">Co-borrower Employment</h5>
          
            <div className="row">
                <div className="col-md-6">
                  <FormField name="Employment Status" value={application.co_borrower_employment_status} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, co_borrower_employment_status: newValue })}/>
                </div>
            </div>
          
            {/* Conditional rendering based on employment_status */}
            {application.co_borrower_employment_status !== "retired" && application.co_borrower_employment_status !== "un-employed" && (
            <>
            
              <div className="row">
                <div className="col-md-6">
                  <FormField name="Your Job Title" value={application.co_borrower_job_title} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, co_borrower_job_title: newValue })}/>
                </div>
                <div className="col-md-6">
                  <FormField name="Current Employer Since" value={application.co_borrower_employer_since} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, co_borrower_employer_since: newValue })}/>
                </div>
              </div>
          
              <div className="row">
                <div className="col-md-6">
                  <FormField name="Employer's Name" value={application.co_borrower_employer} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, co_borrower_employer: newValue })}/>
                </div>
                <div className="col-md-6">
                  <FormField name="Employer's Phone Number" value={application.co_borrower_employer_phone_1} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, co_borrower_employer_phone_1: newValue })}/>
                </div>
              </div>
          
              <div className="row">
                <div className="col-md-9">
                  <FormField name="Employer's Street Address" value={application.co_borrower_employer_address_1} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, co_borrower_employer_address_1: newValue })}/>
                </div>
                <div className="col-md-3">
                  <FormField name="Employer's Suite/Unit #" value={application.co_borrower_employer_address_2} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, co_borrower_employer_address_2: newValue })}/>
                </div>
              </div>
          
              <div className="row">
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
            </>
            )}
          
          </>  
          )}
          
          
          </div>


          {/* employment */}
          <div className="form-section mb-4">
                        <h5 className="section-title">Employment</h5>
                        
                        <div className="row">
                          <div className="col-md-6">
                            <FormField name="Employment Status" value={application.employment_status} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, employment_status: newValue })}/>
                          </div>
                        </div>
                        
                         {/* Conditional rendering based on employment_status */}
                          {application.employment_status !== "retired" && application.employment_status !== "un-employed" && application.employment_status !== "unemployed" && (
                         <>
                        <div className="row">
                          <div className="col-md-6">
                            <FormField name="Your Job Title" value={application.job_title} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, job_title: newValue })}/>
                          </div>
                          <div className="col-md-6">
                            <FormField name="Current Employer Since" value={application.employer_since} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, employer_since: newValue })}/>
                          </div>
                        </div>
                        
                        <div className="row">
                          <div className="col-md-6">
                            <FormField name="Employer's Name" value={application.employer} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, employer: newValue })}/>
                          </div>
                          <div className="col-md-6">
                            <FormField name="Employer's Phone Number" value={application.employer_phone_1} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, employer_phone_1: newValue })}/>
                          </div>
                        </div>
                        
                        <div className="row">
                          <div className="col-md-9">
                            <FormField name="Employer's Street Address" value={application.employer_address_1} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, employer_address_1: newValue })}/>
                          </div>
                          <div className="col-md-3">
                            <FormField name="Employer's Suite/Unit #" value={application.employer_address_2} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, employer_address_2: newValue })}/>
                          </div>
                        </div>
                        
                        <div className="row">
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
                          </>
                          )}
                        </div>          
      
    </>
  );
};

export default FormView;
