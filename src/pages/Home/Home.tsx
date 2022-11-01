
import TextArea from '../../components/TextArea/TextArea';
import './Home.css'

const Home = () => {
    return (
        <div>
            <div className='homeArea'>
                <TextArea 
                    variant="body1"
                    text="This project aims to create a search service to find pictures of multiple animals by selecting the breed and the source for the search."
                />
            </div>
        </div>
    )
}

export default Home;