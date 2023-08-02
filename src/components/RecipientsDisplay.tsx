import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface RecipientsProps{
    recipients:string[];
}
const MAX_RECIPIENT_WIDTH = 40;

export default function RecipientsDisplay({recipients}:RecipientsProps) {
  const textAreaRef = useRef(null);
  const [textAreaWidth, setTextAreaWidth] = useState(null);
  const [badgeCount, setBadgeCount] = useState(recipients.length-1);
  const [tempReciepts, setTempReciepts] = useState(recipients);

  useEffect(() => {
    const handleResize = () => {
      if (textAreaRef.current) {
        setTextAreaWidth(textAreaRef.current.clientWidth);

        if(textAreaWidth<200){
          setTempReciepts(recipients.slice(0,1));
          setBadgeCount(recipients.length-1);
        }
        else if(textAreaWidth>200 && textAreaWidth<=385 && recipients.length>1){
          var len = recipients.slice(0,2).toString().length;
          if(len<=40){
            setTempReciepts(recipients.slice(0,2));
            setBadgeCount(recipients.length-2);
          }
          else {
            setTempReciepts(recipients.slice(0,1));
            setBadgeCount(recipients.length-1);
          }
        }
        else if(textAreaWidth>385 && textAreaWidth<=565 && recipients.length>2){
          var len = recipients.slice(0,2).toString().length;
          if(len<=40){
            setTempReciepts(recipients.slice(0,3));
            setBadgeCount(recipients.length-3);
          }
          else {
            setTempReciepts(recipients.slice(0,2));
            setBadgeCount(recipients.length-2);
          }
        }
        else {
          setTempReciepts(recipients);
        }
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // const handleTextAreaChange = (event) => {
  //   if (textAreaRef.current) {
  //     const width = textAreaRef.current.clientWidth;
  //     setTextAreaWidth(width);
  //     console.log(width);
  //   }
  // };



    const CellContainer = styled.div`
    font-size: 16px;
    foreground-color: #333333;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    `;  
    const TextArea = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 10px;
    `;
    const Badge = styled.div`
    color:white;
    font-size: 16px;
    foreground-color: #f0f0f0;
    background-color: #666666;
    border-radius: 3px;
    padding-top: 2px;
    padding-bottom: 2px;
    padding-left: 5px;
    padding-right: 5px;
    margin-left: auto; 
    margin-right: 0;
    `;

    const displayRecipients = ()=> {
      const tempContainer = document.createElement('div')
      tempContainer.style.display = 'inline-block'
      tempContainer.innerText = recipients.toString()
      return(tempContainer.innerText);
   }

      return (
        <CellContainer>
        <TextArea ref={textAreaRef}>{badgeCount>0? (tempReciepts.join(", ") + ", ...") : tempReciepts.join(", ")}</TextArea>    
        {badgeCount>0&&(
            <Badge>+{badgeCount}</Badge>
        )}
        </CellContainer>
      );
};


// export default styled(RecipientsDisplay)`
//   .recipient-cell {
//     font-size: 16px;
//     foreground-color: #333333;
//     top-padding: 5px;
//     bottom-padding: 5px;
//     left-padding: 10px;
//     right-padding: 10px;
//   }
  
//   .text-box {
//     border: var(--border-style);
//     padding: 5px 10px;
//     overflow: hidden;
//     text-overflow: ellipsis;
//     white-space: nowrap;
//   }

//   button {
//     font-size: 16px;
//     foreground-color: #f0f0f0;
//     background-color: #666666;
//     border-radius: 3px;
//     top-padding: 2px;
//     bottom-padding: 2px;
//     left-padding: 5px;
//     right-padding: 5px;
//   }
// `
