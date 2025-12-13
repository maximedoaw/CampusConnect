import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { NavBar } from "@/components/layout/NavBar";


const RootLayout = async ({ children }: { children: ReactNode }) => {

    return (
        <div>
            <NavBar />
            {children}
        </div>
    )
};

export default RootLayout;