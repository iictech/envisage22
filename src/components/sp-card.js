import cfp from '../sponsor_images/cfp.png'
import d2c from '../sponsor_images/d2c.png'
import ff from '../sponsor_images/ff.png'
import lwt from '../sponsor_images/lwt.png'
import sol from '../sponsor_images/solvoix.png'
import Card from './sp-card-prop'

export default function Spcard(){
    return(
        <>
            <Card
                img = {d2c}
                width = {240}
                height = {170}
                name = "Powered By"
                phone = "Unstop"
                email = "https://unstop.com/"
            />

            <Card
                img = {lwt}
                width = {240}
                height = {170}
                name = "Knowledge Partner"
                phone = "Learn While Travelling"
                email = "https://learningwhiletravelling.com/home"
            />

            <Card
                img = {ff}
                width = {240}
                height = {170}
                name = "Ecosystem partner"
                phone = "Free Flow"
                email = "https://freeflow.zone/"
            />
            
            <Card
                img = {cfp}
                width = {240}
                height = {170}
                name = "Event Partner"
                phone = "Co Founder's Planet"
                email = "https://www.crunchbase.com/organization/cofounders-planet-pvt-ltd"
            />

            <Card
                img = {sol}
                width = {240}
                height = {200}
                name = "Events Partner"
                phone = "Solvoix"
                email = "https://solvoix.com/"
            />
            
        </>
    )
}