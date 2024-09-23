import { Link, Outlet, useLocation } from "react-router-dom";

import styles from '../styles/profileHeader.module.css'
import { profileLinks } from "../constants/data";

export default function ProfileHeader() {

    const location = useLocation()
    const {pathname} = location



    return (
        <>
            <div className="flex justify-center mb-5">
                <div className={`${styles.header} flex justify-around p-5 rounded-br-2xl rounded-bl-2xl text-white`} style={{ backgroundColor: 'var(--primary)',width:'95vw' }}>
                    {profileLinks.map(({name,url},index)=>{
                        const isActive = pathname===url
                        return <Link to={url} key={index} className={isActive?`${styles.link} relative`:'relative'}>{name}</Link>
                    })}
                </div>
            </div>

            <Outlet />
        </>
    )
}
