export default function Card(props){
    const wide = props.width;
    const high = props.height;
    
    const Img = props.img;

    const name = props.name;
    const phone = props.phone;
    const email = props.email;
    // const config = {};
    
    return(
        <>
            <div className = 'Card'>

                <div className = 'Top'>

                    <div className = 'img1'>

                        <img className="logo" src = {Img} width = {wide} height = {high} alt = 'cat'/>
                        
                        <h3 className = 'name'> {name}  </h3>
                        
                        <p className = 'phone'> {phone} </p>
                        
                        <a className = 'email' href={email}> Visit </a>

                    </div>

                </div>

            </div>
        </>
    );
}