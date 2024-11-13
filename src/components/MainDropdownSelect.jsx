import React from 'react'
import Select from 'react-dropdown-select'


function MainDropdownSelect({ options, multiple=false, field, title, value, searchable = true, setValue, noDataLabel="No Data" }) {
    return (
        <div style={{ width: "100%", textTransform: "capitalize" }}>
            <Select
                className="form--select"
                values={value}
                searchBy={field}
                multi={multiple}
                options={options}
                labelField={field}
                valueField={field}
                closeOnSelect
                searchable={searchable}
                separator
                clearable
                color='#FC6435'
                onChange={(values) => setValue(values)}
                placeholder={`Select ${title}`}
                clearOnSelect={true}
                noDataLabel={noDataLabel}
                addPlaceholder={multiple ? " + add." : ""}
                
            />
        </div>
    )
}

export default MainDropdownSelect