import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { createContext, useContext, useEffect, useReducer } from "react";


interface CommonState {
    signalr: HubConnection | null;
}

export enum ActionType {
    SetSignalR,
}

export interface SetSignalR {
    type: ActionType.SetSignalR;
    payload: HubConnection;
}


export type CommonActions = SetSignalR;


interface CommonContextProps {
    signalrState: CommonState;
    SetSignalR: (data: HubConnection) => void;
}

const SignalRContext = createContext<CommonContextProps | undefined>(undefined);

const commonReducer = (state: CommonState, action: CommonActions): CommonState => {
    switch (action.type) {
        case ActionType.SetSignalR:
            return {
                ...state,
                signalr: action.payload
            };
        default:
            return state;
    }
};

export const SignalRProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [signalrState, dispatch] = useReducer(commonReducer, {
        signalr: null,
    });

    useEffect(() => {
        const hubConnection = new HubConnectionBuilder()
            .withUrl('http://localhost:5165/chatHub')
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

        hubConnection.on('GetConnectionId', (id: string) => {
            console.log(`${id} is online`);
        })

        hubConnection.on('ReceiveMessage', (user: string, msg: string) => {
            console.log(`${user} send msg: ${msg}`);
        })

        hubConnection.start().catch(error =>
            console.log('Error establishing the connection: ', error));

        SetSignalR(hubConnection);
    }, [])

    const SetSignalR = (data: HubConnection) => {
        dispatch({ type: ActionType.SetSignalR, payload: data });
    };

    return (
        <SignalRContext.Provider value={{ signalrState, SetSignalR }}>
            {children}
        </SignalRContext.Provider>
    )
}

export const useSignalR = () => {
    const context = useContext(SignalRContext);
    if (!context) {
        throw new Error('useSignalR must be used within a SignalRProvider');
    }
    return context;
};