import React, { useState, useEffect } from "react";
import applicationService from "../../../services/applicationService";
import { useParams } from "react-router-dom";
import "../ApplicationView.css";
import FormField from "../FormField";

const SalrefiFormView = ({ isAdmin = false }) => {
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
          <h5 className="section-title">Income, Credit, and Expenses:</h5>
          
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
                <FormField name="Self-reported repos in past year?" value={application.monthly_income} iseditable={isEditable} onChange={(newValue) => setApplication({...application, monthly_income: newValue})}/>
              </div>
              <div className="col-md-6">
                <FormField name="Self-reported FICO" value={application.self_reported_fico} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, self_reported_fico: newValue })}/>
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

            <div className="row">
              <div className="col-md-6">
                <FormField name="Self-reported bankruptcy?" value={application.bankruptcy} iseditable={isEditable} onChange={(newValue) => setApplication({...application, bankruptcy: newValue})}/>
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
                <FormField name="Self-reported original loan amount" value={application.original_balance} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, original_balance: newValue })}/>
              </div>
              <div className="col-md-6">
                <FormField name="Self-reported original loan length (months)" value={application.original_term} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, original_term: newValue })}/>
              </div>
            </div>


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
                <FormField name="Self-reported loan origination date" value={application.origination_date} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, origination_date: newValue })}/>
              </div>
              <div className="col-md-6">
                <FormField name="Next Payment Date" value={application.next_payment_date} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, next_payment_date: newValue })}/>
              </div>
            </div>


            <div className="row">
              <div className="col-md-6">
                <FormField name="Self-reported APR" value={application.self_reported_apr} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, self_reported_apr: newValue })}/>
              </div>
          </div>
          
        <div className="row">
          <h5 className="section-title">New Loan</h5>
              <div className="col-md-6">
                <FormField name="Estimated Loan Amount" value={application.estimated_balance} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, estimated_balance: newValue })}/>
              </div>
              <div className="col-md-6">
                <FormField name="Estimated Term" value={application.estimated_term} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, estimated_term: newValue })}/>
              </div>
          </div>
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

export default SalrefiFormView;
