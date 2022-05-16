export default function Card(props){
    const wide = props.width;
    const high = props.height;
    
    const Img = props.img;

    const name = props.name;
    const phone = props.phone;
    const email = props.email;
    //phone = name of company
    //email = link of website
    //name = (some-type) of partner
    return(
        <>
            <div className = 'sp-Card'>

                <div className = 'sp-Top'>

                    <div className = 'sp-img1'>

                        <img className="sp-logo" src = {Img} width = {wide} height = {high} alt = 'cat'/>
                        
                        <h3 className = 'sp-name'> {name}  </h3>
                        
                        <p className = 'sp-phone'> {phone} </p>
                        
                        <a className = 'sp-email' href={email}> Visit </a>

                    </div>

                </div>

            </div>
        </>
    );
}
