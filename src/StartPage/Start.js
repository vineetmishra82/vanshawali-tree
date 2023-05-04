import React from "react";
import { useState,useEffect } from "react";
import './Start.css';
import { useNavigate } from 'react-router-dom';

const StartPage = () => {

let navigate = useNavigate();    
const gotoHome = ()=>{
navigate('/home');
};    

const[vyaktiList,setVyaktiList] = useState([]);
   
const[selectedVyakti,setSelectedVyakti] = useState({
    vyaktiId : '',
    name : '',
    isLiving : '',
    gender : '',
    maritalStatus : '',
    isFirst : false,
    nearestRelative : '',
    relationship : '',
    isDeletable : true,
    remarks : ''
});

const getVanshawali = () => {
    try {
        fetch("https://vanshawali-apis.onrender.com/getEveryone")
            .then((response) => {
                // console.log(response);
                return response.json();
            })
            .then((myJson) => {
                // console.log(myJson);
                setVyaktiList(myJson);
            });
    } catch (e) {
        console.log(e);
    }
};
useEffect(() => {
    getVanshawali();
    
}, [vyaktiList]);

const HandleSelectedVyakti = (e) => {

    setSelectedVyakti(e.target.value);
};

const getRelationShipName = (element)=> {

    var values = element.nearestRelative.split(" id - ");


    if(element.relationship === "Father")
    {
        return " पिता - "+values[0];
    }
    else if(element.relationship === "Sibling"){
        return " सहोदर - "+values[0];
    }
    else{
        return "";
    }
}


return(
<div>
    <h1 id = "topHead">हमारी वंशावली</h1>

<div id="introText">
<p>
प्रस्तुत वंशावली मूलरूप से छतहार ग्राम, ज़िला बाँका, बिहार के निवासी भारद्वाज गोत्र के शाकद्वीपीय ब्राह्मण वंश का आलेख है ।
<br/><br/>स्वo श्री कृष्ण मिश्र (सहोदर स्वo श्री हेली मिश्र) से आरंभ होने वाली वंशावली परवर्ती पीढ़ियों के सदस्यों के नामों का संकलन है । <br/><br/>

इस वंशावली को आप संपूर्ण देख सकते हैं अथवा अपनी व्यक्तिगत वंशावली को देखने के लिए अपने पिता के नाम को दिये गये लिस्ट से चुने ।<br/><br/>

यह वंशावली को बनाने में सभी बड़ों के आशीर्वाद के साथ श्री चंद्रभूषण मिश्र (पिता स्वo श्री कलाधर मिश्र) के दिशानिर्देश एवं डेटा प्रदान करने का अभूतपूर्व योगदान है ।
<br/><br/>श्री दीपक मिश्र (पिता श्री चंद्रभूषण मिश्र) जी के अतुलनीय योगदान के बिना भी यह विकराल कार्य असंभव था जिसमे डेटा के संकलन, प्रबंधन एवं टंकण जिससे इस वंशावली का प्रारूप आया ।
<br/><br/>इस वेबसाइट के निर्माण एवं तत्संबंधी तकनीकों के माध्यम से इस धरोहर को अत्याधुनिक स्वरूप श्री विनीत मिश्र (पिता श्री इंदुभूषण मिश्र) ने प्रदान किया है ।
</p>

</div>

<div id = "btnsDiv">

<button className="css-button-fully-rounded--red" onClick={gotoHome}>पूर्ण वंशावली देखें</button>
<div className='dropdownBox'>
    <select id="dropdown"
    value={selectedVyakti}
     onChange={HandleSelectedVyakti}
    >
        <option value=" " disabled selected>पिता चुनें</option>
        {vyaktiList &&
                        vyaktiList.length > 0 &&
                        vyaktiList.map((gname, key) => {
                            return (
                                <option key={gname.vyaktiId} > {gname.name+ getRelationShipName(gname)}</option>
                            );
                        })}

    </select>
</div>
</div>

</div>
)

};


export default StartPage;