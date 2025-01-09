import React, { useState, useEffect } from "react";
import applicationService from "../../../services/applicationService";
import { useParams } from "react-router-dom";
import "../ApplicationView.css";
import FormField from "../FormField";

const HomeEquityFormView = ({ isAdmin = false }) => {
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
                <FormField name="Equity Type" value={application.equity_type} iseditable={isEditable} onChange={(newValue) => setApplication({...application, equity_type: newValue})}/>
              </div>  
          
              <div className="col-md-6">
                <FormField name="Monthly Income" value={application.monthly_income} iseditable={isEditable} onChange={(newValue) => setApplication({...application, monthly_income: newValue})}/>
              </div>  
          </div>
          <div className="row">
              <div className="col-md-6">
                <FormField name="Monthly Rent/Mortgage Payment" value={application.monthly_home_payment} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, monthly_home_payment: newValue })}/>
              </div>  
          
              <div className="col-md-6">
                <FormField name="2nd Mortgage" value={application.second_mortgage} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, second_mortgage: newValue })}/>
              </div>  
          </div>
          <div className="row">
              <div className="col-md-6">
              <FormField name="Other Monthly Loan/Credit Expenses" value={application.other_expenses} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, other_expenses: newValue })}/>
              </div>  
          </div>

    </div> 

     {/* loan details */}
    <div className="form-section mb-4">
          <h5 className="section-title">Loan Information</h5>
          <div className="row">
              <div className="col-md-6">
              <FormField name="Amount Requested" value={application.amount_requested} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, amount_requested: newValue })}/>
              </div>  
          
              <div className="col-md-6">
              <FormField name="Terms (Months)" value={application.loan_terms} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, loan_terms: newValue })}/>
              </div>  
          </div>
          <div className="row">
              <div className="col-md-6">
              <FormField name="Loan Reason" value={application.loan_reason} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, loan_reason: newValue })}/>
              </div>  
          
              <div className="col-md-6">
              <FormField name="Property Type" value={application.property_type} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, property_type: newValue })}/>
              </div>  
          </div>
          <div className="row">
              <div className="col-md-6">
              <FormField name="Estimated Property Value" value={application.estimated_property_value} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, estimated_property_value: newValue })}/>
              </div>  
          
              <div className="col-md-6">
              <FormField name="How do you intend to occupy the property?" value={application.intended_occupy_property} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, intended_occupy_property: newValue })}/>
              </div>  
          </div>
    </div>

    {/* Monthly Expenses details */}
    <div className="form-section mb-4">
          <h5 className="section-title">Expected Monthly Expenses</h5>
          <div className="row">
              <div className="col-md-6">
              <FormField name="Monthly Hazard Insurance" value={application.monthly_hazard_insurance} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, monthly_hazard_insurance: newValue })}/>
              </div>  
          
              <div className="col-md-6">
              <FormField name="Monthly Real Estate Taxes" value={application.monthly_real_estate_taxes} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, monthly_real_estate_taxes: newValue })}/>
              </div>  
          </div>
          <div className="row">
              <div className="col-md-6">
              <FormField name="Monthly Mortgage Insurance" value={application.monthly_mortgage_insurance} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, monthly_mortgage_insurance: newValue })}/>
              </div>  
          
              <div className="col-md-6">
              <FormField name="Monthly Homeowner Assn. Dues" value={application.monthly_homeowner_assn_dues} iseditable={isEditable } onChange={(newValue) => setApplication({ ...application, monthly_homeowner_assn_dues: newValue })}/>
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

export default HomeEquityFormView;



         