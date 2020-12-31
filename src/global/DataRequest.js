class DataRequest {
  constructor() {
    this.monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  }

  /**
   * Simple POST request with a JSON body using fetch
   *
   * @param {object} data JS object POST data
   * @param {String} endpoint Endpoint without /
   */
  makePostReq = async (postData, endpoint) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    };

    let response = await fetch(
      `http://localhost:8888/${endpoint}`,
      requestOptions
    );
    console.log(postData);
    console.log(response);
    let data = await response.json();
    return data;
  };

  /**
   * Simple GET request with a query using fetch
   *
   * @param {object} query JS object GET QUERY data
   * @param {String} endpoint Endpoint without /
   */
  makeGetReq = async (params, endpoint) => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    let paramsEncoded = "" + new URLSearchParams(params);
    let response = await fetch(
      `http://localhost:8888/${endpoint}?${paramsEncoded}`,
      requestOptions
    );
    let data = await response.json();
    return data;
  };
}

export default DataRequest;
