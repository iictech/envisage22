import cfp from '../sponsor_images/cfp.png'
import d2c from '../sponsor_images/d2c.png'
import ff from '../sponsor_images/ff.png'
import lwt from '../sponsor_images/lwt.png'
import sol from '../sponsor_images/solvoix.png'
import i22 from '../sponsor_images/22i.png'
import bkd from '../sponsor_images/bkd.png'
import bob from '../sponsor_images/bob.png'
import dsij from '../sponsor_images/dsij.png'
import wow from '../sponsor_images/wow.png'
import exc from '../sponsor_images/exc.png'
import voxit from '../sponsor_images/voxit.png'

import Card from './sp-card-prop'

//phone = name of company
//email = link of website
//name = (some-type) of partner

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
                phone = "FreeFlow"
                email = "https://freeflow.zone/"
            />
            
            <Card
                img = {cfp}
                width = {240}
                height = {170}
                name = "Venture Partner"
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

            <Card
                img = {bob}
                width = {240}
                height = {200}
                name = "Events Partner"
                phone = "Bank of Baroda"
                email = "https://www.bankofbaroda.in/"
            />

            <Card
                img = {exc}
                width = {240}
                height = {220}
                name = "Events Partner"
                phone = "Exchange22"
                email = "https://exchange22.com/"
            />

            <Card
                img = {wow}
                width = {240}
                height = {200}
                name = "Events Partner"
                phone = "Wow! China"
                email = "https://www.facebook.com/wowchinabywowmomo/"
            />

            <Card
                img = {i22}
                width = {240}
                height = {200}
                name = "Food Sponsor"
                phone = "2nd Innings"
                email = "https://www.facebook.com/2ndinnings2019/"
            />

            <Card
                img = {dsij}
                width = {240}
                height = {200}
                name = "Events Partner"
                phone = "Dalal Street Investment..."
                email = "https://www.dsij.in/"
            />

            <Card
                img = {bkd}
                width = {260}
                height = {200}
                name = "Events Partner"
                phone = "BoookD.com"
                email = "https://boookd.com/"
            />

            <Card
                img = {voxit}
                width = {240}
                height = {200}
                name = "Events Partner"
                phone = "Voxit Media Tech"
                email = "https://voxitworld.com/"
            />
            
        </>
    )
}
