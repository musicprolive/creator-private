import styled from "styled-components";

export const Container = styled.div`
    //margin: 80px 30px 0 30px;
/* 
    border-radius: 1.5rem;

    cursor: pointer;

    @media (max-width: 599px) {
        margin: 80px 40px 20px 40px;
    }

    @media (min-width: 600px) and (max-width: 749px) {
        margin: 90px 78px;
    } 

    @media (min-width: 750px) and (max-width: 900px) {
        margin: 30px 100px;
    }

    @media (min-width: 1000px) {
        margin: 60px 160px;
    } */

    /* .infos {
        margin: 16px 0px;

        width: 100%;

        @media (max-width: 599px) {
            padding: 5px 0 0 20px;
        }

        @media  (min-width: 600px) and (max-width: 899px)  {
            padding: 5px 0 0 40px;
        }

        @media  (min-width: 900px) and (max-width: 999px)  {
            padding: 0 0 0 10px;
        }

        @media(min-width: 800px) {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            
            //margin: 1.75rem 0 0 0;
        }
    } */
`;

export const ImageContainer = styled.div`
    @media (min-width: 1024px) {
        width: 45%;
    }

`;

export const Title = styled.h1`
    //color: #fff;
    text-shadow: 2px 2px #000;

   // font-size: 2.5rem;
  //  font-weight: 500;

    border-radius: 0 0 1.5rem 1.5rem;
    line-height: 50px;


    @media (max-width: 599px) {
      //  padding: 20px 0 15px 20px;
        
      //  font-size: 2rem;

     //   line-height: 40px;
    }

    @media  (min-width: 600px) and (max-width: 1023px)  {
        padding: 20px 0 5px 40px;
    }
    
    @media (min-width: 1000px) {

        font-size: 2.5rem;
        font-weight: 500;

        padding: 0 0 0.5rem 1.75rem;
    }
    
`;

export const FullText = styled.p`
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
`;
