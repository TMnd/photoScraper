import TextArea from '../../components/TextArea/TextArea';
import './About.css'

const about = () => {
    return (
        <div>
            <div className='aboutArea'>
                <TextArea 
                    variant="h5"
                    text="João Luís Amaral"
                />
                <TextArea 
                    variant="h6"
                    text="joaoamaral1989@hotmail.com"
                />
                <TextArea
                    variant="h6"
                    text="https://github.com/tmnd"
                />
                <p>
                    I really enjoyed this exercice. Ideas about how it can be improved do not stop.
                </p>
                <p>
                    Thanks for your time.
                </p>
            </div>
        </div>
    )
}

export default about;