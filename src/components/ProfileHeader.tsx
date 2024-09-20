import { Link, Outlet, useLocation } from "react-router-dom";

import styles from '../styles/profileHeader.module.css'

export default function ProfileHeader() {

    const location = useLocation()
    const {pathname} = location

    const links =[
        {name:'المعلومات الشخصية',url:'/profile'},
        {name:'معلومات الحماية',url:'/profile/security'},
        {name:'الثغرات المكتشفة',url:'/profile/bugs'},
        {name:'الشركات',url:'/profile/companies'},
        {name:'التقارير المرسلة',url:'/profile/reports'},
    ]

    return (
        <>
            <div className="flex justify-center mb-5">
                <div className={`${styles.header} flex justify-around p-5 rounded-br-2xl rounded-bl-2xl text-white`} style={{ backgroundColor: 'var(--primary)',width:'95vw' }}>
                    {links.map(({name,url},index)=>{
                        const isActive = pathname===url
                        return <Link to={url} key={index} className={isActive?`${styles.link} relative`:'relative'}>{name}</Link>
                    })}
                </div>
            </div>

            <Outlet />
        </>
    )
}
