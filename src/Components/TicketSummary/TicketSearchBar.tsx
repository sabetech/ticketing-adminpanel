import { useEffect, useState } from "react";
import { Button, Select, Spin, Space } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import { useQuery } from "@tanstack/react-query";
import { searchAutocomplete, searchTickets } from "../../Services/TicketService";
const { Option } = Select

const TicketSearchBar = ( { setTickets } ) => {

    const [searchValue, setSearchValue] = useState('');
    const [field, setSearchField] = useState('car_number');
    const [selectedSearchValue, setSelectedSearchValue] = useState('');
    const [autocompleteOptions, setAutoCompleteOptions] = useState<{value: string, label: string}[]>(undefined)

    const { data:searchAutoCompleteResults, refetch, isFetching } = useQuery({
        queryKey: ['search_results', searchValue, field],
        queryFn: async () => {
            return searchAutocomplete(field, searchValue)
        },
        enabled: false
    });

    const { data: searchResults, refetch: search, isFetching: isSearching} = useQuery({
        queryKey: ['ticketsIssued'],
        queryFn: async () => searchTickets(field, selectedSearchValue),
        enabled: false
    })

    useEffect(() => {

        debounchSearch(searchValue)

    },[searchValue, field])

    useEffect(() => {

        console.log("IFEO", searchAutoCompleteResults);

        if (typeof searchAutoCompleteResults !== 'undefined') {
            
            setAutoCompleteOptions(searchAutoCompleteResults.data.map(res => ({
                value: res,
                label: res
            }))) 
        }else{
            setAutoCompleteOptions([]);
        }
    }, [searchAutoCompleteResults]);

    useEffect(() => {
        if (searchResults)
            setTickets(searchResults.data.map((tkt) => ({...tkt, key: tkt.id})))
    },[searchResults]);

    const debounchSearch = (searchTerm) => {
        setSearchValue(searchTerm);
        if (searchTerm.length < 2) return;

        refetch();
    }

    const handleSearch = () => {
        search();
    }

    const SelectBefore = () => (
        <Select value={field} style={{width: 200}} size={'large'} onChange={(value) => setSearchField(value)}>
            <Option value="ticket_id">Ticket ID</Option>
            <Option value="car_number">Car Number</Option>
            <Option value="agent">Agent</Option>
        </Select>
    )

    return <>
    <Space direction="horizontal">
        <SelectBefore />
        <Select 
            showSearch
            options={autocompleteOptions ?? []}
            onSearch={(args) => setSearchValue(args)}
            style={{width: 400}}
            size="large"
            loading={isFetching}
            notFoundContent={isFetching ? <Spin size="small" /> : null}
            onSelect={(value) => {
                setSelectedSearchValue(value)
            }}
        />
        <Button size="large" type="primary" icon={<SearchOutlined />} onClick={() => handleSearch()} loading={isSearching}>Search</Button> 
        </Space>
    </>

}

export default TicketSearchBar;