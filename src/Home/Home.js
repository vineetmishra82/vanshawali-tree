import React, { useEffect, useState }  from "react";
import { Tree,TreeNode } from "react-organizational-chart";
import styled from "styled-components";
import Popup from 'reactjs-popup';

const HomePage = () => {
  const[vanshawali,setVanshawali] = useState([{}]);
  
  useEffect(() => {

    getVanshwali();

  }, [{}]);

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

  const processName = (element) => {

    var name = "";
    console.log(element);
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
      console.log(values[1]);
  
      return values[1];
    }

  const CheckIfElementHasChildren = (id) => {
    var comp = [];
    var i =0;
    vanshawali.map((element) => {
      
      var eleId = getParentId(element);
     if(eleId === id && element.relationship==="Father")
      {
        comp[i] = <TreeNode label={getLabelOfNode(element)} >
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
        return "पिता - "+values[0];
    }
    else if(element.relationship === "Sibling"){
        return "सहोदर - "+values[0];
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
            node = <TreeNode label={getLabelOfNode(element)} >

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

  const StyledNode = styled.div`
  padding: 5px;
  border-radius: 8px;
  display: inline-block;
  border: 1px solid red;
`;

   return(
     <div>
<Tree
    lineWidth={'2px'}
    lineColor={'green'}
    lineBorderRadius={'10px'}
    label={<StyledNode>छतहार वंश</StyledNode>}
    id = "base"
  >

{getAncestors()}

  </Tree>

     </div>   

    );


   };



export default HomePage;