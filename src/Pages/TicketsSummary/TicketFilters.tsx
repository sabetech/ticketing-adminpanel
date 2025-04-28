import { useCallback } from 'react';
import {Radio, Typography, Space, AutoComplete, Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useGetSearchIndexes } from '../../hooks/Tickethooks';
import _ from 'lodash';

type TicketFiltersProps = {
    setFilter: Function
}

const TicketFilters:React.FC<TicketFiltersProps> = ({setFilter}) => {
    
    const [selectedSearchFilter, setSelectedSearchFilter] = useState('Car Number');
    const [searchString, setSearchString] = useState('');
    const [autocompleteInput, setAutocompleteInput] = useState('');
    
    const {data: searchResults, isLoading} = useGetSearchIndexes(selectedSearchFilter, searchString);

    const optionsMain = [
        { label: 'Car Number', value: 'Car Number' },
        { label: 'Ticket ID', value: 'Ticket ID' },
        { label: 'Rate', value: 'Rate' },
        { label: 'Agent', value: 'Agents' },
        { label: 'Station', value: 'Station' },
        { label: 'Rate Category', value: 'Rate Category' },
    ];

    const onRadioChange = (_value) => {
        console.log("Value here::", _value.target.value)
        setSelectedSearchFilter(_value.target.value)
        setAutocompleteInput('')
    }

    const onSearch = (text) => {
        debounceSearch(text);
    }

    const debounceSearch = useCallback(
        _.debounce((text) => {
            setSearchString(text)
        }, 300),
        []
      );

    const setFilterVal = (value) => {

        setFilter((prev) => {
            
            if (prev.hasOwnProperty('dateRange')) {
                return ({dateRange: prev.dateRange, [selectedSearchFilter.toLowerCase().replace(' ', '_')]: value})
            }
            
            return ({[selectedSearchFilter.toLowerCase().replace(' ', '_')]: value})    
            
        }); 
        
    }

    console.log("Search results here::", searchResults)

    return (
        <>
            <Typography style={{padding: '10px'}}>Filter  By</Typography>
            <Space direction='vertical'>
                <Space style={{justifyContent: 'space-between'}}>
                    <Radio.Group
                        size={"large"}
                        options={optionsMain}
                        defaultValue={selectedSearchFilter}
                        optionType="button"
                        buttonStyle="solid"
                        onChange={onRadioChange}
                    />
                </Space>
                <Space>
                    <AutoComplete
                        value={autocompleteInput}
                        onChange={(text) => {
                            if (text.length == 0) {
                                setFilter((prev) => {
                                    if (prev.hasOwnProperty('dateRange')) {
                                        return ({dateRange: prev.dateRange})
                                    }
                                    return {}
                                });
                            }

                            setAutocompleteInput(text)
                            
                            }
                        }
                        size='large'
                        style={{ width: 400 }}
                        allowClear
                        onClear={() => {
                            setFilter((prev) => {
                                if (prev.hasOwnProperty('dateRange')) {
                                    return ({dateRange: prev.dateRange})
                                }
                                return {}
                            });
                            setAutocompleteInput('')
                        }}
                        placeholder={ `Search by ${selectedSearchFilter}` }
                        onSearch={(text) => onSearch(text)}
                        onSelect={(value) => setFilterVal(value)}
                        options={searchResults && searchResults.map((item) => ({ value: item }))}
                    />
                    {isLoading && <Spin indicator={<LoadingOutlined spin />} size="large" />}
                </Space>
            </Space>
        </>
    )
}

export default TicketFilters