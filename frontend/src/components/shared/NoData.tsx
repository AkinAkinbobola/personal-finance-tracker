import * as React from "react";

interface NoDataProps {
    children: React.ReactNode
}

const NoData = ({children}: NoDataProps) => {
    return (
        <div className={"flex justify-center items-center h-full"}>
            <div className={"flex flex-col items-center gap-3"}>
                <img src="/no-data.png" alt="No Data Image"/>
                {children}
            </div>
        </div>
    );
};

export default NoData;