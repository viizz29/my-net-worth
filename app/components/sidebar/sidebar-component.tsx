"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface SideBarProps {
    show: boolean
}

const SideBar = (props: SideBarProps) => {
    const items: { [key: string]: string } = {
        Home: "/",
        Test: "/test",
        "Hit Test History": "/hit-test-history",
        "Dashboard": "/dashboard",
        "Account Management": "/account-management",
        "Transaction Management": "/transaction-management"
    };

    const pathName = usePathname();
    console.log("pathname", pathName);
    return (
        <>
            {props.show && (
                <div className='bg-white w-96 h-[100%] p-2 border border-green-200 shadow'>

                    {Object.keys(items).map((item: string, index: number) =>
                        <Link href={items[item]} key={index}>
                            <div className={
                                ((pathName === "/" && items[item] == "/") || (pathName !== "/" && items[item].startsWith(pathName))) ?
                                    "rounded bg-green-600 p-2 m-2 hover:bg-green-200"
                                    : "rounded bg-gray-600 p-2 m-2 hover:bg-gray-200"}>{item}</div>
                        </Link>
                    )}
                </div>
            )}
        </>


    );
}

export default SideBar;
