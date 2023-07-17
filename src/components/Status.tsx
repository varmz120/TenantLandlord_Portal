import { FC } from 'react';
import openTicket from '../images/ticket_opened_icon.svg';
import pendingQuote from '../images/ticket_pendingQuote_icon.svg';
import pendingApprove from '../images/ticket_pendingApprove_icon.svg';
import closeTicket from '../images/ticket_closed_icon.svg';
import rejectTicket from '../images/ticket_rejected_icon.svg';
import inProgressTicket from '../images/ticket_progress_icon.svg';
import inQueueTicket from '../images/ticket_queue_icon.svg';

interface InputProps {
  label: string;
  value: string;
  padding_right: string | number;
}

const Status: FC<InputProps> = ({
  label,
  value, // TODO: Pass in from MongoDB ticket status string
  padding_right,
}) => {
  const statuses: { [key: string]: string } = {
    Opened: openTicket,
    'In Queue': inQueueTicket,
    'In Progress': inProgressTicket,
    'Pending Quote': pendingQuote,
    'Pending Approval': pendingApprove,
    Closed: closeTicket,
    Rejected: rejectTicket,
  };
  return (
    <div className="flex flex-col align-center text-left input-wrapper">
      <label
        style={{ paddingRight: padding_right + 'px' }}
        className="text-lg font-medium text-headerText"
        htmlFor={label}
      >
        {label}
      </label>
      <img className="my-6 max-w-[250px]" alt={value} src={statuses[value]} />
    </div>
  );
};

export default Status;
