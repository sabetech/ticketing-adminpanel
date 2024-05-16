import { Table, Tag } from "antd";
import type { TableProps } from 'antd';
import { TAgentOnlineStatus } from '../../Types/Agent'
import dayjs from "dayjs";

type Props = {
    isLoading: boolean
    agentsOnline: TAgentOnlineStatus[]
}

const TableAgentsOnline:React.FC<Props> = ({agentsOnline, isLoading}) => {
    
    const columns: TableProps<TAgentOnlineStatus>['columns'] = [
        {
            title: 'Agent',
            dataIndex: 'agent',
            key: 'agent',
            render: (value) => value.fname +" "+value.lname
        },
        {
            title: 'Status',
            dataIndex: '',
            key: 'status',
            render: (_, record: TAgentOnlineStatus) => {
                /*
                    - if logout time is greater than login, then show loggedOut, else show loggedIn at <time>
                    - if LoggedIn check latest_online_at for the online status, if time is more than 10 mins
                        - show status <Online>, <Offline> since <time>
                */
                const loginDate = dayjs(record.loggedin_at);
                const logoutDate = dayjs(record.loggedout_at);

                if (loginDate.isValid()) {
                    if (logoutDate.isValid()) {
                        if (loginDate.isBefore(logoutDate)) {
                            return (<>
                                <Tag color="red">Logged Out</Tag>
                            </>)
                        }
                    }else{
                        const latestOnlineAt = dayjs(record.latest_online_at);
                        const minutesPassed = dayjs().diff(latestOnlineAt, 'minute');
                        if ((minutesPassed > 15) && (minutesPassed < 90)) {
                            return (<>
                                <Tag color="orange">Online Since <strong>{
                                    (minutesPassed > 60 ? `${Math.floor(minutesPassed / 60)} hrs ${minutesPassed % 60} mins` : `${minutesPassed} mins`)
                                }</strong></Tag>
                            </>)
                        }else if (minutesPassed >= 90) {
                            return (<>
                                <Tag color="red">Online Since <strong>{
                                    `${Math.floor(minutesPassed / 60)} hrs ${minutesPassed % 60} mins`
                                }</strong></Tag>
                            </>)
                        }
                        else {
                            return (<>
                                <Tag color="green">Online Since <strong>{minutesPassed}</strong> mins</Tag>
                            </>)
                        }
                        
                    }
                }    
                return (
                    <Tag>Not Determined</Tag>
                )   
            }
        }
    ]

    return (
        <Table 
            loading={isLoading}
            columns={columns}
            dataSource={agentsOnline}
            pagination={false} 
        />
    )
}

export default TableAgentsOnline;