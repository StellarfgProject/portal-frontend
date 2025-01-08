import React from "react";
import FormField from "./FormField";

const VehicleLoanSection = ({ vehicles, loans, isEditable, onUpdate }) => {
  return (
    <>
      {vehicles.length === 1 && loans.length === 1 ? (
        <>
            <div className="form-section mb-4">
                {/* Single Vehicle */}
                <h5 className="section-title">Vehicle</h5>
                <div className="row">
                    <div className="col-md-6">
                        <FormField name="VIN (Vehicle Identification Number)" value={vehicles[0].vin} iseditable={isEditable} onChange={(newValue) => onUpdate("vin", newValue, 0, "vehicles")} />
                    </div>
                    <div className="col-md-6">
                        <FormField name="Make" value={vehicles[0].make} iseditable={isEditable} onChange={(newValue) => onUpdate("make", newValue, 0, "vehicles")} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormField name="Model" value={vehicles[0].model} iseditable={isEditable} onChange={(newValue) => onUpdate("model", newValue, 0, "vehicles")} />
                    </div>
                    <div className="col-md-4">
                        <FormField name="Year" value={vehicles[0].model_year} iseditable={isEditable} onChange={(newValue) => onUpdate("model_year", newValue, 0, "vehicles")} />
                    </div>
                    <div className="col-md-4">
                        <FormField name="Mileage" value={vehicles[0].mileage} iseditable={isEditable} onChange={(newValue) => onUpdate("mileage", newValue, 0, "vehicles")} />
                    </div>
                </div>
            </div>

            {/* Single Loan */}
            <div className="form-section mb-4">
                <h5 className="section-title">Current Loan</h5>
                <div className="row">
                    <div className="col-md-6">
                        <FormField name="Monthly Payment" value={loans[0].monthly_payment} iseditable={isEditable} onChange={(newValue) => onUpdate("monthly_payment", newValue, 0, "loans")} />
                    </div>
                    <div className="col-md-6">
                        <FormField name="Remaining loan/payoff amount" value={loans[0].current_payoff} iseditable={isEditable} onChange={(newValue) => onUpdate("current_payoff", newValue, 0, "loans")} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormField name="Remaining term" value={loans[0].remaining_term} iseditable={isEditable} onChange={(newValue) => onUpdate("remaining_term", newValue, 0, "loans")} />
                    </div>
                    <div className="col-md-6">
                        <FormField name="Lien holder" value={loans[0].lien_holder} iseditable={isEditable} onChange={(newValue) => onUpdate("lien_holder", newValue, 0, "loans")} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormField name="Next Payment Date" value={loans[0].next_payment_date} iseditable={isEditable} onChange={(newValue) => onUpdate("next_payment_date", newValue, 0, "loans")}  />
                    </div>
                </div>
            </div>

        </>
      ) : (
        vehicles.map((vehicle, index) => (
        <>
            <div key={index} className="form-section mb-4">
                {/* Vehicle Fields */}
                <h5 className="section-title">Vehicle {index + 1}</h5>
                <div className="row">
                    <div className="col-md-6">
                        <FormField name="VIN (Vehicle Identification Number)" value={vehicle.vin} iseditable={isEditable} onChange={(newValue) => onUpdate("vin", newValue, index, "vehicles")} />
                    </div>
                    <div className="col-md-6">
                        <FormField name="Make" value={vehicle.make} iseditable={isEditable} onChange={(newValue) => onUpdate("make", newValue, index, "vehicles")} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormField name="Model" value={vehicle.model} iseditable={isEditable} onChange={(newValue) => onUpdate("model", newValue, index, "vehicles")} />
                    </div>
                    <div className="col-md-4">
                        <FormField name="Year" value={vehicle.model_year} iseditable={isEditable} onChange={(newValue) => onUpdate("model_year", newValue, index, "vehicles")} />
                    </div>
                    <div className="col-md-4">
                        <FormField name="Mileage" value={vehicle.mileage} iseditable={isEditable} onChange={(newValue) => onUpdate("mileage", newValue, index, "vehicles")} />
                    </div>
                </div>
                
            </div>

            <div key={index} className="form-section mb-4">

                {/* Loan Fields */}
                <h5 className="section-title">Current Loan {index + 1}</h5>
                <div className="row">
                    <div className="col-md-6">
                        <FormField name="Monthly Payment" value={loans[index]?.monthly_payment} iseditable={isEditable} onChange={(newValue) => onUpdate("monthly_payment", newValue, index, "loans")} />
                    </div>
                    <div className="col-md-6">
                        <FormField name="Remaining loan/payoff amount" value={loans[index]?.current_payoff} iseditable={isEditable} onChange={(newValue) => onUpdate("current_payoff", newValue, index, "loans")} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormField name="Remaining term" value={loans[index]?.remaining_term} iseditable={isEditable} onChange={(newValue) => onUpdate("remaining_term", newValue, index, "loans")} />
                    </div>
                    <div className="col-md-6">
                        <FormField name="Lien holder" value={loans[index]?.lien_holder} iseditable={isEditable} onChange={(newValue) => onUpdate("lien_holder", newValue, index, "loans")} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormField name="Next Payment Date" value={loans[index]?.next_payment_date} iseditable={isEditable} onChange={(newValue) => onUpdate("next_payment_date", newValue, index, "loans")} />
                    </div>
                </div>
            </div>
          </>
        ))
    
      )}
    </>
  );
};

export default VehicleLoanSection;
