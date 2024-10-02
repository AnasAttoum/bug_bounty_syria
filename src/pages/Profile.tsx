import { useSelector } from "react-redux"
import { RootState } from "../lib/store"
import SecurityResearcherProfile from "../components/profile/SecurityResearcherProfile"
import CompanyProfile from "../components/profile/CompanyProfile"

export default function Profile() {

  const { signUpType } = useSelector((state: RootState) => state.reducers.user)

  return (
    <>
      {(signUpType as number) === 0 ?
        <CompanyProfile />
        :
        <SecurityResearcherProfile />
      }
    </>
  )
}
