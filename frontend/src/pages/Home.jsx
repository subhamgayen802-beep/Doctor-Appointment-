
import Banner from "../components/Banner"
import Bodyimg from "../components/Bodyimg"
import SpecialityMenu from "../components/SpecalityMenu"
import TopDoctor from "../components/TopDoctor"

export default function Home(){
    return(
     <div className="bg-white">
      <Bodyimg></Bodyimg>
      <SpecialityMenu></SpecialityMenu>
      <TopDoctor></TopDoctor>
      <Banner></Banner>
      
     </div>
    )
}