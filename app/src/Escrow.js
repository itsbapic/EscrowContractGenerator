export default function Escrow({
  address,
  arbiter,
  beneficiary,
  value,
  handleApprove,
  handleRefund,
  handleToggleActionability,
}) {
  return (
    <div className="existing-contract">
      <ul className="fields">
        <li>
          <div> Arbiter </div>
          <div> {arbiter} </div>
        </li>
        <li>
          <div> Beneficiary </div>
          <div> {beneficiary} </div>
        </li>
        <li>
          <div> Value </div>
          <div> {value} </div>
        </li>
        <div
          className="button"
          id={address + "Toggle"}
          onClick={(e) => {
            e.preventDefault();

            handleToggleActionability();
          }}>
          Toggle Actionability
        </div>
        <div className="buttonContainer">
          <div
            className="button contractAction"
            id={address + "Approve"}
            onClick={(e) => {
              e.preventDefault();

              handleApprove();
            }}
          >
            Approve
          </div>
          <div
            className="button contractAction"
            id={address + "Refund"}
            onClick={(e) => {
              e.preventDefault();

              handleRefund();
            }}>
            Refund
          </div>
        </div>
      </ul>
    </div>
  );
}
