import { ChangeEvent, FC, SetStateAction } from 'react'
import { useState } from 'react'

interface InputProps {
  type: 'text'
  layout: string
}

const SearchBldgField: FC<InputProps> = ({
  type,
  layout,
}) => {

const [value, setValue] = useState('');

const onChange = (event: { target: { value: SetStateAction<string> } }) => {
  setValue(event.target.value);
}

const onSearch = (searchTerm: SetStateAction<string>) => {
  setValue(searchTerm);
  //console.log('search', searchTerm);
}

const options = [
  {value: 'B-001', label: 'B-001'},
  {value: 'B-002', label: 'B-002'},
  {value: 'B-003', label: 'B-003'},
  {value: 'B-004', label: 'B-004'},
  {value: 'B-005', label: 'B-005'},
  {value: 'B-006', label: 'B-006'},
  {value: 'B-007', label: 'B-007'},
  {value: 'B-009', label: 'B-009'},
  {value: 'B-010', label: 'B-010'},
]

  return (
    <div className={"flex align-center text-left input-wrapper py-3 " + (layout == 'vertical' ? 'flex-col' : '')}>
      <label style={{ paddingRight: 60 }} className="pr-4 font-medium text-headerText">Building ID</label>
      <div className='search-container'>
        <div className='flex flex-center search-inner'>
          <input className='border border-gray rounded-lg' type='text' value={value} onChange={onChange} />
        </div>
        <div className='dropdown'>
      {options.filter(options => {
        const searchTerm = value.toLowerCase();
        const option = options.label.toLowerCase();

        return (
          searchTerm && option.includes(searchTerm) && option !==searchTerm
          );
      })
      .slice(0,10)


      .map(options => (
        <div onClick={()=>onSearch(options.label)} 
        className='dropdown-row'
        key={options.label}>
        {options.label}</div>
      ))}
        </div>
      </div>
    </div>
  )
}
export default SearchBldgField;