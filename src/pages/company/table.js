import React from 'react'
import {
    CBadge,
    CCardBody,
    CCollapse,
    CButton,
    CDataTable,
} from '@coreui/react'

import usersData from '../../views/users/UsersData'

const getBadge = (status) => {
    switch (status) {
        case 'Active': return 'success'
        case 'Inactive': return 'secondary'
        case 'Pending': return 'warning'
        case 'Banned': return 'danger'
        default: return 'primary'
    }
}


const Tables = () => {
    const [details, setDetails] = React.useState([])

    const toggleDetails = (index) => {
        const position = details.indexOf(index)
        let newDetails = details.slice()
        if (position !== -1) {
            newDetails.splice(position, 1)
        } else {
            newDetails = [...details, index]
        }
        setDetails(newDetails)
    }

    const fields = [
        { key: 'name', },
        'registered',
        { key: 'role', },
        { key: 'status', },
        { key: 'show_details',
            label: '',
            _style: { width: '1%' },
            sorter: false,
            filter: false
        }
    ]
    return (
        <CDataTable
            items={usersData}
            fields={fields}
            columnFilter
            tableFilter
            itemsPerPageSelect
            itemsPerPage={5}
            hover
            sorter
            pagination
            scopedSlots={{
                'status':
                    (item) => (
                        <td>
                            <CBadge color={getBadge(item.status)}>
                                {item.status}
                            </CBadge>
                        </td>
                    ),
                'show_details':
                    (item, index) => {
                        return (
                            <td className="py-2">
                                <CButton
                                    color="primary"
                                    variant="outline"
                                    shape="square"
                                    size="sm"
                                    onClick={() => { toggleDetails(index) }}
                                >
                                    {details.includes(index) ? 'Hide' : 'Action'}
                                </CButton>
                            </td>
                        )
                    },
                'details':
                    (item, index) => {
                        return (
                            <CCollapse show={details.includes(index)}>
                                <CCardBody>
                                    <h4>
                                        {item.username}
                                    </h4>
                                    <p className="text-muted">User since: {item.registered}</p>
                                    <CButton size="sm" color="info">
                                        Edit
                                    </CButton>
                                    <CButton size="sm" color="danger" className="ml-1">
                                        Delete
                                    </CButton>
                                </CCardBody>
                            </CCollapse>
                        )
                    }
            }}
        />
    )
}

export default Tables
