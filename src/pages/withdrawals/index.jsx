import React, { useEffect } from 'react'
import PageTop from '../../components/PageTop'
import { BiMoneyWithdraw } from 'react-icons/bi';
import Empty from '../../components/Empty';
import TableUI from '../../components/TableUI';
import { useFetchedContext } from '../../context/FetchedContext';

function index() {
    const { withdrawals, error, loader, handleFetchWithdrawalData } = useFetchedContext();

    const columns = [];

    useEffect(function() {
        document.title = "Passpro | Withdrawal History"
        handleFetchWithdrawalData()
    }, [])

    return (
        <>
            <PageTop title="Withdrawal History" />


            <TableUI
                data={withdrawals}
                columns={columns}
                loader={loader}
                EmptyComponent={<Empty text="No Withdrawal Yet" icon={<BiMoneyWithdraw />} />}
            />

        </>
    )
}

export default index