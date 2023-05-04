import React, { useEffect, useState}  from "react";
import { Tree,TreeNode } from "react-organizational-chart";
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import styled from "styled-components";
import './Home.css';


const HomePage = () => {
  const[vanshawali,setVanshawali] = useState([{}]);
  const[firstLoad,setFirstLoad] = useState(true); 
  const[searchPerson,setSearchPerson] = useState(null);
  useEffect(() => {

    getVanshwali();
    scrollToCenter(firstLoad)

    window.addEventListener('scroll',stopAutoScroll);
    var mar =  (document.getElementById("mainDiv").scrollWidth/2.5).toString();
    document.getElementById("searchBox").style.marginLeft =  mar+"px";
   
 },[vanshawali,firstLoad]);

 
  const getVanshwali = () => {

    try {
        fetch("https://vanshawali-apis.onrender.com/getEveryone")
            .then((response) => {
                // console.log(response);
                return response.json();
            })
            .then((myJson) => {
                // console.log(myJson);
                setVanshawali(myJson);
            });
    } catch (e) {
        console.log(e);
    }

  };

  const scrollToCenter = ((value) =>{
     
    if(value)
    {
      window.scrollTo({
        left: document.getElementById("mainDiv").scrollWidth/2.5,
        behavior: 'smooth'
      });

     
     
    }
   
   
  });
  const processName = (element) => {

    var name = "";
    if(element.isLiving=== "No")
    {
        name += "स्वo ";
    }

    if(element.gender === "Male")
    {
        name += "श्री ";
    }else {
        if(element.maritalStatus==="Married")
        {
            name += "श्रीमती ";
        }
        else{
            name += "कुo ";
        }
    }

    name += element.name;

    return name;

  };

  const getParentId = (element) => {
    var rel = `${element.nearestRelative}`;

      var values = rel.split("id - ");
      
      return values[1];
    }

  const CheckIfElementHasChildren = (id) => {
    var comp = [];
    var i =0;
    vanshawali.map((element) => {
      
      var eleId = getParentId(element);
     if(eleId === id && element.relationship==="Father")
      {
        comp[i] = <TreeNode className={"StyledNode "+element.vyaktiId} label={getLabelOfNode(element)} >
           {CheckIfElementHasChildren(element.vyaktiId)}
        </TreeNode>
        i++
      }
      

    });
   return comp;
  } 
  
  const getPopUp = (element) => {

    const details = "नाम  - " + element.name+"\n"+
                   getRelationShipName(element)+"\n"+
                   "अन्य जानकारी - "+element.remarks 
    ;
    

    alert(details);
}
    
    
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

  const getAncestors = () => {
    var node;

    return(
      <>
      {
         
        vanshawali.map((element) => {

          if(element.first)
          {
            node = <TreeNode className="StyledNode" label={getLabelOfNode(element)}  >

            {CheckIfElementHasChildren(element.vyaktiId)}

          </TreeNode>  
        
           return node;
          }
         
         
        
         
        })

       
      }
      
      </>
     
    )
   
       
    }

  
  const getLabelOfNode = (element) => {

    return(
      <StyledNode onClick={() => getPopUp(element)}>{processName(element)}</StyledNode>
    )
  };

  const stopAutoScroll = () => {

    console.log("scroll event");
    setFirstLoad(false);
  }

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>{item.name+ getRelationShipName(item)}</span>
      </>
    )
  }

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
    
  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item)
  
    if(searchPerson!=null)
    {
      searchPerson.style.background = 'transparent';
        
    }

    setSearchPerson(null);
    var person = document.getElementsByClassName(item.vyaktiId);
    console.log("person size is "+person.length);
    console.log(person[0]);
    person[0].scrollIntoView( { behavior: 'smooth', block: 'center' } );
    person[0].style.background = 'yellow';
    setSearchPerson(person[0]);   
    
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  
  const StyledNode = styled.div`
  padding: 5px;
  border-radius: 8px;
  display: inline-block;
  border: 2px solid red;
    
`;

   return(
     <div id="mainDiv" >
      <div id="searchBox">
      <ReactSearchAutocomplete items={vanshawali} 
     formatResult={formatResult}
     onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
             />
      </div>
     
<Tree
    lineWidth={'2px'}
    lineColor={'darkgreen'}
    lineBorderRadius={'10px'}
    label={<StyledNode className="StyledNode">छतहार वंश</StyledNode>}
    id = "base"
   
  >

{getAncestors()}

  </Tree>

     </div>   

    );


   };



export default HomePage;