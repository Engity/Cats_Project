import { useParams, useNavigate } from 'react-router-dom'
import '../assets/styles/DisplayCard.css'

const DisplayCard = ({ info }) => {
    if (!info || info.length == 0) {
        return null;
    }

    const { id } = useParams();
    let { breeds, url, height, width } = info[id];

    //Not finished fetching data;
    if (!breeds) {
        return null;
    }

    const breedInfo = breeds[0];
    // console.log(breeds[0]);

    const details = [
        { key: 'Name', data: breedInfo.name },
        { key: 'Origin', data: breedInfo.origin },
        { key: 'Weight', data: breedInfo.weight.imperial },
        { key: 'Life Span', data: breedInfo.life_span },
        { key: 'Adaptability', data: breedInfo.adaptability },
        { key: 'Affection Level', data: breedInfo.affection_level },
        { key: 'Child Friendly', data: breedInfo.child_friendly },
        { key: 'Dog Friendly', data: breedInfo.dog_friendly },
        { key: 'Description', data: breedInfo.description },
        ,
    ];

    const navigate = useNavigate();

    const goMainMenu = () => {
        navigate("/");
    }

    const redirectHandler = (link) => {
        if (window.confirm('This will redirect to another window.\n Would you like to proceed?')) {
            window.location.href = link;
        }
    }

    return <div className='DisplayCard'>
        <img src={url} style={{ width: 300 + 'px', height: height * 300 / width + 'px' }} />
        <br></br>

        <table className='detailTable'>
            <thead></thead>
            <tbody>
                {details.map((detail) => {
                    return <tr key={detail.key} className="table-row" >
                        <th className="colHeader" key={"header" + detail.key}>
                            {detail.key}
                        </th>
                        <th className="colData" key={"data" + detail.key}>
                            {detail.data}
                        </th>
                    </tr>

                })}
            </tbody>
            <tfoot></tfoot>
        </table>

        {/* <p id='description'>{breedInfo.description}</p> */}

        <button onClick={() => redirectHandler(breedInfo.wikipedia_url)}>Learn more</button>
        <br></br>
        <button id="goingBackButton" onClick={goMainMenu}> Go Back </button>
    </div>
}
export default DisplayCard