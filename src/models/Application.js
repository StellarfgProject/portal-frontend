class Application {
    constructor({
      first_name,
      last_name,
      city,
      state,
      phone_1,
      email,
      ts_formatted,
      domain,
      status,
      guid,
      claimed_by_full_name,
      claimed_by,
      status_updated_at_formatted

    }) {
      this.name = `${first_name} ${last_name}`;
      this.cityState = `${city}, ${state}`;
      this.phone = phone_1;
      this.email = email;
      this.submittedAt = ts_formatted;
      this.domain = domain;
      this.status = status;
      this.guid = guid;
      this.claimed_by_full_name = claimed_by_full_name;
      this.claimed_by = claimed_by;
      this.status_updated_at_formatted = status_updated_at_formatted;
    }
  }
  
  export default Application;
  