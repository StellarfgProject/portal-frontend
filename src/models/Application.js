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
    }) {
      this.name = `${first_name} ${last_name}`;
      this.cityState = `${city}, ${state}`;
      this.phone = phone_1;
      this.email = email;
      this.submittedAt = ts_formatted;
      this.domain = domain;
      this.status = status;
      this.guid = guid;
    }
  }
  
  export default Application;
  