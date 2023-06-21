function RequestTicket() {
  var blank1 = 'general queries';
  var contactNo = '+65 9123 4567';
  return (
    <div className="form-container flex-grow" id="requestTicket">
      <div className="notice border-solid border-2 border-black">
        <p>
          <span>For {blank1}, please refer to the Frequently Asked Questions FAQ Page </span>
          <a href="#" className="underline">
            here.
          </a>
        </p>
        <p>
          <span>In case of emergencies, please contact us at {contactNo}</span>
        </p>
      </div>
    </div>
  );
}

export default RequestTicket;